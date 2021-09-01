
import ReactAudioPlayer from "react-audio-player";
import voice from "../Images/audio.mp3";
import Player from 'griffith'



const sources = {
  hd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
  sd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  },
}


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
        timestamp: time,
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
        timestamp: time,
      },
      {
        type: "sent",
        content: "Hey! How are you?",
        timestamp: time,
      },
      
      {
        type: "sent",
        content: <img src="https://picsum.photos/200" />,
        timestamp: time,
      },
      {
        type: "received",
        content: "Next Question Pleases",
        timestamp: time,
      },
      {
        type: "received",
        content: <Player sources={sources} />,
        timestamp: time,
      },
      {
        type: "sent",
        content: <img src="https://picsum.photos/200" />,
        timestamp: time,
      },
    ],
  },
  {
    id: 2,
    name: "Bilal",
    photoUrl: "./images/female.png",
    messages: [
   
      // {
      //   type: "sent",
      //   content: <img src="https://picsum.photos/200" />,
      //   timestamp: time,
      // },
      {
        type: "received",
        content: <> <img src="https://picsum.photos/200" /> <br /> <p>  Here is Image Caption</p> </> ,
        timestamp: time,
      },
      {
        type: "received",
        content: "Hey! I'm fine!",
        timestamp: time,
      },
      {
        type: "sent",
        content: <Player sources={sources} />,
        timestamp: time,
      },
      {
        type: "received",
        content: "Hey! I'm fine!",
        timestamp: time,
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
        timestamp: time,
      },
    ],
  },
  {
    id: 3,
    name: "Alvinia",
    photoUrl: "./images/male2.png",
    messages: [
      {
        type: "received",
        content: "Yo! What's up?",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Nothing much. What about you?",
        timestamp: time,
      },
    ],
  },
  {
    id: 4,
    name: "Riya Malhotra",
    photoUrl: "./images/female2.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
    ],
  },
  {
    id: 5,
    name: "Anastassia",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time,
      },
    ],
  },
  {
    id: 6,
    name: "Cecilia",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time,
      },
    ],
  },
  {
    id: 7,
    name: "Darsey",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time,
      },
    ],
  },
  {
    id: 8,
    name: "Eimile",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time,
      },
    ],
  },
  {
    id: 9,
    name: "Frederique",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time,
      },
    ],
  },
  {
    id: 10,
    name: "Goldarina",
    photoUrl: "./images/male3.png",
    messages: [
      {
        type: "received",
        content: "Hello!",
        timestamp: time,
      },
      {
        type: "sent",
        content: "Good Morning!",
        timestamp: time,
      },
      {
        type: "received",
        content: "Hor gogga",
        timestamp: time,
      },
    ],
  },
];

export default userChats;
