import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";

import Rate from "../Other/Rate";
import Button from "../Control/Button";
import Modal from "../Control/Modal";
import ProductQuickView from "../ProductDetail/ProductQuickView";
import { formatCurrency } from "../../common/utils";
import {
  checkProductInWishList,
  checkProductInCart,
} from "../../common/shopUtils";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlistActions";
import AddToCart from "../Control/AddToCart";

function Product({ data, type, className }) {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistData = useSelector((state) => state.wishlistReducer);
  const [showQuickView, setShowQuickView] = useState(false);
  const [otherColor, setOtherColor] = useState();
  const percentDiscount = data.discount
    ? Math.ceil(100 - (100 * data.discount) / data.price)
    : null;
  function renderType() {
    if (data.new) {
      return <h5 className="-new">New</h5>;
    }
    if (data.discount && typeof data.discount === "number") {
      return <h5 className="-sale">-{percentDiscount}%</h5>;
    }
    return null;
  }
  const addToCartHandle = (e) => {
    e.preventDefault();
    let productItem = checkProductInCart(cartState, data.id);
    if (!productItem && data.quantity > 0) {
      dispatch(addToCart(data, 1, otherColor && otherColor.color));
      return toast.success("Product added to cart !");
    }
  };
  const addToWishlistHandle = (e) => {
    e.preventDefault();
    const wishlistItem = checkProductInWishList(wishlistData, data.id);
    dispatch(addToWishlist(data));
    toast.dismiss();
    if (!wishlistItem) {
      return toast.success("Product added to wishlist !");
    } else {
      return toast.error("Product removed from wishlist !");
    }
  };

  return (
    <>
      {!type || type === "grid" ? (
        <div className={`product ${classNames(className)}`}>
          <div className="product-type">{renderType()}</div>
          <div className="product__thumb">
            <Link
              href={`${process.env.PUBLIC_URL}/shop/product/[slug]`}
              as={`${process.env.PUBLIC_URL}/shop/product/${data.slug}`}
            >
              <a className="product__thumb__image">
                {data.thumbImage.map((img, index) => (
                  <img
                    key={index}
                    src={process.env.PUBLIC_URL + img}
                    alt="Product image"
                  />
                ))}
                {otherColor && (
                  <img src={otherColor.image} alt="Product image" />
                )}
              </a>
            </Link>
            <div className="product__thumb__actions">
              <div className="product-btn" data-tip data-for="cartIcon">
                <Button
                  height="50px"
                  width="50px"
                  color="white"
                  className={`product__actions__item -round ${classNames({
                    "active -disable":
                      checkProductInCart(cartState, data.id) ||
                      data.quantity < 1,
                  })}
                  `}
                  action="#"
                  onClick={addToCartHandle}
                  content={<i className="fas fa-shopping-bag" />}
                ></Button>
              </div>
              <ReactTooltip id="cartIcon" type="dark" effect="solid">
                <span>Add to Cart</span>
              </ReactTooltip>
              <div className="product-btn" data-tip data-for="qvIcon">
                <Button
                  height={50 / 14 + "em"}
                  width={50 / 14 + "em"}
                  color="white"
                  className="product__actions__item -round"
                  action="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  content={<i className="fas fa-eye" />}
                ></Button>
              </div>
              <ReactTooltip id="qvIcon" type="dark" effect="solid">
                <span>Quick view</span>
              </ReactTooltip>
              <div className="product-btn" data-tip data-for="wlIcon">
                <Button
                  height={50 / 14 + "em"}
                  width={50 / 14 + "em"}
                  color="white"
                  className={`product__actions__item -round ${classNames({
                    active: checkProductInWishList(wishlistData, data.id),
                  })}`}
                  action="#"
                  onClick={addToWishlistHandle}
                  content={<i className="fas fa-heart" />}
                ></Button>
              </div>
              <ReactTooltip id="wlIcon" type="dark" effect="solid">
                <span>Add to Wishlist</span>
              </ReactTooltip>
            </div>
          </div>
          <div className="product__content">
            <div className="product__content__header">
              <h5 className="product-category">{data.category}</h5>
              <Rate currentRate={data.rate} />
            </div>
            <Link
              href={`${process.env.PUBLIC_URL}/shop/product/[slug]`}
              as={`${process.env.PUBLIC_URL}/shop/product/${data.slug}`}
            >
              <a className="product-name">{data.name}</a>
            </Link>
            <div className="product__content__footer">
              <h5 className="product-price--main">
                {data.discount
                  ? formatCurrency(data.discount)
                  : formatCurrency(data.price)}
              </h5>
              {data.discount && (
                <h5 className="product-price--discount">
                  {formatCurrency(data.price)}
                </h5>
              )}
              {data.variation && (
                <div className="product-colors">
                  {data.variation.map((color, index) => (
                    <div
                      key={index}
                      className={`product-colors__item ${classNames({
                        active:
                          otherColor &&
                          otherColor.colorCode === color.colorCode,
                      })}`}
                      style={{ backgroundColor: color.colorCode }}
                      onClick={() => setOtherColor(color)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`product-list ${classNames(className)}`}>
          <div className="product-list__thumb">
            <div className="product-type">{renderType()}</div>
            <Link
              href={`${process.env.PUBLIC_URL}/shop/product/[slug]`}
              as={`${process.env.PUBLIC_URL}/shop/product/${data.slug}`}
            >
              <a className="product-list__thumb__image">
                {data.thumbImage.map((img, index) => (
                  <img
                    key={index}
                    src={process.env.PUBLIC_URL + img}
                    alt="Product image"
                  />
                ))}
                {otherColor && (
                  <img src={otherColor.image} alt="Product image" />
                )}
              </a>
            </Link>
          </div>
          <div className="product-list__content">
            <div className="product-list__content__top">
              <div className="product-category__wrapper">
                <h5 className="product-category">{data.category}</h5>
                <Rate currentRate={data.rate} />
              </div>
              <Link
                href={`${process.env.PUBLIC_URL}/shop/product/[slug]`}
                as={`${process.env.PUBLIC_URL}/shop/product/${data.slug}`}
              >
                <a className="product-name">{data.name}</a>
              </Link>
              <div className="product__price">
                <div className="product__price__wrapper">
                  <h5 className="product-price--main">
                    {data.discount
                      ? formatCurrency(data.discount)
                      : formatCurrency(data.price)}
                  </h5>
                  {data.discount && (
                    <h5 className="product-price--discount">
                      {formatCurrency(data.price)}
                    </h5>
                  )}
                </div>
                {data.variation && (
                  <div className="product-colors">
                    {data.variation.map((color, index) => (
                      <div
                        key={index}
                        className={`product-colors__item ${
                          otherColor && otherColor.colorCode === color.colorCode
                            ? "active"
                            : ""
                        }`}
                        style={{ backgroundColor: color.colorCode }}
                        onClick={() => setOtherColor(color)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="product-list__content__bottom">
              <p className="product-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                ipsa fugiat accusantium reiciendis rem doloribus iste doloremque
              </p>
              <div className="product__actions">
                <div className="product-btn">
                  <AddToCart
                    onClick={addToCartHandle}
                    className={classNames({
                      "-disable":
                        checkProductInCart(cartState, data.id) ||
                        data.quantity < 1,
                    })}
                  />
                </div>
                <div className="product-btn" data-tip data-for="l-qvIcon">
                  <Button
                    height={50 / 14 + "em"}
                    width={50 / 14 + "em"}
                    color="white"
                    className="product__actions__item -round"
                    action="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowQuickView(true);
                    }}
                    content={<i className="fas fa-eye" />}
                  ></Button>
                </div>
                <ReactTooltip id="l-qvIcon" type="dark" effect="solid">
                  <span>Quick view</span>
                </ReactTooltip>
                <div
                  className="product-btn"
                  data-tip
                  data-for="l-wlIcon"
                  style={{ marginRight: 0 }}
                >
                  <Button
                    height={50 / 14 + "em"}
                    width={50 / 14 + "em"}
                    color="white"
                    className={`product__actions__item -round ${classNames({
                      active: checkProductInWishList(wishlistData, data.id),
                    })}`}
                    action="#"
                    onClick={addToWishlistHandle}
                    content={<i className="fas fa-heart" />}
                  ></Button>
                </div>
                <ReactTooltip id="l-wlIcon" type="dark" effect="solid">
                  <span>Add to Wishlist</span>
                </ReactTooltip>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        showModal={showQuickView}
        setShowModal={setShowQuickView}
        width={1170}
      >
        <ProductQuickView data={data} />
      </Modal>
    </>
  );
}

export default Product;
