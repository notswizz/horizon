import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chat/Chatbot";
import EligibilityModalProvider from "@/components/providers/EligibilityModalProvider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EligibilityModalProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </EligibilityModalProvider>
  );
}
