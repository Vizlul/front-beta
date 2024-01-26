import React, { useState, useEffect } from 'react';
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [lyrics, setLyrics] = useState('');
  const [displayType, setDisplayType] = useState('cover');

  const song = {
    name: 'Long Night pt.||',
    src: 'assets/song.mp3',
    cover: 'assets/song.jpg',
    artist: 'JPB',
    lyrics:
      '2.8 | We gon turn the crib into a club like\n' +
      // ... (omitted for brevity)
      '112  | Got a feelin\' that it\'s gonna be a long night\'\n',
  };

  const audioPlayer = new Audio(song.src);

  useEffect(() => {
    const updateProgressBar = () => {
      const width = (audioPlayer.currentTime * 420) / audioPlayer.duration;
      setProgressWidth(width);
    };

    const updateLyrics = () => {
      const lines = song.lyrics.trim().split('\n');
      const data = [];

      lines.forEach((line) => {
        const [time, lyric] = line.split('|');
        data.push({
          time: parseFloat(time),
          lyric: lyric.trim(),
        });
      });

      data.forEach((item) => {
        if (audioPlayer.currentTime >= item.time) {
          setLyrics(item.lyric);
        }
      });
    };

    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    audioPlayer.addEventListener('timeupdate', updateLyrics);

    return () => {
      audioPlayer.removeEventListener('timeupdate', updateProgressBar);
      audioPlayer.removeEventListener('timeupdate', updateLyrics);
    };
  }, [audioPlayer]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteUnmute = () => {
    audioPlayer.volume = isMuted ? 1 : 0;
    setIsMuted(!isMuted);
  };

  const handleCoverLyricsToggle = () => {
    setDisplayType(displayType === 'cover' ? 'lyrics' : 'cover');
  };

  return (
    <div>
      <audio src={song.src}></audio>
      <div className="card">
        <div className="cover">
          <div className="cover">
            <video src="video.mp4" autoPlay={true} loop muted></video>
          </div>
        </div>
        <div className="progress_bar_wrap">
          <div className="progress_bar"></div>
        </div>
        <div className="card_controls">
          <div className="profile">
            <img src="assets/img.webp" alt="" className="profile_img" />
            <span className="yours">Your Story</span>
            <span className="time">2h</span>
          </div>
          <div className="controls">
            <svg aria-label="Pause" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 48 48" width="16"
              className="pause" style={{ display: "none" }}>
              <path
                d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z">
              </path>
            </svg>
            <svg aria-label="Play" className="play" color="#ffffff" fill="#ffffff" height="16" role="img" viewBox="0 0 24 24"
              width="16">
              <path
                d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z">
              </path>
            </svg>
            <svg aria-label="Audio is playing" className="mute" color="#ffffff" fill="#ffffff" height="16" role="img"
              viewBox="0 0 24 24" width="16">
              <path
                d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z">
              </path>
            </svg>
            <svg aria-label="Audo is muted." className="unmute" color="#ffffff" fill="#ffffff" height="16" role="img"
              viewBox="0 0 48 48" width="16" style={{ display: "none" }}>
              <path clip-rule="evenodd"
                d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4l-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
                fill-rule="evenodd"></path>
            </svg>
            <svg aria-label="Menu" color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24">
              <path
                d="M12 9.75A2.25 2.25 0 1014.25 12 2.25 2.25 0 0012 9.75zm-6 0A2.25 2.25 0 108.25 12 2.25 2.25 0 006 9.75zm12 0A2.25 2.25 0 1020.25 12 2.25 2.25 0 0018 9.75z"
                fill-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
