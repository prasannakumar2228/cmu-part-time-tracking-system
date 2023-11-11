import { configureStore } from "@reduxjs/toolkit";

import homeReducer from "./signUp";
import loginReducer from "./login";
import managerReducer from "./manager";
import studentReducer from "./student";

const store = configureStore({
  reducer: {
    home: homeReducer,
    loginReducer,
    managerReducer,
    studentReducer,
  },
});

export default store;
