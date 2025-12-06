import React from "react";
import styles from "./BestInClassSection.module.css";

const BestInClassSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.mainHeading}>
            BEST-IN-CLASS PHONE REPAIR SERVICE ONLINE - CERTIFIED EXPERTS
          </h2>
          <p className={styles.subHeading}>
            Phone, tablet, Macbook, smartwatch repair at your home or work
          </p>
          <div className={styles.redLine}></div>
        </div>

        <div className={styles.content}>
          <p>
            In an era where mobile devices are lifelines, Mobile Repair Online
            stands as your reliable ally for swift solutions. Acknowledging the
            paramount role of seamlessly functioning devices in the Digital Age,
            our dedicated team ensures that your gadgets are restored to their
            optimal state. Enjoy the convenience of hassle-free repairs from the
            comfort of your home—just book our services online, and we'll handle
            the rest. With a commitment to proficiency and customer
            satisfaction, count on us to address any issue, providing a
            trustworthy solution to keep you seamlessly connected.
          </p>

          <h3>Multi-Device Expertise - Macbook, Tablets, smartwatch & More</h3>
          <p>
            Our expertise extends beyond mobiles to include Macbooks, tablets,
            smartwatches, and more. Whether you need a quick fix or thorough
            repair, our skilled technicians are ready. Discuss with us online or
            book a repair, and let our friendly experts bring your devices back
            to life.
          </p>

          <h3>Whatever the issue, Count on Us to Fix It!</h3>
          <p>
            Fix your gadgets from home by booking our online service. We're
            equipped with extensive cross-device expertise, addressing issues
            like sluggish performance, quick battery drain, overheating, smashed
            screens, missing home buttons, malfunctioning devices, water damage,
            touch screen problems, stuck volume buttons, audio output issues,
            speaker damage, and loose charging ports. Trust us to resolve these
            common problems and keep your devices running smoothly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BestInClassSection;
