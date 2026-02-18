import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* --- Column 1: Brand Info --- */}
          <div className={styles.brandColumn}>
            <div className={styles.logoRow}>
              <img
                src="/logo.webp"
                alt="Cell Clinic Logo"
                className={styles.logoImage}
              />
              <h2 className={styles.brandName}>CELL CLINIC HYD</h2>
            </div>
            <p className={styles.tagline}>
              Professional device repair services at your doorstep. Quality
              repairs with genuine parts and warranty.
            </p>
            <div className={styles.socialRow}>
              <a href="#s" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#s" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* --- Column 2: Quick Links (Main Nav) --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Quick Links</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 3: Help & Support (Policies) --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Help & Support</h3>
            <ul className={styles.list}>
              {/* <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li> */}
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/warranty">Warranty Policy</Link>
              </li>
              <li>
                <Link to="/partner">Partner With Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 4: Services --- */}
          <div className={styles.linkColumn}>
            <h3 className={styles.heading}>Our Services</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/repair-brand/apple">iPhone Repair</Link>
              </li>
              <li>
                <Link to="/repair-brand/macbook">MacBook Repair</Link>
              </li>
              <li>
                <Link to="/repair-brand/ipad">iPad Repair</Link>
              </li>
              <li>
                <Link to="/repair/mobile">Android Repair</Link>
              </li>
              <li>
                <Link to="/repair-brand/smartwatch">Watch Repair</Link>
              </li>
            </ul>
          </div>

          {/* --- Column 5: Contact Us --- */}
          <div className={styles.contactColumn}>
            <h3 className={styles.heading}>Contact Us</h3>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={20} />
              <span>
                Plot No 5 to 8, Sector 5, Haripuri Colony, Madhapur, Hyderabad,
                Telangana 500081
              </span>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.icon} size={20} />
              <a href="tel:+919346532339">+91 93465 32339</a>
            </div>
            <div className={styles.contactItem}>
              <Mail className={styles.icon} size={20} />
              <a href="mailto:info@cellclinichyd.com">info@cellclinichyd.com</a>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            © 2024 Cell Clinic Hyd. All rights reserved. Designed & Developed By
            Panacea IT Services – +91 8686818384
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
