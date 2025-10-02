import { useRef, useEffect } from 'react';

export default function VideoOrBlank({ showVideo, videoSrc, blankColor = "#e0e0e0", opacity = 1, ...props }) {
  const transitionStyle = { transition: 'opacity 1s' };
  const videoRef = useRef(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      // Randomize start time within first 3 seconds
      const video = videoRef.current;
      const setRandomTime = () => {
        const offset = Math.random() * 3;
        // If metadata is loaded, set currentTime
        if (video.readyState >= 1) {
          video.currentTime = offset;
        } else {
          video.addEventListener('loadedmetadata', () => {
            video.currentTime = offset;
          }, { once: true });
        }
      };
      setRandomTime();
    }
  }, [showVideo, videoSrc]);

  return showVideo ? (
    <video
      ref={videoRef}
      src={videoSrc}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        opacity,
        ...transitionStyle,
        ...props.style
      }}
      {...props}
    />
  ) : (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: blankColor,
        zIndex: 0,
        opacity,
        ...transitionStyle,
        ...props.style
      }}
      {...props}
    />
  );
}
