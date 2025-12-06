import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./TermsPage.module.css";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Terms & Conditions</h1>
          <p className={styles.breadcrumbs}>Home &gt; Terms & Conditions</p>
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section className={styles.section} variants={sectionVariants}>
            <p>
              You agree to these Terms & Conditions (specified below) by using
              the website: www.cellclinichyderabad.com. Please read them
              thoroughly.
            </p>
            <p>
              "Cell Clinic Hyderabad" is the owner and operator of the website
              www.cellclinichyderabad.com. The mobile touch versions, App on
              Google Play and Apple App Store, and/or any site(s) we have now or
              in the future that reference these Terms & Conditions
              (collectively, "Cell Clinic Hyderabad"), provide a marketplace and
              platform for consumers and organizations to sell or service their
              used, old, and other articles, as well as conduct various business
              transactions and operations with third-party companies and other
              entities and persons (collectively, "Third Parties"). The services
              (the "Services") comprise the Cell Clinic Hyderabad marketplace,
              platform, and related functionality, whether offered through the
              Site or through other methods.
            </p>
            <p>
              If you do not agree with any aspect of these Terms & Conditions,
              you must not use the Site or Services. Your continuing use of the
              Site or Services will represent your acceptance of these Terms &
              Conditions, as they may be changed by us from time to time, with
              or without notice to you. Please revisit this page on a frequent
              basis for revisions to the Cell Clinic Hyderabad Terms &
              Conditions.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>1. Cell Clinic Hyderabad is a marketplace location.</h3>
            <p>
              Cell Clinic Hyderabad is a platform that allows users to sell or
              service certain commodities in accordance with Cell Clinic
              Hyderabad's standards. Cell Clinic Hyderabad might not be directly
              involved in the transaction between the user(s) and the third
              party professional(s), implying that Cell Clinic Hyderabad has no
              control over any aspect of your transactions with Third Parties,
              and Third Parties are solely responsible to you for every aspect
              of your transactions with them.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>2. Authorized Use and Adherence with Laws</h3>
            <p>
              Cell Clinic Hyderabad grants you permission to access, view, and
              use the Site materials and software (collectively, the "Cell
              Clinic Hyderabad Property") exclusively for the purpose of using
              the Services. Any trademarks, copyrights, or other property
              markings that have been put on the Cell Clinic Hyderabad
              Properties may not be removed. You may not retrieve data or
              additional material from the Cell Clinic Hyderabad Property in a
              structured manner. Except as expressly permitted by these Terms &
              Conditions, without the express written consent of Cell Clinic
              Hyderabad, any modification, development, redistribution,
              republication, uploading, postings, transmitting, distributing, or
              otherwise exploiting the Cell Clinic Hyderabad Property, or any
              element of the Cell Clinic Hyderabad Property, is prohibited. You
              agree to follow all applicable laws, regulations, and legislation
              relating to the Site and Services, the Cell Clinic Hyderabad
              Property, or how you make use of them, and that you are not going
              to participate in any conduct that hinders or inhibits any other
              person from accessing or benefiting from the Services.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>Copyright and trademarks</h3>
            <p>
              Except where otherwise noted, every item contained in the Site,
              which include but are not limited to, text, software, pictures,
              video, graphics, music, sound, the Cell Clinic Hyderabad Logo, and
              other trademarks and service marks, as well as all of the content
              of the Site, are the intellectual property of Cell Clinic
              Hyderabad and/or its subsidiaries or licensors, including Third
              Parties, and are thus protected by international/ Indian copyright
              and trademark laws. Any breach of these limits could end up in the
              violation of a copyright, trademark, or other kind of intellectual
              property right, which may result in civil and/or criminal
              consequences.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>
              Cell Clinic Hyderabad Services and Third Party Services and Sites
            </h3>
            <p>
              The information and resources supplied on the Site as well as
              through the Services are for general reference purposes only and
              may not cover all of the terms, conditions, and exceptions that
              apply to Cell Clinic Hyderabad's Services. Through the Cell Clinic
              Hyderabad Site and Services, Cell Clinic Hyderabad provides
              information from Third Parties, such as pricing given for your
              products, item descriptions, some Third Party terms of service,
              and other data ("Third Party Information"). Cell Clinic Hyderabad
              has no control over, and is not liable for, any Third Party
              Information. You undertake your real sales and other transactions
              with Third Parties, not with Cell Clinic Hyderabad, unless
              otherwise expressly and clearly specified.
            </p>
            <p>
              The Cell Clinic Hyderabad Site may from time to time contain links
              to websites operated by Third Parties and other organizations (the
              "Additional Sites"). These links are provided as a courtesy and
              for informative reasons only, and do not constitute referrals or
              sponsorships of the Additional Sites by Cell Clinic Hyderabad. The
              Additional Sites are managed by their individual organizations,
              which are entirely responsible for the content of their individual
              websites.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>Privacy & Passwords</h3>
            <p>
              Cell Clinic Hyderabad respects and safeguards your personal
              information. Please read the Cell Clinic Hyderabad privacy policy
              carefully as it contains essential information about your use of
              the Site and Services. Some areas of the Site are
              password-protected, requiring a user identification code ("User
              ID") and password to access. Unauthorized access to or use of such
              areas of the Site is strictly forbidden. You undertake to alert
              Cell Clinic Hyderabad promptly if you feel a third party has got
              your User ID or password.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>Membership</h3>
            <p>
              <strong>a. Registration and Basic Member Terms:</strong> Members
              are website visitors and/or Service users who choose to register
              with Cell Clinic Hyderabad ("Members"). When a Member registers,
              an account ("Account") is established for them. If you decide to
              become a Member, you certify and warrant to us that you: (i) you
              have reached the legal age to establish a binding contract; (ii)
              you will give us correct, up-to-date, and full registration and
              contact information; (iii) your registration and use of the
              Services are not unlawful under the law.
            </p>
            <p>
              <strong>b. Account and Password Security:</strong> You will create
              a password and a user id in conjunction with your Account. You are
              responsible for keeping your login information safe, as well as
              for all actions made with your password.
            </p>
            <p>
              <strong>c. Age:</strong> You must be at least eighteen (18) years
              old, or the age of majority in the province or state of residence,
              to register an Account or otherwise use this Website.
            </p>
            <p>
              <strong>Inactive Status:</strong> A Member's Account may be marked
              as inactive if there has been no activity on that Account for 180
              days.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>Warranty Exclusions and Limitations of Liability</h3>
            <p>
              We guarantee that the Services and Cell Clinic Hyderabad Property
              will be essentially as described on the Site. In the case of a
              breach of this guarantee, the client's sole and exclusive
              solution, and Cell Clinic Hyderabad's single and exclusive
              obligation, shall be (at Cell Clinic Hyderabad's choice) to
              correct the failure or to refund the money that was paid by the
              consumer for the services, whichever is greater. Except as stated
              in the above sentence, we make no representations or guarantees
              about the Services or the Cell Clinic Hyderabad Property. We
              expressly disclaim any and all warranties, whether express or
              implied, including: all warranties of merchantability, fitness for
              a particular purpose, title, non-infringement, and any and all
              warranties arising from course of dealing and usage of trade.
            </p>
            <p>
              Under no circumstances will you be able to recover from us any
              accidental, consequential, indirect, severe, or special damages
              (including damages for loss of business, loss of profits, or loss
              of use), whether based on agreement, tort (including negligence),
              or otherwise arising from or related to the services or Cell
              Clinic Hyderabad property, even if Cell Clinic Hyderabad was made
              aware of the possibility of such damages.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>Indemnity</h3>
            <p>
              Customer agrees to defend and hold Cell Clinic Hyderabad, our
              affiliates, suppliers, licensors, and partners, as well as their
              officers, directors, employees, agents, and representatives,
              harmless from any claim or demand made by any third party
              resulting from or related to (i) your access to or use of
              Services, (ii) your breach of these Terms & Conditions, or (iii)
              the infringement by you, or any third party using your account.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>Information Collection, Use, and Sharing</h3>
            <p>
              By submitting any Cell Clinic Hyderabad contact form, you agree to
              be contacted by someone from Cell Clinic Hyderabad or the partner
              you've selected. You may be contacted by Cell Clinic Hyderabad's
              third-party advertising partners through phone, email, text, or
              prerecorded message about Cell Clinic Hyderabad programmes,
              offers, events, announcements, and offers. By giving us with your
              phone number, you allow Cell Clinic Hyderabad access to contact
              you and/or distribute Cell Clinic Hyderabad-related information,
              offers, or announcements by text messages, prerecorded voice,
              and/or automatic telephone dialing systems. You can unsubscribe
              from Cell Clinic Hyderabad's email and messaging services at any
              time by sending an email to support@cellclinichyderabad.com.
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
