import { useLoaderData } from "react-router";
import { BENEFICIARY_ZONES } from "@/lib/mockApi";

export async function clientLoader() {
  return { zones: BENEFICIARY_ZONES };
}

export default function BeneficiaryZonesRoute() {
  const { zones } = useLoaderData<typeof clientLoader>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Beneficiary Zones</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Regional disbursement hubs and allocation zones.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500 text-sm">
        <p className="font-semibold text-slate-800 text-base">Implement Beneficiary Zones UI</p>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Please design and implement this page using the <code className="font-mono text-[#53A333] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">BENEFICIARY_ZONES</code> dataset in <code className="font-mono text-[#53A333] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">app/lib/mockApi.ts</code>.
        </p>
      </div>
    </div>
  );
}
