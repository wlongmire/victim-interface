import { useState, useRef } from "react";
import useFlickerOpacity from './utils/useFlickerOpacity';

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
import { SubjectPanel, ObjectPanel } from "./Panels";
import RepeatedText from './utils/repeatedText';

export default function VictimInterface() {
	const [subjectPronoun, setSubjectPronoun] = useState("I");
	const [objectPronoun, setObjectPronoun] = useState("I");

	const [pendingSubject, setPendingSubject] = useState("I");
	const [pendingObject, setPendingObject] = useState("I");
	const [poemOpacity, setPoemOpacity] = useState(1);

	const [subjectColor] = useState("#c593d4");
	const [objectColor] = useState("#93bad4");

	const [subjectOpacity] = useState("66");
	const [objectOpacity] = useState("66");

	const [subjectFlickerOpacity, setSubjectFlickerRange] = useFlickerOpacity(subjectOpacity, 3, 30);
	const [objectFlickerOpacity, setObjectFlickerRange] = useFlickerOpacity(objectOpacity, 3, 35);

	function increaseOpacity(hex) {
		const dec = parseInt(hex, 16);
		let newDec = Math.min(dec + Math.round(255 * 0.05), 255);
		return newDec.toString(16).padStart(2, '0').toUpperCase();
	}
	const subjectPanelOpacity = increaseOpacity(subjectFlickerOpacity);
	const objectPanelOpacity = increaseOpacity(objectFlickerOpacity);

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

	function handlePronounChange(type, value) {
		if (type === "subject") setSubjectPronoun(value);
		else setObjectPronoun(value);

		setPoemOpacity(0);

		if (fadeTimeout.current) clearTimeout(fadeTimeout.current);

		fadeTimeout.current = setTimeout(() => {
			if (type === "subject") setPendingSubject(value);
			else setPendingObject(value);

			setPoemOpacity(1);
		}, 1000);
	}

	// Subject panel flicker handlers
	const handleSubjectMouseEnter = () => setSubjectFlickerRange(22);
	const handleSubjectMouseLeave = () => setSubjectFlickerRange(2);
	// Object panel flicker handlers
	const handleObjectMouseEnter = () => setObjectFlickerRange(22);
	const handleObjectMouseLeave = () => setObjectFlickerRange(2);

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
				<SubjectPanel
					showVideo={leftPanel.showVideo}
					videoSrc={leftPanel.videoSrc}
					pronouns={pronouns}
					selectedPronoun={subjectPronoun}
					baseColor={subjectColor}
					opacityHex={subjectPanelOpacity}
					onPronounSelect={v => handlePronounChange("subject", v)}
					descriptionText={subjectDescription}
					videoOpacity={poemOpacity}
					onMouseEnter={handleSubjectMouseEnter}
					onMouseLeave={handleSubjectMouseLeave}
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
  renderPoemWord(word, w_idx, subjectColor, subjectFlickerOpacity, objectColor, objectFlickerOpacity, PoemWord)
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
					opacityHex={objectPanelOpacity}
					selectedPronoun={objectPronoun}
					onPronounSelect={v => handlePronounChange("object", v)}
					descriptionText={objectDescription}
					videoOpacity={poemOpacity}
					onMouseEnter={handleObjectMouseEnter}
					onMouseLeave={handleObjectMouseLeave}
				/>
			</Container>
			<Footer>
				<RepeatedText text="Untitled American Victim " />
			</Footer>
		</div>
	);
}

// Helper to render poem words with flicker and notation
function renderPoemWord(word, w_idx, subjectColor, subjectFlickerOpacity, objectColor, objectFlickerOpacity, PoemWord) {
	if (/^\{(.+?)\}$/.test(word)) {
		const clean = word.replace(/^\{(.+?)\}$/, "$1");
		return <PoemWord key={w_idx} style={{background: subjectColor + subjectFlickerOpacity, color: '#000'}}>{clean}</PoemWord>;
	} else if (/^\[(.+?)\]$/.test(word)) {
		const clean = word.replace(/^\[(.+?)\]$/, "$1");
		return <PoemWord key={w_idx} style={{background: objectColor + objectFlickerOpacity, color: '#000'}}>{clean}</PoemWord>;
	} else {
		return word.trim() === "" ? word : <PoemWord key={w_idx}>{word}</PoemWord>;
	}
}
