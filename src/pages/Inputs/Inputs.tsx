import React, { useState, useEffect } from "react";

import Section from "../../components/Section/Section";
import Input from "../../components/Input/Input";
import useInput from "../../components/Input/useInput";

const initialUser = "";
const initialPassword = "mypassword";

const Inputs: React.FC = () => {
  const username = useInput(initialUser, "text", true);
  const password = useInput(initialPassword, "password", true);

  const inputsHasError = !!username.errorText || !!password.errorText;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username.value);
  };

  return (
    <div className="main__content">
      <Section title="Inputs">
        <form className="inputs" onSubmit={submitHandler}>
          <Input name="username" {...username} />
          <Input name="password" {...password} />
          <button type="submit" disabled={inputsHasError}>
            Submit
          </button>
        </form>
      </Section>
    </div>
  );
};

export default Inputs;
