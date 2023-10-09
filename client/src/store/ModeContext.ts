import { createContext } from "react";
import { InitialMode } from "./ContextData";

type Mode = typeof InitialMode;

const modeContext = createContext<Mode>({} as Mode);

export default modeContext;
