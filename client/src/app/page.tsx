import { Banner } from "@/components/home/Banner";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col h-[calc(100vh-var(--main-header-height))]">
      <Banner />
      <Hero />
</div>
  );
}
