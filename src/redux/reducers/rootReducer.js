import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import shopReducers from "./shopReducers";

const rootReducer = combineReducers({
  cartReducer,
  wishlistReducer,
  shopReducers,
});

export default rootReducer;
