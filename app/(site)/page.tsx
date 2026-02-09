import Hero from "@/components/sections/Hero";
import GradientDivider from "@/components/ui/GradientDivider";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AboutPreview from "@/components/sections/AboutPreview";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";
import Button from "@/components/ui/Button";
import { PhoneIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <>
      <Hero
        title="Free Home Energy Upgrades for Georgia Homeowners"
        subtitle="Funded by the Georgia Home Energy Rebates program — check if you qualify today."
        height="full"
      >
        <Button href="/contact" variant="primary" size="lg">
          Check Your Eligibility
        </Button>
        <Button href="tel:+14044466668" variant="outline" size="lg">
          <PhoneIcon className="mr-2 h-5 w-5" />
          Call Us Today
        </Button>
      </Hero>

      <GradientDivider />
      <ServicesOverview />
      <WhyChooseUs />
      <AboutPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}
