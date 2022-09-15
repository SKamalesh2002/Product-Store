import { getProduct, Welcome } from "../../../components/fakeProducts";

import { useRouter } from "next/router";
import NewProductForm from "../newProductForm";

interface initialValues {
  title: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
}

const ProductForm = () => {
  const router = useRouter();

  const { pid } = router.query;
  let product = {} as Welcome | undefined;

  if (typeof pid === "string") product = getProduct(parseInt(pid));

  const initialValues = {} as initialValues;

  if (product) {
    initialValues.title = product?.title;
    initialValues.category = product.category.name;
    initialValues.description = product.description;
    initialValues.price = product.price;
    initialValues.rating = product.rating.rate;
    initialValues.image = product.image;
  }

  return initialValues ? (
    <NewProductForm data={initialValues} />
  ) : (
    <h1>Not found</h1>
  );
};

export default ProductForm;
