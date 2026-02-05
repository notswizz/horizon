import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Button from "@/components/ui/Button";

export default function AboutPreview() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <ScrollReveal direction="left">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-orange/20 via-amber/20 to-cream">
              <div className="flex h-full items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-sunset">
                    <span className="text-3xl font-bold text-white">H</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    Serving Georgia since day one
                  </p>
                </div>
              </div>
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
