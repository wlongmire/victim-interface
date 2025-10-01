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
	// Overlay opacity for subject/object panels
	const [subjectOverlay, setSubjectOverlay] = useState(0);
	const [objectOverlay, setObjectOverlay] = useState(0);
	const [subjectFlickerOpacity] = useFlickerOpacity(subjectOpacity, flickerRange, 30);
	const [objectFlickerOpacity] = useFlickerOpacity(objectOpacity, flickerRange, 35);


	// For animated heading
	// Each heading is an array of {char, visible}
	const [subjectHeading, setSubjectHeading] = useState([{char: 'I', visible: true}]);
	const [objectHeading, setObjectHeading] = useState([{char: 'I', visible: true}]);
	const [isAnimatingHeading, setIsAnimatingHeading] = useState(false);
	const headingAnimTimeout = useRef(null);
	const headingAnimTimers = useRef([]);

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
		// === Animation Timing Constants (adjust here) ===
		const LETTER_ANIM_MS = 500; // ms per letter fade in/out
		const WAIT_AFTER_REMOVE_MS = 1500; // ms to wait after all letters removed
	    const DESC_FADE_IN_GAP_MS = 2000; // ms between subject and object desc fade in
		const POEM_FADE_IN_MS = 2000; // ms for poem fade in
		const VIDEO_FADE_IN_MIN_MS = 2000; // ms min for video fade in
		const VIDEO_FADE_IN_RANGE_MS = 2000; // ms random range for video fade in
		// ==============================================

		// Cancel any running heading animation
		headingAnimTimers.current.forEach(t => clearTimeout(t));
		headingAnimTimers.current = [];
		setIsAnimatingHeading(true);

		// Animate heading removal letter by letter
		const oldPronoun = type === "subject" ? pronounState.subject : pronounState.object;
		const setHeading = type === "subject" ? setSubjectHeading : setObjectHeading;

		const fullPronoun = oldPronoun.toUpperCase();

		let removeTimers = [];
		const letterAnimMs = LETTER_ANIM_MS;

		// Start with all visible
		setHeading(fullPronoun.split('').map(c => ({char: c, visible: true})));

		for (let i = 0; i < fullPronoun.length; ++i) {
			removeTimers.push(setTimeout(() => {
				setHeading(prev => prev.map((l, idx) => idx === i ? {...l, visible: false} : l));
			}, i * letterAnimMs));
		}

		// After all letters removed, wait, then reveal new heading letter by letter
		const totalRemove = fullPronoun.length * letterAnimMs;
		removeTimers.push(setTimeout(() => {
			setHeading(fullPronoun.split('').map(c => ({char: c, visible: false})));

			const afterRemove = setTimeout(() => {
				setPronounState(prev => ({
					...prev,
					[type]: value,
					[type === "subject" ? "pendingSubject" : "pendingObject"]: value
				}));
				// Animate reveal
				const newPronoun = value.toUpperCase();

				// Start with all invisible
				setHeading(newPronoun.split('').map(c => ({char: c, visible: false})));
				for (let i = 0; i < newPronoun.length; ++i) {
					headingAnimTimers.current.push(setTimeout(() => {
						setHeading(prev => prev.map((l, idx) => idx === i ? {...l, visible: true} : l));
					}, i * letterAnimMs));
				}

				// After reveal, start fade-in sequence
				headingAnimTimers.current.push(setTimeout(() => {
					setIsAnimatingHeading(false);
					setSubjectDescOpacity(1);
					setTimeout(() => {
						setObjectDescOpacity(1);
						setTimeout(() => {
							setPoemOpacity(1);
							setTimeout(() => setLeftVideoOpacity(1), VIDEO_FADE_IN_MIN_MS + Math.random() * VIDEO_FADE_IN_RANGE_MS);
							setTimeout(() => setCenterVideoOpacity(1), VIDEO_FADE_IN_MIN_MS + Math.random() * VIDEO_FADE_IN_RANGE_MS);
							setTimeout(() => setRightVideoOpacity(1), VIDEO_FADE_IN_MIN_MS + Math.random() * VIDEO_FADE_IN_RANGE_MS);
						}, POEM_FADE_IN_MS);
					}, DESC_FADE_IN_GAP_MS);
				}, newPronoun.length * letterAnimMs));
			}, WAIT_AFTER_REMOVE_MS);
			headingAnimTimers.current.push(afterRemove);
		}, totalRemove));
		headingAnimTimers.current = removeTimers;

		// Fade out all UI immediately
		setSubjectDescOpacity(0);
		setObjectDescOpacity(0);
		setPoemOpacity(0);
		setLeftVideoOpacity(0);
		setCenterVideoOpacity(0);
		setRightVideoOpacity(0);
	}

	// Shared flicker handlers
	const handleSubjectPanelMouseEnter = () => {
		setFlickerRange(10);
		setSubjectOverlay(0.6);
	};
	const handleSubjectPanelMouseLeave = () => {
		setFlickerRange(2);
		setSubjectOverlay(0);
	};
	const handleObjectPanelMouseEnter = () => {
		setFlickerRange(10);
		setObjectOverlay(0.6);
	};
	const handleObjectPanelMouseLeave = () => {
		setFlickerRange(2);
		setObjectOverlay(0);
	};

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
			}}
		>
			<Header>
				<RepeatedText text="Victim Interface " />
			</Header>

			<LeftBranding>
				<RepeatedText text="Victim Interface " vertical />
			</LeftBranding>

			<RightBranding>
				<RepeatedText text="Victim Interface " vertical />
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
					onMouseEnter={handleSubjectPanelMouseEnter}
					onMouseLeave={handleSubjectPanelMouseLeave}
					displayedHeading={subjectHeading}
					overlayOpacity={subjectOverlay}
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
					onMouseEnter={handleObjectPanelMouseEnter}
					onMouseLeave={handleObjectPanelMouseLeave}
					displayedHeading={objectHeading}
					overlayOpacity={objectOverlay}
				/>
			</Container>

			<Footer>
				<RepeatedText text="Victim Interface " />
			</Footer>
		</div>
	);
}