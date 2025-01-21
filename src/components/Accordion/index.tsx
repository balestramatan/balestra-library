import React, { useState } from "react";
import "./styles.css";

interface AccordionProps<T> {
  data: T[];
  renderTitle: (item: T) => React.ReactNode;
  renderContent: (item: T) => React.ReactNode;
  getId: (item: T) => string;
  customWrapperClass?: string;
  customItemClass?: string;
  customTitleClass?: string;
  customContentClass?: string;
  customNoDataClass?: string;
  customIconClass?: string;
}

const Accordion = <T,>({
  data,
  renderTitle,
  renderContent,
  getId,
  customWrapperClass,
  customItemClass,
  customTitleClass,
  customContentClass,
  customNoDataClass,
  customIconClass,
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
    <div className={`wrapper ${customWrapperClass}`}>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => {
            const id = getId(item);
            const isVisible = selected.includes(id); // Determine if the item is visible
            return (
              <div className={`item ${customItemClass}`} key={id}>
                <div
                  className={`title ${customTitleClass}`}
                  onClick={() => handleToggle(id)}
                >
                  {renderTitle(item)}
                  <span className={`icon ${customIconClass}`}>
                    {isVisible ? "-" : "+"}
                  </span>
                </div>
                <div
                  className={`content-wrapper ${
                    isVisible ? "visible" : ""
                  } ${customContentClass}`}
                >
                  <div className="content">{renderContent(item)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <div className={`no-data ${customNoDataClass}`}>No data found!</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
