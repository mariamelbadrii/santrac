import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "@/lib/auth/AdminAuthContext";

export default function AdminGuard() {
  const { session, isAdmin, loading, roleError, signOut } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-ink-500">
        Checking your session…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <p className="text-sm font-medium text-ink-900">
            {roleError ? "We couldn't verify admin access." : "This account doesn't have admin access."}
          </p>
          <p className="mt-2 text-sm text-ink-500">
            {roleError ?? "Ask whoever manages the SANTRAC admin to grant this account the admin role."}
          </p>
          <button
            onClick={() => signOut()}
            className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Sign out and try another account
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
