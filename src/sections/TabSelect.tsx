import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../components/Section/Section";
const tabs = ["Option 1", "Option Long"];

const TabSelect: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [dimensions, setDimensions] = useState<{ [key: string]: any }[]>([]);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setDimensions(
        refs.current.map(
          (element) =>
            element?.getBoundingClientRect() || {
              height: 0,
              width: 0,
            }
        )
      );
    }, 500);
  }, []);

  console.log(dimensions[0]?.width, dimensions[1]?.width);

  return (
    <Section title="Tab Select">
      <div className={`tab-select${selectedTab === "Option 1" ? " tall" : ""}`}>
        <nav className="tab-select__nav">
          <motion.ul className="tab-select__list">
            <motion.div
              className="tab-select__track"
              data-position={selectedTab === tabs[0] ? "left" : "right"}
            >
              <motion.div
                className="tab-select__track__thumb"
                layout
                animate={{
                  width:
                    selectedTab === "Option 1"
                      ? dimensions[0]?.width - 4
                      : dimensions[1]?.width - 4,
                }}
              ></motion.div>
            </motion.div>

            {tabs.map((tab, i) => (
              <li
                ref={(element) => (refs.current[i] = element)}
                className="tab-select__item"
                aria-selected={selectedTab === tab ? "true" : "false"}
                role="tab"
                key={tab}
                onClick={setSelectedTab.bind(null, tab)}
              >
                {tab}
                {/* {tab === selectedTab ? (
                  <motion.div
                    className="tab-select__thumb"
                    layoutScroll={false}
                    layoutId="asdasdasd"
                  >
                    {tab}
                  </motion.div>
                ) : null} */}
              </li>
            ))}
          </motion.ul>
        </nav>
        <div className={`tab-select__ctn`}>
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
