const tspStoriesPage = document.querySelector('.tsp-stories-wrapper')
const tabbedPill = Array.from(tspStoriesPage.querySelectorAll('.tabbed-pill .tab'))
const tabbedContainers = Array.from(tspStoriesPage.querySelectorAll('.tab-wrapper .tabbed-container'))
console.log(tabbedContainers)

tabbedPill.forEach((pill) => {
  pill.addEventListener('click', () => {
    tabbedPill.forEach((p) => p.classList.remove('active'))
    pill.classList.add('active')
    selectedTabId = pill.getAttribute('id')
    console.log(selectedTabId)
    tabbedContainers.forEach((container) => container.classList.remove('active'))
    tabbedContainers.find((tabContainer) => tabContainer.getAttribute('id') === selectedTabId).classList.add('active')
  })
})
