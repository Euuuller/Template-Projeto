/* ========================================
   Typewriter Effect
   ======================================== */

import { TYPEWRITER_WORDS } from '../data/data.js';

export function initTypewriter() {
  const element = document.querySelector('[data-typewriter]');
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 60;
  const pauseAfterWord = 2000;
  const pauseBeforeDelete = 1500;

  function type() {
    const currentWord = TYPEWRITER_WORDS[wordIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % TYPEWRITER_WORDS.length;
        setTimeout(type, typingSpeed);
        return;
      }

      setTimeout(type, deletingSpeed);
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseBeforeDelete);
        return;
      }

      setTimeout(type, typingSpeed);
    }
  }

  setTimeout(type, pauseAfterWord);
}
