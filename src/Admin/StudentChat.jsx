import React, { useContext } from "react";
import Contacts from "../newcomponents/Contacts/StudentContact";
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
        <div style={{ display: "flex", height: "100vh", width: "99.3vw" }}>
          <ChatContextProvider>
            <Hidden only="xs">
              <Contacts />
            </Hidden>
            <Main />
            <Hidden only="xs">
              <UserDetail />
            </Hidden>
          </ChatContextProvider>
        </div>
      </Hidden>
      <Hidden only="lg">
        <div style={{ display: "flex", height: "100vh", width: "99.3vw" }}>
          <ChatContextProvider>
            <Hidden only="xs">
              <Contacts />
            </Hidden>
            <Main />
            <Hidden only="xs">
              <UserDetail />
            </Hidden>
          </ChatContextProvider>
        </div>
      </Hidden>
    </div>
  );
}
