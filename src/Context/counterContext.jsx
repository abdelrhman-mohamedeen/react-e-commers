import { createContext, useState } from "react";
export let CounterContext = createContext();
export default function CounterContextProvider(props) {
  const [counter1, setcounter1] = useState(0);
  const [UserName, setUserName] = useState(10);
  return (
    <CounterContext.Provider value={{ counter1, UserName }}>
      {props.children}
    </CounterContext.Provider>
  );
}
