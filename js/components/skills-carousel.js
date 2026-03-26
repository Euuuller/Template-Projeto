/* ========================================
   Skills Infinite Carousel
   ======================================== */

import { SKILLS } from '../data/data.js';

export function initSkillsCarousel() {
  const track1 = document.querySelector('[data-skills-track-1]');
  const track2 = document.querySelector('[data-skills-track-2]');

  if (!track1 || !track2) return;

  const mid = Math.ceil(SKILLS.length / 2);
  const skillsTrack1 = SKILLS.slice(0, mid);
  const skillsTrack2 = SKILLS.slice(mid);

  // Duplicate for infinite scroll (4 times to cover large screens)
  const items1 = [...skillsTrack1, ...skillsTrack1, ...skillsTrack1, ...skillsTrack1];
  const items2 = [...skillsTrack2, ...skillsTrack2, ...skillsTrack2, ...skillsTrack2];

  track1.innerHTML = items1.map(createSkillCard).join('');
  track2.innerHTML = items2.map(createSkillCard).join('');
}

function createSkillCard(skill) {
  return `
    <div class="skill-card">
      <div class="skill-card__icon-wrapper">
        <img
          src="${skill.iconUrl}"
          alt="${skill.name}"
          class="skill-card__icon"
          loading="lazy"
          decoding="async"
        />
      </div>
      <span class="skill-card__name">${skill.name}</span>
      <span class="skill-card__phrase">${skill.phrase}</span>
    </div>
  `;
}
