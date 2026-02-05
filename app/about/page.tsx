import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CTABanner from "@/components/sections/CTABanner";
import {
  HeartIcon,
  SparklesIcon,
  GlobeAmericasIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Horizon Energy South — our mission, values, certifications, and commitment to making Georgia homes more sustainable.",
};

const values = [
  {
    icon: <HeartIcon className="h-8 w-8" />,
    title: "Community",
    description:
      "We're rooted in the communities we serve. From MLK Service Projects to everyday home improvements, we believe in lifting our neighbors up.",
  },
  {
    icon: <SparklesIcon className="h-8 w-8" />,
    title: "Quality",
    description:
      "Every project meets rigorous BPI and RESNET standards. We don't cut corners — your home deserves the best materials and workmanship.",
  },
  {
    icon: <GlobeAmericasIcon className="h-8 w-8" />,
    title: "Sustainability",
    description:
      "Energy efficiency is environmental action. Every home we improve reduces carbon emissions and helps build a more sustainable Georgia.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="Our Story"
        subtitle="Building a more sustainable Georgia, one home at a time."
        height="short"
      />

      {/* Mission */}
      <section className="py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <ScrollReveal>
              <SectionHeading
                title="Making Homes More Sustainable"
                subtitle="Our mission is simple: connect Georgia homeowners with free energy upgrades that improve comfort, reduce costs, and protect the environment."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 text-lg leading-relaxed text-gray-600 space-y-6">
                <p>
                  Horizon Energy South was founded by Emory University and Georgia
                  Tech alumni who saw an opportunity to make a real difference in
                  Georgia communities. We recognized that many homeowners were
                  paying too much for energy while living in homes that could be
                  dramatically improved through weatherization and insulation.
                </p>
                <p>
                  Through the Georgia Home Energy Rebates program, we help
                  qualifying homeowners receive comprehensive home energy upgrades
                  at absolutely no cost. From the initial energy audit to the
                  final inspection, our team manages every step of the process.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-gray-100 py-24">
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.15}>
                <div className="rounded-2xl bg-white p-8 text-center shadow-md h-full">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-cream text-orange">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-24">
        <Container>
          <SectionHeading
            title="Our Certifications"
            subtitle="Industry-recognized credentials that guarantee quality."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <ScrollReveal direction="left">
              <div className="flex items-start gap-6 rounded-2xl bg-gray-100 p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange text-white">
                  <ShieldCheckIcon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal">
                    BPI Certified
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    Building Performance Institute certification means our team
                    follows the gold standard in home energy assessment and
                    improvement. This ensures every project meets strict quality
                    and safety standards.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="flex items-start gap-6 rounded-2xl bg-gray-100 p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber text-white">
                  <AcademicCapIcon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal">
                    RESNET Certified
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    As RESNET qualified energy raters, we use industry-standard
                    tools and methodologies to accurately assess your home&apos;s
                    energy performance and identify the most impactful
                    improvements.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
