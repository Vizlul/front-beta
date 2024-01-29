import React, { useState, useEffect, useRef } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ finishPopup }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playIconRef = useRef<SVGSVGElement>(null);
  const pauseIconRef = useRef<SVGSVGElement>(null);

  const playToggleHandler = () => {
    const video = videoRef.current;

    if (!video) return;

    const playIcon = playIconRef.current!;
    const pauseIcon = pauseIconRef.current!;

    isPlaying ? video.pause() : video.play();

    playIcon.classList.toggle("hidden", !isPlaying);
    pauseIcon.classList.toggle("hidden", isPlaying);
    setIsPlaying((prev) => !prev);
  };

  const playHandler = () => {
    setTimeout(() => {
      const video = videoRef.current;
      const progressBar = document.querySelector(".progress_bar") as HTMLDivElement;
      video?.play();

      if (!video) return;

      video.addEventListener("timeupdate", () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percent}%`;
      });

      video.addEventListener("ended", () => {
        // Call your function to show a popup here
        console.log("Video ended");
      });
    }, 1000);
  };

  useEffect(() => {
    if (finishPopup) {
      playHandler();
    }
  }, [finishPopup]);

  return (
    <div>
      <div className="card">
        <div className="cover">
          <video
            ref={videoRef}
            src="video.mp4"
            autoPlay={true}
            playsInline
            controls={false}
            preload="auto"
            type="video/mp4"
          ></video>
        </div>
        <div className="progress_bar_wrap">
          <div className="progress_bar"></div>
        </div>
        <div className="card_controls">
          <div className="profile">
            <img src="visard-character.svg" alt="" className="profile_img" />
            <span className="yours">ویزارد</span>
          </div>
          <div className="controls">
            <svg
              ref={pauseIconRef}
              onClick={playToggleHandler}
              aria-label="Pause"
              color="#ffffff"
              fill="#ffffff"
              height="16"
              role="img"
              viewBox="0 0 48 48"
              width="16"
              className="pause"
            >
              <path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path>
            </svg>
            <svg
              ref={playIconRef}
              onClick={playToggleHandler}
              aria-label="Play"
              className="play hidden"
              color="#ffffff"
              fill="#ffffff"
              height="16"
              role="img"
              viewBox="0 0 24 24"
              width="16"
            >
              <path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
