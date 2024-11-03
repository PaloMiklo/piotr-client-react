import { createContext, useContext } from "react";

export type TStreamPulseMessage = { id: string, data: string } | null;

const StreamPulseContext = createContext<TStreamPulseMessage | null>(null);

export const useStreamPulse = (): TStreamPulseMessage => {
  const ctx = useContext(StreamPulseContext);
  if (!ctx) {
    throw new Error("useStreamPulse must be used within a StreamPulseProvider");
  }
  return ctx;
};

export default StreamPulseContext;
