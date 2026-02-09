import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import RebatesInfo from "@/components/sections/RebatesInfo";
import ServiceArea from "@/components/sections/ServiceArea";
import CTABanner from "@/components/sections/CTABanner";
import {
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive home energy services: energy audits, weatherization, insulation, and Georgia Home Energy Rebate assistance.",
};

const services = [
  {
    id: "energy-audits",
    icon: <MagnifyingGlassIcon className="h-8 w-8" />,
    title: "Home Energy Audits",
    description:
      "Our comprehensive energy assessments use state-of-the-art thermal imaging cameras and blower door tests to identify exactly where your home is losing energy. We examine insulation levels, air leakage points, duct systems, and more to create a complete picture of your home's energy performance.",
    features: [
      "Thermal imaging analysis",
      "Blower door pressure testing",
      "Duct leakage assessment",
      "Detailed energy report with recommendations",
    ],
  },
  {
    id: "weatherization",
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    title: "Weatherization",
    description:
      "Weatherization is one of the most cost-effective ways to improve your home's comfort and energy efficiency. Our team seals air leaks, repairs ductwork, and installs moisture barriers to protect your home from Georgia's humid climate.",
    features: [
      "Air sealing and caulking",
      "Duct sealing and repair",
      "Moisture barrier installation",
      "Ventilation optimization",
    ],
  },
  {
    id: "insulation",
    icon: <HomeIcon className="h-8 w-8" />,
    title: "Insulation",
    description:
      "Proper insulation is essential for keeping your home comfortable year-round. We upgrade insulation in attics, walls, and crawlspaces using high-quality materials that meet or exceed current building standards.",
    features: [
      "Attic insulation upgrades",
      "Wall insulation installation",
      "Crawlspace insulation",
      "Insulation removal when needed",
    ],
  },
  {
    id: "rebates",
    icon: <CurrencyDollarIcon className="h-8 w-8" />,
    title: "Georgia Home Energy Rebates",
    description:
      "We're an authorized contractor for Georgia's Home Energy Rebates program, which means qualifying homeowners can receive all of these services completely free. We handle the entire rebate process from application to final approval.",
    features: [
      "Eligibility verification",
      "Application assistance",
      "Complete paperwork handling",
      "Post-upgrade inspection coordination",
    ],
  },
];

const processSteps = [
  {
    icon: <ClipboardDocumentCheckIcon className="h-6 w-6" />,
    step: "1",
    title: "Schedule Your Audit",
    description: "Contact us to schedule a free home energy audit. We'll find a time that works for you.",
  },
  {
    icon: <ChartBarIcon className="h-6 w-6" />,
    step: "2",
    title: "Get Your Report",
    description: "Our certified team assesses your home and provides a detailed energy performance report.",
  },
  {
    icon: <WrenchScrewdriverIcon className="h-6 w-6" />,
    step: "3",
    title: "Choose Your Upgrades",
    description: "Based on the report, we recommend the most impactful improvements for your home.",
  },
  {
    icon: <SunIcon className="h-6 w-6" />,
    step: "4",
    title: "Enjoy the Savings",
    description: "Sit back and enjoy a more comfortable home with lower energy bills — all at no cost to you.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Comprehensive home energy solutions — from assessment to improvement."
        height="short"
      />

      {/* Detailed Service Cards */}
      <section className="py-24">
        <Container>
          <SectionHeading
            title="What We Offer"
            subtitle="Every service designed to make your home more comfortable and efficient."
          />

          <div className="mt-16 space-y-16">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={0.1}>
                <div
                  id={service.id}
                  className="grid gap-8 lg:grid-cols-2 items-center scroll-mt-24"
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cream text-orange">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-charcoal">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {service.description}
                    </p>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-2xl bg-gray-100 p-8">
                      <h4 className="font-semibold text-charcoal mb-4">
                        What&apos;s Included:
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-gray-600"
                          >
                            <div className="h-2 w-2 rounded-full bg-orange shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Timeline */}
      <section className="bg-gray-100 py-24">
        <Container>
          <SectionHeading
            title="How It Works"
            subtitle="Four simple steps to a more energy-efficient home."
          />

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.15}>
                <div className="relative text-center">
                  {/* Connector line */}
                  {i < processSteps.length - 1 && (
                    <div className="absolute top-8 left-[60%] hidden h-0.5 w-[80%] bg-orange/20 lg:block" />
                  )}
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-sunset text-white">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <RebatesInfo />
      <ServiceArea />
      <CTABanner />
    </>
  );
}
