import React from "react";
import "./ChatInput.css";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MicIcon from "@material-ui/icons/Mic";
import { useContext, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import Picker from "emoji-picker-react";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { ReactMic } from "react-mic";
import Hidden from "@material-ui/core/Hidden";
import $ from "jquery";
import "../../Styles/Voice.css";

class MicRecorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
    };
  }

  startRecording = () => {
    this.setState({ record: true });
  };

  stopRecording = () => {
    this.setState({ record: false });
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    console.log("recordedBlob is: ", recordedBlob);
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <button onClick={this.stopRecording} type="button">
          Stop
        </button>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ChatInput = ({ setMessages }) => {
  const { selectedChat } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const newMessage = {
        type: "sent",
        content: message,
        timestamp: "9:10 AM",
      };
      setMessages([...selectedChat.messages, newMessage]);
      selectedChat.messages.push(newMessage);
      setMessage("");
      setShowPicker(false);
    }
  };
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const addEmoji = (e, emoji) => {
    setMessage(message + emoji.emoji);
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
    });
  };
  setTimeout(function () {
    setOpen(false);
  }, 5000);

  $(document).ready(function () {
    $(".btn-send").hide();
    $(".region-voice-record").hide();

    $(".input-area").focus(function () {
      $(".btn-send").fadeIn("fast");
      $(".btn-mic").hide();
    });
    $(".input-area").focusout(function () {
      $(".btn-send").hide();
      $(".btn-mic").fadeIn("fast");
    });

    $(".btn-mic").click(function () {
      $(".btn-send, .region-voice-record").fadeIn("fast");
      $(".btn-mic, .input-area").hide();

      $(".voice-recorder-seeker").addClass("seeker-show");

      $(".btn-plus-add").addClass("plus-close");

      $(".plus-close, .btn-send").click(function () {
        $("div").removeClass("seeker-show");
        $("button").removeClass("plus-close");
        $(".btn-send, .region-voice-record").hide();
        $(".btn-mic, .input-area").fadeIn("fast");
      });
    }); //****---- btn---mic ---*/

    $(".btn-plus-add").bind("click", function () {
      $(this).toggleClass("plus-menu-close");
      $(".menu-plus-btns").toggleClass("menu-plus-btns-show");

      $(".btn-mic").click(function () {
        $(".menu-plus-btns").removeClass("menu-plus-btns-show");
      });
    });
  });
  return (
    <div className="chatinput">
      <div className="chatinput__form">
        {showPicker && <Picker onEmojiClick={addEmoji} />}
        <SentimentVerySatisfiedIcon onClick={togglePicker} />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            placeholder="Descrizione del messaggio..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            style={{width:"5em"}}
          />
        </form>
        <div className="chatinput__formIcons">
          {/* <IconButton className="file-icon" style={{marginLeft:"100em"}}> 

          <AttachFileIcon />
          </IconButton> */}
          <Hidden only="xs">
            <div class="right-wrap">
              <div class="head-wrap"></div>
              <div class="chat-wrap"></div>
              <div class="bottom-wrap">
                <div class="region-input-wrap">
                  <button class="btn btn-plus-add">
                    {/* <i class="fa fa-plus"></i> */}
                    <i class="fa fa-plus-circle"></i>
                  </button>
                  {/* <textarea class="input-area" placeholder="say somthing"></textarea> */}
                  <div class="region-voice-record">
                    <i class="fa fa-circle fa-red"></i>
                    <span>0:00</span>
                  </div>
                  <button class="btn btn-mic">
                    <i class="fa fa-microphone"></i>
                  </button>
                  <button class="btn btn-send">
                    <i class="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
              <div class="voice-recorder-seeker">
                <span></span>
              </div>
              <div class="menu-plus-btns">
                <button class="btn btn-add-photo">
                  <i class="fa fa-picture-o"></i>
                </button>
                <button class="btn btn-add-photo">
                  <i class="fa fa-picture-o"></i>
                </button>
                <button class="btn btn-add-photo">
                  <i class="fa fa-picture-o"></i>
                </button>
                <button class="btn btn-add-photo">
                  <i class="fa fa-picture-o"></i>
                </button>
                <button class="btn btn-add-photo">
                  <i class="fa fa-picture-o"></i>
                </button>
                <button class="btn btn-add-photo">
                  <i class="fa fa-picture-o"></i>
                </button>
              </div>
            </div>
          </Hidden>
          <Hidden only="lg">
            <IconButton onClick={handleToggle}>
              <MicIcon />
            </IconButton>
          </Hidden>
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
      <div className="chatinput__icons">
        <SendIcon fontSize="large" />
      </div>
    </div>
  );
};

export default ChatInput;
