import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "auth/login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: "",
      };

    case "auth/logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    case "auth/error":
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };

    default:
      throw new Error(`Invalid action ${action.type}`);
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ isAuthenticated, error, user }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(user) {
    if (
      user.email === FAKE_USER.email &&
      user.password === FAKE_USER.password
    ) {
      dispatch({ type: "auth/login", payload: FAKE_USER });
    } else {
      dispatch({ type: "auth/error", payload: "Wrong password or email" });
    }
  }

  function logout() {
    dispatch({ type: "auth/logout" });
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, error, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outides the CitiesProvider");
  return context;
}

export { AuthProvider, useAuth };
