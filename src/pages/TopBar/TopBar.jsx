import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { openModal } from "../../redux/slices/modalSlice";
import { logout } from "../../redux/slices/authSlice";
import {
  MapPin,
  Mail,
  CalendarDays,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Package,
  ChevronDown,
} from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.mode);

  // Get Auth State
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Helper to check active state
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* --- Top Strip --- */}
      <div className={styles.topStrip}>
        <div className={styles.container}>
          <div className={styles.stripContent}>
            <div className={styles.locationPill}>
              <MapPin size={14} className={styles.icon} />
              <span>Bengaluru | Hyderabad | Mumbai</span>
            </div>

            <div className={styles.rightStripGroup}>
              <div className={styles.emailGroup}>
                <a
                  href="mailto:info@cellclinichyd.com"
                  className={styles.contactLink}
                >
                  <Mail size={14} />
                  <span>info@cellclinichyd.com</span>
                </a>
              </div>

              {/* Added onClick to navigate to Services */}
              <button
                className={styles.bookNowBtnSmall}
                onClick={() => navigate("/services")}
              >
                <CalendarDays size={14} />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Navigation Bar --- */}
      <div
        className={`${styles.mainNav} ${isScrolled ? styles.stickyShadow : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.navContent}>
            {/* Logo */}
            <Link to="/" className={styles.logoGroup}>
              <img
                src="/logo.webp"
                alt="Cell Clinic Logo"
                className={styles.logoImage}
              />
              <span className={styles.brandName}>CELL CLINIC HYD</span>
            </Link>

            {/* Desktop Links */}
            <nav className={styles.navLinks}>
              <Link to="/" className={isActive("/") ? styles.linkActive : ""}>
                Home
              </Link>
              <Link
                to="/about"
                className={isActive("/about") ? styles.linkActive : ""}
              >
                About
              </Link>
              <Link
                to="/services"
                className={isActive("/services") ? styles.linkActive : ""}
              >
                Services
              </Link>
              <Link
                to="/admin"
                className={isActive("/admin") ? styles.linkActive : ""}
              >
                Admin Controls
              </Link>
              <Link
                to="/contact"
                className={isActive("/contact") ? styles.linkActive : ""}
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                onClick={() => dispatch(toggleTheme())}
                className={styles.themeToggle}
                aria-label="Toggle Theme"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* --- AUTH BUTTON SECTION --- */}
              {isAuthenticated ? (
                <div className={styles.profileWrapper} ref={profileRef}>
                  <button
                    className={styles.profileBtn}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <User size={20} />
                    <span className={styles.profileName}>
                      {user?.name || "My Account"}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`${styles.chevron} ${
                        isProfileOpen ? styles.rotate : ""
                      }`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className={styles.dropdownMenu}>
                      <Link to="/orders" className={styles.dropdownItem}>
                        <Package size={18} /> My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={styles.dropdownItem}
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className={styles.signInBtn}
                  onClick={() => dispatch(openModal({ type: "login" }))}
                >
                  <User size={20} />
                  <span>Sign in / Register</span>
                </button>
              )}

              {/* Mobile Toggle */}
              <button
                className={styles.mobileMenuBtn}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu (Moved inside mainNav relative container) --- */}
        <div
          className={`${styles.mobileMenuContainer} ${
            isMenuOpen ? styles.menuOpen : ""
          }`}
        >
          <div className={styles.mobileLinks}>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={isActive("/") ? styles.linkActive : ""}
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={handleLinkClick}
              className={isActive("/about") ? styles.linkActive : ""}
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={handleLinkClick}
              className={isActive("/services") ? styles.linkActive : ""}
            >
              Services
            </Link>
            <Link
              to="/admin"
              onClick={handleLinkClick}
              className={isActive("admin") ? styles.linkActive : ""}
            >
              Admin Controls
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={isActive("/contact") ? styles.linkActive : ""}
            >
              Contact
            </Link>

            <div className={styles.mobileBtnWrapper}>
              <Link
                to="/contact"
                className={styles.contactBtnMobile}
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
