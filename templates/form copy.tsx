import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { FC } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

interface field {
  id: number;
  label: string;
  name: string;
  type: string;
}

interface Props {
  initialValues: any;
  schema: any;
  onSubmit: any;
  fields: field[];
}

const FormTemplate: FC<Props> = ({
  initialValues,
  schema,
  onSubmit,
  fields,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values) => onSubmit(values),
  });

  const handleErrors = (name: string) => {
    return formik.touched[name] && formik.errors[name] ? (
      <FormErrorMessage>{formik.errors[name]?.toString()}</FormErrorMessage>
    ) : null;
  };

  const email = "email";
  console.log(formik.errors[email]);
  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <FormControl key={field.id}>
          <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
          <Input type={field.type} {...formik.getFieldProps(field.name)} />
          {handleErrors(field.name)}
        </FormControl>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormTemplate;
