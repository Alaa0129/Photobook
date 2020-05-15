export default function init({storage}) {
  storage.setState(defaultState)
}

let defaultState = {
  title: "Min fotobog",
  pages: [
    {
      image_url: "imgur URL",
      content: [
        {
          type: "title",
          text: "Min titel",
          styles: {},
          extras: {},
        },
      ],
    },
    {
      image_url: "imgur URL",
      content: [
        {
          type: "title",
          text: "Min titel",
          styles: {},
          extras: {},
        },
        {
          type: "caption",
          text: "Min billedtekst",
          styles: {
            color: "red",
            fontSize: "18px",
          },
          extras: {},
        },
      ],
    },
  ],
}