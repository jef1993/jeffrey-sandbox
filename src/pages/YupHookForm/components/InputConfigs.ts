import * as yup from "yup";

type InputConfigurations = {
  [key: string]: {
    yup: yup.Schema;
    inputProps?: React.InputHTMLAttributes<
      HTMLInputElement | HTMLTextAreaElement
    >;
  };
};

yup.setLocale({
  mixed: {
    default: "Invalid input",
    required: "The field is required",
  },
});

const inputConfigs: InputConfigurations = {
  fullName: {
    yup: yup
      .string()
      .matches(/^([a-z\s\-']+\s+[a-z\s\-']+)*$/i, "Invalid Name"),
    inputProps: {
      type: "text",
      autoComplete: "name",
      placeholder: "Enter your full name...",
    },
  },
  email: {
    yup: yup.string().email(),
    inputProps: {
      type: "email",
      autoComplete: "email",
      placeholder: "Enter your email...",
    },
  },
  password: {
    yup: yup.string(),
    inputProps: {
      type: "password",
      autoComplete: "current-password",
      placeholder: "Enter your password...",
    },
  },
  confirmPassword: {
    yup: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    inputProps: {
      type: "password",
      autoComplete: "off",
      placeholder: "Confirm your password...",
    },
  },
  newPassword: {
    yup: yup.string().min(8, "Password must be at least 8 characters long"),
    inputProps: {
      type: "password",
      autoComplete: "new-password",
      placeholder: "Enter your new password...",
    },
  },
  confirmNewPassword: {
    yup: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required(),
    inputProps: {
      type: "password",
      autoComplete: "off",
      placeholder: "Confirm your password...",
    },
  },

  age: {
    yup: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === "" ? null : value;
      })
      .nullable()
      .typeError("Input must be a number")
      .positive("Number must a positive number")
      .integer("Number must be an integer")
      .max(100, "Maximum number is 100"),
    inputProps: {
      type: "number",
      autoComplete: "off",
      placeholder: "Enter Your age...",
    },
  },
};

export const inputSchemas: { [key: keyof typeof inputConfigs]: yup.Schema } =
  Object.entries(inputConfigs).reduce((schemas, [key, value]) => {
    return {
      ...schemas,
      [key]: value.yup,
    };
  }, {});

export const inputProperties: {
  [key: keyof typeof inputConfigs]: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  >;
} = Object.entries(inputConfigs).reduce((schemas, [key, value]) => {
  return {
    ...schemas,
    [key]: value.inputProps,
  };
}, {});

export default inputConfigs;
