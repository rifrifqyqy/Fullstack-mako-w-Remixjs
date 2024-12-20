import { useState, useRef } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem = ({
  title,
  content,
  isActive,
  onClick,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="">
      <button
        onClick={onClick}
        className={`flex w-full items-center justify-between rounded-full py-3 pl-6 pr-2 text-left text-sm font-semibold transition-all focus:outline-none max-sm:gap-4 md:pl-8 md:pr-3 md:text-lg ${isActive ? "bg-primary-100 text-white" : "bg-white text-zinc-600 hover:bg-zinc-200"}`}
      >
        {title}
        <span
          className={`rounded-full p-1 transition-all md:p-2 ${isActive ? "rotate-180 bg-white text-primary-100" : "rotate-0"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 md:h-8"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 10l5 5m0 0l5-5"
            />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          height: isActive ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className={`overflow-hidden pb-4 transition-all duration-300 ${isActive ? "border-zinc-300" : "border-transparent"}`}
      >
        <div className="px-6 py-4 text-xs text-gray-700 md:text-base">
          {content}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: string }[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex w-full flex-col rounded-lg">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isActive={activeIndex === index}
          onClick={() => handleAccordionClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
