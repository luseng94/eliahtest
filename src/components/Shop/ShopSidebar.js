import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import classNames from "classnames";

import SectionTitleOne from "../Sections/SectionTitle/SectionTitleOne";
import { shop } from "../../common/variables";
import { formatCurrency } from "../../common/utils";
import {
  setFilterCategory,
  setFilterBrand,
  setFilterPriceRange,
  resetFilter,
} from "../../redux/actions/shopActions";

export default function ShopSidebar() {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.shopReducers.filter);
  useEffect(() => {
    dispatch(resetFilter());
  }, []);
  return (
    <div className="shop-sidebar">
      <div className="shop-sidebar__content">
        <div className="shop-sidebar__section -categories">
          <SectionTitleOne className="-medium" spaceBottom={30 / 16 + "em"}>
            Categories
          </SectionTitleOne>
          <ul>
            {shop.CATEGORISE.map((item, index) => (
              <li
                key={index}
                className={classNames({
                  active: item === filterData.category,
                })}
              >
                <Link href={process.env.PUBLIC_URL + "#"} key={index}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setFilterCategory(item));
                    }}
                  >
                    {item}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="shop-sidebar__section -refine">
          <SectionTitleOne className="-medium" spaceBottom={30 / 16 + "em"}>
            Refine Search
          </SectionTitleOne>
          <div className="shop-sidebar__section__item">
            <h5>Brand</h5>
            <ul>
              {shop.BRANDS.map((item, index) => (
                <li key={index}>
                  <label htmlFor={"b-" + item}>
                    <input
                      name="brand-filter"
                      type="checkbox"
                      id={"b-" + item}
                      value={item}
                      checked={filterData.brand === item}
                      onChange={() => {
                        if (filterData.brand === item) {
                          dispatch(setFilterBrand(""));
                        } else {
                          dispatch(setFilterBrand(item));
                        }
                      }}
                    />
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="shop-sidebar__section__item">
            <h5>Price</h5>
            <ul>
              {shop.PRICE_POINTS.map((item, index) => {
                let nextVal = shop.PRICE_POINTS[index + 1];
                if (index === shop.PRICE_POINTS.length - 1) {
                  return;
                }
                return (
                  <li key={index}>
                    <label htmlFor={`f${item}t${nextVal}`}>
                      <input
                        type="checkbox"
                        name="price-filter"
                        id={`f${item}t${nextVal}`}
                        value={`f${item}t${nextVal}`}
                        checked={filterData.priceRange.to === nextVal}
                        onChange={() => {
                          if (filterData.priceRange.to === nextVal) {
                            dispatch(setFilterPriceRange({}));
                          } else {
                            dispatch(
                              setFilterPriceRange({ from: item, to: nextVal })
                            );
                          }
                        }}
                      />
                      {formatCurrency(item)} - {formatCurrency(nextVal)}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="shop-sidebar__section">
          <Link href={process.env.PUBLIC_URL + "/shop/fullwidth-4col"}>
            <a className="shop-sidebar__section__banner">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/assets/images/shop/advertisment.png"
                }
                alt="ads"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
