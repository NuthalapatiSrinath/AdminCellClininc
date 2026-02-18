import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Removed toggleTheme import
import { openModal } from "../../redux/slices/modalSlice";
import { logout } from "../../redux/slices/authSlice";
import { Search } from "lucide-react"; // Added Search icon
import {
  MapPin,
  PhoneCall,
  CalendarDays,
  Menu,
  X,
  User,
  LogOut,
  Package,
  ChevronDown,
} from "lucide-react"; // Removed Sun, Moon, Mail; Added PhoneCall
import styles from "./TopBar.module.css";
import { catalogService } from "../../services/catalogService";
import { getImageUrl } from "../../utils/imageHelper";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Removed theme state selector

  // Get Auth State
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);

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

  // Handle Search using backend API
  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        setShowSearchDropdown(false);
        return;
      }

      try {
        const response = await catalogService.search(searchQuery);
        if (response && response.success) {
          setSearchResults(response.data);
          setShowSearchDropdown(response.data.length > 0);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Handle click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
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

  // --- SEARCH HANDLERS ---
  const handleSearchResultClick = (result) => {
    // Fill the search bar with the complete name
    setSearchQuery(result.fullName || result.name);

    if (result.type === "brand") {
      navigate(`/repair-brand/${result.name.toLowerCase()}`);
    } else {
      // For specific device models, navigate to the model repair page
      // We pass the full object in state as ModelRepairPage expects it
      navigate(`/repair/model/${result.id}`, { state: { model: result } });
    }
    setShowSearchDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* --- Top Strip --- */}
      <div className={styles.topStrip}>
        <div className={styles.container}>
          <div className={styles.stripContent}>
            <div className={styles.locationPill}>
              <MapPin size={14} className={styles.icon} />
              <span>Hyderabad</span>
            </div>

            <div className={styles.rightStripGroup}>
              <div className={styles.emailGroup}>
                <a href="tel:+919346532339" className={styles.contactLink}>
                  <PhoneCall size={14} />
                  <span>+91 93465 32339</span>
                </a>
              </div>

              {/* UPDATED: Now opens Modal instead of navigating */}
              <button
                className={styles.bookNowBtnSmall}
                onClick={() => {
                  // Scroll to brands section (images section)
                  const brandsSection = document.getElementById('brands-section');
                  if (brandsSection) {
                    brandsSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    // Fallback to opening modal if brands section not found
                    dispatch(openModal({ type: "QUICK_BOOKING" }));
                  }
                }}
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

              {/* Search Bar */}
              <div className={`${styles.searchContainer} ${styles.hideOnMobile}`} ref={searchRef}>
                <div className={styles.searchInputWrapper}>
                  <Search size={18} className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search devices..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setShowSearchDropdown(true)}
                    className={styles.searchInput}
                  />
                </div>

                {/* Search Dropdown */}
                {showSearchDropdown && searchResults.length > 0 && (
                  <div className={styles.searchDropdown}>
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className={styles.searchResultItem}
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <img
                          src={getImageUrl(result.image)}
                          alt={result.name}
                          className={styles.searchResultImage}
                          onError={(e) => (e.target.src = "/logo.webp")}
                        />
                        <div className={styles.searchResultInfo}>
                          <div className={styles.searchResultName}>
                            {result.fullName || result.name}
                          </div>
                          <div className={styles.searchResultType}>
                            {result.type === "brand"
                              ? "Brand"
                              : result.brandName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Actions */}
            <div className={styles.actions}>
              {/* REMOVED THEME TOGGLE BUTTON HERE */}

              {/* Mobile Search Toggle */}
              <button
                className={styles.mobileSearchToggle}
                onClick={() => setIsMobileSearchVisible(!isMobileSearchVisible)}
                aria-label="Toggle Search"
              >
                {isMobileSearchVisible ? <X size={20} /> : <Search size={22} />}
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

        {/* Expanded Mobile Search Row */}
        {isMobileSearchVisible && (
          <div className={styles.mobileSearchRow} ref={searchRef}>
            <div className={styles.mobileSearchHeaderInput}>
              <input
                type="text"
                placeholder="Search for your device..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.mobileSearchHeaderText}
                autoFocus
              />
              <button className={styles.mobileSearchActionBtn}>
                <Search size={20} color="white" />
              </button>
            </div>

            {/* Mobile Dropdown Results */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className={styles.searchDropdownMobile}>
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className={styles.searchResultItem}
                    onClick={() => {
                      handleSearchResultClick(result);
                      setIsMobileSearchVisible(false);
                    }}
                  >
                    <img
                      src={getImageUrl(result.image)}
                      alt={result.name}
                      className={styles.searchResultImage}
                      onError={(e) => (e.target.src = "/logo.webp")}
                    />
                    <div className={styles.searchResultInfo}>
                      <div className={styles.searchResultName}>{result.fullName || result.name}</div>
                      <div className={styles.searchResultType}>
                        {result.type === "brand" ? "Brand" : result.brandName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- Mobile Menu --- */}
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
