import { FC, ReactNode, useEffect, useState } from "react";
import StreamPulseContext, { TStreamPulseMessages } from "../store/context/stream-pulse-ctx";
import { API, ENDPOINTS } from "../common/rest";

export const StreamPulseProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<TStreamPulseMessages>('');

    useEffect((): () => void => {
        const eventSource = new EventSource(ENDPOINTS[API.STREAM_PULSE_CONNECTION]());

        eventSource.onmessage = (event: MessageEvent<string>) => {
            const { data: newMessage } = event;
            setMessage(newMessage);
            console.log("Stream pulse says -> ", newMessage);
        };

        eventSource.onerror = (): void => eventSource.close();

        return (): void => {
            eventSource.close();
            alert("KILLED STREAM PULSE!");
        }
    }, []);

    return (
        <StreamPulseContext.Provider value={message}>
            {children}
        </StreamPulseContext.Provider>
    );
};

