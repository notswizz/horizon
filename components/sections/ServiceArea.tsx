import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { MapPinIcon } from "@heroicons/react/24/solid";

const counties = [
  "Bibb",
  "Clayton",
  "Crawford",
  "DeKalb",
  "Fulton",
  "Jones",
  "Monroe",
  "Twiggs",
];

export default function ServiceArea() {
  return (
    <section className="bg-gray-100 py-24">
      <Container>
        <SectionHeading
          title="Our Service Area"
          subtitle="Proudly serving homeowners across 8 Georgia counties."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-2 items-center">
          {/* Georgia Map Visual */}
          <ScrollReveal direction="left">
            <div className="relative mx-auto aspect-square max-w-md rounded-3xl bg-white p-8 shadow-lg">
              <div className="flex h-full flex-col items-center justify-center">
                {/* Stylized Georgia outline */}
                <svg
                  viewBox="0 0 200 240"
                  className="h-48 w-48 text-orange/20"
                  fill="currentColor"
                >
                  <path d="M60,10 L140,10 L155,30 L160,60 L170,90 L175,120 L180,150 L170,180 L155,200 L140,215 L120,225 L100,230 L80,225 L60,215 L45,200 L35,180 L25,150 L30,120 L35,90 L40,60 L45,30 Z" />
                </svg>
                {/* County dots overlaid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-48 w-48">
                    {/* Approximate positions for central GA counties */}
                    <div className="absolute left-[45%] top-[45%] h-3 w-3 rounded-full bg-orange animate-pulse" title="Bibb" />
                    <div className="absolute left-[35%] top-[30%] h-3 w-3 rounded-full bg-amber animate-pulse" title="Fulton" />
                    <div className="absolute left-[40%] top-[35%] h-3 w-3 rounded-full bg-amber animate-pulse" title="Clayton" />
                    <div className="absolute left-[50%] top-[30%] h-3 w-3 rounded-full bg-yellow animate-pulse" title="DeKalb" />
                    <div className="absolute left-[50%] top-[50%] h-3 w-3 rounded-full bg-orange animate-pulse" title="Jones" />
                    <div className="absolute left-[40%] top-[50%] h-3 w-3 rounded-full bg-yellow animate-pulse" title="Crawford" />
                    <div className="absolute left-[45%] top-[55%] h-3 w-3 rounded-full bg-amber animate-pulse" title="Monroe" />
                    <div className="absolute left-[55%] top-[48%] h-3 w-3 rounded-full bg-orange animate-pulse" title="Twiggs" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-gray-600">
                  Central Georgia Service Area
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* County List */}
          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {counties.map((county) => (
                <div
                  key={county}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <MapPinIcon className="h-5 w-5 text-orange shrink-0" />
                  <span className="font-medium text-charcoal">
                    {county} County
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-600">
              Not sure if you&apos;re in our service area? Give us a call at{" "}
              <a
                href="tel:+14044466668"
                className="font-semibold text-orange hover:text-amber"
              >
                (404) 446-6668
              </a>{" "}
              and we&apos;ll help you find out.
            </p>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
