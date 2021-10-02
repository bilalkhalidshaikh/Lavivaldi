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
import { Upload, Form } from "antd";
import ImgCrop from "antd-img-crop";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";
import CloseIcon from "@material-ui/icons/Close";
import DocViewer from "react-doc-viewer";
import { Modal } from "react-bootstrap";
import {
  FaRegFilePdf,
  FaFileArchive,
  FaFileWord,
  FaFileImage,
  FaVideo,
  FaFilePdf,
  FaImage
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useStateValue } from "../../StateProvider";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DrawerBottom from "../DrawerBottom/DrawerBottom";
import DrawerBottomDoc from "../DrawerBottom/DrawerBottomDoc";
import DrawerBottomVideo from "../DrawerBottom/DrawerBottomVideo";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PersonIcon from "@material-ui/icons/Person";

const toastInfo = (toastTitle, toastId, position) => {
  toast.info(toastTitle, {
    toastId: toastId,
    position: position,
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};

function TooltipCustom({ name, icon, onClick }) {
  return (
    <div>
      <Tooltip
        title={
          <span style={{ fontSize: "14px", padding: "8px 5px 8px 5px" }}>
            {name}
          </span>
        }
        placement="bottom-end"
      >
        <IconButton onClick={onClick}>{icon}</IconButton>
      </Tooltip>
    </div>
  );
}

const attachButtons = [
  { icon: "attachRooms", label: "Choose room" },
  { icon: "attachContacts", label: "Choose contact" },
  { icon: "attachDocument", label: "Choose document" },
  { icon: "attachCamera", label: "Use camera" },
  { icon: "attachImage", label: "Choose image" }
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
  value: PropTypes.number.isRequired
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
    color: "#fff"
  }
}));

const ChatInput = ({
  setMessages,
  roomName,
  roomId,
  db,
  firebase,
  storage
}) => {
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
        timestamp: "9:10 AM"
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
      duration: 0
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
    bitRate: 128
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
  const [show, setShow] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [anchorElBar, setAnchorElBar] = React.useState(null);
  const openMenuBar = Boolean(anchorElBar);
  const [showFIleBar, setShowFIleBar] = useState(false);

  const [fileImageUrl, setFileImageUrl] = useState(null);
  const [fileVideoUrl, setFileVideoUrl] = useState(null);
  const [fileDocUrl, setFileDocUrl] = useState(null);
  const [fileDocName, setfileDocName] = useState(null);
  const [fileDocType, setfileDocType] = useState(null);
  const [showAttachFile, setShowAttachFile] = useState(false);
  const [drawerBottom, setDrawerBottom] = useState(false);
  const [drawerVideoBottom, setDrawerVideoBottom] = useState(false);
  const [drawerDocBottom, setDrawerDocBottom] = useState(false);

  const attachFile = () => {
    const attachToastId = "attach";
    toastInfo(
      "All icons have the same functions, you can only upload images, gifs and videos!",
      attachToastId,
      "top-center"
    );
    if (showAttachFile === false) {
      setShowAttachFile(true);
    } else {
      setShowAttachFile(false);
    }
    // console.log("attachFile click", attachToastId);
  };

  const handleCloseBarModal = () => setShow(false);
  const handleCloseDocBarModal = () => setShowDoc(false);
  const handleCloseImgBarModal = () => setShowImg(false);
  const handleShowBarModal = () => setShow(true);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // setShowFIleBar(true);
  };
  const handleClickMenuBar = (event) => {
    setAnchorElBar(event.currentTarget);
    // setShowFIleBar(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    // setShowFIleBar(false)
  };
  const handleCloseMenuBar = () => {
    setAnchorElBar(null);
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
  const hiddenImageInput = React.useRef(null);
  const [videoURL, setVideoURL] = useState();
  const [fileURL, setFileURL] = useState();
  const [imageURL, setImageURL] = useState();
  const [openVideoModal, setOpenVideoModal] = React.useState(false);
  const [videoSelectedFile, setVideoSelectedFile] = useState({
    fileLink: "",
    fileType: ""
  });
  const [docSelectedFile, setDocSelectedFile] = useState({
    fileLink: "",
    fileType: ""
  });
  const [imageSelectedFile, setImageSelectedFile] = useState({
    fileLink: "",
    fileType: ""
  });

  const handleVideoFileChange = (e) => {
    const videofile = e.target.files[0];
    const videofilelink = URL.createObjectURL(videofile);
    const updatedVideoState = {
      fileLink: videofilelink,
      fileType: videofile.type
    };
    setVideoSelectedFile({ ...videoSelectedFile, ...updatedVideoState });
    setShow(true);
    setAnchorEl(null);
    console.log(
      `Video link ${videoSelectedFile.fileLink} and Type ${videoSelectedFile.fileType}`
    );
    handleClickMenuBar(0);
  };

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
    hiddenFileInput.current.click();
  };
  const handleChangeFile = (event) => {
    const filefileUploaded = event.target.files[0];
    const docFileURL = URL.createObjectURL(filefileUploaded);
    const updateDocSelectedFile = {
      fileLink: docFileURL,
      fileType: filefileUploaded.type
    };
    setDocSelectedFile({ ...docSelectedFile, ...updateDocSelectedFile });
    setAnchorEl(null);
    setShowDoc(true);
    console.log(
      `Doc link ${docSelectedFile.fileLink} and Type ${docSelectedFile.fileType}`
    );
  };
  const handleClickImage = (event) => {
    hiddenImageInput.current.click();
  };
  const handleChangeImage = (event) => {
    const imageUploaded = event.target.files[0];
    const imageFileURL = URL.createObjectURL(imageUploaded);
    const updateImageSelectedFile = {
      fileLink: imageFileURL,
      fileType: imageUploaded.type
    };
    setAnchorEl(null);
    setShowImg(true);
    setImageSelectedFile({ ...imageSelectedFile, ...updateImageSelectedFile });
    console.log(
      `Image link ${imageSelectedFile.fileLink} and Type ${imageSelectedFile.fileType}`
    );
  };
  const docs = [
    { uri: fileURL },
    { uri: fileURL } // Local File
  ];

  var playURL =
    videoURL === undefined
      ? "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
      : videoURL;

  var sources = {
    hd: {
      play_url: videoURL
    },
    sd: {
      play_url: videoURL
    }
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
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    }
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

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  const onImageFileChange = async (e) => {
    const fileSizeToastId = "fileSizeToastId";
    const file = e.target.files[0];
    if (file.size > 12 * 1024 * 1024) {
      toastInfo(
        "File should not exceed more than 12MB",
        fileSizeToastId,
        "top-center"
      );
    } else {
      // const storageRef = storage.ref();
      if (file.type.match("image.*")) {
        // const imagesRef = storageRef.child(`rooms/${roomName}/images/`);
        // const fileRef = imagesRef.child(new Date().getTime() + " " + file.name);
        // await fileRef.put(file);
        setFileImageUrl(URL.createObjectURL(file));
        console.log("uploading image", fileImageUrl);
      } else if (file.type.match("video.*")) {
        // const videosRef = storageRef.child(`rooms/${roomName}/videos`);
        // const fileRef = videosRef.child(new Date().getTime() + " " + file.name);
        // await fileRef.put(file);
        setFileVideoUrl(URL.createObjectURL(file));
        console.log("uploading video", fileVideoUrl);
      }
      setDrawerBottom(true);
    }
  };

  const handleClickAway = () => {
    setShowAttachFile(false);
  };
  const onVideoFileChange = async (e) => {
    const fileSizeToastId = "fileSizeToastId";
    const videofilehref = e.target.files[0];
    {
      if (videofilehref.type.match("video.*")) {
        // const videosRef = storageRef.child(`rooms/${roomName}/videos`);
        // const fileRef = videosRef.child(new Date().getTime() + " " + file.name);
        // await fileRef.put(file);
        setFileVideoUrl(URL.createObjectURL(videofilehref));
        console.log(
          "uploading video",
          fileVideoUrl,
          "Type ",
          videofilehref.type
        );
      }
      setDrawerVideoBottom(true);
    }
  };
  const onDocFileChange = async (e) => {
    const fileSizeToastId = "fileSizeToastId";
    const docfilehref = e.target.files[0];
    {
      // if (
      //   docfilehref.type.match(
      //     ".doc,.docx,application/msword,.pdf,.zip,application/zip,.rar,application/rar,application/pdf"
      //   )
      // )
      {
        // const videosRef = storageRef.child(`rooms/${roomName}/videos`);
        // const fileRef = videosRef.child(new Date().getTime() + " " + file.name);
        // await fileRef.put(file);
        await setFileDocUrl(URL.createObjectURL(docfilehref));
        await setfileDocName(docfilehref.name);
        await setfileDocType(docfilehref.type);
        console.log("uploading Doc", fileDocUrl, "Type :", fileDocType);
      }
      setDrawerDocBottom(true);
    }
  };

  const attachFileLists = [
    {
      title: "Room 'Available Soon'",
      icon: <VideoCallIcon color="#fff" style={{ color: "#fff" }} />,
      id: Math.random() * 100000
    },
    {
      title: "Contact   'Available Soon'",
      icon: <PersonIcon style={{ color: "#fff" }} color="#fff" />,
      id: Math.random() * 100000
    },
    {
      title: "Document",
      icon: (
        <InsertDriveFileIcon
          onClick={handleClickFile}
          style={{ color: "#fff" }}
          color="#fff "
        />
      ),
      id: Math.random() * 100000
    },
    {
      title: "Photos",
      icon: (
        <CameraAltIcon
          onClick={handleClickImage}
          style={{ color: "#fff" }}
          color="#fff"
        />
      ),
      id: Math.random() * 100000
    },
    {
      title: "Videos",
      icon: (
        <PhotoIcon
          onClick={handleClickVideo}
          style={{ color: "#fff" }}
          color="#fff"
        />
      ),
      id: Math.random() * 100000
    }
  ];

  return (
    <div>
      <DrawerBottom
        drawerBottom={drawerBottom}
        setDrawerBottom={setDrawerBottom}
        fileVideoUrl={fileVideoUrl}
        fileImageUrl={fileImageUrl}
        setFileImageUrl={setFileImageUrl}
        setFileVideoUrl={setFileVideoUrl}
        roomId={roomId}
        db={db}
        firebase={firebase}
        storage={storage}
      />
      <DrawerBottomVideo
        drawerBottom={drawerVideoBottom}
        setDrawerBottom={setDrawerVideoBottom}
        fileVideoUrl={fileVideoUrl}
        setFileVideoUrl={setFileVideoUrl}
        roomId={roomId}
        db={db}
        firebase={firebase}
        storage={storage}
      />
      <DrawerBottomDoc
        drawerBottom={drawerDocBottom}
        setDrawerBottom={setDrawerDocBottom}
        fileImageUrl={fileImageUrl}
        fileDocUrl={fileDocUrl}
        fileDocName={fileDocName}
        fileDocType={fileDocType}
      />

      {showFIleBar ? (
        <>
          <div className="filebar">
            {/* <button onClick={setShowFIleBar(false)}>
             Close
            </button> */}
            {/* <button onClick={()=>{setShowFIleBar(false)}}>close</button> */}
            <IconButton
              onClick={() => {
                setShowFIleBar(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <h6 style={{ color: "#ccc" }}>
              {" "}
              {videoURL === undefined ? "Please Select" : "Here is the Video"}
            </h6>
            {videoURL === undefined ? null : (
              <video src={videoURL} width={200} height={150} controls />
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
            <Modal
              show={show}
              onHide={handleCloseBarModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Selected Files</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {videoSelectedFile.fileLink === "" ? null : (
                  <span style={{ color: "#333", fontSize: "12pt" }}>
                    Selected Vidoes <FaVideo /> <br />{" "}
                    <video
                      width={150}
                      height={150}
                      controls
                      src={videoSelectedFile.fileLink}
                    />
                  </span>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBarModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseBarModal}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showDoc}
              onHide={handleCloseDocBarModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              dialogClassName="modal-130w"
              // style={{height:"200em"}}
            >
              <Modal.Header closeButton>
                <Modal.Title>Selected Files</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {docSelectedFile.fileLink === "" ? null : (
                  <>
                    {" "}
                    <span style={{ color: "#333", fontSize: "12pt" }}>
                      Selected File <FaFilePdf /> <br />
                    </span>
                  </>
                )}
                {
                  (docSelectedFile.fileType = "application/pdf" ? (
                    <a href={docSelectedFile.fileLink} download>
                      {" "}
                      <FaFilePdf />{" "}
                    </a>
                  ) : (
                    <a href={docSelectedFile.fileLink} download>
                      <FaFileArchive />
                    </a>
                  ))
                }
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDocBarModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseDocBarModal}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showImg}
              onHide={handleCloseImgBarModal}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Selected Files</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {imageSelectedFile.fileLink === "" ? null : (
                  <>
                    Selected Images <FaImage /> <br />{" "}
                    <img
                      src={imageSelectedFile.fileLink}
                      width={150}
                      height={150}
                    />
                    <img
                      src={imageSelectedFile.fileLink}
                      width={150}
                      height={150}
                    />
                    <img
                      src={imageSelectedFile.fileLink}
                      width={150}
                      height={150}
                    />
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseImgBarModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleCloseImgBarModal}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

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
                <IconButton
                  style={{ width: 40, height: 40, color: "black" }}
                  aria-controls="fade-menu"
                  aria-haspopup="true"
                  // onClick={handleClickMenu}
                >
                  {/* <AttachFileOutlinedIcon fontSize="small" color="black" /> */}

                  <div>
                    <TooltipCustom
                      name="Attach"
                      icon={
                        <>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="34"
                            height="34"
                          >
                            <path
                              fill="#020C24"
                              d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
                            ></path>
                          </svg>
                        </>
                      }
                      onClick={attachFile}
                    />
                    {showAttachFile ? (
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <div className="chat__attachFile">
                          {attachFileLists.map((attachFileList) => (
                            <Slide
                              key={attachFileList.id}
                              direction="up"
                              in={attachFile}
                              mountOnEnter
                              unmountOnExit
                            >
                              <Tooltip
                                title={
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      padding: "8px 5px 8px 5px"
                                    }}
                                  >
                                    {attachFileList.title}
                                  </span>
                                }
                                placement="left"
                              >
                                <Fab
                                  color="#020C24"
                                  style={{ background: "#020C24" }}
                                  variant="circular"
                                  aria-label="person"
                                >
                                  <div className="chat__icon">
                                    {/* <label htmlFor="file-input"> */}
                                    {attachFileList.icon}
                                    {/* </label> */}
                                    <input
                                      id="file-input"
                                      type="file"
                                      onChange={onImageFileChange}
                                      accept="image/*"
                                      multiple
                                      ref={hiddenImageInput}
                                    />
                                    <input
                                      id="file-input"
                                      type="file"
                                      onChange={onVideoFileChange}
                                      accept="video/*"
                                      multiple
                                      ref={hiddenVideoInput}
                                    />
                                    <input
                                      id="file-input"
                                      type="file"
                                      onChange={onDocFileChange}
                                      accept=".doc,.docx,application/msword,.pdf,.zip,application/zip,.rar,application/rar,application/pdf"
                                      ref={hiddenFileInput}
                                    />
                                  </div>
                                </Fab>
                              </Tooltip>
                            </Slide>
                          ))}
                        </div>
                      </ClickAwayListener>
                    ) : null}
                  </div>
                </IconButton>
                {/* 
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  style={{
                    marginTop: "-60px",
                    border: "none",
                    outline: "none",
                    marginLeft: "-20em",
                  }}
                  open={openMenu}
                  variant="menu"
                  onClose={handleCloseMenu}
                  TransitionComponent={Fade}
                  PaperProps={{
                    style: {
                      width: "48%",
                      maxWidth: "48%",
                      left: 0,
                      right: 0,
                    },
                  }}
                  anchorOrigin={{ vertical: "bottom" }}
                  transformOrigin={{ vertical: "top" }}
                >
                  <MenuItem
                    onClick={handleClickVideo}
                    style={{ backgroundColor: "#020C24" }}
                  >
                    <input
                      type="file"
                      ref={hiddenVideoInput}
                      style={{ display: "none" }}
                      onChange={handleVideoFileChange}
                      multiple
                      accept="video/*"
                    />
                    <IconButton>
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


                      <span style={{ color: "#ccc", fontSize: "12pt" }}>
                        Add Video
                      </span>
                    </IconButton>
                  </MenuItem>

                  <MenuItem
                    onClick={handleClickFile}
                    style={{ backgroundColor: "#020C24" }}
                  >
                    <input
                      type="file"
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                      onChange={handleChangeFile}
                      multiple
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,.rar,.zip"
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
                      <span style={{ color: "#ccc", fontSize: "12pt" }}>
                        Add Document
                      </span>
                    </IconButton>
                  </MenuItem>

                  <MenuItem
                    style={{ backgroundColor: "#020C24" }}
                    onClick={handleClickImage}
                  >
                    <input
                      type="file"
                      ref={hiddenImageInput}
                      style={{ display: "none" }}
                      onChange={handleChangeImage}
                      multiple
                      accept="image/*"
                    />
                    <IconButton
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
                      <span style={{ color: "#ccc", fontSize: "12pt" }}>
                        Add Images
                      </span>
                    </IconButton>
                 
                  </MenuItem>
                </Menu>
 */}

                <Menu
                  id="fade-menu"
                  anchorEl={anchorElBar}
                  style={{
                    marginTop: "-60px",
                    border: "none",
                    outline: "none",
                    marginLeft: "-20em"
                  }}
                  open={openMenuBar}
                  variant="menu"
                  onClose={handleCloseMenuBar}
                  TransitionComponent={Fade}
                  PaperProps={{
                    style: {
                      width: "48%",
                      maxWidth: "48%",
                      left: 0,
                      right: 0
                    }
                  }}
                  anchorOrigin={{ vertical: "bottom" }}
                  transformOrigin={{ vertical: "top" }}
                >
                  <MenuItem style={{ backgroundColor: "#020C24" }}></MenuItem>

                  <MenuItem style={{ backgroundColor: "#020C24" }}></MenuItem>

                  <MenuItem style={{ backgroundColor: "#020C24" }}></MenuItem>
                </Menu>
              </div>
              <div className="chatinput__icons btn-mic show-count">
                <IconButton
                  // color="#000"
                  onClick={startRecording}
                  // style={{ width: 20, height: 20, color: "#000" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="34"
                    height="34"
                  >
                    <path
                      fill="#020C24"
                      d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"
                    ></path>
                  </svg>
                </IconButton>
              </div>
            </div>
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
