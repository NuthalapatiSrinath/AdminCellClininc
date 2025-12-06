import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import BrandsSection from "../../components/BrandsSection/BrandsSection";
import HowItWorksSection from "../../components/HowItWorksSection/HowItWorksSection";
import ServicesAvailable from "../../components/ServicesAvailable/ServicesAvailable";
import VideoSection from "../../components/VideoSection/VideoSection";
import WhyUsSection from "../../components/WhyUsSection/WhyUsSection";
import ClientStoriesSection from "../../components/ClientStoriesSection/ClientStoriesSection";
import SpotlightSection from "../../components/SpotlightSection/SpotlightSection"; // Import
import DoorstepRepairSection from "../../components/DoorstepRepairSection/DoorstepRepairSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <DoorstepRepairSection />
      <ServicesSection />
      <BrandsSection />
      <HowItWorksSection />
      <ServicesAvailable />
      <VideoSection />
      <WhyUsSection />
      <SpotlightSection />
      <ClientStoriesSection />

      {/* New Spotlight Section */}
    </div>
  );
};

export default HomePage;
