import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "https://iccd.freelanceserver.matzsolutions.com/";
// const SOCKET_URL = "http://192.168.18.18:22306/";
const SOCKET_URL = "http://192.168.100.8:22306/";



export const createSocket = (userID: string): Socket => {
  return io(SOCKET_URL, {
    transports: ["websocket",'polling'],
    query: {
        userId: userID,
      },
    autoConnect: false,
  });
};
