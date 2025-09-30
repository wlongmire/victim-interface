import { useState, useRef, useEffect } from "react";

import { stages } from "./data/stages";
import {
  Container,
  PoemPanel,
  Poem,
  PoemWord,
  Header,
  Footer,
  LeftBranding,
  RightBranding
} from "./Update.styled";

import VideoOrBlank from "./VideoOrBlank";
import { SubjectPanel, ObjectPanel } from "./Panels";

function RepeatedText({ text, vertical = false, style = {}, ...props }) {
  const containerRef = useRef();
  const measureRef = useRef();
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    function updateRepeat() {
      if (containerRef.current && measureRef.current) {
        const containerSize = vertical
          ? containerRef.current.offsetHeight
          : containerRef.current.offsetWidth;
        const textSize = vertical
          ? measureRef.current.offsetHeight
          : measureRef.current.offsetWidth;
        const count = textSize > 0 ? Math.ceil(containerSize / textSize) + 2 : 1;
        setRepeatCount(count);
      }
    }
    updateRepeat();
    window.addEventListener("resize", updateRepeat);
    return () => window.removeEventListener("resize", updateRepeat);
  }, [vertical, text]);

  return (
    <span ref={containerRef} style={{ display: vertical ? 'inline-block' : 'block', width: '100%', height: '100%', ...style }} {...props}>
      <span ref={measureRef} style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap", writingMode: vertical ? 'vertical-rl' : 'initial' }}>
        {text}
      </span>
      {/* Render repeated text */}
      {Array.from({ length: repeatCount }).map((_, i) => (
        <span key={i}>{text}</span>
      ))}
    </span>
  );
}

export default function VictimInterface() {
  const [subjectPronoun, setSubjectPronoun] = useState("I");
  const [objectPronoun, setObjectPronoun] = useState("I");
  const [pendingSubject, setPendingSubject] = useState("I");
  const [pendingObject, setPendingObject] = useState("I");
  const [poemOpacity, setPoemOpacity] = useState(1);

  const [subjectColor] = useState("#c593d4");
  const [objectColor] = useState("#93bad4");
  const fadeTimeout = useRef(null);

  const poemStage = stages[pendingSubject.toLowerCase()]?.[pendingObject.toLowerCase()];
  const poem = poemStage?.poem || [];

  const descStage = stages[subjectPronoun.toLowerCase()]?.[objectPronoun.toLowerCase()];
  const leftPanel = descStage?.left || {};
  const centerPanel = descStage?.center || {};
  const rightPanel = descStage?.right || {};
  const subjectDescription = descStage?.subjectDescription || "";
  const objectDescription = descStage?.objectDescription || "";


  const pronouns = ["I", "You", "They"];

  // Fade poem on pronoun change
  function handlePronounChange(type, value) {
    // Update button state immediately
    if (type === "subject") setSubjectPronoun(value);
    else setObjectPronoun(value);
    // Fade out poem, then update content
    setPoemOpacity(0);
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    fadeTimeout.current = setTimeout(() => {
      if (type === "subject") setPendingSubject(value);
      else setPendingObject(value);
      setPoemOpacity(1);
    }, 1000);
  }

  return (
    <>
      <Header>
        <RepeatedText text="Untitled American Victim " />
      </Header>
      <LeftBranding>
        <RepeatedText text="Untitled American Victim " vertical />
      </LeftBranding>
      <RightBranding>
        <RepeatedText text="Untitled American Victim " vertical />
      </RightBranding>
      <Container>
        <SubjectPanel
          showVideo={leftPanel.showVideo}
          videoSrc={leftPanel.videoSrc}
          pronouns={pronouns}
          selectedPronoun={subjectPronoun}
          baseColor={subjectColor}
          onPronounSelect={v => handlePronounChange("subject", v)}
          descriptionText={subjectDescription}
          videoOpacity={poemOpacity}
        />
        <PoemPanel
          bg={centerPanel.colorMode === "black" ? "#000" : "#fff"}
          style={{position: 'relative', overflow: 'hidden'}}
        >
          <VideoOrBlank showVideo={centerPanel.showVideo} videoSrc={centerPanel.videoSrc} blankColor={centerPanel.colorMode === "black" ? "#000" : "#fff"} opacity={poemOpacity} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Poem color={centerPanel.colorMode === "black" ? "#fff" : "#000"} $opacity={poemOpacity}>
              {
                poem.map((line, idx) => {
                  if (line === "") return <br key={"br-"+idx}/>;
                  return (
                    <p key={idx} style={{margin: 0, padding: 0, lineHeight: 1.2}}>
                      {line.split(/(\s+)/).map((word, w_idx) =>
                        word.trim() === "" ? word : <PoemWord key={w_idx}>{word}</PoemWord>
                      )}
                    </p>
                  );
                })
              }
            </Poem>
          </div>
        </PoemPanel>
        <ObjectPanel
          showVideo={rightPanel.showVideo}
          videoSrc={rightPanel.videoSrc}
          blankColor={rightPanel.bgColor}
          pronouns={pronouns}
          baseColor={objectColor}
          selectedPronoun={objectPronoun}
          onPronounSelect={v => handlePronounChange("object", v)}
          descriptionText={objectDescription}
          videoOpacity={poemOpacity}
        />
      </Container>
      <Footer>
        <RepeatedText text="Untitled American Victim " />
      </Footer>
    </>
  );
}
