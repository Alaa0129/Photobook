import theme from './modules/theme.mjs'
import storage from './modules/storage.mjs'
// import Pages from './modules/pages.mjs'

// const pages = Pages(storage)


theme.init();

console.log(storage.getState())
console.log(storage.getPages(1))

/**
 * PopUp(Slide up)
 */
// const exampleBtn = document.getElementById("example-btn");

// exampleBtn.addEventListener("click", toggleShow);

// function toggleShow() {
//   this.classList.toggle("show");
// }

