import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Section from "../../../components/Section/Section";
import Input2 from "../components/Input2";
import { inputSchemas } from "../components/InputConfigs";

const schema = yup.object({
  fullName: inputSchemas.fullName.required(),
  password: inputSchemas.password.required(),
  confirmPassword: inputSchemas.confirmPassword,
});

export type FormData = yup.InferType<typeof schema>;

const Basic = () => {
  const [defaultName, setDefaultName] = useState("");
  const myForm = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<{ [key: string]: any }> = (data) => {
    console.log(data);
  };

  return (
    <Section title="hook form Basic">
      <form className="yhf__form" onSubmit={myForm.handleSubmit(submitHandler)}>
        <Input2
          label="fullName"
          form={myForm}
          fieldName="fullName"
          fieldType="fullName"
          defaultValue={defaultName}
        />
        <Input2
          label="password"
          form={myForm}
          fieldName="password"
          fieldType="password"
        />
        <Input2
          label="confirm password"
          form={myForm}
          fieldName="confirmPassword"
          fieldType="confirmPassword"
        />
        <button>Submit</button>
        <button type="button" onClick={setDefaultName.bind(null, "")}>
          Remove Default Name
        </button>
        <button
          type="button"
          onClick={setDefaultName.bind(null, "Jeffrey Leung")}
        >
          Set Name: Jeffrey Leung
        </button>
      </form>
    </Section>
  );
};

export default Basic;
