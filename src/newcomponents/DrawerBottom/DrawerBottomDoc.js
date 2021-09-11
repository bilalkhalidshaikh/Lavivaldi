import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import ReactPlayer from "react-player";
//importing material-ui
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
//importing material-ui-icons
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
//importing styles
import "../../Styles/DrawerBottomDoc.css";
import { FaFilePdf, FaFileArchive, FaFileWord } from "react-icons/fa";
import Doc from "../../Images/doc.gif"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
    position: "absolute",
    width: "100%",
    // height: '90vh',
    // [theme.breakpoints.up("xs")]: {
    //   width: "100vw",
    // },
    // [theme.breakpoints.up("sm")]: {
    //   width: "70vw",
    // },
    // [theme.breakpoints.up("md")]: {
    //   width: "70vw",
    // },
    // [theme.breakpoints.up("lg")]: {
    //   width: "70vw",
    // },
  },
  paperAnchorBottom: {
    left: "auto",
    right: 0,
    bottom: 0,
    maxHeight: "120%",
    [theme.breakpoints.up("xs")]: {
      top: 52,
    },
    [theme.breakpoints.up("sm")]: {
      top: 65,
    },
    [theme.breakpoints.up("md")]: {
      top: 65,
    },
    [theme.breakpoints.up("lg")]: {
      top: -5,
    },
  },
}));

function DrawerBottom({
  drawerBottom,
  setDrawerBottom,
  fileImageUrl,
  fileDocUrl,
  fileDocName,
  fileDocType,
}) {
  const classes = useStyles();
  // const [{ user }] = useStateValue();
  const [caption, setCaption] = useState("");
  const { roomId } = useParams();

  const handleUpload = (e) => {
    // if (fileImageUrl) {
    //   db.collection("rooms")
    //     .doc(roomId)
    //     .collection("messages")
    //     .add({
    //       photo: fileImageUrl,
    //       // name: user.displayName,
    //       // uid: user.uid,
    //       caption: caption,
    //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     })
    //     .then(function (docRef) {
    //       // console.log("Document written with ID: ", docRef.id);
    //       db.collection("rooms")
    //         .doc(roomId)
    //         .collection("messages")
    //         .doc(docRef.id)
    //         .set(
    //           {
    //             id: docRef.id,
    //           },
    //           { merge: true }
    //         );
    //     })
    //     .catch(function (error) {
    //       console.error("Error adding document: ", error);
    //     });
    //   setFileImageUrl(null);
    // }
    // if (fileVideoUrl) {
    //   db.collection("rooms")
    //     .doc(roomId)
    //     .collection("messages")
    //     .add({
    //       video: fileVideoUrl,
    //       // name: user.displayName,
    //       // uid: user.uid,
    //       caption: caption,
    //       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //     })
    //     .then(function (docRef) {
    //       // console.log("Document written with ID: ", docRef.id);
    //       db.collection("rooms")
    //         .doc(roomId)
    //         .collection("messages")
    //         .doc(docRef.id)
    //         .set(
    //           {
    //             id: docRef.id,
    //           },
    //           { merge: true }
    //         );
    //     })
    //     .catch(function (error) {
    //       console.error("Error adding document: ", error);
    //     });
    //   setFileVideoUrl(null);
    // }
    setCaption("");
    setDrawerBottom(false);
  };

  const handleDrawerClose = () => {
    setDrawerBottom(false);
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="bottom"
        open={drawerBottom}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorBottom: classes.paperAnchorBottom,
        }}
      >
        <div className="drawerBottom__header">
          <div className="drawerBottom__header_container">
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
            <p>Preview</p>
          </div>
        </div>

        <div className="drawerBottom__content">
          <div className="drawerBottom__content_photo">
            {fileDocUrl  ? null : (
              <div className="drawerBottom__content_video">
                <div className="player-wrapper">
                  {/* {fileDocType.match(".pdf,application/pdf") ? (
                    <IconButton className="thumbnail">
                      <a href={fileDocUrl} download>
                        {" "}
                        <img src="https://img.icons8.com/ios-filled/250/000000/pdf--v2.png" />
                        <p>{fileDocName}</p>
                      </a>
                    </IconButton>
                  ) : null}
                  {fileDocType.match(".rar,zip,application/rar,application/zip") ? (
                    <IconButton className="thumbnail">
                      <a href={fileDocUrl} download>
                        {" "}
                        <img src="https://img.icons8.com/glyph-neue/250/000000/zip.png"/>
                        <p>{fileDocName}</p>
                      </a>
                    </IconButton>
                  ) : null}
                  {fileDocType.match(".docx,docx,application/msword") ? (
                    <IconButton className="thumbnail">
                      <a href={fileDocUrl} download>
                        {" "}
                        <img src="https://img.icons8.com/ios-filled/250/000000/word.png"/>
                        <p>{fileDocName}</p>
                      </a>
                    </IconButton>
                  ) : null} */}


                      <IconButton className="thumbnail">
                      <a href={fileDocUrl} download>
                        {" "}
                        <img src={"https://img.icons8.com/ios-filled/250/000000/document--v2.png"}/>
                        <p>{fileDocName}</p>
                      </a>
                    </IconButton>
                    <IconButton onClick={()=>{setDrawerBottom(false)}}>
                    <img src="https://img.icons8.com/ios-filled/100/000000/add--v2.png"/>
                    </IconButton>
                </div>
              </div>
            )}
          </div>
          <div className="drawerBottom__content_caption">
            <input
              type="text"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Fab
              color="primary"
              aria-label="send"
              size="large"
              onClick={handleUpload}
            >
              <div className="chat__icon">
                <SendIcon />
              </div>
            </Fab>
          </div>
        </div>

        {/* <div className="drawerBottom__footer">
          <div>{fileImageUrl ? <img src={fileImageUrl} alt="" /> : null}</div>
        </div> */}
      </Drawer>
    </div>
  );
}

export default DrawerBottom;
