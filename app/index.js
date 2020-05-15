import theme from './modules/theme.mjs'
import storage from './modules/storage.mjs'
import Pages from './modules/pages.mjs'
import Layout from './modules/layout.mjs'

theme.init();

/** WIP */
const pages = Pages(storage)

// Create default layout
const main = document.querySelector('.main')

const layout = Layout()

main.appendChild(

  layout.createElement('#layout-one', {
    title: 'Title',
    author: 'Raisa'
  })

)

// Event Delegator
main.addEventListener('change', e => {
  if (e.target && e.target.matches('.file-plane')) fileUpload(e)
})

function fileUpload(ev) {
  let image = ev.target.parentElement.querySelector('.img')

  let reader = new FileReader()

  reader.onload = () => {
    image.src = reader.result
  }

  reader.readAsDataURL(ev.target.files[0])
}

// Paging
const prevPageBtn = document.querySelector('.prev')
const nextPageBtn = document.querySelector('.next')

let currentPage = 0

prevPageBtn.addEventListener('click', e => {
  currentPage = currentPage === 0 ? 0 : currentPage - 1
  console.log(currentPage)

  const page = pages.getPage(currentPage)

  const element = layout.createElement(`#${page.layout}`, {
    title: page.content.title.text,
    caption: page.content.caption.text,
    image: page.image_url
  })

  main.appendChild(element)
})

nextPageBtn.addEventListener('click', e => {
  currentPage++
  console.log(currentPage)

  const page = pages.getPage(currentPage)

  console.log(page)

  const element = layout.createElement(`#${page.layout}`, {
    title: page.content.title.text,
    caption: page.content.caption.text,
    image: page.image_url
  })

  const currentPageNumber = document.getElementById("currentPage");
  const totalPagesNumber = document.getElementById("totalPages");

function topTextChanged(){
  currentPageNumber.innerText = currentPage;
}

nextPageBtn.addEventListener('click', topTextChanged);
 

  main.appendChild(element)
})

