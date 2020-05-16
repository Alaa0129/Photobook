import theme from "./modules/theme.mjs";
import storage from "./modules/storage.mjs";
import Pages from "./modules/pages.mjs";
import Layout from "./modules/layout.mjs";

theme.init();

const pages = Pages(storage);
const layout = Layout();
const bookElement = document.getElementById("book");


storage.subscribe(() => {
  const page = pages.getPage(pages.getCurrentPageIndex());
  const pageElement = layout.createElement(page.layout, {
    ".title textContent": page.content.title.text,
    ".caption textContent": page.content.caption.text,
    ".book__media src": page.image_url,
    ".book__media hidden": !page.image_url,
    ".book__add-media hidden": Boolean(page.image_url),
  });

  const pagination = document.getElementById("pagination-container")
  pagination.innerHTML = ''
  const paginationContent = layout.createElement("pagination", {
    ".pagination__current textContent": `Side ${
      pages.getCurrentPageIndex() + 1
    } / ${pages.getPageCount()}`,
    "button:first-of-type onclick": () => gotoPage(-1),
    "button:last-of-type onclick": () => gotoPage(1)
  })
  pagination.appendChild(paginationContent);

  bookElement.innerHTML = '';
  bookElement.appendChild(pageElement);
});

pages.init();

// Event Delegator
bookElement.addEventListener("change", (e) => {
  if (e.target && e.target.className.includes("file-plane")) fileUpload(e);
});

function fileUpload(ev) {
  let reader = new FileReader();

  reader.onload = () => {
    // Save base64 to state

    storage.setState((stateDraft) => {
      stateDraft.pages[pages.getCurrentPageIndex()].image_url = reader.result;
      return stateDraft;
    });
  };

  reader.readAsDataURL(ev.target.files[0]);
}

// Paging
function gotoPage(direction) {
  const currentPageIndex = pages.getCurrentPageIndex();
  if (currentPageIndex + direction < 0) return;
  // TODO: Add support for creating new pages
  if (currentPageIndex + direction >= pages.getPageCount()) return;

  pages.setCurrentPageIndex(pages.getCurrentPageIndex() + direction);
}
