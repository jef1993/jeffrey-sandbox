import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Confirm } from "notiflix";

import { pageAnimate } from "../fmConfig";
import Section from "../../components/Section/Section";
import useAxios from "../../hooks/useAxios";
import DataDisplayer from "../../components/DataDisplayer";

const Fetch: React.FC = () => {
  const [peopleID, setPeopleID] = useState(1);
  const axiosConfig = {
    method: "get",
    url: `https://swapi.dev/api/people/${peopleID}/`,
  };
  const name = useAxios(axiosConfig, [peopleID]);

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

  const prevCharHandler = () => {
    if (peopleID > 1) setPeopleID((prev) => prev - 1);
  };

  const nextCharHandler = () => {
    setPeopleID((prev) => prev + 1);
  };

  const reloadCharHandler = () => {
    name.resend();
  };

  const clearHandler = async () => {
    setPeopleID(1);
    setTimeout(() => {
      name.resetData();
    }, 25);
  };

  useEffect(() => {
    console.log(name.data);
  }, [name.data]);

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

      <Section title="Advanced Fetching">
        <DataDisplayer {...name}>
          <h2 className="fetch__axios">{name.data?.name || ""}</h2>
        </DataDisplayer>
        <div className="fetch__btns">
          <button
            className="fetch__btn"
            onClick={prevCharHandler}
            disabled={peopleID === 1}
          >
            Previous Character
          </button>
          <button className="fetch__btn" onClick={nextCharHandler}>
            Next Character
          </button>
          <button className="fetch__btn" onClick={reloadCharHandler}>
            ReLoad
          </button>
          <button className="fetch__btn" onClick={clearHandler}>
            Clear Data
          </button>
        </div>
      </Section>
    </motion.div>
  );
};

export default Fetch;
