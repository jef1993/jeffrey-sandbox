import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";

import Section from "../../../components/Section/Section";
import Input2 from "../components/Input2";
import { inputSchemas } from "../components/InputConfigs";
import { fetchData } from "../../ReactQuery/Basic";
import Input from "../../../components/Input/Input";
import useInput from "../../../components/Input/useInput";

const schema = yup.object().shape({
  fullName: inputSchemas.fullName.required(),
  password: inputSchemas.password.required(),
  confirmPassword: inputSchemas.confirmPassword,
  age: inputSchemas.age.required(),
  custom: yup.string().max(10),
});

let renderCount = 0;

export type FormData = yup.InferType<typeof schema>;

const Basic = () => {
  const people = useQuery({
    queryKey: ["people", 1],
    queryFn: () =>
      fetchData({
        method: "get",
        url: `${import.meta.env.VITE_SWAPI}/people/1`,
      }),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  const [defaultName, setDefaultName] = useState("");
  const apiName = people?.data?.name || "";
  const myForm = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    setDefaultName(apiName);
  }, [apiName]);

  const submitHandler: SubmitHandler<{ [key: string]: any }> = (data) => {
    console.log(data);
  };
  renderCount++;

  return (
    <Section title="hook form Basic">
      <form className="yhf__form" onSubmit={myForm.handleSubmit(submitHandler)}>
        <Input2
          label="fullName"
          form={myForm}
          fieldName="fullName"
          fieldType="fullName"
          defaultValue={apiName}
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
        <Input2 label="age" form={myForm} fieldName="age" fieldType="age" />
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
        <button
          type="button"
          onClick={() => {
            myForm.reset();
          }}
        >
          Reset All
        </button>
      </form>
      <p>renderCount: {renderCount}</p>
    </Section>
  );
};

export default Basic;
