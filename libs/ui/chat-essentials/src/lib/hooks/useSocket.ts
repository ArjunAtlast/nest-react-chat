/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as io from 'socket.io-client';

export function useSocket(server: string) {

  const socketio = useRef<any>(null);

  useEffect(() => {
    socketio.current = io(server);

    socketio.current.on('connect', () => console.log('Connected to chat server'));

    socketio.current.on('connect_error', () => {
      console.log('Error connecting to chat server. Retrying...');
      setTimeout(() => socketio.current.connect(), 1000);
    });

    return () => {
      socketio.current.disconnect();
      socketio.current.close();
    }
  }, [socketio, server])

  return socketio;
}