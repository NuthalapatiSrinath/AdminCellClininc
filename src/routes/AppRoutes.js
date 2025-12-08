import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import HomePage from "../pages/HomePage/HomePage";
import ContactUsPage from "../components/ContactUsPage/ContactUsPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ArticleDetailPage from "../pages/ArticleDetailPage/ArticleDetailPage";
import SpotlightPage from "../pages/SpotlightPage/SpotlightPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage/TermsPage";
import WarrantyPage from "../pages/WarrantyPage/WarrantyPage";
import PartnerPage from "../pages/PartnerPage/PartnerPage";
import FaqPage from "../pages/FaqPage/FaqPage";
import RepairPage from "../pages/RepairPage/RepairPage";
import ModelRepairPage from "../pages/ModelRepairPage/ModelRepairPage";
import AddressInfoPage from "../pages/AddressInfoPage/AddressInfoPage";
import BookingSuccessPage from "../pages/BookingSuccessPage/BookingSuccessPage";
import ServicesPage from "../pages/ServicesPage/ServicesPage";
import MobileRepairPage from "../pages/MobileRepairPage/MobileRepairPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import MyOrdersPage from "../pages/MyOrdersPage/MyOrdersPage";
import ImportDataPage from "../pages/ImportDataPage/ImportDataPage";
import AdminCatalogPage from "../pages/AdminCatalogPage/AdminCatalogPage";
import AdminBrandDetailsPage from "../pages/AdminBrandDetailsPage/AdminBrandDetailsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Parent Route */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="spotlight" element={<SpotlightPage />} />
          <Route path="spotlight/:id" element={<ArticleDetailPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="warranty" element={<WarrantyPage />} />
          <Route path="partner" element={<PartnerPage />} />
          <Route path="faq" element={<FaqPage />} />

          {/* Repair Routes */}
          <Route path="repair-brand/:brandName" element={<RepairPage />} />
          <Route path="repair/model/:id" element={<ModelRepairPage />} />
          <Route path="repair/mobile" element={<MobileRepairPage />} />

          <Route path="checkout" element={<AddressInfoPage />} />
          <Route path="booking-success" element={<BookingSuccessPage />} />

          {/* Services */}
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/iphone" element={<ServicesPage />} />
          <Route path="services/macbook" element={<ServicesPage />} />

          {/* --- ADMIN ROUTES --- */}
          {/* Main Dashboard */}
          <Route path="admin" element={<AdminPage />} />

          {/* Sub-Pages (Cleaned Paths) */}
          <Route path="admin/catalog" element={<AdminCatalogPage />} />
          <Route path="admin/import-data" element={<ImportDataPage />} />
          <Route path="admin/orders" element={<MyOrdersPage />} />

          {/* The Detail Page Route */}
          <Route path="admin/brand/:id" element={<AdminBrandDetailsPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}
