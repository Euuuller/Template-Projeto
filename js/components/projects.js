/* ========================================
   Projects - Cards & Modal
   ======================================== */

import { PROJECTS } from '../data/data.js';
import { icons } from '../main.js';

export function initProjects() {
  const grid = document.querySelector('[data-projects-grid]');
  const modalBackdrop = document.querySelector('[data-modal-backdrop]');
  const modal = document.querySelector('[data-modal]');

  if (!grid) return;

  // Render project cards
  grid.innerHTML = PROJECTS.map(createProjectCard).join('');

  // Card click -> open modal
  grid.querySelectorAll('[data-project-id]').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.projectId;
      const project = PROJECTS.find(p => p.id === id);
      if (project) openModal(project, modalBackdrop, modal);
    });
  });

  // Close modal
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal(modalBackdrop);
    });
  }

  const closeBtn = document.querySelector('[data-modal-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modalBackdrop));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal(modalBackdrop);
    }
  });
}

function createProjectCard(project) {
  const statusClass = project.status === 'done' ? 'project-card__status--done' : 'project-card__status--progress';

  return `
    <article class="project-card" data-project-id="${project.id}">
      <div class="project-card__image-wrapper">
        <img
          src="${project.image}"
          alt="${project.title}"
          class="project-card__image"
          loading="lazy"
          decoding="async"
        />
        <span class="project-card__badge ${project.badgeClass}">${project.category}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.shortDesc}</p>
        <div class="project-card__tags">
          ${project.tags.map(tag => `
            <span class="project-card__tag ${tag.class}">
              <span class="project-card__tag-dot"></span>
              ${tag.name}
            </span>
          `).join('')}
        </div>
        <div class="project-card__metrics">
          ${project.metrics.map(m => `
            <span class="project-card__metric">
              ${icons.barChart}
              ${m}
            </span>
          `).join('')}
          <span class="project-card__status ${statusClass}">
            <span class="project-card__status-dot"></span>
            ${project.statusLabel}
          </span>
        </div>
      </div>
    </article>
  `;
}

function openModal(project, backdrop, modal) {
  if (!backdrop || !modal) return;

  const m = project.modal;

  modal.querySelector('[data-modal-title]').textContent = project.title;

  modal.querySelector('[data-modal-body]').innerHTML = `
    <div class="modal__section">
      <span class="modal__section-label">Desafio</span>
      <p class="modal__section-text">${m.desafio}</p>
    </div>
    <div class="modal__section">
      <span class="modal__section-label">Solução</span>
      <p class="modal__section-text">${m.solucao}</p>
    </div>
    <div class="modal__section">
      <span class="modal__section-label">Impacto</span>
      <p class="modal__section-text">${m.impacto}</p>
    </div>
    <div class="modal__section">
      <span class="modal__section-label">Métricas</span>
      <div class="modal__metrics">
        ${m.metricas.map(met => `<span class="modal__metric-badge">${met}</span>`).join('')}
      </div>
    </div>
    <div class="modal__section">
      <span class="modal__section-label">Stack</span>
      <div class="modal__stack">
        ${m.stack.map(s => `<span class="modal__stack-tag">${s}</span>`).join('')}
      </div>
    </div>
    <div class="modal__links">
      <a href="${m.urlCodigo}" target="_blank" rel="noopener noreferrer" class="modal__link modal__link--code">
        ${icons.github}
        Código
      </a>
      ${m.urlDemo !== '#' ? `
        <a href="${m.urlDemo}" target="_blank" rel="noopener noreferrer" class="modal__link modal__link--demo">
          ${icons.externalLink}
          Demo
        </a>
      ` : ''}
    </div>
  `;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(backdrop) {
  if (!backdrop) return;
  backdrop.classList.remove('active');
  document.body.style.overflow = '';
}
