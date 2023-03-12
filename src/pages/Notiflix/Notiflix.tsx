import { motion } from "framer-motion";
import { Notify, Loading, Confirm } from "notiflix";

import { pageAnimate } from "../fmConfig";
import Section from "../../components/Section/Section";

const Notiflix: React.FC = () => {
  const showNotificationHandler = () => {
    Notify.success("Test Success");

    setTimeout(() => {});
  };

  const loadingHandler = () => {
    Loading.dots();
    setTimeout(() => {
      Loading.remove();
    }, 2000);
  };

  const confirmHandler = () => {
    Confirm.show(
      "Notiflix Confirm",
      "Do you agree with me?",
      "Yes",
      "No",
      () => {
        alert("Thank you.");
      },
      () => {},
      {}
    );
  };
  return (
    <motion.div
      className="main__content fetch"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Section title="Notiflix">
        <div className="fetch__btns">
          <button className="fetch__btn" onClick={showNotificationHandler}>
            Show Notification
          </button>
          <button className="fetch__btn" onClick={loadingHandler}>
            Set Loading
          </button>
          <button className="fetch__btn" onClick={confirmHandler}>
            show Confirm
          </button>
        </div>
      </Section>
    </motion.div>
  );
};

export default Notiflix;
