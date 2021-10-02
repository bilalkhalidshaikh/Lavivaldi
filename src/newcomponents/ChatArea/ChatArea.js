import { useEffect, useState } from "react";
import ChatInput from "../ChatInput/ChatInput";
import ReceiverMessage from "../ReceiverMessage/ReceiverMessage";
import SenderMessage from "../SenderMessage/SenderMessage";
import "./ChatArea.css";

import { useStateValue } from "../../StateProvider";
import { useHistory, useParams } from "react-router-dom";

const ChatArea = ({ messages, setMessages }) => {
  const history = useHistory();
  const { roomId } = useParams();
  const [_roomId, set_RoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomCreatedBy, setRoomCreatedBy] = useState("");
  const [roomOwner, setRoomOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLandingScreenPhoto, setShowLandingScreenPhoto] = useState(false);

  return (
    <div className="chatarea">
      <div className="chatarea__container"></div>
      <div className="chatarea__messages">
        {messages.map((message, index) => {
          return message.type === "sent" ? (
            <SenderMessage key={index} message={message} />
          ) : (
            <ReceiverMessage key={index} message={message} />
          );
        })}
      </div>
      <ChatInput
        setMessages={setMessages}
        roomName={roomName}
        roomId={roomId}
        db={"db"}
        firebase={"firebase"}
        storage={"storage"}
      />
    </div>
  );
};

export default ChatArea;
