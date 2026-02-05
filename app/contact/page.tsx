import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ContactForm from "@/components/forms/ContactForm";
import ServiceArea from "@/components/sections/ServiceArea";
import CTABanner from "@/components/sections/CTABanner";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Horizon Energy South. Check if your home qualifies for free energy upgrades through Georgia's Home Energy Rebates program.",
};

const contactInfo = [
  {
    icon: <PhoneIcon className="h-6 w-6" />,
    title: "Phone",
    value: "(404) 446-6668",
    href: "tel:+14044466668",
  },
  {
    icon: <EnvelopeIcon className="h-6 w-6" />,
    title: "Email",
    value: "info@horizonenergysouth.com",
    href: "mailto:info@horizonenergysouth.com",
  },
  {
    icon: <MapPinIcon className="h-6 w-6" />,
    title: "Service Area",
    value: "Central Georgia (8 counties)",
    href: undefined,
  },
  {
    icon: <ClockIcon className="h-6 w-6" />,
    title: "Hours",
    value: "Monday – Friday, 9 AM – 6 PM",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get In Touch"
        subtitle="See if your home qualifies for FREE energy upgrades through Georgia's rebate program."
        height="short"
      />

      {/* Contact Grid */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <ScrollReveal direction="left">
              <ContactForm />
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">
                    Contact Information
                  </h3>
                  <p className="text-gray-600">
                    Have questions? Reach out to us directly — we&apos;re here
                    to help.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-xl bg-gray-100 p-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cream text-orange">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {item.title}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-lg font-semibold text-charcoal hover:text-orange transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-charcoal">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Extra info card */}
                <div className="rounded-2xl gradient-sunset p-8 text-white">
                  <h4 className="text-xl font-bold mb-3">
                    All Services Are FREE
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    Through Georgia&apos;s Home Energy Rebates program, qualifying
                    homeowners receive comprehensive energy upgrades at absolutely
                    no cost. From the initial audit to the final improvements —
                    it&apos;s all covered.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <ServiceArea />

      <CTABanner
        title="Prefer to Talk? Call Us"
        subtitle="Our team is ready to answer your questions and help you get started. All services are FREE through the rebate program."
      />
    </>
  );
}
