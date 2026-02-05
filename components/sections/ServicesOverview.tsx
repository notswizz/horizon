import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import {
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  HomeIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    icon: <MagnifyingGlassIcon className="h-6 w-6" />,
    title: "Energy Audits",
    description:
      "Comprehensive home energy assessments using thermal imaging and blower door tests to identify where your home is losing energy.",
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: "Weatherization",
    description:
      "Professional air sealing, duct sealing, and moisture barrier installation to protect your home from the elements.",
  },
  {
    icon: <HomeIcon className="h-6 w-6" />,
    title: "Insulation",
    description:
      "Attic, wall, and crawlspace insulation upgrades to keep your home comfortable year-round and reduce energy costs.",
  },
  {
    icon: <CurrencyDollarIcon className="h-6 w-6" />,
    title: "Rebate Assistance",
    description:
      "We handle the paperwork and process for Georgia's Home Energy Rebates program so your upgrades can be completely free.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive home energy solutions funded by Georgia's rebate program."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <Card
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/services" variant="primary">
            View All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
