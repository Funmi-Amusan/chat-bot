import { features } from "@/utils/data";
import Card from "../ui/Card";


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
