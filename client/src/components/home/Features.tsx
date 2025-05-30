import { features } from "@/utils/data";
import Card from "../ui/Card";
import ScrollReveal from "../ui/ScrollReveal";


export const Features = () => {
  return (
    <section className="bg-white dark:bg-black flex-center-col gap-4">
      <h2>Everything you need</h2>
      <ScrollReveal value="Enjoy customizable lists, team work tools, and smart tracking all in one place. Set tasks, get reminders, and see your progress simply and quickly." />
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
