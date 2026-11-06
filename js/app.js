const tspStoriesPage = document.querySelector('.tsp-stories-wrapper')

if (tspStoriesPage) {
  const tabbedPill = Array.from(tspStoriesPage.querySelectorAll('.tabbed-pill .tab'))
  const tabbedContainers = Array.from(tspStoriesPage.querySelectorAll('.tab-wrapper .tabbed-container'))

  tabbedPill.forEach((pill) => {
    pill.addEventListener('click', () => {
      tabbedPill.forEach((p) => {
        p.classList.remove('active')
        p.setAttribute('aria-pressed', 'false')
      })
      pill.classList.add('active')
      pill.setAttribute('aria-pressed', 'true')
      const selectedTabId = pill.getAttribute('id')
      tabbedContainers.forEach((container) => container.classList.remove('active'))
      const target = tabbedContainers.find((tabContainer) => tabContainer.getAttribute('id') === selectedTabId)
      if (target) target.classList.add('active')
    })
  })
}

// Show a focus ring around embedded videos: a cross-origin iframe never matches :focus in Chrome,
// so mark its frame while keyboard focus is inside the video.
const markFocusedVideo = () => {
  document.querySelectorAll('.video-frame.has-focus').forEach((frame) => frame.classList.remove('has-focus'))
  const active = document.activeElement
  if (active && active.tagName === 'IFRAME') {
    const frame = active.closest('.video-frame')
    if (frame) frame.classList.add('has-focus')
  }
}
window.addEventListener('blur', () => setTimeout(markFocusedVideo, 0))
window.addEventListener('focus', markFocusedVideo)
document.addEventListener('focusin', markFocusedVideo)

// Slideshows: one per photo spot on the home page, each with its own photos, timing and transition.
// They hold still until on screen, pause on hover and focus, carry a visible Pause control,
// and never autoplay for visitors who ask for reduced motion.
document.querySelectorAll('[data-slideshow]').forEach((show) => {
  const slides = Array.from(show.querySelectorAll('.slideshow__slide'))
  if (slides.length < 2) return
  const caption = show.querySelector('.slideshow__caption')
  const toggle = show.querySelector('[data-toggle]')
  const effect = show.dataset.effect
  const interval = parseInt(show.dataset.interval, 10) || 6000
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const state = { index: 0, seen: false, hover: false, focus: false, held: reduced }
  let timer = null

  const show_ = (next) => {
    const count = slides.length
    next = (next + count) % count
    if (next === state.index) return
    const current = slides[state.index]
    const incoming = slides[next]
    if (effect === 'slide') {
      slides.forEach((s) => { if (s !== current) s.classList.remove('is-prev') })
      incoming.style.transition = 'none'
      incoming.style.transform = 'translateX(100%)'
      void incoming.offsetWidth
      incoming.style.transition = ''
      incoming.style.transform = ''
      current.classList.add('is-prev')
    }
    current.classList.remove('is-current')
    current.setAttribute('aria-hidden', 'true')
    incoming.classList.add('is-current')
    incoming.removeAttribute('aria-hidden')
    if (incoming.loading === 'lazy') incoming.loading = 'eager'
    if (caption) caption.textContent = incoming.dataset.caption || ''
    state.index = next
  }

  const sync = () => {
    const run = state.seen && !state.hover && !state.focus && !state.held
    if (run && !timer) timer = setInterval(() => show_(state.index + 1), interval)
    if (!run && timer) { clearInterval(timer); timer = null }
    if (toggle) {
      toggle.textContent = state.held ? 'Play' : 'Pause'
      toggle.setAttribute('aria-label', state.held ? 'Play slideshow' : 'Pause slideshow')
    }
  }

  const restart = () => { if (timer) { clearInterval(timer); timer = null } sync() }
  show.querySelector('[data-prev]').addEventListener('click', () => { show_(state.index - 1); restart() })
  show.querySelector('[data-next]').addEventListener('click', () => { show_(state.index + 1); restart() })
  toggle.addEventListener('click', () => { state.held = !state.held; sync() })
  show.addEventListener('pointerenter', () => { state.hover = true; sync() })
  show.addEventListener('pointerleave', () => { state.hover = false; sync() })
  show.addEventListener('focusin', () => { state.focus = true; sync() })
  show.addEventListener('focusout', () => { state.focus = false; sync() })
  new IntersectionObserver(([entry]) => { state.seen = entry.isIntersecting; sync() }, { threshold: 0.25 }).observe(show)
  sync()
})
