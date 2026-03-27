import { useSocketContext } from "@/utils/socket-context";

export const useSocket = () => {
  const { socket } = useSocketContext();
  if (!socket) {
    console.warn("Socket is not initiated.")
  }
  return socket;
};
