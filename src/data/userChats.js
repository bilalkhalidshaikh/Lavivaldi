import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import voice from "../Images/audio.mp3";
import Player from "griffith";
import { Image } from "antd";
import { Row, Col } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import ModalImage from "react-modal-image";

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500"
];

class LightboxExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        {/* <button type="button" onClick={() => this.setState({ isOpen: true })}> */}
        {/* <img src={"https://picsum.photos/200"}  onClick={() => this.setState({ isOpen: true })} /> */}
        <Image
          width={100}
          src={"https://picsum.photos/200"}
          onClick={() => this.setState({ isOpen: true })}
        />
        {/* Open Lightbox */}
        {/* </button> */}

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
      </div>
    );
  }
}

const sources = {
  hd: {
    play_url: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4"
  },
  sd: {
    play_url: "https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4"
  }
};

const AudioUrl = sessionStorage.getItem("audioUrl");
console.log(AudioUrl);

const d = new Date();
const time = d.toLocaleTimeString();
console.log(time);

const userChats = [
  {
    id: 1,
    name: "Abdul Haseeb",
    photoUrl: "./images/male.png",
    messages: [
      {
        type: "sent",
        content: "Hey! How are you?",
        timestamp: "18:30"
      },
      {
        type: "received",
        content: (
          <ReactAudioPlayer
            style={{ backgroundColor: "transparent", borderRadius: "0%" }}
            src={voice}
            controls
          />
        ),
        timestamp: "18:31"
      },
      {
        type: "sent",
        content: "Hey! How are you?",
        timestamp: "18:32"
      },

      {
        type: "sent",
        content: (
          <ModalImage
            small={
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
            large={
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
            alt="Hello World!"
          />
        ),
        timestamp: "18:33"
      },
      {
        type: "received",
        content: "Next Question Pleases",
        timestamp: "18:34"
      },
      {
        type: "received",
        content: <Player sources={sources} />,
        timestamp: "18:35"
      },
      {
        type: "sent",
        content: (
          <>
            <audio src={AudioUrl} controls />
          </>
        ),
        timestamp: "18:36"
      },
      {
        type: "received",
        content: (
          <>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
          </>
        ),
        timestamp: "18:36"
      },

      {
        type: "received",
        content: (
          <>
            <ModalImage
              small={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
              large={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
              alt="Here is Image Caption"
            />
            <p> Here is Image Caption</p>
          </>
        ),
        timestamp: time
      },
      {
        type: "received",
        content: "Hey! I'm fine!",
        timestamp: time
      },
      {
        type: "sent",
        content: <Player sources={sources} />,
        timestamp: time
      },
      {
        type: "received",
        content: "Hey! I'm fine!",
        timestamp: time
      },
      {
        type: "received",
        content: (
          <>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
          </>
        ),
        timestamp: "12:20"
      },
      {
        type: "sent",
        content: (
          <ReactAudioPlayer
            style={{ backgroundColor: "transparent", borderRadius: "0%" }}
            src={
              "http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
            }
            controls
          />
        ),
        timestamp: time
      }
    ]
  },
  {
    id: 2,
    name: "Bilal",
    photoUrl: "./images/female.png",
    messages: [
      {
        type: "received",
        content: (
          <>
            <ModalImage
              small={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
              large={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
              alt="Here is Image Caption"
            />
            <p> Here is Image Caption</p>
          </>
        ),
        timestamp: time
      },
      {
        type: "received",
        content: "Hey! I'm fine!",
        timestamp: time
      },
      {
        type: "sent",
        content: <Player sources={sources} />,
        timestamp: time
      },
      {
        type: "received",
        content: "Hey! I'm fine!",
        timestamp: time
      },
      {
        type: "received",
        content: (
          <>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
          </>
        ),
        timestamp: "12:20"
      },
      {
        type: "sent",
        content: (
          <ReactAudioPlayer
            style={{ backgroundColor: "transparent", borderRadius: "0%" }}
            src={
              "http://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
            }
            controls
          />
        ),
        timestamp: time
      },
      {
        type: "sent",
        content: "Hey! How are you?",
        timestamp: "18:30"
      },
      {
        type: "received",
        content: (
          <ReactAudioPlayer
            style={{ backgroundColor: "transparent", borderRadius: "0%" }}
            src={voice}
            controls
          />
        ),
        timestamp: "18:31"
      },
      {
        type: "sent",
        content: "Hey! How are you?",
        timestamp: "18:32"
      },

      {
        type: "sent",
        content: (
          <ModalImage
            small={
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
            large={
              "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
            alt="Here is Image Caption"
          />
        ),
        timestamp: "18:33"
      },
      {
        type: "received",
        content: "Next Question Pleases",
        timestamp: "18:34"
      },
      {
        type: "received",
        content: <Player sources={sources} />,
        timestamp: "18:35"
      },
      {
        type: "sent",
        content: (
          <>
            <audio src={AudioUrl} controls />
          </>
        ),
        timestamp: "18:36"
      },
      {
        type: "received",
        content: (
          <>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
            <Row>
              <Col>
                <LightboxExample />
              </Col>
              <Col>
                <LightboxExample />
              </Col>
            </Row>
          </>
        ),
        timestamp: "18:36"
      }
    ]
  },
  {
    id: 3,
    name: "Alvinia",
    photoUrl: "./images/male2.png",
    messages: [
      {
        type: "received",
        content: "Yo! What's up?",
        timestamp: time
      },
      {
        type: "sent",
        content: "Nothing much. What about you?",
        timestamp: time
      },
      {
        type: "sent",
        content: (
          <>
            {sessionStorage.length ? <audio src={AudioUrl} controls /> : null}
          </>
        ),
        timestamp: time
      }
    ]
  },
  {
    id: 4,
    name: "Riya Malhotra",
    photoUrl: "./images/female2.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      }
    ]
  },
  {
    id: 5,
    name: "Anastassia",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time
      }
    ]
  },
  {
    id: 6,
    name: "Cecilia",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time
      }
    ]
  },
  {
    id: 7,
    name: "Darsey",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time
      }
    ]
  },
  {
    id: 8,
    name: "Eimile",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time
      }
    ]
  },
  {
    id: 9,
    name: "Frederique",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time
      }
    ]
  },
  {
    id: 10,
    name: "Goldarina",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time
      }
    ]
  }
];

export default userChats;
