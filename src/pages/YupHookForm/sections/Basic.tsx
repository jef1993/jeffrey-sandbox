import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Section from "../../../components/Section/Section";
import Input2 from "../components/Input2";
import inputsSchema from "../components/InputsSchema";

const schema = yup.object({
  fullName: inputsSchema.fullName,
  age: inputsSchema.age,
});

export type FormData = yup.InferType<typeof schema>;

const Basic = () => {
  const myForm = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<{ [key: string]: any }> = (data) => {
    console.log(data);
  };

  return (
    <Section title="hook form Basic">
      <form className="yhf__form" onSubmit={myForm.handleSubmit(submitHandler)}>
        <Input2 label="fullName" form={myForm} fieldName="fullName" />
        <Input2 label="age" form={myForm} fieldName="age" />
        <button>Submit</button>
      </form>
    </Section>
  );
};

export default Basic;

// function debounce(func: (...args: any[]) => void, wait: number) {
//   let timeout: ReturnType<typeof setTimeout> | null;
//   return function (...args: any[]) {
//     const later = () => {
//       timeout = null;
//       func(...args);
//     };

//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }
