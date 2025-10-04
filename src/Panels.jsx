import { Panel, Title, Description, Highlight, ButtonGroup, Button } from "./VictimInterface.styled";
import VideoOrBlank from "./VideoOrBlank";
import renderDescription from "./utils/renderDescription"

export function PronounPanel({
  showVideo,
  videoSrc,
  pronouns,
  selectedPronoun,
  onPronounSelect,
  descriptionText = "",
  baseColor,
  opacityHex = "CC",
  videoOpacity = 1,
  children,
  onMouseEnter,
  onMouseLeave,
  highlightWord = "Subject",
  highlightColor = "#000",
  buttonOpacity = 1,
  blankColor,
  descriptionOpacity = 1,
  displayedHeading,
  overlayOpacity = 0,
  isLocked = false,
}) {
  const panelBg = "#000";
  const panelColor = baseColor + opacityHex;
  const bkgColor = baseColor + opacityHex;
  const borderColor = `1px solid ${baseColor + opacityHex}`;
  
  const buttonSelectedBg = bkgColor;
  const buttonSelectedColor = "#000";
  const buttonUnselectedColor = bkgColor;
  const buttonBorder = borderColor;

  return (
    <Panel bg={panelBg} color={panelColor} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <VideoOrBlank showVideo={showVideo} videoSrc={videoSrc} blankColor={blankColor || panelBg} opacity={videoOpacity} />
      {/* Overlay above video, below content */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,1)',
        opacity: overlayOpacity,
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'opacity 0.3s',
      }} />
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {children}
        <Title size="5rem" style={{ color: panelColor }}>
          {Array.isArray(displayedHeading)
            ? displayedHeading.map((l, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    transition: 'opacity 0.45s',
                    opacity: l.visible ? 1 : 0,
                  }}
                >
                  {l.char}
                </span>
              ))
            : (displayedHeading ?? selectedPronoun.toUpperCase())}
        </Title>
        <Description style={{ color: panelColor, opacity: descriptionOpacity }}>{renderDescription(descriptionText, highlightWord, baseColor + opacityHex, highlightColor, Highlight)}</Description>
        <ButtonGroup>
          {pronouns.map((p) => (
            <Button
              key={p}
              onClick={() => !isLocked && onPronounSelect(p)}
              bg={buttonSelectedBg}
              color={selectedPronoun === p ? buttonSelectedColor : buttonUnselectedColor}
              selected={selectedPronoun === p}
              disabled={isLocked}
              style={{
                opacity: buttonOpacity,
                fontWeight: selectedPronoun === p ? 700 : 400,
                border: buttonBorder,
                pointerEvents: isLocked ? 'none' : undefined,
                filter: isLocked ? 'grayscale(0.7) opacity(0.7)' : undefined,
              }}
            >
              {p}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </Panel>
  );
}
