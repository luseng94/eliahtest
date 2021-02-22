import Link from "next/link";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import { formatCurrency, formatSingleNumber } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";

export default function () {
  const cartState = useSelector((state) => state.cartReducer);
  const { register, handleSubmit, errors } = useForm();
  const {
    register: couponRegister,
    handleSubmit: couponHandleSubmit,
    errors: couponErrors,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const onCouponSubmit = (data) => console.log(data);
  return (
    <LayoutFour title="Checkout">
      <Breadcrumb title="Checkout">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" />
        <BreadcrumbItem name="Checkout" current />
      </Breadcrumb>
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-12  col-lg-8">
              <form>
                <div className="checkout__form">
                  <div className="checkout__form__contact">
                    <div className="checkout__form__contact__title">
                      <h5 className="checkout-title">Contact information</h5>
                      <p>
                        Already have an account?
                        <Link href={process.env.PUBLIC_URL + "#"}>
                          <a>Login</a>
                        </Link>
                      </p>
                    </div>
                    <div className="input-validator">
                      <input
                        type="text"
                        name="contact"
                        ref={register({ required: true })}
                        placeholder="Email or mobile phone number"
                      />
                      {errors.contact && (
                        <span className="input-error">
                          Please provide a name or email
                        </span>
                      )}
                    </div>
                    <label className="checkbox-label" htmlFor="subcribe-news">
                      <input
                        type="checkbox"
                        id="subcribe-news"
                        name="subcribeNews"
                        ref={register}
                      />
                      Keep me up to dateon news and exclusive offers
                    </label>
                  </div>
                  <div className="checkout__form__shipping">
                    <h5 className="checkout-title">Shipping address</h5>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="input-validator">
                          <label>
                            First name <span>*</span>
                            <input
                              type="text"
                              name="firstName"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.firstName && (
                            <span className="input-error">
                              Please provide your first name
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="input-validator">
                          <label>
                            Last name <span>*</span>
                            <input
                              type="text"
                              name="lastName"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.lastName && (
                            <span className="input-error">
                              Please provide your last name
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Country <span>*</span>
                            <input
                              type="text"
                              name="country"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.country && (
                            <span className="input-error">
                              Please provide your country
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Address <span>*</span>
                            <input
                              type="text"
                              name="streetAddress"
                              ref={register({ required: true })}
                              placeholder="Steet address"
                            />
                            <input
                              type="text"
                              name="apartment"
                              ref={register({ required: true })}
                              placeholder="Apartment, suite, unite ect ( optinal )"
                            />
                          </label>
                          {errors.streetAddress || errors.apartment ? (
                            <span className="input-error">
                              Please provide your address
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Town/City <span>*</span>
                            <input
                              type="text"
                              name="town"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.town && (
                            <span className="input-error">
                              Please provide your town/city
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Country/State <span>*</span>
                            <input
                              type="text"
                              name="state"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.state && (
                            <span className="input-error">
                              Please provide your country/State
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Postcode/ZIP <span>*</span>
                            <input
                              type="text"
                              name="zip"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.zip && (
                            <span className="input-error">
                              Please provide your postcode/ZIP
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Order note
                            <input
                              type="text"
                              name="note"
                              placeholder="Note about your order, e.g, special noe for delivery"
                              ref={register()}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <label className="checkbox-label" htmlFor="save">
                      <input
                        type="checkbox"
                        id="save"
                        name="saveInfo"
                        ref={register()}
                      />
                      Save this infomation for next time
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-12 ml-auto">
                  <div className="checkout__total">
                    <h5 className="checkout-title">Your order</h5>
                    <form
                      className="checkout__total__coupon"
                      onSubmit={couponHandleSubmit(onCouponSubmit)}
                    >
                      <h5>Coupon Code</h5>
                      <div className="input-validator">
                        <input
                          type="text"
                          placeholder="Your code here"
                          name="coupon"
                          ref={couponRegister({ required: true })}
                        />
                        {couponErrors.coupon && (
                          <span className="input-error">
                            Please provide a coupon code
                          </span>
                        )}
                      </div>
                      <button className="btn -dark">Apply</button>
                    </form>
                    <div className="checkout__total__price">
                      <h5>Product</h5>
                      <table>
                        <colgroup>
                          <col style={{ width: "70%" }} />
                          <col style={{ width: "30%" }} />
                        </colgroup>
                        <tbody>
                          {cartState.map((item) => (
                            <tr key={item.cartId}>
                              <td>
                                <span>
                                  {formatSingleNumber(item.cartQuantity)}
                                </span>{" "}
                                x {item.name}
                              </td>
                              <td>
                                {formatCurrency(item.price * item.cartQuantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="checkout__total__price__total-count">
                        <table>
                          <tbody>
                            <tr>
                              <td>Subtotal</td>
                              <td>{calculateTotalPrice(cartState, true)}</td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>{calculateTotalPrice(cartState, true)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="checkout__total__price__payment">
                        <label className="checkbox-label" htmlFor="payment">
                          <input
                            type="checkbox"
                            id="payment"
                            name="payment"
                            name="payment"
                            ref={register}
                          />
                          Cheque payment
                        </label>
                        <label className="checkbox-label" htmlFor="paypal">
                          <input
                            type="checkbox"
                            id="paypal"
                            name="paypal"
                            name="paypal"
                            ref={register}
                          />
                          PayPal
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn -red"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InstagramTwo />
    </LayoutFour>
  );
}
