import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { urlToHttpOptions } from "url";

interface field {
  id: number;
  label: string;
  name: string;
  type: string;
  options?: string[];
}

interface button {
  id: number;
  name: string;
  label: string;
}

interface Props {
  initialValues: any;
  schema: any;
  onSubmit: any;
  fields: field[];
  buttons?: button[];
}

const FormTemplate: FC<Props> = ({
  initialValues,
  schema,
  onSubmit,
  fields,
  buttons,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => onSubmit(values)}
    >
      {(Fields: {
        touched: boolean;
        dirty: boolean;
        isValid: boolean;
        handleSubmit: any;
      }) => (
        <Form onSubmit={Fields.handleSubmit}>
          {fields.map((field) => (
            <VStack key={field.id} spacing={10} align="flex-end" h="13vh">
              <FormControl>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                {field.type !== "select" ? (
                  <Field
                    as={Input}
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    variant="filled"
                  />
                ) : (
                  <Field
                    id={field.name}
                    name={field.name}
                    as={Select}
                    placeholder={"Select " + field.label}
                    variant="filled"
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                )}
                <Text color="red">
                  <ErrorMessage name={field.name} />
                </Text>
              </FormControl>
            </VStack>
          ))}
          {buttons
            ? buttons.map((button) => (
                <Button
                  type="submit"
                  w="full"
                  key={button.id}
                  colorScheme="messenger"
                  disabled={!(Fields.isValid && Fields.dirty && Fields.touched)}
                >
                  {button.label}
                </Button>
              ))
            : null}
        </Form>
      )}
    </Formik>
  );
};

export default FormTemplate;
