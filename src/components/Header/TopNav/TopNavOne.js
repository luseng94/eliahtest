import React, { useState } from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import SocialIcons from "../../Other/SocialIcons";
import Select from "../../Control/Select";
import { renderContainer } from "../../../common/utils";

export default function TopNavOne({ container }) {
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("ENG");

  return (
    <div className="top-nav .-style-1">
      <div className={renderContainer(container)}>
        <div className="top-nav__wrapper">
          <SocialIcons className="-white" />
          <p className="top-nav__wrapper__promo">
            Free shipping on international orders of $120+
          </p>
          <div className="top-nav__wrapper__selectors">
            selec
            <Select
              id="cur"
              options={["USD", "VND", "YEN"]}
              getValue={(val) => setCurrency(val)}
              className="-white -borderless"
            />
            <Select
              id="lang"
              options={["EN", "VI", "JP"]}
              getValue={(val) => setLanguage(val)}
              className="-white -borderless"
            />
            <Link href={process.env.PUBLIC_URL + "#"}>
              <a className="top-nav__auth">Login/Register</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
