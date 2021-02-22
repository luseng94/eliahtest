import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useForm } from "react-hook-form";

import Review from "../../Control/Review";

export default function ProductDetailInfoTab({ onReviewSubmit }) {
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className="product-detail__tab">
      <Tabs className="product-detail__tab__content">
        <TabList className="tab__content__header">
          <Tab>Description</Tab>
          <Tab>Shipping & Returns</Tab>
          <Tab>Reviews ( 03 )</Tab>
        </TabList>

        <TabPanel className="tab__content__item -description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>
        </TabPanel>
        <TabPanel className="tab__content__item -ship">
          <h5>
            <span>Ship to </span>New York
          </h5>
          <ul>
            <li>
              Standard Shipping on order over 0kg - 5kg. <span>+10.00</span>
            </li>
            <li>
              Heavy Goods Shipping on oder over 5kg-10kg . <span>+20.00</span>
            </li>
          </ul>
          <h5>Delivery & returns</h5>
          <p>
            We diliver to over 100 countries around the word. For full details
            of the delivery options we offer, please view our Delivery
            information.
          </p>
        </TabPanel>
        <TabPanel className="tab__content__item -review">
          <Review
            avatar="https://i1.wp.com/metro.co.uk/wp-content/uploads/2020/03/GettyImages-1211127989.jpg?quality=90&strip=all&zoom=1&resize=644%2C416&ssl=1"
            name="Zachary Wade"
            publicDate="Mar 17, 2020"
            rate={4}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Review>
          <form onSubmit={handleSubmit(onReviewSubmit)}>
            <h5>Write a review</h5>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="input-validator">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    ref={register({ required: true })}
                  />
                  {errors.name && (
                    <span className="input-error">Please provide a name</span>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="input-validator">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    ref={register({ required: true })}
                  />
                  {errors.email && (
                    <span className="input-error">Please provide an email</span>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="input-validator">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="5"
                    ref={register}
                  />
                </div>
                {errors.message && <span className="input-error"></span>}
              </div>
              <div className="col-12">
                <button className="btn -dark">Write a review</button>
              </div>
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </div>
  );
}
