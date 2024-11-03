import { createContext, useContext } from "react";

export type TStreamPulseMessages = string;

const StreamPulseContext = createContext<TStreamPulseMessages | undefined>(undefined);

export const useStreamPulse = (): TStreamPulseMessages => {
    const ctx = useContext(StreamPulseContext);
    if (!ctx) {
      throw new Error("useStreamPulse must be used within a StreamPulseProvider");
    }
    return ctx;
  };

export default StreamPulseContext;
