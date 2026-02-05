import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";
import {
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const qualifications = [
  "Own and occupy a single-family home in Georgia",
  "Home is located in an eligible county",
  "Meet household income guidelines",
  "Home has not received similar upgrades recently",
];

export default function RebatesInfo() {
  return (
    <section className="bg-cream py-24">
      <Container>
        <SectionHeading
          title="Georgia Home Energy Rebates"
          subtitle="Your home upgrades could be completely free through Georgia's state-funded program."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                The Georgia Home Energy Rebates program provides funding for
                qualifying homeowners to receive comprehensive energy upgrades at
                no cost. This includes energy audits, weatherization,
                insulation, and more.
              </p>
              <p>
                Horizon Energy South is an authorized contractor for this
                program. We handle all the paperwork, scheduling, and
                coordination so you can focus on enjoying a more comfortable
                home.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="text-xl font-bold text-charcoal mb-6">
                Who Qualifies?
              </h3>
              <ul className="space-y-4">
                {qualifications.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-orange shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/contact">Check Your Eligibility</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
