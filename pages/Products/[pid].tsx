import { useRouter } from "next/router";

import { getProduct, Welcome } from "../../components/fakeProducts";

import { Product } from "../../components/product";

const ProductView = () => {
  const router = useRouter();

  const { pid } = router.query;
  let product = {} as Welcome | undefined;
  if (typeof pid === "string") product = getProduct(parseInt(pid));

  return product ? <Product product={product} /> : <h1>Not found</h1>;
};

export default ProductView;
