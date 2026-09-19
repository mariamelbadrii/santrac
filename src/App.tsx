import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { I18nProvider } from "@/lib/i18n";
import { AdminAuthProvider } from "@/lib/auth/AdminAuthContext";
import { SiteSettingsProvider } from "@/lib/settings/SiteSettingsContext";
import { SiteLayout } from "@/components/site/SiteLayout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const Home = lazy(() => import("@/pages/Home"));
const Equipment = lazy(() => import("@/pages/Equipment"));
const EquipmentDetail = lazy(() => import("@/pages/EquipmentDetail"));
const Services = lazy(() => import("@/pages/Services"));
const About = lazy(() => import("@/pages/About"));
const RequestQuote = lazy(() => import("@/pages/RequestQuote"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminGuard = lazy(() => import("@/pages/admin/AdminGuard"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminInventoryList = lazy(() => import("@/pages/admin/AdminInventoryList"));
const AdminInventoryNew = lazy(() => import("@/pages/admin/AdminInventoryNew"));
const AdminInventoryEdit = lazy(() => import("@/pages/admin/AdminInventoryEdit"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const AdminCategories = lazy(() => import("@/pages/admin/AdminCategories"));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <SiteSettingsProvider>
          <AdminAuthProvider>
            <BrowserRouter>
              <GoogleAnalytics />
              <Suspense fallback={null}>
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
                      <Route path="categories" element={<AdminCategories />} />
                      <Route path="leads" element={<AdminLeads />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AdminAuthProvider>
        </SiteSettingsProvider>
      </I18nProvider>
    </MotionConfig>
  );
}
