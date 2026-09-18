import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "@/lib/auth/AdminAuthContext";
import { useNewLeadsCount } from "@/hooks/useNewLeadsCount";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/inventory", label: "Inventory", end: false },
  { to: "/admin/categories", label: "Categories", end: true },
  { to: "/admin/leads", label: "Leads", end: true, showLeadsBadge: true },
  { to: "/admin/settings", label: "Settings", end: true },
];

export function AdminLayout() {
  const { signOut } = useAdminAuth();
  const newLeadsCount = useNewLeadsCount();

  return (
    <div className="flex min-h-screen">
      <aside className="relative w-56 shrink-0 border-e border-ink-100 bg-ink-900 text-white">
        <div className="p-4">
          <p className="text-lg font-bold leading-none">
            <span className="text-white">SAN</span>
            <span className="text-brand-400">TRAC</span>
          </p>
          <p className="mt-1 text-[0.625rem] font-semibold uppercase tracking-widest2 text-ink-500">
            Admin
          </p>
        </div>
        <nav className="flex flex-col gap-1 px-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-white",
                  isActive && "bg-ink-800 text-white",
                )
              }
            >
              <span>{link.label}</span>
              {link.showLeadsBadge && Boolean(newLeadsCount) && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[0.6875rem] font-semibold text-white">
                  {newLeadsCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => signOut()}
          className="absolute bottom-4 start-4 text-sm text-ink-300 hover:text-white"
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 bg-ink-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
