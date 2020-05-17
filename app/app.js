import themeDialog from "./modules/theme-dialog.mjs";
import layoutDialog from "./modules/layout-dialog.mjs";
import storage from "./modules/storage.mjs";
import Pages from "./modules/pages.mjs";
import Layout from "./modules/layout.mjs";

const pages = Pages(storage);
const layout = Layout();
const bookElement = document.getElementById("book");
const dialogBackdrop = document.getElementById("dialog-backdrop");

dialogBackdrop.addEventListener("click", function (evt) {
  if (evt.target === dialogBackdrop) {
    [...dialogBackdrop.children].forEach((c) => (c.open = false));
    document.body.classList.remove("backdrop-active");
  } else {
    evt.stopPropagation()
  }
});

storage.subscribe(() => {
  if (pages.getSelectedPageIndex() === null) return;
  const page = pages.getPage(pages.getSelectedPageIndex());
  const pageElement = layout.createElement(page.layout, {
    ".book__title|textContent": page.content.title.text,
    ".book__title|onblur": (e) => {
      switch (e.target.className) {
        case "book__title":
          {
            setPageTitle(e);
          }
          break;
        default:
          break;
      }
    },
    ...(page.image_url && { "img|src": page.image_url }),
    ...(!page.image_url && {"img|style": "display: none"}),
    ".book__media|className": page.image_url ? "book__media book__media--has-img" : "book__media"
  });

  const pagination = document.getElementById("pagination-container");
  pagination.innerHTML = "";
  const paginationContent = layout.createElement("pagination", {
    ".pagination__current|textContent": `Side ${
      pages.getSelectedPageIndex() + 1
    } / ${pages.getPageCount()}`,
    "button:first-of-type|onclick": () => gotoPage(-1),
    "button:first-of-type|disabled": pages.getSelectedPageIndex() === 0,
    "button:last-of-type|onclick": () => gotoPage(1),
    "button:last-of-type img|src":
      pages.getSelectedPageIndex() + 1 === pages.getPage().length
        ? "assets/icons/primary/plus.svg"
        : "assets/icons/primary/chevron-right.svg",
  });
  pagination.appendChild(paginationContent);

  bookElement.innerHTML = "";
  bookElement.appendChild(pageElement);
});

pages.init();
themeDialog.init();
layoutDialog.init();

// Event Delegator
bookElement.addEventListener("input", (e) => {
  switch (e.target.className) {
    case "file-plane":
      fileUpload(e);
      break;
    default:
      break;
  }
});

bookElement.addEventListener("keydown", (e) => {
  switch (e.target.className) {
    case "book__title":
      {
        if (e.key === "Enter") setPageTitle(e);
      }
      break;
    default:
      break;
  }
});

function setPageTitle(e) {
  storage.setState((stateDraft) => {
    let value = e.target.textContent.trim()
    if (value.length === 0) value = "Klik for at tilføje tekst"
    if (value.length > 17) value = value.slice(0, 17)
    stateDraft.pages[
      pages.getSelectedPageIndex()
    ].content.title.text = value;
    return stateDraft;
  });
}

function fileUpload(ev) {
  let reader = new FileReader();

  reader.onload = () => {
    storage.setState((stateDraft) => {
      stateDraft.pages[pages.getSelectedPageIndex()].image_url = reader.result;
      return stateDraft;
    });
  };

  reader.readAsDataURL(ev.target.files[0]);
}

// Paging
function gotoPage(direction) {
  const selectedPageIndex = pages.getSelectedPageIndex();
  if (selectedPageIndex + direction < 0) return;
  // TODO: Add support for creating new pages
  if (selectedPageIndex + direction >= pages.getPageCount()) {
    pages.addPage();
    layoutDialog.show();
  }

  pages.setSelectedPageIndex(pages.getSelectedPageIndex() + direction);
}
