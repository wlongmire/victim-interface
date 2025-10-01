import { PoemWord } from "./../VictimInterface.styled";

// Helper to render poem words with flicker and notation
function renderPoemWord(word, w_idx, subjectColor, subjectFlickerOpacity, objectColor, objectFlickerOpacity, PoemWord) {
	const subjectMatch = word.match(/^\{\s*([^}]+?)\s*\}(\.)?$/);
	if (subjectMatch) {
		const clean = subjectMatch[1].trim() + (subjectMatch[2] || "");
		return <PoemWord key={w_idx} style={{background: "#00000000", color: subjectColor}}>{clean}</PoemWord>;
	}
	const objectMatch = word.match(/^\[\s*([^\]]+?)\s*\](\.)?$/);
	if (objectMatch) {
		const clean = objectMatch[1].trim() + (objectMatch[2] || "");
		return <PoemWord key={w_idx} style={{background: "#00000000", color: objectColor}}>{clean}</PoemWord>;
	}
	return word.trim() === "" ? word : <PoemWord key={w_idx}>{word}</PoemWord>;
}

function renderPoemLine(line, idx, subjectColor, subjectFlickerOpacity, objectColor, objectFlickerOpacity, PoemWord) {
  if (line === "") return <br key={"br-"+idx}/>;
  return (
    <p key={idx} style={{margin: 0, padding: 0, lineHeight: 1.2}}>
      {line.split(/(\s+)/).map((word, w_idx) =>
        renderPoemWord(word, w_idx, subjectColor, subjectFlickerOpacity, objectColor, objectFlickerOpacity, PoemWord)
      )}
    </p>
  );
}

export default renderPoemLine;