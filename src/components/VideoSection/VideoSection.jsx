import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Settings,
  Maximize,
  Minimize,
  AlertCircle,
} from "lucide-react";
import styles from "./VideoSection.module.css";

const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null); // Ref for the container to observe
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const controlsTimeoutRef = useRef(null);

  // Reliable test video
  const VIDEO_SRC =
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  const POSTER_SRC =
    "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg";

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // --- INTERSECTION OBSERVER (Play when visible) ---
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Video is in view -> Play
          // Only play if not errored
          if (!videoError) {
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch((e) => console.log("Autoplay blocked/failed:", e));
          }
        } else {
          // Video is out of view -> Pause
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [videoError]); // Re-run if error state changes

  // Clean up controls timeout
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (videoError) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch((e) => console.error("Play error:", e));
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const current = video.currentTime;
    const total = video.duration;

    if (Number.isFinite(total) && total > 0) {
      setProgress((current / total) * 100);
    }
    setCurrentTime(formatTime(current));
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) {
      setDuration(formatTime(video.duration));
      setVideoError(false);
    }
  };

  const handleError = (e) => {
    console.error("Video Error:", e);
    setVideoError(true);
    setIsPlaying(false);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    const seekTime = (e.target.value / 100) * video.duration;
    if (Number.isFinite(seekTime)) {
      video.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime += seconds;
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      if (videoRef.current.parentElement.requestFullscreen) {
        videoRef.current.parentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef} // Attach observer here
      className={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className={styles.container}>
        <div className={styles.videoWrapper}>
          {/* Error Message UI */}
          {videoError && (
            <div className={styles.errorOverlay}>
              <AlertCircle size={48} color="#ef4444" />
              <p>Video failed to load.</p>
            </div>
          )}

          <video
            ref={videoRef}
            className={styles.video}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted={isMuted}
            loop
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleError}
            onClick={togglePlay}
          />

          {/* Controls Overlay (Only visible if no error) */}
          {!videoError && (
            <>
              {/* Center Controls */}
              <div
                className={`${styles.centerControls} ${
                  !showControls && isPlaying ? styles.hidden : ""
                }`}
              >
                <button className={styles.skipBtn} onClick={() => skip(-10)}>
                  <RotateCcw size={32} />
                  <span className={styles.skipText}>10</span>
                </button>

                <button className={styles.mainPlayBtn} onClick={togglePlay}>
                  {isPlaying ? (
                    <div className={styles.pauseBars}>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    <Play size={40} fill="white" className={styles.playIcon} />
                  )}
                </button>

                <button className={styles.skipBtn} onClick={() => skip(10)}>
                  <RotateCw size={32} />
                  <span className={styles.skipText}>10</span>
                </button>
              </div>

              {/* Bottom Bar */}
              <div
                className={`${styles.bottomBar} ${
                  !showControls && isPlaying ? styles.hidden : ""
                }`}
              >
                <button className={styles.controlBtn} onClick={togglePlay}>
                  {isPlaying ? (
                    <Pause size={20} fill="white" />
                  ) : (
                    <Play size={20} fill="white" />
                  )}
                </button>

                <div className={styles.timeDisplay}>
                  <span>{currentTime}</span> /{" "}
                  <span className={styles.totalTime}>{duration}</span>
                </div>

                <div className={styles.progressBarContainer}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Number.isFinite(Number(progress)) ? progress : 0}
                    onChange={handleSeek}
                    className={styles.rangeInput}
                    style={{ backgroundSize: `${progress}% 100%` }}
                  />
                </div>

                <div className={styles.rightControls}>
                  <button className={styles.controlBtn} onClick={toggleMute}>
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button className={styles.controlBtn}>
                    <Settings size={20} />
                  </button>
                  <button
                    className={styles.controlBtn}
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize size={20} />
                    ) : (
                      <Maximize size={20} />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
