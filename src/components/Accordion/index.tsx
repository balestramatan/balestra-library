import React, { useState } from "react";
import "./styles.css";

interface AccordionProps<T> {
  data: T[]; // `data` is now required
  renderTitle: (item: T) => React.ReactNode;
  renderContent: (item: T) => React.ReactNode;
  getId: (item: T) => string; // Function to extract the `id` from the item
  customClass?: string;
  customStyle?: React.CSSProperties;
}

const Accordion = <T,>({
  data,
  renderTitle,
  renderContent,
  getId,
  customClass,
  customStyle
}: AccordionProps<T>) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (itemId: string) => {
    if (selected.includes(itemId)) {
      setSelected(selected.filter((id) => id !== itemId));
    } else {
      setSelected([...selected, itemId]);
    }
  };

  return (
    <div className={`wrapper ${customClass}`} style={customStyle}>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => {
            const id = getId(item);
            return (
              <div className="item" key={id}>
                <div className="title" onClick={() => handleToggle(id)}>
                  {renderTitle(item)}
                  <span>{selected.includes(id) ? "-" : "+"}</span>
                </div>
                {selected.includes(id) && (
                  <div className="content">{renderContent(item)}</div>
                )}
              </div>
            );
          })
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;