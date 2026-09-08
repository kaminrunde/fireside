import * as t from "../types";
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk";

let globalCb: null | Function = null;
let sdk: null | any = null;

const connector: t.Connector = {
  name: "demoConnector",
  onChange: (cb) => {
    globalCb = cb;
  },
  setStory: (story) => {
    setTimeout(() => globalCb && globalCb(story), 100);
    console.log(story);
  },
};

initContentfulExtension((_sdk) => {
  sdk = _sdk;
  try {
    // @ts-ignore
    sdk.window.updateHeight(600);
    sdk.window;
  } catch (e) {}
  const value = sdk.field.getValue();
  globalCb(value);
  sdk.field.onValueChanged(globalCb);
});

/**
 * dev fixture. Three components, two enabled media-sizes with a different
 * layout each, so multi-select, shift-ranges and buffering across devices
 * can be tried out without a running CMS
 */
/**
 * dev fixture. Five components across two enabled media-sizes, two of them
 * with the long names and nested props the editors actually work with, so
 * multi-select, buffering across devices and the component search can be
 * tried out without a running CMS
 */
/**
 * dev fixture. Fifteen components across two enabled media-sizes, with the
 * long names, nested props and partial grid placement the editors actually
 * work with, so multi-select, buffering across devices, the search and the
 * keyboard navigation can be tried out without a running CMS
 */
const DEMO_STORY = {
  "version": "2.0.0",
  "componentsById": {
    "017728ba66196ce3a53d08e": {
      "id": "017728ba66196ce3a53d08e",
      "name": "Button",
      "props": {
        "gridArea": "Button123",
        "__version": 1,
        "position": "left",
        "label": "foo"
      },
      "createdAt": 1626710762275,
      "updatedAt": 1626710762275,
      "hash": "21093375e312b8c173100c35080b23f2"
    },
    "027728ba66196ce3a53d08e": {
      "id": "027728ba66196ce3a53d08e",
      "name": "Button",
      "props": {
        "gridArea": "Button456",
        "__version": 1,
        "position": "left",
        "label": "bar"
      },
      "createdAt": 1626710862275,
      "updatedAt": 1626710862275,
      "hash": "ae9d9d0262d70150d4fb8072784b8cec"
    },
    "037728ba66196ce3a53d08e": {
      "id": "037728ba66196ce3a53d08e",
      "name": "Button",
      "props": {
        "gridArea": "Button789",
        "__version": 1,
        "position": "left",
        "label": "baz"
      },
      "createdAt": 1626710962275,
      "updatedAt": 1626710962275,
      "hash": "dc1aed78da01d4329f83435c96bcf411"
    },
    "047728ba66196ce3a53d08e": {
      "id": "047728ba66196ce3a53d08e",
      "name": "CategoryHeadlineWithProducts",
      "props": {
        "gridArea": "home_category_products_k2_bestecksets",
        "__version": 1,
        "headline": "Bestecksets fuer die Gastronomie",
        "subline": "Hochwertige Bestecke fuer Hotellerie und Restaurant",
        "skus": [
          "30099973",
          "30089818",
          "10010717"
        ]
      },
      "createdAt": 1758844800000,
      "updatedAt": 1758844800000,
      "hash": "22691a93614a2d933c2f1e45bddf3ab4"
    },
    "057728ba66196ce3a53d08e": {
      "id": "057728ba66196ce3a53d08e",
      "name": "CategoryImageTeaserWithProducts",
      "props": {
        "gridArea": "home_category_highlight_k1_buffet_20250622",
        "__version": 1,
        "headline": "Buffet Highlights",
        "slides": [
          {
            "headline": "Chafing Dishes",
            "sku": "30099973",
            "link": "/de-de/buffet/chafing-dishes"
          },
          {
            "headline": "Bestecksets",
            "sku": "10013182",
            "link": "/de-de/tischkultur/bestecke"
          }
        ]
      },
      "createdAt": 1750550400000,
      "updatedAt": 1750550400000,
      "hash": "2184d2c872ef108fd87b1bceb4932bdf"
    },
    "067728ba66196ce3a53d08e": {
      "id": "067728ba66196ce3a53d08e",
      "name": "HeroStage",
      "props": {
        "gridArea": "hero_stage_home",
        "__version": 1,
        "headline": "Willkommen bei Lusini",
        "cta": "Jetzt entdecken",
        "link": "/de-de/"
      },
      "createdAt": 1745000000000,
      "updatedAt": 1745000000000,
      "hash": "1a0d082677e70873d08d171453b4cb89"
    },
    "077728ba66196ce3a53d08e": {
      "id": "077728ba66196ce3a53d08e",
      "name": "UspRow",
      "props": {
        "gridArea": "usp_row_versand",
        "__version": 1,
        "items": [
          "Gratis Versand ab 99 EUR",
          "30 Tage Rueckgabe",
          "Kauf auf Rechnung"
        ]
      },
      "createdAt": 1745100000000,
      "updatedAt": 1745100000000,
      "hash": "fd12284230f1accdab3843fac7cfb6c8"
    },
    "087728ba66196ce3a53d08e": {
      "id": "087728ba66196ce3a53d08e",
      "name": "ImageTeaser",
      "props": {
        "gridArea": "teaser_gastro_k1",
        "__version": 1,
        "headline": "Gastronomiebedarf",
        "link": "/de-de/gastronomie/"
      },
      "createdAt": 1745200000000,
      "updatedAt": 1745200000000,
      "hash": "fa4e7911b6f95dc3cc90c8c51e49e204"
    },
    "097728ba66196ce3a53d08e": {
      "id": "097728ba66196ce3a53d08e",
      "name": "ImageTeaser",
      "props": {
        "gridArea": "teaser_hotel_k2",
        "__version": 1,
        "headline": "Hotelausstattung",
        "link": "/de-de/hotel/"
      },
      "createdAt": 1745300000000,
      "updatedAt": 1745300000000,
      "hash": "7de2722c212eb0205e5df6200e0feb35"
    },
    "0a7728ba66196ce3a53d08e": {
      "id": "0a7728ba66196ce3a53d08e",
      "name": "ProductSlider",
      "props": {
        "gridArea": "product_slider_bestseller",
        "__version": 1,
        "headline": "Unsere Bestseller",
        "skus": [
          "30099973",
          "30089818",
          "10010717",
          "10013182",
          "30071122"
        ]
      },
      "createdAt": 1745400000000,
      "updatedAt": 1745400000000,
      "hash": "7e00c8b9026891a6c3061636e3e23770"
    },
    "0b7728ba66196ce3a53d08e": {
      "id": "0b7728ba66196ce3a53d08e",
      "name": "ProductListing",
      "props": {
        "gridArea": "product_listing_neuheiten",
        "__version": 1,
        "headline": "Neuheiten",
        "maxSize": 40,
        "skus": [
          "40011223",
          "40011224",
          "40011225"
        ]
      },
      "createdAt": 1745500000000,
      "updatedAt": 1745500000000,
      "hash": "4d8bdf9353c7a37f54110bc14bc1d9bb"
    },
    "0c7728ba66196ce3a53d08e": {
      "id": "0c7728ba66196ce3a53d08e",
      "name": "Markdown",
      "props": {
        "gridArea": "markdown_versandinfo",
        "__version": 1,
        "content": "## Versand und Lieferung\nLieferung erfolgt in 2-4 Werktagen."
      },
      "createdAt": 1745600000000,
      "updatedAt": 1745600000000,
      "hash": "ef12c259f7173e31a17d64a0dc342780"
    },
    "0d7728ba66196ce3a53d08e": {
      "id": "0d7728ba66196ce3a53d08e",
      "name": "NewsletterForm",
      "props": {
        "gridArea": "newsletter_signup",
        "__version": 1,
        "headline": "Newsletter",
        "subline": "5 EUR Gutschein sichern"
      },
      "createdAt": 1745700000000,
      "updatedAt": 1745700000000,
      "hash": "33a7388b53c10121ae8fdba9f97c1333"
    },
    "0e7728ba66196ce3a53d08e": {
      "id": "0e7728ba66196ce3a53d08e",
      "name": "Accordion",
      "props": {
        "gridArea": "faq_gastronomie",
        "__version": 1,
        "items": [
          {
            "question": "Liefert ihr an Gastronomiebetriebe?",
            "answer": "Ja, deutschlandweit."
          },
          {
            "question": "Gibt es Mengenrabatte?",
            "answer": "Ab 10 Stueck."
          }
        ]
      },
      "createdAt": 1745800000000,
      "updatedAt": 1745800000000,
      "hash": "ce4a1cc020ac92a97496a61151167a84"
    },
    "0f7728ba66196ce3a53d08e": {
      "id": "0f7728ba66196ce3a53d08e",
      "name": "LinkList",
      "props": {
        "gridArea": "footer_kategorien",
        "__version": 1,
        "headline": "Beliebte Kategorien",
        "links": [
          {
            "label": "Bestecke",
            "href": "/de-de/tischkultur/bestecke"
          },
          {
            "label": "Glaeser",
            "href": "/de-de/tischkultur/glaeser"
          },
          {
            "label": "Chafing Dishes",
            "href": "/de-de/buffet/chafing-dishes"
          }
        ]
      },
      "createdAt": 1745900000000,
      "updatedAt": 1745900000000,
      "hash": "6f021e5cf2b3479e515a33e00dc911ca"
    }
  },
  "allComponents": [
    "017728ba66196ce3a53d08e",
    "027728ba66196ce3a53d08e",
    "037728ba66196ce3a53d08e",
    "047728ba66196ce3a53d08e",
    "057728ba66196ce3a53d08e",
    "067728ba66196ce3a53d08e",
    "077728ba66196ce3a53d08e",
    "087728ba66196ce3a53d08e",
    "097728ba66196ce3a53d08e",
    "0a7728ba66196ce3a53d08e",
    "0b7728ba66196ce3a53d08e",
    "0c7728ba66196ce3a53d08e",
    "0d7728ba66196ce3a53d08e",
    "0e7728ba66196ce3a53d08e",
    "0f7728ba66196ce3a53d08e"
  ],
  "grids": {
    "XS": {
      "enabled": true,
      "gap": 10,
      "grid": [
        [
          "067728ba66196ce3a53d08e",
          "067728ba66196ce3a53d08e"
        ],
        [
          "017728ba66196ce3a53d08e",
          "027728ba66196ce3a53d08e"
        ],
        [
          "037728ba66196ce3a53d08e",
          "."
        ],
        [
          "077728ba66196ce3a53d08e",
          "077728ba66196ce3a53d08e"
        ],
        [
          "087728ba66196ce3a53d08e",
          "097728ba66196ce3a53d08e"
        ],
        [
          "0a7728ba66196ce3a53d08e",
          "0a7728ba66196ce3a53d08e"
        ],
        [
          "0c7728ba66196ce3a53d08e",
          "."
        ]
      ],
      "widths": [
        "1fr",
        "1fr"
      ],
      "heights": [
        "auto",
        "auto",
        "auto",
        "auto",
        "auto",
        "auto",
        "auto"
      ]
    },
    "SM": {
      "enabled": true,
      "gap": 15,
      "grid": [
        [
          "067728ba66196ce3a53d08e"
        ],
        [
          "017728ba66196ce3a53d08e"
        ],
        [
          "027728ba66196ce3a53d08e"
        ],
        [
          "037728ba66196ce3a53d08e"
        ],
        [
          "0a7728ba66196ce3a53d08e"
        ],
        [
          "0d7728ba66196ce3a53d08e"
        ],
        [
          "0f7728ba66196ce3a53d08e"
        ]
      ],
      "widths": [
        "1fr"
      ],
      "heights": [
        "auto",
        "auto",
        "auto",
        "auto",
        "auto",
        "auto",
        "auto"
      ]
    },
    "MD": {
      "enabled": false,
      "gap": 15,
      "grid": [
        [
          "."
        ]
      ],
      "widths": [
        "1fr"
      ],
      "heights": [
        "auto"
      ]
    },
    "LG": {
      "enabled": false,
      "gap": 20,
      "grid": [
        [
          "."
        ]
      ],
      "widths": [
        "1fr"
      ],
      "heights": [
        "auto"
      ]
    },
    "XL": {
      "enabled": false,
      "gap": 20,
      "grid": [
        [
          "."
        ]
      ],
      "widths": [
        "1fr"
      ],
      "heights": [
        "auto"
      ]
    }
  },
  "hash": "c621b9eaafd95be1bb4346fee73a0c56",
  "plugins": {
    "fullWidth": {},
    "bg": {}
  }
};

setTimeout(() => {
  if (!globalCb) return;
  globalCb(DEMO_STORY);
}, 1000);

export default connector;
