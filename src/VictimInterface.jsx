import SoundIcon from './icons/SoundIcon.jsx';

import { useState, useRef, useEffect } from "react";
import useAudioFadeOut from './utils/useAudioFadeOut';
import useFlickerOpacity from './utils/useFlickerOpacity';
import useTransitionAnimation from './utils/useTransitionAnimation';
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

const TIMEOUT_RESET = 60000 * 3;

export default function VictimInterface() {
	const audioRef = useRef(null);
	const fadeOutAndStopAudio = useAudioFadeOut(audioRef);
	const [pronounState, setPronounState] = useState({
		subject: "I",
		object: "I",
		pendingSubject: "I",
		pendingObject: "You"
	});

	// Staged opacities
	const [subjectDescOpacity, setSubjectDescOpacity] = useState(0);
	const [objectDescOpacity, setObjectDescOpacity] = useState(0);
	const [centerOverlay, setCenterOverlay] = useState(0);

	const [poemOpacity, setPoemOpacity] = useState(0);
	const [whitePoemOpacity, setWhitePoemOpacity] = useState(0);
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
	const [isLocked, setIsLocked] = useState(false);

	const [interfaceOpacityIncrease] = useState(0.8)

	function increaseOpacity(hex) {
		const dec = parseInt(hex, 16);
		let newDec = Math.min(dec + Math.round(255 * interfaceOpacityIncrease), 255);
		return newDec.toString(16).padStart(2, '0').toUpperCase();
	}
	const subjectPanelOpacity = increaseOpacity(subjectFlickerOpacity);
	const objectPanelOpacity = increaseOpacity(objectFlickerOpacity);

	const poemStage = stages[normalizePronoun(pronounState.pendingSubject)]?.[normalizePronoun(pronounState.pendingObject)];
	const poem = poemStage?.poem || [];

	const descStage = stages[normalizePronoun(pronounState.subject)]?.[normalizePronoun(pronounState.object)];
	
    const leftPanel = descStage?.left || {};
	const centerPanel = descStage?.center || {};
	const rightPanel = descStage?.right || {};
	
    const subjectDescription = descStage?.subjectDescription || "";
	const objectDescription = descStage?.objectDescription || "";

	const pronouns = ["I", "You", "Them"];
	const initialPoemFadeIn = useRef();

	// Map display 'Them' to data key 'they'
	function normalizePronoun(p) {
		return p.toLowerCase() === 'them' ? 'they' : p.toLowerCase();
	}

	// Prepare the transition animation trigger at the top level
	const triggerTransition = useTransitionAnimation({
		setIsAnimatingHeading,
		setSubjectHeading,
		setObjectHeading,
		setPronounState,
		setSubjectDescOpacity,
		setObjectDescOpacity,
		setPoemOpacity,
		setWhitePoemOpacity,
		setLeftVideoOpacity,
		setCenterVideoOpacity,
		setRightVideoOpacity,
		setIsLocked,
		pronounState,
		audioRef,
		stages,
		normalizePronoun
	});

	function handlePronounChange(type, value) {
		if (isLocked) return; // Prevent ALL input during animation

		clearTimeout(initialPoemFadeIn.current);

		// Fade out any currently playing audio over 1 second
		fadeOutAndStopAudio();
		
		setIsLocked(true);

		triggerTransition(type, value);
	}

	// Shared flicker handlers
	const handleSubjectPanelMouseEnter = () => {
		setFlickerRange(10);
		setSubjectOverlay(0.6);
		if (!isLocked) setWhitePoemOpacity(0);
	};
	const handleSubjectPanelMouseLeave = () => {
		setFlickerRange(2);
		setSubjectOverlay(0);
		if (!isLocked) setWhitePoemOpacity(1);
	};
	const handleObjectPanelMouseEnter = () => {
		setFlickerRange(10);
		setObjectOverlay(0.6);
		if (!isLocked) setWhitePoemOpacity(0);
	};
	const handleObjectPanelMouseLeave = () => {
		setFlickerRange(2);
		setObjectOverlay(0);
		if (!isLocked) setWhitePoemOpacity(1);
	};
	const handleCenterPanelMouseEnter = () => {
		if (centerPanel.showVideo) {
			setCenterOverlay(0.4);
			if (!isLocked) setWhitePoemOpacity(0);
		}
	};
	const handleCenterPanelMouseLeave = () => {
		if (centerPanel.showVideo) {
			setCenterOverlay(0);
			if (!isLocked) setWhitePoemOpacity(1);
		}
	};

	useEffect(()=>{
		initialPoemFadeIn.current = setTimeout(()=> {
			setWhitePoemOpacity(1);
		}, 3000);
	}, []);

	useEffect(() => {
		let timeoutId;
		const resetTimer = () => {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setSubjectDescOpacity(0);
				setObjectDescOpacity(0);
				setPoemOpacity(0);
				setWhitePoemOpacity(0);
				setLeftVideoOpacity(0);
				setCenterVideoOpacity(0);
				setRightVideoOpacity(0);

				setTimeout(()=> {
					window.location.reload();
				}, 3000)
			}, TIMEOUT_RESET); // 3mins
		};
		window.addEventListener('mousemove', resetTimer);
		resetTimer(); // start timer on mount
		return () => {
			window.removeEventListener('mousemove', resetTimer);
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
			}}
		>
			{/* Hidden audio element for stage incantation */}
			<audio ref={audioRef} style={{ display: 'none' }} preload="auto" />
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
					isLocked={isLocked}
				/>

				   <PoemPanel
					   bg={centerPanel.colorMode === "black" ? "#000" : "#fff"}
					   style={{position: 'relative', overflow: 'hidden'}}
					   onMouseEnter={handleCenterPanelMouseEnter}
					   onMouseLeave={handleCenterPanelMouseLeave}
				   >
					   {/* Overlay above video, below content */}
					   <div style={{
						   position: 'absolute',
						   top: 0,
						   left: 0,
						   width: '100%',
						   height: '100%',
						   background: 'rgba(0,0,0,1)',
						   opacity: centerPanel.showVideo ? centerOverlay : 0,
						   pointerEvents: 'none',
						   zIndex: 1,
						   transition: 'opacity 0.3s',
					   }} />
					   <VideoOrBlank showVideo={centerPanel.showVideo} videoSrc={centerPanel.videoSrc} blankColor={centerPanel.colorMode === "black" ? "#000" : "#fff"} opacity={centerVideoOpacity} />
					   <div style={{
						   position: 'relative',
						   zIndex: 2,
						   width: '100%',
						   height: '100%',
						   display: 'flex',
						   flexDirection: 'column',
						   alignItems: 'center',
						   justifyContent: 'center',
					   }}>
							{/* Color-coded poem (base layer) */}
							<Poem color={centerPanel.colorMode === "black" ? "#fff" : "#000"} $opacity={poemOpacity} style={{ transition: 'opacity 3s' }}>
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
							{/* White overlay poem (fades in above) */}
							<div style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								pointerEvents: 'none',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								opacity: centerPanel.showVideo ? centerOverlay : whitePoemOpacity,
								transition: 'opacity 0.7s',
								zIndex: 2
							}}>
								<Poem color="#fff" $opacity={1}>
									{poem.map((line, idx) =>
										renderPoemLine(
											line,
											idx,
											"#fff",
											1,
											"#fff",
											1,
											PoemWord
										)
									)}
								</Poem>
							</div>
						    {/* Sound icon button at bottom center */}
                            {/* Dim toggle for sound icon */}
                            {(() => {
                                // Initialize from localStorage if available
                                const getInitialDimmed = () => {
                                    try {
                                        const stored = localStorage.getItem('victim-mute');
                                        return stored === 'true';
                                    } catch {
                                        return false;
                                    }
                                };
                                const [isDimmed, setIsDimmed] = useState(getInitialDimmed);
                                // Effect to sync audio mute with dim state
                                useEffect(() => {
                                    if (audioRef.current) {
                                        audioRef.current.muted = isDimmed;
                                    }
                                    try {
                                        localStorage.setItem('victim-mute', isDimmed ? 'true' : 'false');
                                    } catch {}
                                }, [isDimmed]);
                                return (
									<button
										style={{
											position: 'absolute',
											left: 0,
											top: '50%',
											transform: 'translateY(-50%)',
											background: 'transparent',
											border: 'none',
											borderRadius: '50%',
											width: 36,
											height: 36,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											cursor: 'pointer',
											boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
											padding: 0,
											zIndex: 1002,
											// Responsive: move to left center for <=1075px
											...(window.innerWidth <= 1075 ? {
												left: 20,
												right: 'auto',
												top: '50%',
												bottom: 'auto',
												transform: 'translateY(-50%)',
											} : {
												left: '50%',
												bottom: 38,
												top: 'auto',
												transform: 'translateX(-50%)',
											})
										}}
										tabIndex={0}
										aria-label={isDimmed ? "Sound off (dimmed)" : "Sound on (full)"}
										onClick={() => setIsDimmed(d => !d)}
									>
										<SoundIcon opacity={isDimmed ? 0.45 : 1} />
									</button>
                                );
                            })()}
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
					isLocked={isLocked}
				/>
			</Container>

			<Footer>
				<RepeatedText text="Victim Interface " />
			</Footer>
		</div>
	);
}