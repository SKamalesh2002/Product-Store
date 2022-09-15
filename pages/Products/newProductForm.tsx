import { FC, useState } from "react";
import FormTemplate from "../../templates/form";
import * as yup from "yup";
import { categories } from "../../components/fakeProducts";

import { Flex, Box } from "@chakra-ui/react";

interface Props {}

interface initialValues {
  title: string;
  category: string;
  price: string;
  rating: string;
  description: string;
}

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

const newProductForm: FC<Props> = () => {
  const [initialValues] = useState<initialValues>({
    title: "",
    category: "",
    price: "",
    rating: "",
    description: "",
  });

  const schema = yup.object({
    title: yup.string().required("Title Required"),
    category: yup.string().required("Category Required"),
    price: yup.number().required("Price Required"),
    rating: yup.number().required("Rating Required"),
  });

  const fields = useState<field[]>([
    { id: 0, label: "Title", name: "title", type: "text" },
    {
      id: 1,
      label: "Category",
      name: "category",
      type: "select",
      options: ["Men", "Women"],
    },
    { id: 2, label: "Price", name: "price", type: "number" },
    { id: 3, label: "Rating", name: "rating", type: "number" },
    { id: 4, label: "Description", name: "description", type: "text" },
  ]);

  const buttons = useState<button[]>([
    { id: 0, name: "submit", label: "Submit" },
  ]);

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="50vh" h="65vh">
        <FormTemplate
          initialValues={initialValues}
          schema={schema}
          fields={fields[0]}
          onSubmit={onSubmit}
          buttons={buttons[0]}
        />
      </Box>
    </Flex>
  );
};

export default newProductForm;
