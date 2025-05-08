import { Banner } from "@/components/home/Banner";
import { CallToAction } from "@/components/home/CallToAction";
import { FAQs } from "@/components/home/FAQs";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/home/Footer";
import { Hero } from "@/components/home/Hero";
import { LogoTicker } from "@/components/home/LogoTicker";
import { ProductShowcase } from "@/components/home/ProductShowcase";

export default function Home() {
  return (
    <div className="flex flex-col bg-black h-[calc(100vh-var(--main-header-height))]">
      <Banner />
      <Hero />
      <LogoTicker />
      <Features />
      <ProductShowcase />
      <FAQs />
      <CallToAction />
      <Footer />
</div>
  );
}
