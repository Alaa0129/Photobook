/**
 * Themes
 */

/* Author: Jonas Glerup Røssum */
/* Author: Alaa Abdul-Al */

import storage from './storage.mjs'

export default { init };

const themeAPI = "https://itu-sdbg-s2020.now.sh/api/themes";
let themes = {};
let select

storage.subscribe(state => {
  if (state.selectedTheme === null) return
  const theme = themes[state.selectedTheme]
  const book = document.getElementById('book')

  book.style.backgroundColor = "#" + theme.styles.secondaryColor;
  book.style.color = "#" + theme.styles.primaryColor;
  book.style.fontFamily = theme.styles.fontFamily;

  if (select && Object.values(themes).length > 0) select.querySelector(`option[value="${state.selectedTheme}"]`).selected = true
})

async function init() {
  const themeButton = document.getElementById("theme-button");
  const themeDialog = document.getElementById("theme-dialog");
  const closeButton = document.getElementById("theme-dialog__close-button");
  select = document.createElement("select");
  const result = await fetch(themeAPI).then((r) => r.json());

  const themeElements = result.themes.map((theme) => {
    const { id, name, styles } = theme;
    themes[id] = theme;
    const el = document.createElement("option");
    el.textContent = name;
    select.className = "dialog__select";
    el.value = id;
    if (storage.getState().selectedTheme === id) el.selected = true

    return el;
  });


  
  themeDialog.appendChild(select);
  themeElements.forEach((el) => select.appendChild(el));

  select.addEventListener("change", function(event) {
    storage.setState(stateDraft => {
      stateDraft.selectedTheme = event.target.value
      return stateDraft
    })
  })
  
  themeButton.addEventListener("click", () => {
    if (themeDialog.open) return;
    themeDialog.open = true;
    document.body.classList.add('backdrop-active')
  });

  closeButton.addEventListener("click", function() {
    themeDialog.open = false;
    document.body.classList.remove('backdrop-active')
  })

  // Set initial theme
  storage.setState(stateDraft => {
    stateDraft.selectedTheme = Object.keys(themes)[2]
    return stateDraft
  })
}
