import { Panel, Title, Description, Highlight, ButtonGroup, Button } from "./Update.styled";
import VideoOrBlank from "./VideoOrBlank";

function renderDescription(descriptionText, highlightWord, highlightBg, highlightColor, Highlight) {
  const regex = new RegExp(highlightWord, 'i');
  const match = regex.exec(descriptionText);
  if (!match) return descriptionText;
  const idx = match.index;
  const word = descriptionText.slice(idx, idx + match[0].length);
  const before = descriptionText.slice(0, idx);
  const after = descriptionText.slice(idx + match[0].length);

  return [
    before,
    <Highlight key="highlight" bg={highlightBg} color={highlightColor}>{word}</Highlight>,
    after
  ];
}

export function SubjectPanel({
  showVideo,
  videoSrc,
  pronouns,
  selectedPronoun,
  onPronounSelect,
  descriptionText = "",
  baseColor = "#dcaa81",
  videoOpacity = 1,
  children
}) {
  // Determine colors based on colorMode
  const panelBg =  "#000";
  const panelColor = baseColor; 
  const buttonSelectedBg = baseColor; 
  const buttonSelectedColor = "#000"; 
  const buttonUnselectedColor = baseColor;


  return (
    <Panel bg={panelBg} color={panelColor}>
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
          <Description style={{ color: panelColor }}>{renderDescription(descriptionText, "Subject", baseColor, "#000", Highlight)}</Description>
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
                border: `1px solid ${baseColor}`
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
  children
}) {
  const panelBg = "#000";
  const panelColor = baseColor;
  const buttonSelectedBg = baseColor;
  const buttonSelectedColor = "#000";
  const buttonUnselectedColor = baseColor;
  const buttonBorder = `1px solid ${baseColor}`;
  
  return (
    <Panel bg={panelBg} color={panelColor}>
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
        <Description style={{ color: panelColor }}>{renderDescription(descriptionText, "Object", baseColor, "#000", Highlight)}</Description>
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
                border: selectedPronoun === p ? buttonBorder : `1px solid ${baseColor}`,
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
