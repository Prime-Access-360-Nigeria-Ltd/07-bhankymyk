import {
  useLoaderData,
  Outlet,
  Link,
  type ClientLoaderFunctionArgs,
  type ClientActionFunctionArgs,
  type ShouldRevalidateFunctionArgs,
} from "react-router";
import { Plus } from "lucide-react";
import { fetchVouchersApi, updateVoucherStatusApi, type VoucherStatus } from "@/lib/mockApi";
import { Button } from "@/components/ui/button";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const walletType = url.searchParams.get("walletType") || undefined;
  const status = url.searchParams.get("status") || undefined;
  const page = Number(url.searchParams.get("page")) || 1;

  const data = await fetchVouchersApi(
    {
      q,
      walletType,
      status,
      page,
      limit: 10,
    },
    request.signal
  );

  return data;
}

export function shouldRevalidate({
  formMethod,
  formData,
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  if (currentUrl.search !== nextUrl.search) {
    return true;
  }

  if (formData && formData.get("intent") === "update_status") {
    return false;
  }

  return defaultShouldRevalidate;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "update_status") {
    const voucherId = String(formData.get("voucherId"));
    const newStatus = formData.get("newStatus") as VoucherStatus;

    try {
      const result = await updateVoucherStatusApi(voucherId, newStatus, request.signal);
      return result;
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Failed to update voucher status.",
      };
    }
  }

  return { success: false, error: "Unknown action intent" };
}

export default function VouchersRoute() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Vouchers</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage multi-currency voucher allocations and settlements.
          </p>
        </div>

        <Link to="/accounting/vouchers/new">
          <Button size="md" variant="primary">
            <Plus className="w-4 h-4" />
            <span>New Voucher</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500 text-sm">
        <p className="font-semibold text-slate-800 text-base">Implement Voucher Settlement Ledger UI</p>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Please design and implement this page using the dummy mock APIs in <code className="font-mono text-[#53A333] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">app/lib/mockApi.ts</code>.
        </p>
      </div>

      <Outlet />
    </div>
  );
}
