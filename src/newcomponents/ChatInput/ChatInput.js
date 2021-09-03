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
import Hidden from "@material-ui/core/Hidden";
import $ from "jquery";
import "../../Styles/Voice.css";
import "../../Styles/Counter.css";
import MicRecorder from "mic-recorder-to-mp3";
import CountUp from "react-countup";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { notification } from "antd";
import MicNoneIcon from "@material-ui/icons/MicNone";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { SnackbarProvider, useSnackbar } from "notistack";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function CircularStatic() {
  const [progress, setProgress] = React.useState(1);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 1
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

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
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
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

  // $(document).ready(function () {
  //   $(".btn-send").hide();
  //   $(".region-voice-record").hide();

  //   $(".input-area").focus(function () {
  //     $(".btn-send").fadeIn("slow");
  //     $(".btn-mic").hide();
  //   });
  //   $(".input-area").focusout(function () {
  //     $(".btn-send").hide();
  //     $(".btn-mic").fadeIn("fast");
  //   });

  // $(".btn-mic").click(function () {
  //   $(".btn-send, .region-voice-record").fadeIn("fast");
  //   $(".btn-mic, .input-area").hide();

  //     $(".voice-recorder-seeker").addClass("seeker-show");

  //     $(".btn-plus-add").addClass("plus-close");

  //     $(".plus-close, .btn-send").click(function () {
  //       $("div").removeClass("seeker-show");
  //       $("button").removeClass("plus-close");
  //       $(".btn-send, .region-voice-record").hide();
  //       $(".btn-mic, .input-area").fadeIn("fast");
  //     });
  //   }); //****---- btn---mic ---*/

  //   $(".btn-plus-add").bind("click", function () {
  //     $(this).toggleClass("plus-menu-close");
  //     $(".menu-plus-btns").toggleClass("menu-plus-btns-show");

  //     $(".btn-mic").click(function () {
  //       $(".menu-plus-btns").removeClass("menu-plus-btns-show");
  //     });
  //   });
  // });

  const success = () => {
    message.success("Action in progress..", 2.5);
  };

  const countUpRef = React.useRef(null);
  const StartRecordVoice = () => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };
  const StopRecordVoice = async () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        // this.setState({ blobURL, isRecording: false });
        setIsRecording(false);
        setBlobURL(blobURL);
        sessionStorage.setItem("audioUrl", blobURL);
        console.log(
          `Here is your url ${blobURL} and here is storage ${sessionStorage.getItem(
            "audioUrl"
          )}`
        );
      })
      .catch((e) => console.log(e));
  };

  const [openNot, setOpenNot] = React.useState(false);

  const handleClick = () => {
    setOpenNot(true);
  };

  const handleCloseNot = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNot(false);
  };

  const openNotification = () => {
    const args = {
      message: "Notification Title",
      description:
        "I will never close automatically. This is a purposely very very long description that has many many characters and words.",
      duration: 0,
    };
    notification.open(args);
  };

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);

  };

  let [count, setCount] = useState(0);

  // const showVoiceBar = () =>{
  $(document).ready(function () {
    $(".voicebar").hide();

    $(".btn-mic").click(function () {
      $(".voicebar").fadeIn("fast");
      $(".chatinput").hide();
    });
    $(".fa-paper-plane").click(function () {
      $(".chatinput").fadeIn("fast");
      $(".voicebar").hide();
    });
  });

  const showCounter = () =>{
    for(let i = 0; i < 90000; i++) {
      setTimeout(() => {
        setCount(count+i-i+i)  
        console.log(count)
      }, 100);
    }
  }

  const clearCounter = () => {
    setCount(0);
  };

  const deleteBlob  = ()=>{
    setBlobURL("")
  }

  return (
    <div>
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
            />
          </form>
          <div className="chatinput__formIcons"></div>
          <div className="chatinput__icons">
            <AttachFileIcon
              fontSize="large"
              color="white"
              style={{ color: "white" }}
            />
          </div>
          <div className="chatinput__icons btn-mic show-count" onClick={showCounter}>
            <IconButton
              color="white"
              onClick={StartRecordVoice}
              style={{ width: 40, height: 40, color: "White" }}
            >
              <MicIcon fontSize="large" color="white" />
            </IconButton>
          </div>
        </div>
        <div className="chatinput__icons">
          <SendIcon fontSize="large" color="white" />
        </div>
      </div>

      <div className="voicebar">
        <div className="chatinput__form-voice">
          <div className="chatinput__icons-voice">
            <IconButton color="white" style={{ color: "white" }}>
              <MicNoneIcon fontSize="large" />
            </IconButton>
            <span>{count}</span>
          </div>
          {/* {showPicker && <Picker   onEmojiClick={addEmoji} />}
        <SentimentVerySatisfiedIcon  onClick={togglePicker} />
          <form onSubmit={sendMessage} >
            <input
              type="text"
              value={message}
              placeholder="Descrizione del messaggio..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>
            */}
        </div>
        <div className="chatinput__formIcons">
          <div className="chatinput__icons-voice">
            <IconButton color="white" style={{ color: "#020C24" }} onClick={deleteBlob}>
              <DeleteOutlinedIcon fontSize="large" color="white" />
            </IconButton>
          </div>
        </div>
        <div className="chatinput__icons-voice">
          <IconButton
            color="white"
            style={{ color: "white", backgroundColor: "#020C24" }}
            onClick={handleClick}
          >
            <i class="fa fa-paper-plane" onClick={StopRecordVoice}></i>
          </IconButton>
          <Snackbar
                      open={openNot}
                      autoHideDuration={6000}
                      onClose={handleCloseNot}
                    >
                      <Alert onClose={handleCloseNot} severity="success">
                        Voice Meseage Sent Successfully!{" "}
                        <div>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                          >
                            Listen ?
                          </Button>
                          <Dialog
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"This is Your Voice :)"}
                            </DialogTitle>
                            <DialogContent>
                              <audio src={blobURL} controls />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseModal}
                                color="primary"
                              >
                                Not Okay
                              </Button>
                              <Button
                                onClick={handleCloseModal}
                                color="primary"
                                autoFocus
                              >
                                Okay
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </Alert>
                    </Snackbar>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

{
  /* {blobURL == '' ? null : <audio src={blobURL} controls />} */
}

{
  /* <IconButton className="file-icon" style={{marginLeft:"100em"}}> 

<AttachFileIcon />
          </IconButton> */
}
{
  /*           
            <Hidden only="xs">
              <div class="right-wrap">
                <div class="head-wrap"></div>
                <div class="chat-wrap"></div>
                <div class="bottom-wrap">
                  <div class="region-input-wrap">
                    <button
                      class="btn btn-plus-add"
                      onClick={StopRecordVoice}
                      disabled={!isRecording}
                    >
                      <i class="fa fa-plus"></i>
                      <DeleteOutlineIcon style={{ marginLeft: "-10em" }} />
                    </button>

                    <div class="region-voice-record">
                      <i class="fa fa-circle fa-red"></i>
                      <span>
                        {" "}
                        <CircularStatic />
                      </span>
                    </div>

                    <button
                      class="btn btn-mic"
                      onClick={StartRecordVoice}
                      disabled={isRecording}
                    >
                      <i class="fa fa-microphone"></i>
                    </button>

                    <button
                      class="btn btn-send"
                      onClick={(StopRecordVoice, handleClick)}
                      disabled={!isRecording}
                    >
                      <i class="fa fa-paper-plane"></i>
                    </button>

                    
                  <button class="btn btn-send" onClick={StopRecordVoice,handleClick} disabled={!isRecording}>
                    <i class="fa fa-paper-plane"></i>
                  </button>

                    <Snackbar
                      open={openNot}
                      autoHideDuration={6000}
                      onClose={handleCloseNot}
                    >
                      <Alert onClose={handleCloseNot} severity="success">
                        Voice Meseage Sent Successfully!{" "}
                        <div>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClickOpen}
                          >
                            Listen ?
                          </Button>
                          <Dialog
                            open={openModal}
                            onClose={handleCloseModal}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"This is Your Voice :)"}
                            </DialogTitle>
                            <DialogContent>
                              <audio src={blobURL} controls />
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseModal}
                                color="primary"
                              >
                                Not Okay
                              </Button>
                              <Button
                                onClick={handleCloseModal}
                                color="primary"
                                autoFocus
                              >
                                Okay
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      </Alert>
                    </Snackbar>
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
          */
}
{
  /* <Backdrop
              className={classes.backdrop}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop> */
}
