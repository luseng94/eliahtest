import React from "react";
import Link from "next/link";
import Rate from "../Other/Rate";

export default function Review(props) {
  const { avatar, name, publicDate, rate, children } = props;
  return (
    <div className="review">
      <div className="review__header">
        <div className="review__header__avatar">
          <img
            src="https://i1.wp.com/metro.co.uk/wp-content/uploads/2020/03/GettyImages-1211127989.jpg?quality=90&strip=all&zoom=1&resize=644%2C416&ssl=1"
            alt="Reviewer avatar"
          />
        </div>
        <div className="review__header__info">
          <h5>{name}</h5>
          <p>{publicDate}</p>
        </div>
        <div className="review__header__rate">
          <Rate currentRate={rate} />
        </div>
      </div>
      <p className="review__content">{children}</p>
      <Link href="#">
        <a className="review__report">Report as Inappropriate</a>
      </Link>
    </div>
  );
}
