
function useTransitionAnimation () {
    // === Animation Timing Constants (adjust here) ===
    const LETTER_ANIM_MS = 500; // ms per letter fade in/out
    const WAIT_AFTER_REMOVE_MS = 1500; // ms to wait after all letters removed
    const DESC_FADE_IN_GAP_MS = 3000; // ms between subject and object desc fade in
    const POEM_FADE_IN_MS = 4000; // ms for poem fade in
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
                        setTimeout(() => setWhitePoemOpacity(1), 3000); // Fade in white overlay after 3s
                        setTimeout(() => setWhitePoemOpacity(0), 13000); // Fade out after 10s visible + 3s fade
                        // Add 1s delay before switching pronoun state (video fade-in/unlock logic)
                        const extraDelay = 1000;
                        const unlockDelay = VIDEO_FADE_IN_MIN_MS + VIDEO_FADE_IN_RANGE_MS + extraDelay;
                        setTimeout(() => setLeftVideoOpacity(1), unlockDelay);
                        setTimeout(() => setCenterVideoOpacity(1), unlockDelay);
                        setTimeout(() => {
                            setRightVideoOpacity(1);
                            setIsLocked(false); // UNLOCK after all transitions
                        }, unlockDelay);
                        // Play sound exactly when poem appears, and set loop if needed
                        const stageData = stages[normalizePronoun(pronounState.pendingSubject)]?.[normalizePronoun(pronounState.pendingObject)];
                        if (audioRef.current && stageData?.sound) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                            audioRef.current.src = stageData.sound;
                            audioRef.current.loop = true;
                            audioRef.current.play().catch(() => {});
                        }
                        // Wait for all video fade-ins to finish before unlocking
                        const maxVideoFade = VIDEO_FADE_IN_MIN_MS + VIDEO_FADE_IN_RANGE_MS;
                        setTimeout(() => setLeftVideoOpacity(1), maxVideoFade);
                        setTimeout(() => setCenterVideoOpacity(1), maxVideoFade);
                        setTimeout(() => {
                            setRightVideoOpacity(1);
                            setIsLocked(false); // UNLOCK after all transitions
                        }, maxVideoFade);
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
    setWhitePoemOpacity(0);
    setLeftVideoOpacity(0);
    setCenterVideoOpacity(0);
    setRightVideoOpacity(0);
}

export default useTransitionAnimation;