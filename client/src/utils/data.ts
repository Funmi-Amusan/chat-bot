import { IconAssets } from "@/assets/icons";
import { ImageAssets } from "@/assets/images";
import { CiGlobe } from "react-icons/ci";
import { IoArrowForwardSharp } from "react-icons/io5";

export const features = [
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

  export const faqs = [
    {
      id: 1,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
    },
    {
      id: 2,
      question: "How does the pricing work for teams?",
      answer:
        "Our pricing is per user, per month. This means you only pay for the number of team members you have on your account. Discounts are available for larger teams and annual subscriptions.",
    },
    {
      id: 3,
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be prorated and reflected in your next billing cycle.",
    },
    {
      id: 4,
      question: "Is my data secure?",
      answer:
        "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
    },
  ];

  export const comapnyLogos = [
    { src: ImageAssets.acme.src, alt: "Acme Logo" },
    { src: ImageAssets.quantum.src, alt: "Quantum Logo" },
    { src: ImageAssets.echo.src, alt: "Echo Logo" },
    { src: ImageAssets.celestial.src, alt: "Celestial Logo" },
    { src: ImageAssets.pulse.src, alt: "Pulse Logo" },
    { src: ImageAssets.apex.src, alt: "Apex Logo" },
  ];

