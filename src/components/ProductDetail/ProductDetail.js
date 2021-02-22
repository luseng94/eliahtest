import React from "react";

import ProductDetailInfo from "./Elements/ProductDetailInfo";
import ProductDetailSlideTwo from "./Elements/ProductDetailSlideTwo";

export default function ProductDetail({ data, onReviewSubmit }) {
  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail__wrapper">
          <div className="row">
            <div className="col-12 col-md-6">
              <ProductDetailSlideTwo data={data} />
            </div>
            <div className="col-12 col-md-6">
              <ProductDetailInfo data={data} onReviewSubmit={onReviewSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
