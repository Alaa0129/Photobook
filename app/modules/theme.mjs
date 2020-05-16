/**
 * Themes
 * Author: Jonas Glerup Røssum
 * Author: Alaa Abdul-Al
 */


export default { init };

const themeAPI = "https://itu-sdbg-s2020.now.sh/api/themes";
let themes = {};

async function init() {
  const themeButton = document.getElementById("theme-button");
  const themeDialog = document.getElementById("theme-overlay");
  const closeButton = document.getElementById("theme-close-button-overlay");
  const select = document.createElement("select");
  const result = await fetch(themeAPI).then((r) => r.json());

  const themeElements = result.themes.map((theme) => {
    const { id, name, styles } = theme;
    themes[id] = theme;
    const el = document.createElement("option");
    const span = document.createElement("span");
    el.textContent = name;;
    span.className = "theme-span-overlay";
    select.className = "theme-select.overlay";
    el.value = id;
    el.className = "theme-overlay";

    return el;
  });

  themeDialog.appendChild(select);
  themeElements.forEach((el) => select.appendChild(el));

  select.addEventListener("change", function(event) {
    const selected_theme = themes[event.target.value];
    themeDialog.style.backgroundColor = "#" + selected_theme.styles.secondaryColor;
    themeDialog.style.color = "#" + selected_theme.styles.primaryColor;
    themeDialog.style.fontFamily = selected_theme.styles.fontFamily;
  })
  
  themeButton.addEventListener("click", async () => {
    if (themeDialog.open) return;
    themeDialog.open = true;
  });

  function applySelectedTheem() {

  }

  closeButton.addEventListener("click", function() {
    themeDialog.open = false;
  })
}
