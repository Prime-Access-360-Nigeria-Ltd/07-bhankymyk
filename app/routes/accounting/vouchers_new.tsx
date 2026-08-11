import {
  useNavigate,
  redirect,
  type ClientActionFunctionArgs,
} from "react-router";
import { Modal } from "@/components/ui/modal";
import { createVoucherApi } from "@/lib/mockApi";
import { CreateVoucherSchema } from "@/lib/schemas";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const rawPayload = formData.get("payload");

  if (!rawPayload || typeof rawPayload !== "string") {
    return { success: false, error: "Invalid payload submitted." };
  }

  try {
    const parsedData = JSON.parse(rawPayload);
    const validatedData = CreateVoucherSchema.parse(parsedData);

    await createVoucherApi(validatedData, request.signal);

    return redirect("/accounting/vouchers");
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to create voucher.",
    };
  }
}

export default function VouchersNewRoute() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/accounting/vouchers");
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title="Create Voucher"
      maxWidth="2xl"
    >
      <div className="p-8 text-center text-slate-500 text-sm">
        <p className="font-semibold text-slate-800 text-base">Implement Voucher Creation Form</p>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Please design and implement the multi-step voucher creation form using the schemas in <code className="font-mono text-[#53A333] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">app/lib/schemas.ts</code> and mock datasets in <code className="font-mono text-[#53A333] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">app/lib/mockApi.ts</code>.
        </p>
      </div>
    </Modal>
  );
}
