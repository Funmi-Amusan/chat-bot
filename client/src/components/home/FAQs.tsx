import Accordion from "../ui/Accordion";

const items = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
  },
  {
    question: "How does the pricing work for teams?",
    answer:
      "Our pricing is per user, per month. This means you only pay for the number of team members you have on your account. Discounts are available for larger teams and annual subscriptions.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
  },
];

export const FAQs = () => {
  return (
    <section className="bg-gradient-to-t from-black from-20%  to-[#5D2CA8] to-90% flex-center-col text-center py-18 ">
      <h2>Frequently asked questions</h2>
      {
        items.map((faq)=> (
<div key={faq.question} className="flex flex-col px-2 w-full">
      <Accordion question={faq.question} answer={faq.answer}/>
</div>
        ))
        
      }
    </section>
  );
};
