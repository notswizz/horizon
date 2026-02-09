import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const stats = [
  { target: 500, suffix: "+", label: "Homes Improved" },
  { target: 8, suffix: "", label: "Counties Served" },
  { target: 100, suffix: "%", label: "Free Through Rebates" },
];

const certifications = [
  {
    image: "/images/bpi.png",
    title: "BPI Certified",
    description: "Building Performance Institute certified professionals.",
  },
  {
    image: "/images/resnet.png",
    title: "RESNET Certified",
    description: "Residential Energy Services Network qualified raters.",
  },
  {
    icon: <CheckBadgeIcon className="h-8 w-8" />,
    title: "GA Rebate Approved",
    description: "Authorized contractor for Georgia Home Energy Rebates.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100 py-24">
      <Container>
        <SectionHeading
          title="Why Choose Horizon Energy South"
          subtitle="Certified experts committed to improving Georgia homes."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 items-center">
          {/* Photo + Stats */}
          <ScrollReveal direction="left">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/hor.png"
                alt="Horizon Energy South — Serving Georgia since day one"
                width={640}
                height={480}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-orange lg:text-5xl">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Text + Certifications */}
          <ScrollReveal direction="right">
            <div className="gradient-sunset mb-4 h-1 w-16 rounded-full" />
            <h3 className="text-3xl font-bold text-charcoal sm:text-4xl">
              Founded by Emory &amp; Georgia Tech Alumni
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              We saw too many Georgia families paying high energy bills while
              living in under-insulated, drafty homes. So we built a company
              to fix that — connecting homeowners with free upgrades through
              the state&apos;s rebate program.
            </p>

            <div className="mt-8 space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-orange">
                    {"image" in cert && cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        width={36}
                        height={36}
                      />
                    ) : (
                      cert.icon
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-charcoal">
                      {cert.title}
                    </h4>
                    <p className="mt-1 text-gray-600">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/about">Our Story &amp; Values</Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
