"use client";

import React, { useState } from 'react';
import Accordion from "../ui/Accordion"; 
import { faqs } from '@/utils/data';


export const FAQs = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenItemId(prevId => (prevId === id ? null : id));
  };

  return (
    <section className="bg-gradient bg-gradient-to-t flex flex-col items-center text-center py-18 "> {/* Used flex-col and items-center for better centering */}
      <h2>Frequently asked questions</h2>
      {
        faqs.map((faq) => (
          <Accordion
            key={faq.id} 
            question={faq.question}
            answer={faq.answer}
            id={faq.id}
            isOpen={openItemId === faq.id} 
            onToggle={handleToggle} 
          />
        ))
      }
    </section>
  );
};
