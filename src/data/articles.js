// --- Placeholder Images (Using Pexels for high-quality tech/repair visuals) ---
const images = {
  s23: "https://images.pexels.com/photos/14666017/pexels-photo-14666017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  future:
    "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  trust:
    "https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  diy_risk:
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  water:
    "https://images.pexels.com/photos/1103242/pexels-photo-1103242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  cost: "https://images.pexels.com/photos/5053738/pexels-photo-5053738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  heat: "https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  discolor:
    "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  iphone:
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  festive:
    "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  common:
    "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

export const articles = [
  // --- Article 1: S23 Ultra Display Issues ---
  {
    id: "s23-ultra-display-issues",
    title:
      "Software Glitches or Damaged Screen? How to Diagnose S23 Ultra Display Issues",
    excerpt:
      "Green lines? Flickering? Before you replace your screen, learn how to distinguish between a software bug and permanent hardware damage on your Samsung S23 Ultra.",
    image: images.s23,
    category: "Diagnosis",
    date: "12 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "The Samsung Galaxy S23 Ultra is a masterpiece of display technology, but like any flagship, it isn't immune to issues. When your screen starts acting up—whether it's a faint green tint, a persistent flicker, or the dreaded vertical line—panic is the natural reaction. But before you rush for an expensive screen replacement, it's crucial to diagnose the root cause. Is it a fleeting software glitch caused by a recent update, or is the panel itself physically damaged? Let’s break it down.",
      },
      {
        type: "heading",
        text: "1. Signs of a Software-Related Display Issue",
      },
      {
        type: "subheading",
        text: 'The "Green Tint" at Low Brightness',
      },
      {
        type: "paragraph",
        text: "Many users report a greenish haze over dark grays when brightness is set below 30%. This is often a calibration error in the software handling the AMOLED refresh rate. If the tint disappears when you increase brightness or switch between 60Hz and 120Hz modes, it is almost certainly a software bug.",
      },
      {
        type: "subheading",
        text: "Flickering That Stops in Safe Mode",
      },
      {
        type: "paragraph",
        text: "Third-party apps can sometimes conflict with Samsung's One UI display drivers. Boot your phone into Safe Mode (hold Power off icon on screen > tap Safe Mode). If the flickering stops, an app you installed is the culprit. Uninstall recently added apps one by one.",
      },
      {
        type: "heading",
        text: "2. Signs of Permanent Hardware Damage",
      },
      {
        type: "subheading",
        text: "The Persistent Green or Pink Line",
      },
      {
        type: "paragraph",
        text: "This is the most feared issue. A thin, vertical line (usually green or pink) that appears on the screen and never goes away—even during the boot logo or in recovery mode—indicates physical damage to the OLED connector ribbon or the panel itself. No software update can fix this; the display must be replaced.",
      },
      {
        type: "subheading",
        text: "Touch Dead Zones",
      },
      {
        type: "paragraph",
        text: "If specific areas of your screen fail to register touch inputs (you can test this by dialing *#0*# and selecting 'Touch'), the digitizer layer is damaged. This often happens after a drop, even if the glass isn't cracked.",
      },
      {
        type: "heading",
        text: "3. Next Steps: Repair or Reset?",
      },
      {
        type: "paragraph",
        text: "If your diagnosis points to software, try a Factory Reset after backing up your data. If it points to hardware, don't delay. A damaged OLED panel can sometimes spread or cause the entire screen to black out unexpectedly. Contact a professional repair service like Ongofix for a certified screen replacement.",
      },
    ],
  },

  // --- Article 2: Doorstep Repair Future ---
  {
    id: "doorstep-repair-future",
    title: "On-Demand Doorstep Mobile Repair: Is It the Future?",
    excerpt:
      "Gone are the days of leaving your phone at a shop for days. Discover why doorstep mobile repair is revolutionizing the industry with speed, transparency, and convenience.",
    image: images.future,
    category: "Trends",
    date: "15 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "In a world where we get groceries, food, and even medical checkups delivered to our door, why should mobile repair be any different? The traditional model of visiting a repair shop, submitting your device, and waiting days for a fix is rapidly becoming obsolete. Doorstep mobile repair is not just a luxury; it's becoming the standard for busy professionals and privacy-conscious users alike.",
      },
      {
        type: "heading",
        text: "1. The Privacy Advantage",
      },
      {
        type: "paragraph",
        text: "One of the biggest anxieties people have about handing over their phone is data privacy. Photos, messages, banking apps—our lives are on these devices. With doorstep repair, the technician fixes the phone right in front of you. Your device never leaves your sight, ensuring 100% data security and peace of mind.",
      },
      {
        type: "heading",
        text: "2. Unmatched Convenience and Speed",
      },
      {
        type: "paragraph",
        text: "Time is money. Driving to a service center, finding parking, and waiting in queues can take hours. Doorstep services like Ongofix bring the workshop to you. Most repairs, such as screen or battery replacements, are completed in under 60 minutes. You can continue working or relaxing at home while your phone gets a new lease on life.",
      },
      {
        type: "heading",
        text: "3. Transparency in Pricing and Parts",
      },
      {
        type: "paragraph",
        text: "Local shops often operate with opaque pricing. You never quite know if you're being overcharged or if the part being used is genuine. Organized doorstep repair platforms offer standardized pricing listed on their website. You know exactly what you are paying for before the technician even arrives.",
      },
      {
        type: "paragraph",
        text: "As technology integrates deeper into our lives, the service industry must adapt. Doorstep repair is efficient, secure, and transparent—making it undoubtedly the future of mobile maintenance.",
      },
    ],
  },

  // --- Article 3: Ongofix vs Local ---
  {
    id: "ongofix-vs-local",
    title:
      "Ongofix Mobile Repair VS Local Mobile Repair Technician: Who Should You Trust?",
    excerpt:
      "Local shops are cheap, but are they safe? We compare the risks and benefits of choosing a professional service over your neighborhood technician.",
    image: images.trust,
    category: "Comparison",
    date: "18 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "When your phone screen shatters, the temptation to visit the nearest local repair shop is strong. They are often cheaper and nearby. However, smartphones today are complex machines. A botched repair can lead to FaceID failure, battery drainage, or even permanent motherboard damage. Here is a candid comparison between professional services like Ongofix and local technicians.",
      },
      {
        type: "heading",
        text: "Quality of Spare Parts",
      },
      {
        type: "subheading",
        text: "Local Technician",
      },
      {
        type: "paragraph",
        text: "Often uses 'first copy' or refurbished parts to keep costs low. These screens may look fine initially but often suffer from poor touch sensitivity, low brightness, or yellowing over time.",
      },
      {
        type: "subheading",
        text: "Ongofix Professional Service",
      },
      {
        type: "paragraph",
        text: "We use high-quality, OEM-grade parts that match the original specifications of your device. This ensures your display colors remain vibrant and your touch response stays snappy.",
      },
      {
        type: "heading",
        text: "Warranty and Accountability",
      },
      {
        type: "paragraph",
        text: "Local repairs rarely come with a written warranty. If the screen malfunctions the next day, you are often out of luck. Professional services provide a structured warranty (often up to 90 days or 6 months). If something goes wrong, the company takes responsibility and fixes it for free.",
      },
      {
        type: "heading",
        text: "Technician Expertise",
      },
      {
        type: "paragraph",
        text: "Modern phones use strong adhesives and delicate ribbon cables. A local technician who learns on the job might accidentally slice a cable or damage the waterproofing. Ongofix technicians are certified and trained specifically for various models, ensuring surgical precision during repairs.",
      },
    ],
  },

  // --- Article 4: DIY Risks ---
  {
    id: "diy-vs-professional",
    title: "DIY Mobile Repairs: Empowering Users or Risky Business?",
    excerpt:
      "YouTube tutorials make it look easy, but DIY phone repair is filled with hidden dangers. Find out why fixing it yourself might cost you more in the long run.",
    image: images.diy_risk,
    category: "Guides",
    date: "20 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "The 'Right to Repair' movement has gained momentum, and online marketplaces are flooded with DIY repair kits. It seems tempting: buy a $30 kit and fix your $1000 phone yourself. But is it really that simple? While swapping a battery on an old Nokia was easy, modern smartphones are glass sandwiches glued together with industrial adhesives.",
      },
      {
        type: "heading",
        text: "1. The Risk of Battery Puncture",
      },
      {
        type: "paragraph",
        text: "Lithium-ion batteries are volatile. During DIY repairs, prying out a glued-in battery requires force. One slip of the screwdriver can puncture the battery casing, leading to a thermal runaway event—essentially, a fire. Professionals use specialized heat plates and solvent solutions to remove batteries safely.",
      },
      {
        type: "heading",
        text: "2. Broken Biometrics",
      },
      {
        type: "paragraph",
        text: "On iPhones and many Androids, the fingerprint sensor and FaceID modules are paired to the motherboard. If you damage these cables or replace them with non-verified parts, you will permanently lose biometric security. Professional repairers know how to transfer these delicate components to the new screen to retain functionality.",
      },
      {
        type: "heading",
        text: "3. Lost Water Resistance",
      },
      {
        type: "paragraph",
        text: "Once you open a sealed smartphone, its IP68 water resistance is gone. Restoring it requires precise re-sealing with specific pre-cut adhesives, which are rarely included in cheap DIY kits or applied correctly by amateurs.",
      },
      {
        type: "paragraph",
        text: "Unless you are a hobbyist willing to risk your device, professional repair is the safer, smarter financial choice.",
      },
    ],
  },

  // --- Article 5: Water Damage Signs ---
  {
    id: "water-damage-signs",
    title: "7 Common Signs of Mobile Display Water Damage",
    excerpt:
      "Did your phone take a swim? Even if it looks fine on the outside, internal corrosion can kill your display. Here are the silent signs of water damage.",
    image: images.water,
    category: "Diagnosis",
    date: "22 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "Water is the arch-nemesis of electronics. Even a small splash can seep into the display layers and cause havoc. Often, the damage isn't immediate; corrosion builds up over days. If your phone has been exposed to moisture, watch out for these 7 signs.",
      },
      {
        type: "heading",
        text: "1. The 'Water Stain' Effect",
      },
      {
        type: "paragraph",
        text: "This looks like a bright or dark patch on the screen that won't go away. It’s caused by water getting between the backlight and the LCD layers, permanently unevening the light distribution.",
      },
      {
        type: "heading",
        text: "2. Foggy Camera Lenses",
      },
      {
        type: "paragraph",
        text: "Check your front and back cameras. If there is condensation or fog inside the glass, moisture has definitely breached the internal seal of the phone.",
      },
      {
        type: "heading",
        text: "3. Ghost Touches",
      },
      {
        type: "paragraph",
        text: "Does your phone open apps on its own or scroll without you touching it? Water droplets can short-circuit the digitizer layer, causing it to register false touches.",
      },
      {
        type: "heading",
        text: "4. Unresponsive Touch Areas",
      },
      {
        type: "paragraph",
        text: "Conversely, water corrosion on the ribbon cable contacts can cause dead zones where the screen refuses to respond to any input.",
      },
      {
        type: "heading",
        text: "What to Do?",
      },
      {
        type: "paragraph",
        text: "Do NOT put it in rice (that is a myth and introduces dust). Turn the phone off immediately and take it to a professional for an ultrasonic cleaning and internal drying process.",
      },
    ],
  },

  // --- Article 6: Cost Analysis ---
  {
    id: "screen-replacement-guide",
    title:
      "DIY Screen Repair vs. Professional Replacement: Which Option Saves You More?",
    excerpt:
      "We break down the math. Does buying a repair kit actually save money, or do hidden costs and risks make professional repair the cheaper option?",
    image: images.cost,
    category: "Cost",
    date: "25 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "The sticker price of a DIY screen kit online is often 30-40% lower than a professional repair quote. It seems like a no-brainer deal. But let's look at the hidden economics of mobile repair.",
      },
      {
        type: "heading",
        text: "The Hidden Costs of DIY",
      },
      {
        type: "subheading",
        text: "Tools You Don't Have",
      },
      {
        type: "paragraph",
        text: "Most basic kits come with flimsy screwdrivers. To do the job right, you need a heat gun (to melt adhesive), suction cups, plastic pry tools, and specialized adhesive. Buying these adds $20-$50 to your cost.",
      },
      {
        type: "subheading",
        text: "The 'Whoops' Factor",
      },
      {
        type: "paragraph",
        text: "There is a 20% chance an amateur will break another component—usually the back glass or the face ID cable—during the repair. Replacing that additional broken part will instantly make the DIY route more expensive than professional service.",
      },
      {
        type: "heading",
        text: "The Value of Your Time",
      },
      {
        type: "paragraph",
        text: "A professional fixes a screen in 30 minutes. A first-time DIYer will take 2 to 3 hours watching tutorials, pausing, and struggling with tiny screws. What is your time worth?",
      },
      {
        type: "paragraph",
        text: "When you factor in tools, risk, and time, professional repair services like Ongofix often provide better value for money, along with the safety net of a warranty.",
      },
    ],
  },

  // --- Article 7: Heating Issues ---
  {
    id: "mobile-heating-issues",
    title:
      "Beat the Heat: How to Prevent and Fix Mobile Heating Issues Efficiently",
    excerpt:
      "Is your phone burning a hole in your pocket? Overheating kills performance and battery life. Learn simple tricks to keep your device cool.",
    image: images.heat,
    category: "Tips",
    date: "28 Oct 2023",
    content: [
      {
        type: "paragraph",
        text: "Smartphones are powerful pocket computers, but unlike laptops, they don't have fans. They rely on passive cooling. When your phone gets hot, it throttles performance (slows down) to protect the chip. Chronic overheating can swell your battery and separate your screen from the frame.",
      },
      {
        type: "heading",
        text: "Common Causes of Overheating",
      },
      {
        type: "paragraph",
        text: "1. **Background Processes:** Rogue apps engaging the GPS or CPU in the background.\n2. **Direct Sunlight:** Using your phone in high brightness under direct sun acts like a greenhouse.\n3. **Faulty Charging:** Using a cheap, non-certified charger can feed unstable voltage, heating up the battery management system.",
      },
      {
        type: "heading",
        text: "How to Fix It",
      },
      {
        type: "subheading",
        text: "Check Battery Usage",
      },
      {
        type: "paragraph",
        text: "Go to Settings > Battery. If an app you barely use is consuming 20% of battery, uninstall it immediately.",
      },
      {
        type: "subheading",
        text: "Remove the Case while Charging",
      },
      {
        type: "paragraph",
        text: "Thick rubber or leather cases trap heat. If you are fast charging, take the case off to let the heat dissipate.",
      },
      {
        type: "subheading",
        text: "Hardware Check",
      },
      {
        type: "paragraph",
        text: "If the phone heats up instantly upon booting or stays hot in standby, it might be a motherboard short circuit. This requires professional diagnostic tools to identify the faulty capacitor or IC.",
      },
    ],
  },

  // --- Article 8: Display Discoloration ---
  {
    id: "display-discoloration",
    title:
      "Fixing Display Discoloration on Samsung Phones After Updates: Causes and Solutions",
    excerpt:
      "Samsung screens are beautiful, but they are prone to yellow tints and discoloration. Find out if it's a setting you can toggle or a screen you need to replace.",
    image: images.discolor,
    category: "Repair",
    date: "01 Nov 2023",
    content: [
      {
        type: "paragraph",
        text: "Samsung AMOLED panels are vibrant, but users often face discoloration issues like yellowing, burn-in (ghost images), or pink tints. These issues can ruin the viewing experience.",
      },
      {
        type: "heading",
        text: "Software Fixes First",
      },
      {
        type: "paragraph",
        text: "Often, the 'Eye Comfort Shield' or 'Blue Light Filter' is turned on accidentally, turning the screen yellow. Check your Quick Settings panel. Also, check 'Visibility Enhancements' in settings to ensure no color correction filters are active.",
      },
      {
        type: "heading",
        text: "The Burn-In Reality",
      },
      {
        type: "paragraph",
        text: "If you can see faint icons of the status bar or keyboard even when watching a full-screen video, that is 'Burn-In'. This is permanent degradation of the organic pixels in OLED screens. It cannot be fixed by software. The only solution is a screen replacement.",
      },
      {
        type: "heading",
        text: "The Purple Bleed",
      },
      {
        type: "paragraph",
        text: "If you see purple or ink-like spots spreading on your screen, this is due to internal pressure or a crack in the OLED layer (even if outer glass is fine). This is an emergency; the 'ink' will spread until the whole screen goes black. Backup your data immediately and book a repair.",
      },
    ],
  },

  // --- Article 9: iPhone Green Tint ---
  {
    id: "iphone-green-tint",
    title:
      "iPhone Display Issues: How to Fix Green, White, and Yellow Tint After an iOS Update?",
    excerpt:
      "iOS updates sometimes mess with display calibration. Here is how to reset your iPhone display settings before booking a repair.",
    image: images.iphone,
    category: "Apple",
    date: "03 Nov 2023",
    content: [
      {
        type: "paragraph",
        text: "Apple's True Tone technology adjusts display color based on ambient light. However, bugs in iOS updates can sometimes send this calibration haywire, resulting in a sickly green or yellow tint on your iPhone screen.",
      },
      {
        type: "heading",
        text: "Step 1: Disable True Tone and Night Shift",
      },
      {
        type: "paragraph",
        text: "Go to Settings > Display & Brightness. Turn off True Tone and Night Shift. If the color returns to normal, it's just a sensor calibration quirk.",
      },
      {
        type: "heading",
        text: "Step 2: Adjust Color Filters",
      },
      {
        type: "paragraph",
        text: "Go to Accessibility > Display & Text Size > Color Filters. Sometimes, toggling this on and off resets the color profile.",
      },
      {
        type: "heading",
        text: "Step 3: The Hardware Failure (White Screen of Death)",
      },
      {
        type: "paragraph",
        text: "On models like the iPhone 13 Pro series, a complete white or green screen usually indicates a failure in the flex cable connection. This is a known hardware fault that requires microsoldering or a screen replacement to fix. If a hard reset (Volume Up, Volume Down, Hold Power) doesn't fix it, it's time to call the experts.",
      },
    ],
  },

  // --- Article 10: Festive Offer (News) ---
  {
    id: "festive-offers",
    title: "Ongofix Announces Festive Offer: 30% Off on Mobile Repair Services",
    excerpt:
      "Celebrate this festive season with a fully functional phone. Grab our limited-time discounts on screen and battery repairs.",
    image: images.festive,
    category: "News",
    date: "05 Nov 2023",
    content: [
      {
        type: "paragraph",
        text: "The festive season is about connection—calling family, taking photos, and sending greetings. Don't let a cracked screen or a dying battery interrupt your celebrations. Ongofix is proud to announce our biggest sale of the year!",
      },
      {
        type: "heading",
        text: "The Offer Details",
      },
      {
        type: "paragraph",
        text: "**Flat 30% OFF** on service charges for all screen replacements and battery replacements booked between October 20th and November 15th. Use code **FESTIVE30** at checkout.",
      },
      {
        type: "heading",
        text: "Why Repair Now?",
      },
      {
        type: "paragraph",
        text: "Prices of spare parts tend to fluctuate. Locking in your repair now guarantees you the current rate plus our discount. Additionally, our technicians are working extended hours to ensure your device is fixed before the big days of celebration.",
      },
      {
        type: "heading",
        text: "How to Avail",
      },
      {
        type: "paragraph",
        text: "1. Visit our website.\n2. Select your phone model and issue.\n3. Choose a time slot for doorstep repair.\n4. Apply the coupon code. It’s that simple!",
      },
    ],
  },

  // --- Article 11: Common Issues ---
  {
    id: "common-issues",
    title:
      "Mobile Woes Begone: Effective Solutions for Common Smartphone Issues",
    excerpt:
      "Bluetooth won't pair? Charging is slow? Before you panic, try these simple home fixes for the most annoying daily smartphone problems.",
    image: images.common,
    category: "Guides",
    date: "08 Nov 2023",
    content: [
      {
        type: "paragraph",
        text: "Not every phone problem requires a screwdriver. Many daily annoyances are caused by software glitches or simple debris buildup. Here are quick fixes for the top 3 most common complaints we hear.",
      },
      {
        type: "heading",
        text: "1. Phone Charging Slowly or Not at All",
      },
      {
        type: "paragraph",
        text: "**The Fix:** Check your charging port. It's a magnet for pocket lint. Turn off your phone and use a wooden toothpick to gently dig out the lint packed at the bottom of the port. You'll be amazed at how much comes out, and your cable will click in firmly again.",
      },
      {
        type: "heading",
        text: "2. Bluetooth Devices Won't Connect",
      },
      {
        type: "paragraph",
        text: "**The Fix:** Reset Network Settings. Go to Settings > System > Reset Options > Reset Wi-Fi, mobile & Bluetooth. This clears out old corrupted connection caches without deleting your personal data.",
      },
      {
        type: "heading",
        text: "3. Earpiece Volume is Low",
      },
      {
        type: "paragraph",
        text: "**The Fix:** The earpiece mesh gets clogged with face oils and dust. Use a soft toothbrush and a tiny amount of rubbing alcohol to gently scrub the mesh. This often restores full volume instantly.",
      },
    ],
  },
];
