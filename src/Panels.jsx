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
}) {
  const panelBg = "#000";
  const panelColor = baseColor + opacityHex;
  const flickerBg = baseColor + opacityHex;
  const flickerBorder = `1px solid ${baseColor + opacityHex}`;
  const buttonSelectedBg = flickerBg;
  const buttonSelectedColor = "#000";
  const buttonUnselectedColor = flickerBg;
  const buttonBorder = flickerBorder;

  return (
    <Panel bg={panelBg} color={panelColor} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <VideoOrBlank showVideo={showVideo} videoSrc={videoSrc} blankColor={blankColor || panelBg} opacity={videoOpacity} />
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
        <Title size="5rem" style={{ color: panelColor }}>{selectedPronoun.toUpperCase()}</Title>
        <Description style={{ color: panelColor, opacity: descriptionOpacity }}>{renderDescription(descriptionText, highlightWord, baseColor + opacityHex, highlightColor, Highlight)}</Description>
        <ButtonGroup>
          {pronouns.map((p) => (
            <Button
              key={p}
              onClick={() => onPronounSelect(p)}
              style={{
                background: selectedPronoun === p ? buttonSelectedBg : "transparent",
                color: selectedPronoun === p ? buttonSelectedColor : buttonUnselectedColor,
                opacity: buttonOpacity,
                fontWeight: selectedPronoun === p ? 700 : 400,
                border: buttonBorder,
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
