import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center gradient-animated">
      <Container className="text-center py-32">
        <h1 className="text-7xl font-bold text-white sm:text-9xl">404</h1>
        <p className="mt-4 text-xl text-white/80 sm:text-2xl">
          Page not found
        </p>
        <p className="mt-2 text-white/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="lg">
            Go Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>
        <p className="mt-12 text-white/40 text-sm">
          Need help? Call{" "}
          <Link
            href="tel:+14044466668"
            className="text-amber hover:text-white transition-colors"
          >
            (404) 446-6668
          </Link>
        </p>
      </Container>
    </section>
  );
}
