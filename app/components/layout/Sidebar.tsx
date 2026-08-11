import { Link, useLocation } from "react-router";
import {
  FileText,
  Users,
  Wallet,
  ArrowLeftRight,
  BarChart,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    {
      name: "Vouchers",
      href: "/accounting/vouchers",
      icon: FileText,
      current: location.pathname.startsWith("/accounting/vouchers"),
    },
    {
      name: "Beneficiary Zones",
      href: "/accounting/beneficiary-zones",
      icon: Users,
      current: location.pathname.startsWith("/accounting/beneficiary-zones"),
    },
    {
      name: "Wallets",
      href: "/accounting/wallets",
      icon: Wallet,
      current: location.pathname.startsWith("/accounting/wallets"),
    },
    {
      name: "Disbursements",
      href: "/accounting/disbursements",
      icon: ArrowLeftRight,
      current: location.pathname.startsWith("/accounting/disbursements"),
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart,
      current: location.pathname.startsWith("/reports"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: location.pathname.startsWith("/settings"),
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-6 flex items-center border-b border-slate-200">
          <Link to="/accounting/vouchers" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#53A333] text-white flex items-center justify-center font-bold text-sm">
              PA
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              Prime Access 360
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-slate-100 text-slate-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    item.current ? "text-[#53A333]" : "text-slate-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-medium text-xs">
            AD
          </div>
          <div className="text-xs min-w-0">
            <p className="font-medium text-slate-900 truncate">Administrator</p>
            <p className="text-slate-500 truncate">admin@primeaccess.com</p>
          </div>
        </div>
      </aside>
    </>
  );
}
