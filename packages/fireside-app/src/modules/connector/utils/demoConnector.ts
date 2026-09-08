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
 * dev fixture. Fifteen components taken from the lusini theme - the names and
 * the prop keys come from the k.create() calls in its story files under
 * src/theme/organisms, so what shows up here is what the editors actually
 * see. Hashes are computed the way the addon computes them, otherwise every
 * close would look like an unsaved edit.
 *
 * Only some of them are placed in the two enabled grids, which is what makes
 * the breakpoint icons show a mix of placed and missing
 */
const DEMO_STORY = {
  "version": "2.0.0",
  "componentsById": {
    "017728ba66196ce3a53d08e": {
      "id": "017728ba66196ce3a53d08e",
      "name": "Button",
      "props": {
        "gridArea": "home_cta_beratung",
        "__version": 1,
        "label": "Jetzt beraten lassen",
        "link": "/de-de/service/beratung/",
        "variation": "primary"
      },
      "createdAt": 1745000000000,
      "updatedAt": 1745000000000,
      "hash": "9623372344105"
    },
    "027728ba66196ce3a53d08e": {
      "id": "027728ba66196ce3a53d08e",
      "name": "Markdown",
      "props": {
        "gridArea": "home_markdown_versandinfo",
        "__version": 1,
        "md": "## Versand und Lieferung\nLieferung innerhalb von 2-3 Werktagen von lagernder Ware.",
        "imagePosition": "left",
        "imageSrc": "",
        "imageAlt": ""
      },
      "createdAt": 1745086400000,
      "updatedAt": 1745086400000,
      "hash": "1184564908666"
    },
    "037728ba66196ce3a53d08e": {
      "id": "037728ba66196ce3a53d08e",
      "name": "UspList",
      "props": {
        "gridArea": "home_usp_row",
        "__version": 1,
        "dividerTop": false,
        "dividerBottom": true,
        "items": [
          {
            "icon": "assortment",
            "headline": "Großes Sortiment",
            "text": "50.000 Produkte für Hotellerie und Gastronomie",
            "link": "",
            "linkLabel": "Mehr erfahren"
          },
          {
            "icon": "delivery",
            "headline": "Hohe Warenverfügbarkeit",
            "text": "Lieferung innerhalb von 2-3 Werktagen",
            "link": "",
            "linkLabel": "Mehr erfahren"
          }
        ]
      },
      "createdAt": 1745172800000,
      "updatedAt": 1745172800000,
      "hash": "3299613148275"
    },
    "047728ba66196ce3a53d08e": {
      "id": "047728ba66196ce3a53d08e",
      "name": "ProductSlider",
      "props": {
        "gridArea": "home_slider_bestseller",
        "__version": 1,
        "title": "Unsere Bestseller",
        "searchSwitch": false,
        "maxProducts": 20,
        "search": "",
        "skuList": [
          "30099973",
          "30089818",
          "10010717",
          "10013182"
        ]
      },
      "createdAt": 1745259200000,
      "updatedAt": 1745259200000,
      "hash": "13325884295360"
    },
    "057728ba66196ce3a53d08e": {
      "id": "057728ba66196ce3a53d08e",
      "name": "ProductListing",
      "props": {
        "gridArea": "home_listing_neuheiten",
        "__version": 1,
        "title": "Neuheiten",
        "searchSwitch": false,
        "search": "",
        "limitRows": true,
        "initialRows": "2",
        "skuList": [
          "40011223",
          "40011224",
          "40011225"
        ]
      },
      "createdAt": 1745345600000,
      "updatedAt": 1745345600000,
      "hash": "7960642089445"
    },
    "067728ba66196ce3a53d08e": {
      "id": "067728ba66196ce3a53d08e",
      "name": "CategoryHeadlineWithProducts",
      "props": {
        "gridArea": "home_category_products_k2_bestecksets",
        "__version": 1,
        "headline": "Bestecksets für die Gastronomie",
        "image": "/img/kategorien/bestecke.jpg",
        "imageText": "Bestecke",
        "skuList": [
          "30099973",
          "30089818",
          "10010717"
        ]
      },
      "createdAt": 1745432000000,
      "updatedAt": 1745432000000,
      "hash": "9902718266689"
    },
    "077728ba66196ce3a53d08e": {
      "id": "077728ba66196ce3a53d08e",
      "name": "CategoryImageTeaserWithProducts",
      "props": {
        "gridArea": "home_category_highlight_k1_buffet_20250622",
        "__version": 1,
        "bg": "#f5f7fa",
        "title": "Buffet Highlights",
        "style": "left",
        "skuList": [
          "30099973",
          "10013182"
        ]
      },
      "createdAt": 1745518400000,
      "updatedAt": 1745518400000,
      "hash": "9236504674042"
    },
    "087728ba66196ce3a53d08e": {
      "id": "087728ba66196ce3a53d08e",
      "name": "ImageTeaserSingle",
      "props": {
        "gridArea": "home_teaser_gastro",
        "__version": 1,
        "dySelector": "",
        "showDefaultDataByControlGroup": true,
        "imgSrc": "/img/teaser/gastronomie.jpg",
        "title": "Gastronomiebedarf",
        "description": "Alles für Küche und Service",
        "linkLabel": "Zur Kategorie",
        "link": "/de-de/gastronomie/"
      },
      "createdAt": 1745604800000,
      "updatedAt": 1745604800000,
      "hash": "14510394890736"
    },
    "097728ba66196ce3a53d08e": {
      "id": "097728ba66196ce3a53d08e",
      "name": "TeaserSlider",
      "props": {
        "gridArea": "home_teaser_slider_kategorien",
        "__version": 1,
        "title": "Beliebte Kategorien",
        "description": "",
        "link": "",
        "linkLabel": "",
        "items": [
          {
            "title": "Chafing Dishes",
            "description": "Speisen warmhalten",
            "link": "/de-de/buffet/chafing-dishes/",
            "linkLabel": "Entdecken"
          },
          {
            "title": "Gläser",
            "description": "Für jeden Anlass",
            "link": "/de-de/tischkultur/glaeser/",
            "linkLabel": "Entdecken"
          }
        ]
      },
      "createdAt": 1745691200000,
      "updatedAt": 1745691200000,
      "hash": "1627289781565"
    },
    "0a7728ba66196ce3a53d08e": {
      "id": "0a7728ba66196ce3a53d08e",
      "name": "MarkdownAccordion",
      "props": {
        "gridArea": "service_faq_gastronomie",
        "__version": 1,
        "title": "Häufige Fragen",
        "items": [
          {
            "title": "Liefert ihr an Gastronomiebetriebe?",
            "md": "Ja, deutschlandweit und in 14 europäische Länder."
          },
          {
            "title": "Gibt es Mengenrabatte?",
            "md": "Ab 10 Stück auf Anfrage."
          }
        ]
      },
      "createdAt": 1745777600000,
      "updatedAt": 1745777600000,
      "hash": "2293556684517"
    },
    "0b7728ba66196ce3a53d08e": {
      "id": "0b7728ba66196ce3a53d08e",
      "name": "ServiceLinkList",
      "props": {
        "gridArea": "footer_service_links",
        "__version": 1,
        "label": "Service",
        "serviceLinkLabel": "Alle Services",
        "serviceLink": "/de-de/service/",
        "items": [
          {
            "imgSrc": "/img/service/versand.svg",
            "link": "/de-de/service/versand/",
            "linkLabel": "Mehr",
            "name": "Versand"
          },
          {
            "imgSrc": "/img/service/retoure.svg",
            "link": "/de-de/service/retoure/",
            "linkLabel": "Mehr",
            "name": "Retoure"
          }
        ]
      },
      "createdAt": 1745864000000,
      "updatedAt": 1745864000000,
      "hash": "15800024822295"
    },
    "0c7728ba66196ce3a53d08e": {
      "id": "0c7728ba66196ce3a53d08e",
      "name": "NewsletterRegistrationForm",
      "props": {
        "gridArea": "home_newsletter",
        "__version": 1,
        "subscriptionID": "newsletter-de",
        "showb2x": false,
        "headline": "Newsletter",
        "description": "5 EUR Gutschein sichern",
        "submitButtonText": "Anmelden",
        "showFirstname": true,
        "showLastname": false,
        "successHeadline": "Fast geschafft"
      },
      "createdAt": 1745950400000,
      "updatedAt": 1745950400000,
      "hash": "2887880721667"
    },
    "0d7728ba66196ce3a53d08e": {
      "id": "0d7728ba66196ce3a53d08e",
      "name": "HeadlineWithProducts",
      "props": {
        "gridArea": "home_headline_produkte_hotel",
        "__version": 1,
        "headline": "Hotelausstattung",
        "image": "/img/kategorien/hotel.jpg",
        "imageText": "Hotel",
        "link": "/de-de/hotel/",
        "searchSwitch": true,
        "search": "hotel",
        "skuList": []
      },
      "createdAt": 1746036800000,
      "updatedAt": 1746036800000,
      "hash": "10076675207553"
    },
    "0e7728ba66196ce3a53d08e": {
      "id": "0e7728ba66196ce3a53d08e",
      "name": "BrandLogoSlider",
      "props": {
        "gridArea": "home_marken_slider",
        "__version": 1,
        "showDefaultDataByControlGroup": true,
        "title": "Unsere Marken",
        "linkLabel": "Alle Marken",
        "link": "/de-de/marken/",
        "items": [
          {
            "imgSrc": "/img/marken/villeroy.svg",
            "link": "/de-de/marken/villeroy-boch/",
            "name": "Villeroy & Boch"
          },
          {
            "imgSrc": "/img/marken/schott.svg",
            "link": "/de-de/marken/schott-zwiesel/",
            "name": "Schott Zwiesel"
          }
        ]
      },
      "createdAt": 1746123200000,
      "updatedAt": 1746123200000,
      "hash": "10711756954066"
    },
    "0f7728ba66196ce3a53d08e": {
      "id": "0f7728ba66196ce3a53d08e",
      "name": "Divider",
      "props": {
        "gridArea": "home_divider_1",
        "__version": 1,
        "transparent": false
      },
      "createdAt": 1746209600000,
      "updatedAt": 1746209600000,
      "hash": "12069468707606"
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
          "087728ba66196ce3a53d08e",
          "087728ba66196ce3a53d08e"
        ],
        [
          "017728ba66196ce3a53d08e",
          "0f7728ba66196ce3a53d08e"
        ],
        [
          "037728ba66196ce3a53d08e",
          "037728ba66196ce3a53d08e"
        ],
        [
          "047728ba66196ce3a53d08e",
          "047728ba66196ce3a53d08e"
        ],
        [
          "067728ba66196ce3a53d08e",
          "077728ba66196ce3a53d08e"
        ],
        [
          "027728ba66196ce3a53d08e",
          "."
        ],
        [
          "0a7728ba66196ce3a53d08e",
          "0a7728ba66196ce3a53d08e"
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
          "087728ba66196ce3a53d08e"
        ],
        [
          "017728ba66196ce3a53d08e"
        ],
        [
          "037728ba66196ce3a53d08e"
        ],
        [
          "047728ba66196ce3a53d08e"
        ],
        [
          "0c7728ba66196ce3a53d08e"
        ],
        [
          "0e7728ba66196ce3a53d08e"
        ],
        [
          "0a7728ba66196ce3a53d08e"
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
  "hash": "ed4f6b3a870ab5fc28b1f9190838876a",
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
