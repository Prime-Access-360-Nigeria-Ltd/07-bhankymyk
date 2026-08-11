import { redirect } from "react-router";

export function clientLoader() {
  return redirect("/accounting/vouchers");
}

export default function IndexRoute() {
  return null;
}
