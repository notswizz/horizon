import Image from "next/image";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

export default function AboutPreview() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
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
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="gradient-sunset mb-4 h-1 w-16 rounded-full" />
            <h2 className="text-3xl font-bold text-charcoal sm:text-4xl">
              Founded by Emory &amp; Georgia Tech Alumni
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              We saw too many Georgia families paying high energy bills while
              living in under-insulated, drafty homes. So we built a company
              to fix that — connecting homeowners with free upgrades through
              the state&apos;s rebate program.
            </p>
            <ul className="mt-6 space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-orange shrink-0" />
                BPI &amp; RESNET certified professionals
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-orange shrink-0" />
                Authorized Georgia rebate contractor
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-orange shrink-0" />
                Every step managed for you — audit to inspection
              </li>
            </ul>
            <div className="mt-8">
              <Button href="/about">Our Story &amp; Values</Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
