import React, { createContext, useState } from "react";

const loggData = createContext();
const signedData = createContext();
const Logged = createContext();

const AppContext = ({ children }) => {
  const [loggedData, setLoggedData] = useState();
  const [signUpData, setSignUpData] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  return (
    <loggData.Provider value={{ loggedData, setLoggedData }}>
      <signedData.Provider value={{ signUpData, setSignUpData }}>
        <Logged.Provider value={{isLogged,setIsLogged}}>
          {children}
        </Logged.Provider>
      </signedData.Provider>
    </loggData.Provider>
  );
};

export default AppContext;
export { loggData, signedData,Logged };
