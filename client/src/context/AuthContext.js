import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "650350543c7bedf7f235beb0",
    username: "erez",
    email: "erez@gmail.com",
    password: "$2b$10$H0hhSNEaEAGeJpbFuDEaoOimP33UM/2SC0ek9RCLFVBB.ti5rf4a.",
    profileImg: "erez.jpg",
    followers: [],
    following: ["650350543c7bedf7f235beb2"],
    createdAt: { $date: { $numberLong: "1694715988056" } },
    updatedAt: { $date: { $numberLong: "1694716087135" } },
    __v: { $numberInt: "0" },
  },
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
