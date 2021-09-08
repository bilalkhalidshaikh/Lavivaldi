import React, { useEffect } from "react";
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
import useRecorder from "../../contexts/useRecorder";
import MicNoneOutlinedIcon from "@material-ui/icons/MicNoneOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import PhotoLibraryOutlinedIcon from "@material-ui/icons/PhotoLibraryOutlined";
import ImageUploading from "react-images-uploading";
import ModalVideo from "react-modal-video";
import Icon from "../Icon";
import Player from "griffith";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";
import CloseIcon from "@material-ui/icons/Close";

const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" },
];

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
  // const [isRecording, setIsRecording] = useState(false);
  // const [blobURL, setBlobURL] = useState("");
  // const [isBlocked, setIsBlocked] = useState(false);
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

  const success = () => {
    message.success("Action in progress..", 2.5);
  };

  const countUpRef = React.useRef(null);

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

  // const showVoiceBar = () =>{
  $(document).ready(function () {
    // $(".voicebar").hide();

    $(".btn-mic").click(function () {
      $(".voicebar").fadeIn("fast");
      // $(".chatinput").hide();
    });
    $(".fa-paper-plane").click(function () {
      $(".chatinput").fadeIn("fast");
      // $(".voicebar").hide();
    });
  });

  let [audioURL, isAudioRecording, startRecording, stopRecording] =
    useRecorder();
  const [counter, setCounter] = useState(0);
  var i = 0;
  const recorder = new MicRecorder({
    bitRate: 128,
  });
  const [blobUrl, setBlobUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  console.log(counter);
  let thetimeout;
  useEffect(() => {
    if (isAudioRecording) {
      thetimeout = setTimeout(() => {
        setCounter(counter + 1);
      }, 1000);
    } else {
      clearTimeout(thetimeout);
    }
  }, [counter, isAudioRecording]);

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCounter(0);
  };

  const [showImageUpload, setShowImageUpload] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [showFIleBar, setShowFIleBar] = useState(true);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setShowFIleBar(true)
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    // setShowFIleBar(false)
  };

  const [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // const [openVideoModal, setOpenVideoModal] = useState(false)
  const hiddenVideoInput = React.useRef(null);
  const hiddenFileInput = React.useRef(null);
  const [videoURL, setVideoURL] = useState();
  const [fileURL, setFileURL] = useState();
  const [openVideoModal, setOpenVideoModal] = React.useState(false);

  const handleClickVideoOpen = () => {
    setOpenVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setOpenVideoModal(false);
  };

  const handleClickVideo = (event) => {
    hiddenVideoInput.current.click();
  };
  const handleChangeVideo = (event) => {
    const fileUploaded = event.target.files[0];
    const videoFileURL = URL.createObjectURL(fileUploaded);
    setVideoURL(videoFileURL);
    console.log(`Here is File   ${videoURL}`);
    setOpenVideoModal(true);
  };
  const handleClickFile = (event) => {
    hiddenVideoInput.current.click();
  };
  const handleChangeFile = (event) => {
    const filefileUploaded = event.target.files[0];
    const docFileURL = URL.createObjectURL(filefileUploaded);
    setFileURL(docFileURL);
    console.log(`Here is File   ${fileURL}`);
    setOpenFileModal(true);
  };

  var playURL =
    videoURL === undefined
      ? "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
      : videoURL;

  var sources = {
    hd: {
      play_url: videoURL,
    },
    sd: {
      play_url: videoURL,
    },
  };

  const [openFileModal, setOpenFileModal] = React.useState(false);

  const handleClickFileOpen = () => {
    setOpenFileModal(true);
  };

  const handleCloseFileModal = () => {
    setOpenFileModal(false);
  };

  const onError = (e) => {
    // logger.logError(e, 'error in file-viewer');
    console.error(e, "error in file-viewer");
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div>
      {showFIleBar ? (
        <>
          <div className="filebar">
            {/* <button onClick={setShowFIleBar(false)}>
             Close
            </button> */}
            {/* <button onClick={()=>{setShowFIleBar(false)}}>close</button> */}
            <IconButton onClick={()=>{setShowFIleBar(false)}}>
              <CloseIcon/>
              </IconButton>
              <h3>Your Selected Video</h3>
              {videoURL === undefined ? null : (
                        <video
                          src={videoURL}
                          width={200}
                          height={150}
                          controls
                        />
                      )}
                      <hr />
          </div>
        </>
      ) : null}
      {isAudioRecording ? (
        <div className="voicebar">
          <div className="chatinput__form-voice">
            <div className="chatinput__icons-voice">
              <IconButton color="white" style={{ color: "white" }}>
                <MicNoneIcon fontSize="large" />
              </IconButton>
              <span>
                {counter < 9 && counter > 0 ? "0" : ""}
                {counter}
              </span>
            </div>
          </div>
          <div className="chatinput__formIcons">
            <div className="chatinput__icons-voice">
              <IconButton color="white" style={{ color: "#020C24" }}>
                <DeleteOutlinedIcon fontSize="large" color="white" />
              </IconButton>
            </div>
          </div>
          <div className="chatinput__icons-voice">
            <IconButton
              color="white"
              style={{ color: "white", backgroundColor: "#020C24" }}
              onClick={stopRecording}
            >
              <i class="fa fa-paper-plane" onClick={handleClickOpen}></i>
            </IconButton>
          </div>
        </div>
      ) : (
        <>
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
                {/* <span      onClick={()=>{setShowFIleBar(true)}}> */}
                <IconButton
                  style={{ width: 40, height: 40, color: "black" }}
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  onClick={handleClickMenu}
                >
                  <AttachFileOutlinedIcon fontSize="small" color="black" />
                </IconButton>
                {/* </span> */}

                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  // keepMounted
                  open={openMenu}
                  onClose={handleCloseMenu}
                  TransitionComponent={Fade}
                  style={{ backgroundColor: "transparent" }}
                >
                  <MenuItem onClick={handleClickVideo}>
                    <input
                      type="file"
                      ref={hiddenVideoInput}
                      style={{ display: "none" }}
                      onChange={handleChangeVideo}
                      multiple
                    />
                    <IconButton
                    //  onClick={handleClickVideoOpen}
                    >
                      <span
                        data-testid="attach-camera"
                        data-icon="attach-camera"
                        className="_1SWzr"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 53 53"
                          width="53"
                          height="53"
                        >
                          <defs>
                            <circle
                              id="camera-SVGID_1_"
                              cx="26.5"
                              cy="26.5"
                              r="25.5"
                            ></circle>
                          </defs>
                          <clipPath id="camera-SVGID_2_">
                            <use
                              xlinkHref="#camera-SVGID_1_"
                              overflow="visible"
                            ></use>
                          </clipPath>
                          <g clipPath="url(#camera-SVGID_2_)">
                            <path
                              fill="#D3396D"
                              d="M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z"
                            ></path>
                            <path
                              fill="#EC407A"
                              d="M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z"
                            ></path>
                            <path fill="#D3396D" d="M17 24.5h15v9H17z"></path>
                          </g>
                          <g fill="#F5F5F5">
                            <path
                              id="svg-camera"
                              d="M27.795 17a3 3 0 0 1 2.405 1.206l.3.403a3 3 0 0 0 2.405 1.206H34.2a2.8 2.8 0 0 1 2.8 2.8V32a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4v-9.385a2.8 2.8 0 0 1 2.8-2.8h1.295a3 3 0 0 0 2.405-1.206l.3-.403A3 3 0 0 1 25.205 17h2.59zM26.5 22.25a5.25 5.25 0 1 0 .001 10.501A5.25 5.25 0 0 0 26.5 22.25zm0 1.75a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z"
                            ></path>
                          </g>
                        </svg>
                      </span>

        
                    </IconButton>
                  </MenuItem>

                  <MenuItem onClick={handleClickFile}>
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                      onChange={handleChangeFile}
                      multiple
                    />
                    <IconButton>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 53 53"
                        width="53"
                        height="53"
                        onClick={() => {
                          console.log("attachDocument...............");
                        }}
                      >
                        <defs>
                          <circle
                            id="document-SVGID_1_"
                            cx="26.5"
                            cy="26.5"
                            r="25.5"
                          ></circle>
                        </defs>
                        <clipPath id="document-SVGID_2_">
                          <use
                            xlinkHref="#document-SVGID_1_"
                            overflow="visible"
                          ></use>
                        </clipPath>
                        <g clipPath="url(#document-SVGID_2_)">
                          <path
                            fill="#5157AE"
                            d="M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z"
                          ></path>
                          <path
                            fill="#5F66CD"
                            d="M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z"
                          ></path>
                        </g>
                        <g fill="#F5F5F5">
                          <path
                            id="svg-document"
                            d="M29.09 17.09c-.38-.38-.89-.59-1.42-.59H20.5c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H32.5c1.1 0 2-.9 2-2V23.33c0-.53-.21-1.04-.59-1.41l-4.82-4.83zM27.5 22.5V18l5.5 5.5h-4.5c-.55 0-1-.45-1-1z"
                          ></path>
                        </g>
                      </svg>

                      {fileURL === undefined ? null : (
                        <FileViewer
                          fileType={"file"}
                          filePath={fileURL}
                          errorComponent={CustomErrorComponent}
                          onError={onError}
                        />
                      )}
                    </IconButton>
                  </MenuItem>

                  <MenuItem>
                    <IconButton
                      onClick={() => {
                        setShowImageUpload(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 53 53"
                        width="53"
                        height="53"
                        onClick={() => {
                          console.log("attachImage...............");
                        }}
                      >
                        <defs>
                          <circle
                            id="image-SVGID_1_"
                            cx="26.5"
                            cy="26.5"
                            r="25.5"
                          ></circle>
                        </defs>
                        <clipPath id="image-SVGID_2_">
                          <use
                            xlinkHref="#image-SVGID_1_"
                            overflow="visible"
                          ></use>
                        </clipPath>
                        <g clipPath="url(#image-SVGID_2_)">
                          <path
                            fill="#AC44CF"
                            d="M26.5-1.1C11.9-1.1-1.1 5.6-1.1 27.6h55.2c-.1-19-13-28.7-27.6-28.7z"
                          ></path>
                          <path
                            fill="#BF59CF"
                            d="M53 26.5H-1.1c0 14.6 13 27.6 27.6 27.6s27.6-13 27.6-27.6H53z"
                          ></path>
                          <path fill="#AC44CF" d="M17 24.5h18v9H17z"></path>
                        </g>
                        <g fill="#F5F5F5">
                          <path
                            id="svg-image"
                            d="M18.318 18.25h16.364c.863 0 1.727.827 1.811 1.696l.007.137v12.834c0 .871-.82 1.741-1.682 1.826l-.136.007H18.318a1.83 1.83 0 0 1-1.812-1.684l-.006-.149V20.083c0-.87.82-1.741 1.682-1.826l.136-.007h16.364zm5.081 8.22l-3.781 5.044c-.269.355-.052.736.39.736h12.955c.442-.011.701-.402.421-.758l-2.682-3.449a.54.54 0 0 0-.841-.011l-2.262 2.727-3.339-4.3a.54.54 0 0 0-.861.011zm8.351-5.22a1.75 1.75 0 1 0 .001 3.501 1.75 1.75 0 0 0-.001-3.501z"
                          ></path>
                        </g>
                      </svg>
                    </IconButton>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onChangeImage}
                      maxNumber={maxNumber}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        // write your building UI
                        <div className="upload__image-wrapper">
                          <button
                            style={isDragging ? { color: "red" } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            Click or Drop here
                          </button>
                          &nbsp;
                          <button onClick={onImageRemoveAll}>
                            Remove all images
                          </button>
                          {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                              <img src={image["data_url"]} alt="" width="100" />
                              <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>
                                  Update
                                </button>
                                <button onClick={() => onImageRemove(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ImageUploading>
                  </MenuItem>
                </Menu>

                {/* .
                <div className="pos-rel">
                  <button
                    aria-label="Attach"
                    onClick={() => setShowAttach(!showAttach)}
                  >
                    <Icon
                      id="attach"
                      className={`chat__input-icon ${
                        showAttach ? "chat__input-icon--pressed" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`chat__attach ${
                      showAttach ? "chat__attach--active" : ""
                    }`}
                  >
                    {attachButtons.map((btn) => (
                      <button
                        className="chat__attach-btn"
                        aria-label={btn.label}
                        key={btn.label}
                      >
                        <Icon id={btn.icon} className="chat__attach-icon" />
                      </button>
                    ))}
                  </div>
                </div>
            */}
              </div>
              <div className="chatinput__icons btn-mic show-count">
                <IconButton
                  color="#000"
                  onClick={startRecording}
                  style={{ width: 20, height: 20, color: "#000" }}
                >
                  <MicNoneOutlinedIcon fontSize="small" color="#000" />
                </IconButton>
              </div>
            </div>
            {/* <div className="chatinput__icons">
          </div> */}

            {
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
                  <audio src={audioURL} controls />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Not Okay
                  </Button>
                  <Button onClick={handleCloseModal} color="primary" autoFocus>
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
            }
            <IconButton
              color="white"
              style={{ color: "white", backgroundColor: "#020C24" }}
            >
              <i class="fa fa-paper-plane"></i>
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInput;
