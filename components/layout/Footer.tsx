import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import GradientDivider from "@/components/ui/GradientDivider";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services", label: "Energy Audits" },
  { href: "/services", label: "Weatherization" },
  { href: "/services", label: "Insulation" },
  { href: "/services", label: "Rebate Assistance" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <GradientDivider />
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.webp"
                alt="Horizon Energy South"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
              <span className="text-lg font-bold">Horizon Energy South</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Making homes more comfortable and energy-efficient through
              Georgia&apos;s Home Energy Rebates program.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="tel:+14044466668"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 text-orange" />
                  (404) 446-6668
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@horizonenergysouth.com"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <EnvelopeIcon className="h-4 w-4 text-orange" />
                  info@horizonenergysouth.com
                </Link>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-white/60">
                  <MapPinIcon className="h-4 w-4 mt-0.5 text-orange shrink-0" />
                  Serving Central Georgia
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Horizon Energy South. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
