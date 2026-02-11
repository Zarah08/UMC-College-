import { useEffect } from "react";

const VideoConference = () => {
  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: "Islamiya",
      width: "100%",
      height: 600,
      parentNode: document.getElementById("jitsi-container"),
    };
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.onload = () => {
      new window.JitsiMeetExternalAPI(domain, options);
    };
    document.body.appendChild(script);
  }, []);

  return <div id="jitsi-container" style={{ width: "100%", height: "600px" }}></div>;
};

export default VideoConference;
