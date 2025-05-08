import Card from "../ui/Card";
import { IconAssets } from "@/assets/icons";

const features = [
  {
    image: IconAssets.ecosystem.src,
    title: "Integration Ecosystem",
    description:
      "Enhance your productivity by connecting with your tools, keeping your essentials in one place.",
  },
  {
    image: IconAssets.ecosystem.src,
    title: "Goal Setting and Tracking",
    description:
      "Define and track your goals, breaking down objectives into achievable tasks to keep your targets in sight.",
  },
  {
    image: IconAssets.ecosystem.src,
    title: "Secure Data Encryption",
    description:
      "With end-to-end encryption, your data is securely stored and protected from unauthorized access.",
  },
];

export const Features = () => {
  return (
    <section className="bg-black flex-center-col">
      <h2>Everything you need</h2>
      <p className="text-body-lg max-w-[450px] font-inter text-center">Enjoy customizable lists, team work tools, and smart tracking all in one place. Set tasks, get reminders, and see your progress simply and quickly.</p>
      <div className="flex flex-col md:flex-row py-12 gap-4 ">
      {
        features.map((feature) => (
          <Card
            key={feature.title}
            title={feature.title}
            content={feature.description}
            image={feature.image}
          />
        ))
      }
      </div>
    </section>
  );
};
