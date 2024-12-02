import { FC, ReactNode, useEffect, useState } from "react";
import StreamPulseContext, { TStreamPulseMessage } from "../store/context/stream-pulse-ctx";
import { API, ENDPOINTS } from "../common/rest";
import { STREAM_PULSE } from "../core/constant";

export const StreamPulseProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [message, setMessage] = useState<TStreamPulseMessage>(null);
    const [shouldReconnect, setShouldReconnect] = useState(false);

    const initializeEventSource = (): EventSource => {
        console.log('Reconnecting stream!!!');
        const connection = new EventSource(ENDPOINTS[API.STREAM_PULSE_CONNECTION]());

        connection.onmessage = (event: MessageEvent<string>) => {
            const { id } = JSON.parse(event.data);
            const { data: mssg } = JSON.parse(event.data);
            setMessage(mssg);

            console.log(`Stream pulse ${id} says -> ${mssg}`);

            if (mssg === STREAM_PULSE.RECONNECT) {
                console.log("Reconnecting...");
                connection.close();
                setShouldReconnect(true);
            }
        };
        connection.onerror = (): void => {
            console.log("Stream pulse encountered an error, closing...");
            connection.close();
            setShouldReconnect(true);
        };

        return connection;
    };

    useEffect((): () => void => {
        const eventSource = initializeEventSource();
        setShouldReconnect(false);

        return () => eventSource.close();
    }, [shouldReconnect]);

    return (
        <StreamPulseContext.Provider value={message}>
            {children}
        </StreamPulseContext.Provider>
    );
};
