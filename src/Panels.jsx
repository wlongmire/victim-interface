import { Panel, Title, Description, Highlight, ButtonGroup, Button } from "./VictimInterface.styled";
import VideoOrBlank from "./VideoOrBlank";
import renderDescription from "./utils/renderDescription"

export function SubjectPanel({
  showVideo,
  videoSrc,
  pronouns,
  selectedPronoun,
  onPronounSelect,
  descriptionText = "",
  baseColor = "#dcaa81",
  opacityHex = "CC",
  videoOpacity = 1,
  children,
  onMouseEnter,
  onMouseLeave
}) {
  // Determine colors based on colorMode
  const panelBg =  "#000";
  const panelColor = baseColor + opacityHex;
  // Flicker: use opacityHex for panel, but flicker for button
  const flickerBg = baseColor + opacityHex;
  const flickerBorder = `1px solid ${baseColor + opacityHex}`;
  const buttonSelectedBg = flickerBg;
  const buttonSelectedColor = "#000";
  const buttonUnselectedColor = flickerBg;


  return (
    <Panel bg={panelBg} color={panelColor} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <VideoOrBlank showVideo={showVideo} videoSrc={videoSrc} blankColor={panelBg} opacity={videoOpacity} />  
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
  <Description style={{ color: panelColor }}>{renderDescription(descriptionText, "Subject", baseColor + opacityHex, "#000", Highlight)}</Description>
        <ButtonGroup>
          {pronouns.map((p) => (
            <Button
              key={p}
              onClick={() => onPronounSelect(p)}
              style={{
                background: selectedPronoun === p ? buttonSelectedBg : "transparent",
                color: selectedPronoun === p ? buttonSelectedColor : buttonUnselectedColor,
                opacity: p === "They" ? 0.7 : 1,
                fontWeight: selectedPronoun === p ? 700 : 400,
                border: flickerBorder
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

export function ObjectPanel({
  showVideo,
  videoSrc,
  pronouns,
  selectedPronoun,
  onPronounSelect,
  descriptionText = "",
  videoOpacity = 1,
  baseColor = "#ff00ff",
  opacityHex = "CC",
  children,
  onMouseEnter,
  onMouseLeave
}) {
  const panelBg = "#000";
  const panelColor = baseColor + opacityHex;
  // Flicker: use opacityHex for panel, but flicker for button
  const flickerBg = baseColor + opacityHex;
  const flickerBorder = `1px solid ${baseColor + opacityHex}`;
  const buttonSelectedBg = flickerBg;
  const buttonSelectedColor = "#000";
  const buttonUnselectedColor = flickerBg;
  const buttonBorder = flickerBorder;
  
  return (
    <Panel bg={panelBg} color={panelColor} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <VideoOrBlank showVideo={showVideo} videoSrc={videoSrc} blankColor={panelBg} opacity={videoOpacity} />
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
  <Description style={{ color: panelColor }}>{renderDescription(descriptionText, "Object", baseColor + opacityHex, "#000", Highlight)}</Description>
        <ButtonGroup>
          {pronouns.map((p) => (
            <Button
              key={p}
              onClick={() => onPronounSelect(p)}
              style={{
                background: selectedPronoun === p ? buttonSelectedBg : "transparent",
                color: selectedPronoun === p ? buttonSelectedColor : buttonUnselectedColor,
                opacity: 1,
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
