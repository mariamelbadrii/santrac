import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import { AdminAuthProvider } from "@/lib/auth/AdminAuthContext";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";

import Home from "@/pages/Home";
import Equipment from "@/pages/Equipment";
import EquipmentDetail from "@/pages/EquipmentDetail";
import Services from "@/pages/Services";
import About from "@/pages/About";
import RequestQuote from "@/pages/RequestQuote";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminGuard from "@/pages/admin/AdminGuard";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminInventoryList from "@/pages/admin/AdminInventoryList";
import AdminInventoryNew from "@/pages/admin/AdminInventoryNew";
import AdminInventoryEdit from "@/pages/admin/AdminInventoryEdit";
import AdminLeads from "@/pages/admin/AdminLeads";

export default function App() {
  return (
    <I18nProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="equipment" element={<Equipment />} />
              <Route path="equipment/:slug" element={<EquipmentDetail />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="request-quote" element={<RequestQuote />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<AdminGuard />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="inventory" element={<AdminInventoryList />} />
                <Route path="inventory/new" element={<AdminInventoryNew />} />
                <Route path="inventory/:id/edit" element={<AdminInventoryEdit />} />
                <Route path="leads" element={<AdminLeads />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </I18nProvider>
  );
}
