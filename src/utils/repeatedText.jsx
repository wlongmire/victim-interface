import { useState, useRef, useEffect } from "react";

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

export default RepeatedText;