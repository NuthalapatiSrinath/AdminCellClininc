import TopBar from "../../pages/TopBar/TopBar";
import Footer from "../../pages/Footer/Footer";
import FloatingActions from "../../components/FloatingActions/FloatingActions";
import styles from "./DashboardLayout.module.css";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className={styles.DashboardLayout}>
      {/* Right Section contains the full vertical page flow */}
      <div className={styles.RightSection}>
        <TopBar />

        {/* Main Content Area - Grows to push Footer down */}
        <main className={styles.MainContent}>
          <Outlet />
        </main>

        <Footer />

        {/* Fixed Floating Buttons */}
        <FloatingActions />
      </div>
    </div>
  );
}

export default DashboardLayout;
