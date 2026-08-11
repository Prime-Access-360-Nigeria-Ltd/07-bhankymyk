import { z } from "zod";
import { safeSumDecimals, roundToTwoDecimals } from "./utils";

export const WalletTypeSchema = z.enum(["FIAT", "CRYPTO", "BONUS"]);
export const VoucherStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED", "ON_HOLD"]);

export const AllocationRowSchema = z.object({
  zoneId: z.string().min(1, "Please select a beneficiary zone"),
  zoneName: z.string().min(1, "Zone name is required"),
  amount: z.coerce
    .number({ message: "Amount must be a valid number" })
    .positive("Allocation amount must be greater than 0")
    .refine((val) => Number(val.toFixed(2)) === val, {
      message: "Amount cannot have more than 2 decimal places",
    }),
  note: z.string().max(200, "Note cannot exceed 200 characters").optional(),
});

export const CreateVoucherSchema = z
  .object({
    sourceAccount: z.string().min(1, "Please select a source account"),
    walletType: WalletTypeSchema,
    totalAmount: z.coerce
      .number({ message: "Total amount must be a number" })
      .positive("Total voucher amount must be greater than 0")
      .refine((val) => Number(val.toFixed(2)) === val, {
        message: "Total amount cannot exceed 2 decimal places",
      }),
    currency: z.string().default("USD"),
    allocations: z
      .array(AllocationRowSchema)
      .min(1, "At least one beneficiary allocation row is required"),
  })
  .superRefine((data, ctx) => {
    const zoneIds = data.allocations.map((a) => a.zoneId).filter(Boolean);
    const uniqueZoneIds = new Set(zoneIds);
    if (uniqueZoneIds.size !== zoneIds.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Duplicate beneficiary zones are not allowed in the same voucher",
        path: ["allocations"],
      });
    }

    const allocatedSum = safeSumDecimals(data.allocations.map((a) => a.amount || 0));
    const targetTotal = roundToTwoDecimals(data.totalAmount || 0);

    if (allocatedSum !== targetTotal) {
      const diff = roundToTwoDecimals(Math.abs(allocatedSum - targetTotal));
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Sum of allocations ($${allocatedSum.toFixed(2)}) must match total voucher amount ($${targetTotal.toFixed(2)}). Difference: $${diff.toFixed(2)}`,
        path: ["allocations"],
      });
    }

    if (data.walletType === "BONUS" && data.totalAmount > 50000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Bonus vouchers cannot exceed $50,000.",
        path: ["totalAmount"],
      });
    }
  });

export type CreateVoucherFormData = z.infer<typeof CreateVoucherSchema>;
export type AllocationRowData = z.infer<typeof AllocationRowSchema>;
