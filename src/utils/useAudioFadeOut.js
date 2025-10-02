import { useCallback } from 'react';

// Custom hook to fade out and stop audio from a ref
export default function useAudioFadeOut(audioRef) {
  return useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused && audio.volume > 0) {
      const fadeDuration = 1000; // ms
      const fadeSteps = 20;
      const fadeStepTime = fadeDuration / fadeSteps;
      let currentStep = 0;
      const originalVolume = audio.volume;
      const fadeOut = () => {
        currentStep++;
        const newVolume = Math.max(0, originalVolume * (1 - currentStep / fadeSteps));
        audio.volume = newVolume;
        if (currentStep < fadeSteps) {
          setTimeout(fadeOut, fadeStepTime);
        } else {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = originalVolume;
        }
      };
      fadeOut();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [audioRef]);
}
