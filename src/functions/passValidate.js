import { string } from "yup";


const passwordSchema = string()
  .min(8, { length: "Password must contain at least 8 characters" })
  .matches(/\d+/, { message: { number: "Password must contain at least one digit" } })
  .matches(/[a-z]+/, { message: { lowercase: "Password must contain lowercase letters" } })
  .matches(/[A-Z]+/, { message: { uppercase: "Password must contain uppercase letters" } })
  .matches(/[!@#$%^&*()-+]+/, {
    message: { special: "Password must contain a special character" }
  })
  .test(
    "The password must not have a space character",
    { spaces: "The password must not have a space character" },
    value => !/\s+/.test(value)
  )
  .required({ required: "It is necessary to enter the password" });

const passwodValidate = password =>
  passwordSchema
    .validate(password, { abortEarly: false })
    .catch(({ errors }) => {
      const validationErrors = errors.reduce((acc, error) => {
        const [key, value] = Object.entries(error)[0];
        acc[key] = value;
        return acc;
      }, {});
      return Promise.resolve({ errors: validationErrors });
    });

export default passwodValidate;
