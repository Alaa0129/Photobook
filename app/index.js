import themeDialog from "./modules/theme-dialog.mjs";
import layoutDialog from "./modules/layout-dialog.mjs";
import storage from "./modules/storage.mjs";
import Pages from "./modules/pages.mjs";
import Layout from "./modules/layout.mjs";


const pages = Pages(storage);
const layout = Layout();
const bookElement = document.getElementById("book");

storage.subscribe(() => {
  if (pages.getSelectedPageIndex() === null) return
  const page = pages.getPage(pages.getSelectedPageIndex());
  const pageElement = layout.createElement(page.layout, {
    ".book__title textContent": page.content.title.text,
    ...page.image_url && {"img src": page.image_url},
    [`${!page.image_url ? 'img' : 'label'} style`]: 'display: none'
  });

  const pagination = document.getElementById("pagination-container")
  pagination.innerHTML = ''
  const paginationContent = layout.createElement("pagination", {
    ".pagination__current textContent": `Side ${
      pages.getSelectedPageIndex() + 1
    } / ${pages.getPageCount()}`,
    "button:first-of-type onclick": () => gotoPage(-1),
    "button:last-of-type onclick": () => gotoPage(1)
  })
  pagination.appendChild(paginationContent);

  bookElement.innerHTML = '';
  bookElement.appendChild(pageElement);
});

pages.init();
themeDialog.init();
layoutDialog.init();

// Event Delegator
bookElement.addEventListener("input", (e) => {
  switch(e.target.className) {
    case 'file-plane': fileUpload(e)
    break;
    default:
    break;
  }
});

bookElement.addEventListener("keydown", (e) => {
  switch (e.target.className) {
    case "book__title": {
        if (e.key === "Enter") setPageTitle(e);
    }
    break;
    default:
    break;
  }
});

function setPageTitle(e) {
  storage.setState((stateDraft) => {
    stateDraft.pages[pages.getSelectedPageIndex()].content.title.text = e.target.textContent.trim();
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
  if (selectedPageIndex + direction >= pages.getPageCount()) return;

  pages.setselectedPageIndex(pages.getSelectedPageIndex() + direction);
}
