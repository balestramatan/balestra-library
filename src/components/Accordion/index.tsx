import React, { useState } from "react";
import './styles.css';

import mockData from './data';

interface AccordionItem {
    id: string;
    question: string;
    answer: string;
}
  
interface AccordionProps {
    data: AccordionItem[];
    customStyle?: React.CSSProperties;
    customClass?: string;
}

const Accordion: React.FC<AccordionProps> = ({ data, customStyle, customClass }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSingleSelection = (itemId: string) => {
    if (selected?.includes(itemId)) {
      const filtered = selected.filter((item) => item !== itemId);
      setSelected(filtered);
    } else {
      setSelected([...selected, itemId]);
    }
  };

  return (
    <div className={`wrapper ${customClass}`} style={customStyle}>
      <div className="accordion">
        {mockData && mockData.length > 0 ? (
            mockData.map((dataItem) => (
              <div className="item">
                <div
                  className="title"
                  onClick={() => handleSingleSelection(dataItem.id)}
                >
                  <h3>{dataItem.title}</h3>
                  <span>{selected.includes(dataItem.id) ? "-" : "+"}</span>
                </div>
                {selected.includes(dataItem.id) && (
                  <div className="content">
                    <p>{dataItem.content}</p>
                  </div>
                )}
              </div>
            ))
        ) : (
          <div className={`wrapper ${customClass}`} style={customStyle}>No data found !</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
