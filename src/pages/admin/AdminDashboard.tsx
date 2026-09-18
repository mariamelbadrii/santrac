import { Link } from "react-router-dom";
import { Package, MessageSquare, Settings } from "lucide-react";

const links = [
  {
    to: "/admin/inventory",
    icon: Package,
    label: "Inventory",
    body: "Add, edit, publish, and manage equipment listings.",
  },
  {
    to: "/admin/leads",
    icon: MessageSquare,
    label: "Leads",
    body: "Review quote requests and update their status.",
  },
  {
    to: "/admin/settings",
    icon: Settings,
    label: "Settings",
    body: "Update the phone, WhatsApp, email, and social links shown on the site.",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-500">SANTRAC admin.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-lg border border-ink-200 bg-white p-5 transition-colors hover:border-ink-900"
            >
              <Icon aria-hidden="true" className="h-5 w-5 text-brand-500" />
              <p className="mt-3 text-sm font-semibold text-ink-900">{link.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-500">{link.body}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
