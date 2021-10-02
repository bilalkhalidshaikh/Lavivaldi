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
import Doc from "../../Images/doc.gif";
import { Hidden } from "@material-ui/core";
import { Document, Page } from "react-pdf";
import example from "../../Images/example.pdf";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawerPaper: {
    position: "absolute",
    width: "100%"
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
      top: 52
    },
    [theme.breakpoints.up("sm")]: {
      top: 65
    },
    [theme.breakpoints.up("md")]: {
      top: 65
    },
    [theme.breakpoints.up("lg")]: {
      top: 0
    }
  }
}));

function DrawerBottom({
  drawerBottom,
  setDrawerBottom,
  fileImageUrl,
  fileDocUrl,
  fileDocName,
  fileDocType
}) {
  const classes = useStyles();
  const [caption, setCaption] = useState("");
  const { roomId } = useParams();

  const handleUpload = (e) => {
    setCaption("");
    setDrawerBottom(false);
  };

  const handleDrawerClose = () => {
    setDrawerBottom(false);
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="bottom"
        open={drawerBottom}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorBottom: classes.paperAnchorBottom
        }}
      >
        <div className="drawerBottom__header">
          <div className="drawerBottom__header_container">
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
            <p>{fileDocName}</p>
          </div>
        </div>

        <div className="drawerBottom__content">
          <div className="drawerBottom__content_photo">
            {fileDocType ? (
              <div className="drawerBottom__content_video">
                <div className="player-wrapper">
                  {fileDocType.match("application/pdf") ? (
                    <>
                      {/* <IconButton className="thumbnail">
                      <a href={fileDocUrl} download>
                        <img src="https://img.icons8.com/ios-filled/250/000000/pdf--v2.png" />
                        <p>{fileDocName}</p>
                      </a>
                    </IconButton> */}
                      <div style={{ marginLeft: "23em" }}>
                        <Document
                          file={fileDocUrl}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber} height={400} />
                        </Document>
                        <p>
                          Page {pageNumber} of {numPages}
                        </p>
                      </div>
                      <Hidden only="lg">
                        <IconButton className="thumbnail-mobile">
                          <a href={fileDocUrl} download>
                            <img src="https://img.icons8.com/ios-filled/250/000000/pdf--v2.png" />
                            <p>{fileDocName}</p>
                          </a>
                        </IconButton>
                      </Hidden>
                    </>
                  ) : null}
                  {fileDocType.match("application/x-zip-compressed") ? (
                    <>
                      <IconButton className="thumbnail">
                        <a href={fileDocUrl} download>
                          {" "}
                          <img src="https://img.icons8.com/glyph-neue/250/000000/zip.png" />
                          <p>{fileDocName}</p>
                        </a>
                      </IconButton>
                      <Hidden only="lg">
                        <IconButton className="thumbnail-mobile">
                          <a href={fileDocUrl} download>
                            {" "}
                            <img src="https://img.icons8.com/glyph-neue/250/000000/zip.png" />
                            <p>{fileDocName}</p>
                          </a>
                        </IconButton>
                      </Hidden>
                    </>
                  ) : null}
                  {fileDocType.match("application/msword") ? (
                    <>
                      <IconButton className="thumbnail">
                        <a href={fileDocUrl} download>
                          {" "}
                          <img src="https://img.icons8.com/ios-filled/250/000000/word.png" />
                          <p>{fileDocName}</p>
                        </a>
                      </IconButton>
                      <Hidden only="lg">
                        <IconButton className="thumbnail-mobile">
                          <a href={fileDocUrl} download>
                            {" "}
                            <img src="https://img.icons8.com/ios-filled/250/000000/word.png" />
                            <p>{fileDocName}</p>
                          </a>
                        </IconButton>
                      </Hidden>
                    </>
                  ) : null}

                  {/* <IconButton className="thumbnail">
                      <a href={fileDocUrl} download>
                        {" "}
                        <img src={"https://img.icons8.com/ios-filled/250/000000/document--v2.png"}/>
                        <p>{fileDocName}</p>
                      </a>
                    </IconButton> */}
                  {/* <IconButton onClick={()=>{setDrawerBottom(false)}}>
                    <img src="https://img.icons8.com/ios-filled/100/000000/add--v2.png"/>
                    </IconButton> */}
                </div>
              </div>
            ) : null}
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

        <div className="drawerBottom__footer">
          <div>{fileImageUrl ? null : null}</div>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerBottom;
