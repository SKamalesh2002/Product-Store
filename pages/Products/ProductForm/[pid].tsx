import { getProduct, Welcome } from "../../../components/fakeProducts";

import { useRouter } from "next/router";

const ProductForm = () => {
  const router = useRouter();

  const { pid } = router.query;
  let product = {} as Welcome | undefined;

  if (typeof pid === "string") product = getProduct(parseInt(pid));

  return product ? <h1>{product.title}</h1> : <h1>Not found</h1>;
};

export default ProductForm;
