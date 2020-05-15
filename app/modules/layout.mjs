export default function init() {
  return {
    createElement
  }
}

function createElement(layout, content) {
  const fragment = document.querySelector(layout)
  const instance = document.importNode(fragment.content, true)

  for (const [key, val] of Object.entries(content)) {
    const elem = instance.querySelector(`.${key}`)
    elem.innerHTML = val
  }

  return instance
}
