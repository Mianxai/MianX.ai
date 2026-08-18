import "./admin.css";
import AdminNotificationProvider from "@/components/admin/AdminNotificationProvider";

export const metadata = {
  title: "Mianx.ai — Admin",
  robots: { index: false, follow: false },
};

/**
 * Shared admin layout. The notification provider lives here (not in each page)
 * so the new-submissions badge survives client navigations across /admin/*.
 * Polling is disabled on /admin/login by the provider itself.
 */
export default function AdminLayout({ children }) {
  return <AdminNotificationProvider>{children}</AdminNotificationProvider>;
}
