import { createSocket } from "@/config/socket";
import { useAuth } from "@/utils/auth-context";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  connected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connected: false,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const newSocket = createSocket(user?.id);
    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.connect();

    newSocket.on("connect", () => {
      console.log("🟢 Socket connected:", newSocket.id);
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
      setConnected(false);
    });

    return () => {
      newSocket.disconnect();
      socketRef.current = null;
      setSocket(null);
      setConnected(false);
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
