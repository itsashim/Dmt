import { combineReducers } from "redux";
import auth from "./auth";
import ui from "./ui";
import transaction from "./places";
export default combineReducers({
  auth,
  ui,
  transaction,
});
