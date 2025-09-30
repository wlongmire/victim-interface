import { Panel, Title, Description, Highlight, ButtonGroup, Button } from "./Update.styled";
import VideoOrBlank from "./VideoOrBlank";

function renderDescription(descriptionText, highlightWord, isBlack, Highlight) {
  const regex = new RegExp(highlightWord, 'i');
  const match = regex.exec(descriptionText);
  if (!match) return descriptionText;
  const idx = match.index;
  const word = descriptionText.slice(idx, idx + match[0].length);
  const before = descriptionText.slice(0, idx);
  const after = descriptionText.slice(idx + match[0].length);

  return [
    before,
    <Highlight key="highlight" bg={isBlack ? "#fff" : undefined} color={isBlack ? "#000" : "#fff"}>{word}</Highlight>,
    after
  ];
}

export function SubjectPanel({
  showVideo,
  videoSrc,
  pronouns,
  selectedPronoun,
  onPronounSelect,
  colorMode = "black",
  descriptionText = "",
  videoOpacity = 1,
  children
}) {
  // Determine colors based on colorMode
  const isBlack = colorMode === "black";
  const panelBg = isBlack ? "#000" : "#fff";
  const panelColor = isBlack ? "#fff" : "#000";
  const buttonSelectedBg = isBlack ? "#fff" : "#fff";
  const buttonSelectedColor = isBlack ? "#000" : "#000";
  const buttonUnselectedColor = isBlack ? "#fff" : "#000";
  // const buttonBorder = isBlack ? "2px solid #000" : "2px solid #fff";


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
          <Description style={{ color: panelColor }}>{renderDescription(descriptionText, "Subject", isBlack, Highlight)}</Description>
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
                border: "1px solid #ccc"
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
  colorMode = "white",
  descriptionText = "",
  videoOpacity = 1,
  children
}) {
  // Determine colors based on colorMode
  const isBlack = colorMode === "black";
  const panelBg = isBlack ? "#000" : "#fff";
  // Description text is always white in black mode
  const panelColor = isBlack ? "#fff" : "#000";
  // Pronoun button: in black mode, selected = black text on white, unselected = white text on transparent
  const buttonSelectedBg = isBlack ? "#fff" : "#fff";
  const buttonSelectedColor = isBlack ? "#000" : "#000";
  const buttonUnselectedColor = isBlack ? "#fff" : "#000";
  const buttonBorder = "1px solid #ccc"


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
          <Description style={{ color: panelColor }}>{renderDescription(descriptionText, "Object", isBlack, Highlight)}</Description>
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
                border: selectedPronoun === p ? buttonBorder : "1px solid #ccc",
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
