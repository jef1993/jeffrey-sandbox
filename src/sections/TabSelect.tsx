import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../components/Section/Section";
const tabs = ["Option 1", "Option 2", "Option Long"];

const TabSelect: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <Section title="Tab Select">
      <div className="tab-select">
        <nav className="tab-select__nav">
          <ul className="tab-select__list">
            {tabs.map((tab) => (
              <li
                className="tab-select__item"
                aria-selected={selectedTab === tab ? "true" : "false"}
                role="tab"
                key={tab}
                onClick={setSelectedTab.bind(null, tab)}
              >
                {tab}
                {tab === selectedTab ? (
                  <motion.div
                    className="tab-select__thumb"
                    layoutId="tab-select-thumb"
                  >
                    {tab}
                  </motion.div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div className="tab-select__ctn">
          <AnimatePresence mode="wait">
            <motion.span
              key={selectedTab}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {selectedTab}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default TabSelect;
