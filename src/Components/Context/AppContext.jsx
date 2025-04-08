import React, { createContext, useEffect, useState } from "react";

const loggData = createContext();
const signedData = createContext();
const Logged = createContext();
const favouriteBooksList = createContext();

const AppContext = ({ children }) => {
  const [loggedData, setLoggedData] = useState();
  const [signUpData, setSignUpData] = useState("");
  const [isLogged, setIsLogged] = useState(null);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("isLogged");
    setIsLogged(stored === "true");
  }, []);

  return (
    <loggData.Provider value={{ loggedData, setLoggedData }}>
      <signedData.Provider value={{ signUpData, setSignUpData }}>
        <Logged.Provider value={{ isLogged, setIsLogged }}>
          <favouriteBooksList.Provider
            value={{ favouriteBooks, setFavouriteBooks }}
          >
            {children}
          </favouriteBooksList.Provider>
        </Logged.Provider>
      </signedData.Provider>
    </loggData.Provider>
  );
};

export default AppContext;
export { loggData, signedData, Logged, favouriteBooksList };
