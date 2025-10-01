function renderDescription(descriptionText, highlightWord, highlightBg, highlightColor, Highlight) {
  const regex = new RegExp(highlightWord, 'i');
  const match = regex.exec(descriptionText);
  if (!match) return descriptionText;
  const idx = match.index;
  const word = descriptionText.slice(idx, idx + match[0].length);
  const before = descriptionText.slice(0, idx);
  const after = descriptionText.slice(idx + match[0].length);

  return [
    before,
    <Highlight key="highlight" bg={highlightBg} color={highlightColor}>{word}</Highlight>,
    after
  ];
}

export default renderDescription;