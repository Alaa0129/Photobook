/**
 * layouts
 * Author: Jonas Glerup Røssum
 */

import storage from "./storage.mjs";

export default { init };

const layoutAPI = "https://itu-sdbg-s2020.now.sh/api/layouts";
let layouts = {
  "layout-one": {
    id: "layout-one",
    name: "Layout 1",
  },
  "layout-two": {
    id: "layout-two",
    name: "Layout 2",
  },
};
let select;

storage.subscribe((state) => {
  if (state.selectedPageIndex === null) return;
  const layoutID = state.pages[state.selectedPageIndex].layout;
  const layout = layouts[layoutID];
  const book = document.getElementById("book");

  //   book.style.backgroundColor = "#" + layout.styles.secondaryColor;
  //   book.style.color = "#" + layout.styles.primaryColor;
  //   book.style.fontFamily = layout.styles.fontFamily;

  if (select && Object.values(layouts).length > 0)
    select.querySelector(`option[value="${layoutID}"]`).selected = true;
});

async function init() {
  const layoutButton = document.getElementById("layout-button");
  const layoutDialog = document.getElementById("layout-dialog");
  const closeButton = document.getElementById("layout-dialog__close-button");
  const dialogBackdrop = document.getElementById("dialog-backdrop");
  select = document.createElement("select");

  const layoutElements = Object.values(layouts).map((layout) => {
    const { id, name } = layout;
    const el = document.createElement("option");
    el.textContent = name;
    select.className = "dialog__select";
    el.value = id;
    if (storage.getState().selectedlayout === id) el.selected = true;

    return el;
  });

  layoutDialog.appendChild(select);
  layoutElements.forEach((el) => select.appendChild(el));

  select.addEventListener("change", function (event) {
    storage.setState((stateDraft) => {
      stateDraft.pages[stateDraft.selectedPageIndex].layout = event.target.value;
      return stateDraft;
    });
  });

  layoutButton.addEventListener("click", () => {
    if (layoutDialog.open) return;
    layoutDialog.open = true;
    document.body.classList.add("backdrop-active");
  });

  closeButton.addEventListener("click", function () {
    layoutDialog.open = false;
    document.body.classList.remove("backdrop-active");
  });

  // Set initial layout
  storage.setState((stateDraft) => {
    stateDraft.selectedPageIndex = 0;
    return stateDraft;
  });
}
