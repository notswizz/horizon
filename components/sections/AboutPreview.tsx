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
              Making Homes More Sustainable
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Horizon Energy South was founded with a simple mission: help Georgia
              homeowners access free energy upgrades that make their homes more
              comfortable and efficient. Through the Georgia Home Energy Rebates
              program, we&apos;ve helped hundreds of families reduce their energy
              costs.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Our team of BPI and RESNET certified professionals brings years of
              experience in home energy assessment and improvement.
            </p>
            <div className="mt-8">
              <Button href="/about">Learn More About Us</Button>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
