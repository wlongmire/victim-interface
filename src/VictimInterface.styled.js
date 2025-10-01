import styled from "styled-components";

export const PoemWord = styled.span`
  padding: 0.05em 0.25em;
  margin: 0.05em 0.0.5em;
  display: inline-block;
`;

export const LeftBranding = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 0.5rem;
  font-family: sans-serif;
  color: #fff;
  background: transparent;
  z-index: 101;
  padding-bottom: 0.3rem;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  letter-spacing: 0.1em;
`;

export const RightBranding = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 0.5rem;
  font-family: sans-serif;
  color: #fff;
  background: transparent;
  z-index: 101;
  padding-bottom: 0.3rem;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  letter-spacing: 0.1em;
`;
export const Header = styled.header`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 0.3rem;
  font-size: 0.5rem;
  font-family: sans-serif;
  color: #fff;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  text-transform: uppercase;
  z-index: 102;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  letter-spacing: 0.1em;
`;

export const Footer = styled.footer`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 0.3rem;
  font-size: 0.5rem;
  font-family: sans-serif;
  color: #fff;
  background: transparent;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 102;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  letter-spacing: 0.1em;
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #fff;
  color: #000;
  font-family: sans-serif;
`;

export const Panel = styled.div`
  width: 33.3333%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: relative;
  background: ${props => props.bg || "#fff"};
  color: ${props => props.color || "#000"};
  transition: opacity 1s;
  &.fade-out {
    transition: opacity 1s;
  }
`;

export const Title = styled.h1`
  font-size: ${props => props.size || "2rem"};
  font-family: serif;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  text-align: left;
  line-height: 1.3;
  width: 75%;
  transition: opacity 1s;
  &.fade-out {
    transition: opacity 1s;
  }
`;

export const Highlight = styled.span`
  background: ${props => props.bg || "#000"};
  color: ${props => props.color || "#fff"};
  padding: 0 0.25em;
`;

export const ButtonGroup = styled.div`
  margin-top: 2.5rem;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.5em 0;
  font-size: 1.125rem;
  border: none;
  border-radius: 0.25em;
  background: ${({ selected, bg }) =>
    selected ? bg : 'transparent'};
  color: ${({ selected, bg }) =>
    selected ? '#fff' : bg};
  border: 2px solid ${({ bg }) => bg};
  border-radius: 8px;
  padding: 0.5em 1.2em;
  margin: 0.3em 0.5em;
  font-size: 1.1em;
  font-weight: 500;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  transition: background 0.5s cubic-bezier(0.4,0,0.2,1), color 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1);
  box-shadow: ${({ selected }) =>
    selected ? '0 0 0 2px rgba(0,0,0,0.08)' : 'none'};

  &:hover {
    ${({ selected, bg }) =>
      !selected && `
        background: ${bg ? bg + '80' : 'rgba(0,0,0,0.5)'};
        color: #fff;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.065);
      `}
  }
`;

export const PoemPanel = styled.div`
  width: 33.3333%;
  background: ${props => props.bg || "#fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  text-align: center;
  transition: opacity 1s;
  &.fade-out {
    transition: opacity 1s;
  }
`;


export const Poem = styled.div`
  color: ${props => props.color || "#000"};
  font-size: 1.3rem;
  line-height: 1.2;
  font-family: serif;
  opacity: ${props => props.$opacity ?? 1};
  transition: opacity 1s;
  &.fade-out {
    transition: opacity 1s;
  }
`;