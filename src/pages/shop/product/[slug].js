import { useRouter } from "next/router";

import products from "../../../data/products.json";
import { getProductBySlug } from "../../../common/productSelect";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import LayoutFour from "../../../components/Layout/LayoutFour";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../components/Other/Breadcrumb";
import ProductSlideTwo from "../../../components/Sections/ProductThumb/ProductSlide/ProductSlideTwo";

export default function () {
  const router = useRouter();
  const { slug } = router.query;
  let foundProduct = getProductBySlug(products, slug);
  const onReviewSubmit = (data) => {
    console.log(data);
  };
  return (
    foundProduct !== null && (
      <LayoutFour title={foundProduct.name}>
        <Breadcrumb title="Product Detail">
          <BreadcrumbItem name="Home" />
          <BreadcrumbItem name="Shop" />
          <BreadcrumbItem name={foundProduct.name} current />
        </Breadcrumb>
        <ProductDetail data={foundProduct} onReviewSubmit={onReviewSubmit} />
        <ProductSlideTwo data={products} />
        <InstagramTwo />
      </LayoutFour>
    )
  );
}
