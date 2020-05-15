/**
 * Themes
 * Author: Alaa Abdul-Al
 * Author: Jonas Glerup Røssum
 */

export default { init };

const themeAPI = "https://itu-sdbg-s2020.now.sh/api/themes";
let themetrue = false;
let themes = {};

function init() {
  const themeButton = document.getElementById("theme-button");
  const themeDialog = document.getElementById("theme-overlay");
  const closeButton = document.getElementById("theme-close-button-overlay");

  themeButton.addEventListener("click", async () => {
    if (themeDialog.open) return;
    themeDialog.open = true;
    if(themetrue) return;
    else themetrue = true;
    const result = await fetch(themeAPI).then((r) => r.json());

    const select = document.createElement("select");
    const themeElements = result.themes.map((theme) => {
      const { id, name, styles } = theme;
      themes[id] = theme;
      const el = document.createElement("option");
      el.textContent = name;;
      select.className = "theme-select-overlay";
      select.style.cursor = "pointer";
      el.style.color = `#${styles.primaryColor}`;
      el.value = id;
      el.style.backgroundColor = `#${styles.secondaryColor}`;
      el.style.fontFamily = styles.fontFamily;
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
  });

  closeButton.addEventListener("click", function() {
    themeDialog.open = false;
  })
}
