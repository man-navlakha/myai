import React from 'react';
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AuroraText } from "@/components/magicui/aurora-text";

type Feature = {
  title: string;
  items: string[];
};


const features: Feature[] = [
  {
    title: 'we can now review / analyze / understand.',
    items: [
      "How would you use `async/await` to fetch data from a URL, and handle potential errors gracefully?",
      'How do you read the contents of a text file named `data.txt` and print each line to the console?',
      'Describe the logic behind the bubble sort algorithm. How does it work to sort an array of numbers?',
    ],
  },
  {
    title: 'Automate tasks by setting a schedule',
    items: [
      'Daily email summaries and priorities',
      'Personal daily news digest of the AI industry',
      'Weekly Business Newsletter',
    ],
  },
  {
    title: 'Conduct in-depth research on topics',
    items: [
      'Top Electric Vehicles in North America',
      '10-day Itinerary for Tokyo and Nearby Cities',
      'Business Model Canvas for Nike',
    ],
  },
];


interface FeatureSectionProps {
  onItemClick?: (value: string) => void;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ onItemClick }) => {
  return (
    <div className="w-full dark:from-black/40 dark:to-black/90">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="group rounded-full border border-gray-900/10 dark:border-white/10  bg-white/30 dark:bg-white/10 text-white backdrop-blur-md transition hover:bg-white/50 dark:hover:bg-white/20">
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-sm font-medium hover:text-neutral-800 dark:hover:text-neutral-200 transition">
            ✨ Introducing Solvinger OG
          </AnimatedShinyText>
        </div>
      </div>

      {/* Header */}
      <div className="mt-10 text-center">
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          What’s on <AuroraText className="font-black">your mind?</AuroraText>
        </h3>
        <p className="mt-2 text-lg text-neutral-700 dark:text-neutral-300">
          Now Solvinger can do it for you 😊
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureColumn key={index} title={feature.title} items={feature.items} onItemClick={onItemClick} />
      ))}
    </div>
    </div>
  );
};

interface FeatureColumnProps {
  title: string;
  items: string[];
  onItemClick?: (value: string) => void;
}
const FeatureColumn: React.FC<FeatureColumnProps> = ({ title, items, onItemClick }) => (
  <div className="flex flex-col space-y-4">
    <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">{title}</h2>
    <div className="flex flex-col space-y-3 bg-white/20 dark:bg-black/30 border border-black/10 dark:border-white/10 backdrop-blur-md rounded-xl p-4">
      {items.map((text, idx) => (
        <button
          key={idx}
          onClick={() => onItemClick?.(text)} // ← Pass clicked text up
          className="flex items-center justify-between gap-2 text-left text-sm sm:text-base px-3 py-2 bg-black/10 dark:bg-white/10 rounded-lg shadow-xl hover:shadow-sm border dark:border-white/10 border-black/10 hover:bg-white/20 dark:hover:bg-white/20 transition"
        >
          <span className="flex-1 text-black dark:text-white">{text}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="w-5 h-5 text-primary"
          >
            <path d="M128,24A104,104,0,1,0,232,128...Z" />
          </svg>
        </button>
      ))}
    </div>
  </div>
);

export default FeatureSection;
