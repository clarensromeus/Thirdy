import { createContext } from "react";
import { InitialData } from "./ContextData";

type IData = typeof InitialData;

// define the context
const Context = createContext<IData>({} as IData);

export default Context;
