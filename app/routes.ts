import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("accounting/vouchers", "routes/accounting/vouchers.tsx", [
    route("new", "routes/accounting/vouchers_new.tsx"),
  ]),
  route("accounting/beneficiary-zones", "routes/accounting/beneficiary_zones.tsx"),
  route("accounting/wallets", "routes/accounting/wallets.tsx"),
  route("accounting/disbursements", "routes/accounting/disbursements.tsx"),
  route("reports", "routes/reports/index.tsx"),
  route("settings", "routes/settings/index.tsx"),
] satisfies RouteConfig;
