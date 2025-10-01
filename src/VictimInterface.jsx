import { useState, useRef } from "react";
import useFlickerOpacity from './utils/useFlickerOpacity';

import renderPoemLine from './utils/renderPoemLine';

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
} from "./VictimInterface.styled";

import VideoOrBlank from "./VideoOrBlank";
import { PronounPanel } from "./Panels";
import RepeatedText from './utils/repeatedText';

export default function VictimInterface() {
	const [pronounState, setPronounState] = useState({
		subject: "I",
		object: "I",
		pendingSubject: "I",
		pendingObject: "I"
	});

	// Staged opacities
	const [subjectDescOpacity, setSubjectDescOpacity] = useState(0);
	const [objectDescOpacity, setObjectDescOpacity] = useState(0);
	const [poemOpacity, setPoemOpacity] = useState(0);
	const [leftVideoOpacity, setLeftVideoOpacity] = useState(0);
	const [centerVideoOpacity, setCenterVideoOpacity] = useState(0);
	const [rightVideoOpacity, setRightVideoOpacity] = useState(0);

	const [subjectColor] = useState("#c593d4");
	const [objectColor] = useState("#93bad4");

	const [subjectOpacity] = useState("66");
	const [objectOpacity] = useState("66");


	const [flickerRange, setFlickerRange] = useState(3);
	const [subjectFlickerOpacity] = useFlickerOpacity(subjectOpacity, flickerRange, 30);
	const [objectFlickerOpacity] = useFlickerOpacity(objectOpacity, flickerRange, 35);

    const [interfaceOpacityIncrease] = useState(0.8)

	function increaseOpacity(hex) {
		const dec = parseInt(hex, 16);
		let newDec = Math.min(dec + Math.round(255 * interfaceOpacityIncrease), 255);
		return newDec.toString(16).padStart(2, '0').toUpperCase();
	}
	const subjectPanelOpacity = increaseOpacity(subjectFlickerOpacity);
	const objectPanelOpacity = increaseOpacity(objectFlickerOpacity);

	const fadeTimeout = useRef(null);

	const poemStage = stages[pronounState.pendingSubject.toLowerCase()]?.[pronounState.pendingObject.toLowerCase()];
	const poem = poemStage?.poem || [];

	const descStage = stages[pronounState.subject.toLowerCase()]?.[pronounState.object.toLowerCase()];
	
    const leftPanel = descStage?.left || {};
	const centerPanel = descStage?.center || {};
	const rightPanel = descStage?.right || {};
	
    const subjectDescription = descStage?.subjectDescription || "";
	const objectDescription = descStage?.objectDescription || "";

	const pronouns = ["I", "You", "They"];

	function handlePronounChange(type, value) {
		// Fade out all UI
		setSubjectDescOpacity(0);
		setObjectDescOpacity(0);
		setPoemOpacity(0);
		setLeftVideoOpacity(0);
		setCenterVideoOpacity(0);
		setRightVideoOpacity(0);

		if (fadeTimeout.current) clearTimeout(fadeTimeout.current);

		// After fade-out, update pronounState and fade in new content
		fadeTimeout.current = setTimeout(() => {
			setPronounState(prev => ({
				...prev,
				[type]: value,
				[type === "subject" ? "pendingSubject" : "pendingObject"]: value
			}));

			// Staged fade-in sequence (same as before, but after content update)
			setSubjectDescOpacity(1);
			setTimeout(() => {
				setObjectDescOpacity(1);
				setTimeout(() => {
					setPoemOpacity(1);
					setTimeout(() => setLeftVideoOpacity(1), 200 + Math.random() * 100);
					setTimeout(() => setCenterVideoOpacity(1), 200 + Math.random() * 100);
					setTimeout(() => setRightVideoOpacity(1), 200 + Math.random() * 100);
				}, 300);
			}, 500);
		}, 1000); // Wait for fade-out to complete
	}

	// Shared flicker handlers
	const handlePanelMouseEnter = () => setFlickerRange(10);
	const handlePanelMouseLeave = () => setFlickerRange(2);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
			}}
		>
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
				<PronounPanel
					showVideo={leftPanel.showVideo}
					videoSrc={leftPanel.videoSrc}
					pronouns={pronouns}
					selectedPronoun={pronounState.subject}
					baseColor={subjectColor}
					opacityHex={subjectPanelOpacity}
					onPronounSelect={v => handlePronounChange("subject", v)}
					descriptionText={subjectDescription}
                    highlightWord={"Subject"}
					videoOpacity={leftVideoOpacity}
					descriptionOpacity={subjectDescOpacity}
					onMouseEnter={handlePanelMouseEnter}
					onMouseLeave={handlePanelMouseLeave}
				/>

				<PoemPanel
					bg={centerPanel.colorMode === "black" ? "#000" : "#fff"}
					style={{position: 'relative', overflow: 'hidden'}}
				>
                    <VideoOrBlank showVideo={centerPanel.showVideo} videoSrc={centerPanel.videoSrc} blankColor={centerPanel.colorMode === "black" ? "#000" : "#fff"} opacity={centerVideoOpacity} />
					
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
							{poem.map((line, idx) =>
                                renderPoemLine(
                                    line,
                                    idx,
                                    subjectColor,
                                    subjectFlickerOpacity,
                                    objectColor,
                                    objectFlickerOpacity,
                                    PoemWord
                                )
                            )}
						</Poem>
					</div>
				</PoemPanel>

				<PronounPanel
					showVideo={rightPanel.showVideo}
					videoSrc={rightPanel.videoSrc}
					blankColor={rightPanel.bgColor}
					pronouns={pronouns}
					baseColor={objectColor}
					opacityHex={objectPanelOpacity}
					selectedPronoun={pronounState.object}
					onPronounSelect={v => handlePronounChange("object", v)}
					descriptionText={objectDescription}
                    highlightWord={"Object"}
					videoOpacity={rightVideoOpacity}
					descriptionOpacity={objectDescOpacity}
					onMouseEnter={handlePanelMouseEnter}
					onMouseLeave={handlePanelMouseLeave}
				/>
			</Container>

			<Footer>
				<RepeatedText text="Untitled American Victim " />
			</Footer>
		</div>
	);
}