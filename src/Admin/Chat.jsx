import React, { useContext } from "react";
import Contacts from "../newcomponents/Contacts/Contacts";
import Main from "../newcomponents/Main/Main";
import ChatContextProvider from "../contexts/ChatContext";
import UserDetail from "../newcomponents/UserDetail/UserDetail";
import { ChatContext } from "../contexts/ChatContext";
import Hidden from "@material-ui/core/Hidden";
import "../Styles/Chat.css";

export default function Chat() {
  // const { selectedChat } = useContext(ChatContext);
  return (
    <div>
      <Hidden only="xs">
        <div style={{ display: "flex", height: "91.7vh", width: "100vw" }}>
          <ChatContextProvider>
            <Contacts />
            <Main />
            <UserDetail />
          </ChatContextProvider>
        </div>
      </Hidden>

      <Hidden only="lg">
        <div>
          <ChatContextProvider>
            <Contacts />
            <Main />
            <UserDetail />
          </ChatContextProvider>
        </div>
      </Hidden>
    </div>
  );
}
