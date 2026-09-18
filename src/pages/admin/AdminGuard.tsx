import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "@/lib/auth/AdminAuthContext";

export default function AdminGuard() {
  const { session, isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-ink-500">…</div>;
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
