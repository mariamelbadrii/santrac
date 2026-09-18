import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "@/lib/auth/AdminAuthContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/inventory", label: "Inventory", end: false },
  { to: "/admin/leads", label: "Leads", end: true },
];

export function AdminLayout() {
  const { signOut } = useAdminAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="relative w-56 shrink-0 border-e border-ink-100 bg-ink-900 text-white">
        <div className="p-4 text-lg font-bold">SANTRAC Admin</div>
        <nav className="flex flex-col gap-1 px-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-white",
                  isActive && "bg-ink-800 text-white",
                )
              }
            >
              {link.label}
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
