import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

const stats = [
  { target: 500, suffix: "+", label: "Homes Improved" },
  { target: 8, suffix: "", label: "Counties Served" },
  { target: 100, suffix: "%", label: "Free Through Rebates" },
];

const certifications = [
  {
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    title: "BPI Certified",
    description: "Building Performance Institute certified professionals.",
  },
  {
    icon: <AcademicCapIcon className="h-8 w-8" />,
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

        <div className="mt-16 grid gap-16 lg:grid-cols-2 items-center">
          {/* Stats Side */}
          <ScrollReveal direction="left">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-orange lg:text-5xl">
                    <CountUp
                      target={stat.target}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-white p-8 shadow-md">
              <p className="text-lg leading-relaxed text-gray-600">
                Founded by Emory and Georgia Tech alumni, Horizon Energy South is
                dedicated to making Georgia homes more comfortable, efficient, and
                sustainable — at no cost to qualifying homeowners.
              </p>
            </div>
          </ScrollReveal>

          {/* Certifications Side */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cream text-orange">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-charcoal">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
