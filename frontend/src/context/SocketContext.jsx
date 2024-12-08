import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState();
  const [socket, setSocket] = useState();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://react-chat-app-1-54y0.onrender.com/login", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      // socket.on() method is used to listen to events and can be used on both server and client side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close(); //close connection on unmounting
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
