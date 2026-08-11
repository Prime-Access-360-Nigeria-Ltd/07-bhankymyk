export default function ReportsRoute() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Financial settlement statements and volume analytics.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center text-slate-500 text-sm">
        <p className="font-semibold text-slate-800 text-base">Implement Reports & Analytics UI</p>
        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          Please design and implement this page using the dummy mock APIs in <code className="font-mono text-[#53A333] bg-slate-100 px-1.5 py-0.5 rounded font-semibold">app/lib/mockApi.ts</code>.
        </p>
      </div>
    </div>
  );
}
