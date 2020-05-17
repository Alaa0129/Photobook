/**
 * Themes
 * Author: Alaa Abdul-Al
 * Author: Jonas Glerup Røssum
 */

export default { init };

const themeAPI = "https://itu-sdbg-s2020.now.sh/api/themes";
let themes = {};


async function init() {
  const themeButton = document.getElementById("theme-button");
  const themeDialog = document.getElementById("theme-overlay");
  const closeButton = document.getElementById("theme-overlay__close-button");
  const dialogBackdrop = document.getElementById('dialog-backdrop')
  const select = document.createElement("select");
  const result = await fetch(themeAPI).then((r) => r.json());

  const themeElements = result.themes.map((theme) => {
    const { id, name, styles } = theme;
    themes[id] = theme;
    const el = document.createElement("option");
    el.textContent = name;
    select.className = "theme-overlay__select";
    el.value = id;

    return el;
  });

  themeDialog.appendChild(select);
  themeElements.forEach((el) => select.appendChild(el));

  select.addEventListener("change", function(event) {
    const selected_theme = themes[event.target.value];
    const book = document.getElementById('book')
    debugger
    book.style.backgroundColor = "#" + selected_theme.styles.secondaryColor;
    book.style.color = "#" + selected_theme.styles.primaryColor;
    book.style.fontFamily = selected_theme.styles.fontFamily;

  })
  
  themeButton.addEventListener("click", async () => {
    if (themeDialog.open) return;
    themeDialog.open = true;
    document.body.classList.add('backdrop-active')
  });

  function applySelectedTheme(themeID) {

  }

  closeButton.addEventListener("click", function() {
    themeDialog.open = false;
    document.body.classList.remove('backdrop-active')
  })
}
