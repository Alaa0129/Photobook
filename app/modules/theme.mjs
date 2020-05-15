/**
 * Themes
 * Author: Jonas Glerup Røssum
 */

export default { init };

const themeAPI = "https://itu-sdbg-s2020.now.sh/api/themes";

function init() {
  const themeButton = document.getElementById("theme-button");
  const themeDialog = document.getElementById("theme-dialog");

  themeButton.addEventListener("click", async () => {
    if (themeDialog.open) return;
    const result = await fetch(themeAPI).then((r) => r.json());

    themeDialog.open = true;
    const themeElements = result.themes.map(({ id, name, styles }) => {
      const el = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = name;
      el.style.color = `#${styles.primaryColor}`;
      el.style.backgroundColor = `#${styles.secondaryColor}`;
      el.appendChild(span);
      el.style.fontFamily = styles.fontFamily;

      return el;
    });

    themeElements.forEach((el) => themeDialog.appendChild(el));
  });
}
