import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import HowItWorks from "@/components/public/HowItWorks";
import PlatformOrder from "@/components/public/PlatformOrder";
import Capabilities from "@/components/public/Capabilities";
import FutureProducts from "@/components/public/FutureProducts";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";
import ScrollTop from "@/components/public/ScrollTop";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <PlatformOrder />
        <Capabilities />
        <FutureProducts />
        <ContactSection />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
