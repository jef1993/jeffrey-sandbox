import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Section from "../../components/Section/Section";
import Input from "../../components/Input/Input";
import useInput from "../../components/Input/useInput";
import { motion } from "framer-motion";
import { pageAnimate } from "../fmConfig";

const initialUser = "";
const initialPassword = "mypassword";

const Inputs: React.FC = () => {
  const username = useInput(initialUser, "text", true);
  const password = useInput(initialPassword, "password", true);
  const { pathname } = useLocation();

  const inputsHasError = !!username.errorText || !!password.errorText;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username.value);
  };

  return (
    <motion.div
      className="main__content"
      variants={pageAnimate}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Section title="Inputs">
        <form className="inputs" onSubmit={submitHandler}>
          <Input name="username" {...username} />
          <Input name="password" {...password} />
          <button type="submit" disabled={inputsHasError}>
            Submit
          </button>
        </form>
      </Section>
    </motion.div>
  );
};

export default Inputs;
