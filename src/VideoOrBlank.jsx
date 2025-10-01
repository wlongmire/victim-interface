export default function VideoOrBlank({ showVideo, videoSrc, blankColor = "#e0e0e0", opacity = 1, ...props }) {
  const transitionStyle = { transition: 'opacity 1s' };
  return showVideo ? (
    <video
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
