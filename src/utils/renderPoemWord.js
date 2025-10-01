import React from "react";

// Helper to render poem words with flicker and notation
export function renderPoemWord(word, w_idx, subjectColor, subjectFlickerOpacity, objectColor, objectFlickerOpacity, PoemWord) {
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
