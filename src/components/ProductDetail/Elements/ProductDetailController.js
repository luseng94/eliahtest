import { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";
import { loadStripe } from "@stripe/stripe-js";

import Quantity from "../../Control/Quantity";
import AddToCart from "../../Control/AddToCart";
import Button from "../../Control/Button";
import {
  getAvaiableQuantityInCart,
  checkProductInWishList,
} from "../../../common/shopUtils";

const stripePromise = loadStripe("pk_test_51GsOVBC3AKkcVW1YlFuwgotHwVf9tiQndnpcj178ednNRZ2Fw5WHnhK8OFh6DIgPTDw1EUT73bNop3HSBfQLXw6C000U8yBCHN");
export default function ProductDetailController({
  data,
  getQuantity,
  onAddToCart,
  onAddToWishList,
  color,
}) {
  const [quantity, setQuantity] = useState();
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistState = useSelector((state) => state.wishlistReducer);

  const avaiableProduct = getAvaiableQuantityInCart(
    cartState,
    data.id,
    data.quantity
  );
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const paymetgateway = {
      amount: 7000,
      quantity : 2
    }
    const response = await fetch("http://localhost:5000/payment", {
      method: "POST",
      body: JSON.stringify(paymetgateway),
          headers: {
              'Content-Type': 'application/json'
          }   
    });
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return (
    <>
    <div className="product-detail__controler">
      <Quantity
        className="-border -round"
        getQuantity={(q) => {
          setQuantity(q), getQuantity(q);
        }}
        maxValue={avaiableProduct}
      />
      
      {/* <Button
                      width="50%"
                      action={process.env.PUBLIC_URL + "/shop/checkout"}
                      color="red"
                      content="Payment"
                      // onClick={handleClick}
                    /> */}
      {/* <button type="button" id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button> */}
      {/* <AddToCart
        className={`-dark`}
        className={`-dark ${classNames({
          "-disable": quantity > avaiableProduct || data.quantity < 1,
        })}`}
        onClick={onAddToCart}
      />
      <div className="product-detail__controler__actions">
        <div data-tip data-for="add-wishlist">
          <Button
            action="#"
            height="3.85em"
            width="3.85em"
            className={`-round ${classNames({
              active: checkProductInWishList(wishlistState, data.id),
            })}`}
            onClick={onAddToWishList}
            color="white"
            content={<i className="fas fa-heart"></i>}
          />
        </div>
        <ReactTooltip id="add-wishlist" type="dark" effect="solid">
          <span>Add to wishlist</span>
        </ReactTooltip>
      </div> */}
    </div>
    <div>
    <button className="btn " style={{backgroundColor: "gray", color: "white"}}  onClick={handleClick}><span>Payment</span></button>
    </div>
    </>
  );
}
