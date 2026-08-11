import { useLocation } from "react-router";
import { Menu, Bell, ChevronRight } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path.includes("/accounting/vouchers/new")) {
      return ["Accounting", "Vouchers", "New Voucher"];
    }
    if (path.startsWith("/accounting/vouchers")) {
      return ["Accounting", "Vouchers"];
    }
    if (path.startsWith("/accounting/beneficiary-zones")) {
      return ["Accounting", "Beneficiary Zones"];
    }
    if (path.startsWith("/accounting/wallets")) {
      return ["Accounting", "Wallets"];
    }
    if (path.startsWith("/accounting/disbursements")) {
      return ["Accounting", "Disbursements"];
    }
    if (path.startsWith("/reports")) {
      return ["Reports", "Overview"];
    }
    if (path.startsWith("/settings")) {
      return ["Settings", "General"];
    }
    return ["Dashboard"];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 w-full h-16 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                <span
                  className={
                    isLast
                      ? "font-semibold text-slate-900"
                      : "font-medium text-slate-500"
                  }
                >
                  {crumb}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Notifications & Status */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200" />

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <div className="w-2 h-2 rounded-full bg-[#53A333]" />
          <span className="font-medium hidden sm:inline">PA Ledger</span>
        </div>
      </div>
    </header>
  );
}
