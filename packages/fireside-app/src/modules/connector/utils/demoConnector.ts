import * as t from '../types'

let globalCb:null|Function = null

const connector:t.Connector = {
  name: 'demoConnector',
  onChange: cb => {
    globalCb = cb
  },
  setStory: story => {
    setTimeout(() => globalCb && globalCb(story), 100)
    console.log(story)
  }
}

setTimeout(() => {
  if(!globalCb) return
  globalCb({
    "version": "2.0.0",
    "componentsById": {
      "6bf3c91d9a8fc75925a516e2": {
        "id": "6bf3c91d9a8fc75925a516e2",
        "name": "CategoryImageTeaser",
        "props": {
          "gridArea": "top-teaser",
          "categoryId": "suppenteller",
          "bg": "https://res.cloudinary.com/lusini/image/upload/v1611299976/demo-content/vega-banner-category-teaser-supperntassen_1280x1280.jpg",
          "title": "",
          "style": "prominent"
        },
        "createdAt": 1613383175814,
        "updatedAt": 1613384235626,
        "hash": "918ef3dff6a2cdac9cf9f0f190db47b1"
      },
      "6b6e0a19297b3c5581dabd3c": {
        "id": "6b6e0a19297b3c5581dabd3c",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Image-1",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg",
          "imageLink": "/helpandservice",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1614095923355,
        "updatedAt": 1614095929681,
        "hash": "57d56e51bc52f346c0bb318d1e726a6d"
      },
      "d6f9ee1f4ce8494527bb4f7d": {
        "id": "d6f9ee1f4ce8494527bb4f7d",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Image-2",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg",
          "imageLink": "/helpandservice",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1614095923355,
        "updatedAt": 1614095994215,
        "hash": "44552249c8d8ba6f6cd068fe6f51920b"
      },
      "a456e450e78317faec21e810": {
        "id": "a456e450e78317faec21e810",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Image-3",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1613384540/demo-content/vega-mood-1.jpg",
          "imageLink": "/helpandservice",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1613383175814,
        "updatedAt": 1613384611756,
        "hash": "f5170fb594ed1ce950d04528e5d42e23"
      },
      "dff5867bd911369fca3f170f": {
        "id": "dff5867bd911369fca3f170f",
        "name": "Divider",
        "props": {
          "gridArea": "Divider-1",
          "transparent": true
        },
        "createdAt": 1613383175814,
        "updatedAt": 1613384789556,
        "hash": "90476d002f4b0069fc4e4f341fd6c2ec"
      },
      "14129101599024ada8a56cd2": {
        "id": "14129101599024ada8a56cd2",
        "name": "CategoryImageTeaser",
        "props": {
          "gridArea": "teaser-1",
          "categoryId": "moebel",
          "bg": "https://res.cloudinary.com/lusini/image/upload/v1615288667/demo-content/vega-banner-square-m-bel.jpg",
          "title": "",
          "style": "small"
        },
        "createdAt": 1615288972493,
        "updatedAt": 1615289521497,
        "hash": "d9fc738da70bedb19dfc5f82be7d6722"
      },
      "3a5494147cc37b62eeb8be92": {
        "id": "3a5494147cc37b62eeb8be92",
        "name": "CategoryImageTeaser",
        "props": {
          "gridArea": "teaser-2",
          "categoryId": "geschirr-porzellan",
          "bg": "https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg",
          "title": "Porzellan",
          "style": "small"
        },
        "createdAt": 1615288972493,
        "updatedAt": 1615289659654,
        "hash": "ccc04251d0db5e30051c2ca2a806b8e1"
      },
      "5c3c95668dd7cd328bbbb7e6": {
        "id": "5c3c95668dd7cd328bbbb7e6",
        "name": "CategoryImageTeaser",
        "props": {
          "gridArea": "teaser-3",
          "categoryId": "glas9",
          "bg": "https://res.cloudinary.com/lusini/image/upload/v1615288916/demo-content/vega_banner_square_small_gl-ser.jpg",
          "title": "",
          "style": "small"
        },
        "createdAt": 1615288972493,
        "updatedAt": 1615289606297,
        "hash": "b573ca729193a4eb1b24dbc84def11cf"
      },
      "26c85b09245f67a7066203bf": {
        "id": "26c85b09245f67a7066203bf",
        "name": "CategoryImageTeaser",
        "props": {
          "gridArea": "teaser-4",
          "categoryId": "reinigungsartikel1",
          "bg": "https://res.cloudinary.com/lusini/image/upload/v1615288800/demo-content/VE7658M005_0.jpg",
          "title": "",
          "style": "small"
        },
        "createdAt": 1615295875131,
        "updatedAt": 1615297710864,
        "hash": "9ffeaaccaeebf23865b6be216354df35"
      },
      "8237812129964de85c5836ae": {
        "id": "8237812129964de85c5836ae",
        "name": "Divider",
        "props": {
          "gridArea": "Divider-2",
          "transparent": true
        },
        "createdAt": 1613383175814,
        "updatedAt": 1613384921964,
        "hash": "87a6748045aa17875a1e5d2ab17b31a9"
      },
      "816fac5385d4b61c158020f9": {
        "id": "816fac5385d4b61c158020f9",
        "name": "Markdown",
        "props": {
          "gridArea": "Elevator-Pitch",
          "centered": true,
          "md": "## **WILLKOMMEN BEI LUSINI**\n## Für Gastgeber aus Leidenschaft. Seit 1987.",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "",
          "imageLink": ""
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615370853558,
        "hash": "d6862cc3a28b8cd30bcf5c7e1c77d8b8"
      },
      "c4077ae79c63e6dd1c9b6b38": {
        "id": "c4077ae79c63e6dd1c9b6b38",
        "name": "Markdown",
        "props": {
          "gridArea": "Marken-Headline",
          "centered": true,
          "md": "## LERNEN SIE UNSERE MARKEN KENNEN",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "",
          "imageLink": ""
        },
        "createdAt": 1615473444000,
        "updatedAt": 1615474983409,
        "hash": "98f5817766a01958ce17a4a429b47ea0"
      },
      "5413089d1ad3f9af295076b3": {
        "id": "5413089d1ad3f9af295076b3",
        "name": "Markdown",
        "props": {
          "gridArea": "Marke-LUSINI-Text",
          "centered": false,
          "md": "## **LUSINI**\n\nWir helfen Ihnen, Ihre Gäste zu begeistern: mit persönlicher Beratung, einem umfangreichen Service und einem großen Produktangebot.",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "",
          "imageLink": ""
        },
        "createdAt": 1615391293533,
        "updatedAt": 1615391538584,
        "hash": "9411dea4c26c41480971f3d1932fb01d"
      },
      "d7f48da04356f3821f0730a9": {
        "id": "d7f48da04356f3821f0730a9",
        "name": "CategoryHeadlineWithSubCategories",
        "props": {
          "gridArea": "HeadlineTeaser-Besteck",
          "categoryId": "besteck9",
          "teaserImage": "https://res.cloudinary.com/lusini/image/upload/v1612275562/demo-content/vega-mood.jpg",
          "imageText": "",
          "title": "",
          "categories": [
            {
              "imgSrc": "https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/trinkglas.jpg",
              "link": "/category/besteck/besteck-sets",
              "label": "Besteck-Sets"
            },
            {
              "imgSrc": "https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/tablett.jpg",
              "link": "/category/besteck/gabeln",
              "label": "Gabeln"
            },
            {
              "imgSrc": "https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/kuehler.jpg",
              "link": "/category/besteck/loeffel",
              "label": "Löffel"
            },
            {
              "imgSrc": "https://res.cloudinary.com/lusini/image/upload/v1612274603/demo-content/glaeser/shaker.jpg",
              "link": "/category/besteck/messer",
              "label": "Messer"
            }
          ]
        },
        "createdAt": 1615208479981,
        "updatedAt": 1615211054446,
        "hash": "9eb781e5048f0299837da27ecb267ac0"
      },
      "8eb66a49e5ac7f69e7cd0d07": {
        "id": "8eb66a49e5ac7f69e7cd0d07",
        "name": "Divider",
        "props": {
          "gridArea": "DividerTransparent-1",
          "transparent": true
        },
        "createdAt": 1615391293533,
        "updatedAt": 1615391299171,
        "hash": "1709a904932840672419b67797e682c9"
      },
      "08287e7a357f0038f76f4240": {
        "id": "08287e7a357f0038f76f4240",
        "name": "Divider",
        "props": {
          "gridArea": "DividerTransparent-3",
          "transparent": true
        },
        "createdAt": 1615208479981,
        "updatedAt": 1615211364118,
        "hash": "0ced5bfc2b70e04e8b01b77ecc8d3b3b"
      },
      "edf81cba783298c8296505d7": {
        "id": "edf81cba783298c8296505d7",
        "name": "Divider",
        "props": {
          "gridArea": "DividerTransparent-4",
          "transparent": true
        },
        "createdAt": 1615208479981,
        "updatedAt": 1615211354025,
        "hash": "1b9a6e5f4e050582a87afe8da66d646f"
      },
      "ef51bce160f553bc564b900e": {
        "id": "ef51bce160f553bc564b900e",
        "name": "Divider",
        "props": {
          "gridArea": "Divider-Linie-2",
          "transparent": false
        },
        "createdAt": 1615452354230,
        "updatedAt": 1615452424430,
        "hash": "49ec1797af8ba210e44b6ca8769af2d6"
      },
      "f369b8ea9f4c0c12f3dcb698": {
        "id": "f369b8ea9f4c0c12f3dcb698",
        "name": "Divider",
        "props": {
          "gridArea": "Divider-Linie-1",
          "transparent": false
        },
        "createdAt": 1615452354230,
        "updatedAt": 1615452403613,
        "hash": "edbb88b10744bb20e078b63548101330"
      },
      "ddfa7405deedc238a51cd717": {
        "id": "ddfa7405deedc238a51cd717",
        "name": "Markdown",
        "props": {
          "gridArea": "Sortiment-entdecken-Headline",
          "centered": true,
          "md": "##Unser Sortiment entdecken",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "",
          "imageLink": ""
        },
        "createdAt": 1615216821559,
        "updatedAt": 1615216890652,
        "hash": "5aa757311a74cc9f1c3936b8d51e9f28"
      },
      "d1f5af31387779f932ee1ee1": {
        "id": "d1f5af31387779f932ee1ee1",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Buffet",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_pad,h_135,w_280/v1615290193/demo-content/vega-home-category-buffet.png",
          "imageLink": "/category/buffet",
          "imageCaption": "",
          "label": "[Buffet](/de-de/category/buffet)",
          "isRounded": false
        },
        "createdAt": 1615359601812,
        "updatedAt": 1615359812937,
        "hash": "6d715da2151482a0aba4e5c3b4538ea1"
      },
      "1e56b6fb7737e94444dc93ba": {
        "id": "1e56b6fb7737e94444dc93ba",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Kueche",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_pad,h_135,w_280/v1615290518/demo-content/vega-home-category-kueche.png",
          "imageLink": "/category/kuechenbedarf",
          "imageCaption": "",
          "label": "[Küche](/de-de//category/kuechenbedarf)",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615374340187,
        "hash": "7715fadb32f123580813c43bae0ce50f"
      },
      "a2507ce89cd0b090717d9dff": {
        "id": "a2507ce89cd0b090717d9dff",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Lieferservice",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615290511/demo-content/vega_banner_category_favorites_lieferservice.png",
          "imageLink": "/category/kuechenbedarf",
          "imageCaption": "",
          "label": "Lieferservice",
          "isRounded": false
        },
        "createdAt": 1615295875131,
        "updatedAt": 1615296852813,
        "hash": "c2ae073242599ae0d927b369cabc4c82"
      },
      "ff101f747cd38151dc7c8123": {
        "id": "ff101f747cd38151dc7c8123",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Hotelbedarf-Kosmetik",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615290506/demo-content/vega-banner-category-favorites-home-hotelbedarf_neu-c.png",
          "imageLink": "/category/hotelbedarf/hotelkosmetik",
          "imageCaption": "",
          "label": "Hotelbedarf & Kosmetik",
          "isRounded": false
        },
        "createdAt": 1615295875131,
        "updatedAt": 1615296939459,
        "hash": "b9b31ee0069b4c9b3a12f97d63cfa076"
      },
      "7b9be37111bc3e5c749479b4": {
        "id": "7b9be37111bc3e5c749479b4",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Speisekarten-Tafeln",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615290530/demo-content/vega-banner-category-favorites-home-speisekarten_neu-c.png",
          "imageLink": "/category/speisekarten-und-tafeln",
          "imageCaption": "",
          "label": "Speisekarten & Tafeln",
          "isRounded": false
        },
        "createdAt": 1615295875131,
        "updatedAt": 1615297141805,
        "hash": "af72382b82a826f25348c14738c8cb61"
      },
      "3a8f018adfd4f3690c2a7da0": {
        "id": "3a8f018adfd4f3690c2a7da0",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Barzubehoer",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_pad,h_135,w_280/v1615290524/demo-content/vega-home-category-barzubehoer.png",
          "imageLink": "/category/barzubehoer",
          "imageCaption": "",
          "label": "Barzubehör",
          "isRounded": false
        },
        "createdAt": 1615298617608,
        "updatedAt": 1615299894981,
        "hash": "65f909cf5bb25226cc03c8ca66944db6"
      },
      "18343347b6ff81554ca73380": {
        "id": "18343347b6ff81554ca73380",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Besteck",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615297449/demo-content/vega_banner_categorie-favorites_besteck.png",
          "imageLink": "/category/besteck",
          "imageCaption": "",
          "label": "Besteck",
          "isRounded": false
        },
        "createdAt": 1615298617608,
        "updatedAt": 1615299041025,
        "hash": "434b63c73c23dcef1b134e3a085144fd"
      },
      "12e1263041a41e136d931ca7": {
        "id": "12e1263041a41e136d931ca7",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Buffet-Cloudinary",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_scale,w_266/c_mpad,g_north,h_150,w_280/g_south,l_text:roboto_16:Buffet/v1615290193/demo-content/vega-home-category-buffet.png",
          "imageLink": "/category/buffet",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615369547335,
        "hash": "e0ac88c4346391105b1bd6a77af4abc9"
      },
      "312f4a1ca1786dd4275abe37": {
        "id": "312f4a1ca1786dd4275abe37",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Tischzubehoer",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615372395/demo-content/vega-banner-category-favorites-home-tischzubehoer_neu-c.png",
          "imageLink": "/category/tischzubehoer",
          "imageCaption": "",
          "label": "[Tischzubehör](/de-de/category/tischzubehoer)",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615373505721,
        "hash": "2e12e31872bb78bc01aba3397f59ad41"
      },
      "a09c1624e95e3deaca9fe948": {
        "id": "a09c1624e95e3deaca9fe948",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Servicebedarf",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_mpad,h_135,w_280/v1615372438/demo-content/vega-home-category-servicebedarf.png",
          "imageLink": "/category/buffet/",
          "imageCaption": "",
          "label": "[Servicebedarf](/de-de/category/buffet/)",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615373436406,
        "hash": "0e97943bdbbc56a5d96ccbd9db80155c"
      },
      "14dac1f5e0157bca24110b1d": {
        "id": "14dac1f5e0157bca24110b1d",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Tischwaesche-Textil",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615372426/demo-content/vega-banner-category-favorites-home-textil_neu-c.png",
          "imageLink": "/category/textilien",
          "imageCaption": "",
          "label": "[Tischwäsche & Textilien](/de-de/category/textilien)",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615373609370,
        "hash": "30f3b110471eca6477faee3384e22a49"
      },
      "3f570549995e5ef57fd230a8": {
        "id": "3f570549995e5ef57fd230a8",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Nachhaltige-Produkte",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_pad,h_135,w_280/v1615372470/demo-content/vega_banner_category_nachhaltige_produkte.png",
          "imageLink": "/category/nachhaltige-produkte",
          "imageCaption": "",
          "label": "[Nachhaltige Produkte](/de-de/category/nachhaltige-produkte)",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615373710962,
        "hash": "0ad03a6726ee20b9507982c76275c701"
      },
      "86a969df35dc9acf737a2abc": {
        "id": "86a969df35dc9acf737a2abc",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Teaser-Sale",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/c_mpad,h_135,w_285/v1615372454/demo-content/vega-home-category-sale.png",
          "imageLink": "/",
          "imageCaption": "",
          "label": "[Sale](/de-de/)",
          "isRounded": false
        },
        "createdAt": 1615369504711,
        "updatedAt": 1615373980956,
        "hash": "6336119143da93d092dbc328effd359f"
      },
      "c3ae7bb4fd699d7838d83f7f": {
        "id": "c3ae7bb4fd699d7838d83f7f",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Stage-Campaign-Banner-Teil1",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615384547/demo-content/LUSINI_MVP_KampaMotiv_Banner_Part01.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615384846453,
        "hash": "2810b7e2c7f3dc96f368d9c6d15f44b3"
      },
      "0ec740223a45f62f7ecac353": {
        "id": "0ec740223a45f62f7ecac353",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Stage-Campaign-Banner-Teil2",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615384551/demo-content/LUSINI_MVP_KampaMotiv_Banner_Part02.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615384866850,
        "hash": "bd6b3f71723fde638c2d2a691375d105"
      },
      "96b682d644b73c1a905c5892": {
        "id": "96b682d644b73c1a905c5892",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Stage-Campaign-Banner-Teil3",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615384540/demo-content/LUSINI_MVP_KampaMotiv_Banner_Part03..jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615384915480,
        "hash": "b99847069e60916b941382cd978f1fa4"
      },
      "85adf89a32563564ae084a6b": {
        "id": "85adf89a32563564ae084a6b",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Stage-Campaign-Banner-Rustikal",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615384560/demo-content/LUSINI_KampaSlider_B2B_Outdoor_Rustikal_1920x820.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615385343884,
        "hash": "aaa6af739b21a775bf92301728d1fff5"
      },
      "24a6e4b26f564d258002ea10": {
        "id": "24a6e4b26f564d258002ea10",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Lusini-Block-Headline",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615384513/demo-content/LUSINI_MVP_Headline_ManusSmooth_Bleu.png",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615387711998,
        "hash": "fab3770a276bba5611a9020a84c8ac2f"
      },
      "c7567c45ba21fe5a9b9a8942": {
        "id": "c7567c45ba21fe5a9b9a8942",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Lusini-Block-Logowand",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615387844/demo-content/LUSINI_MVP_Bild_Home_Of_745x516px.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615388205346,
        "hash": "0a40b3c62a8ec32c644adfba27f9ac18"
      },
      "7959a8f01d788c6ff3104936": {
        "id": "7959a8f01d788c6ff3104936",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Lusini-Block-Slogan",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615384507/demo-content/LUSINI_MVP_Marken_Claim_ManusSmooth_Karamell.png",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615387902625,
        "hash": "655940a7666d5188f57c58d8b38a57c0"
      },
      "279a9d6545583b3df523efa6": {
        "id": "279a9d6545583b3df523efa6",
        "name": "Markdown",
        "props": {
          "gridArea": "Lusini-Block-Text",
          "centered": false,
          "md": "**LUSINI IST DAS NEUE ZUHAUSE VON …**\n\n… VEGA, ERWIN M. und JOBELINE – zusammen mit unserem bewährten Service und Inspirationen zu aktuellen Themen unter einem Dach vereint. \n\nLUSINI bietet Ihnen alles, was zu einem unvergesslichen Gasterlebnis und guten Lebensgefühl dazugehört. Geschirr, Mobiliar, Textilien, Koch- und Berufsbekleidung und vieles mehr in Profiqualität.",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "",
          "imageLink": ""
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615388120232,
        "hash": "dc53c60e8a4db2c0a578af5b22b2b2e4"
      },
      "403d07eb93d6eda422c1df3f": {
        "id": "403d07eb93d6eda422c1df3f",
        "name": "Markdown",
        "props": {
          "gridArea": "Marke-VEGA-Text",
          "centered": false,
          "md": "## **VEGA**\n\nIhr Spezialist für den gedeckten Tisch, die Ausstattung von Bars, Küche und mehr – mit ansprechenden und funktionalen Designs.",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389453/demo-content/LUSINI_MVP_Markenwelt_Bild_LUSINI.jpg",
          "imageLink": ""
        },
        "createdAt": 1615391293533,
        "updatedAt": 1615391556938,
        "hash": "173223de653af0defc2054fbd5f9a1e4"
      },
      "9de1ac5f999cf35dd1e4d7ad": {
        "id": "9de1ac5f999cf35dd1e4d7ad",
        "name": "Markdown",
        "props": {
          "gridArea": "Marke-ERWINM-Text",
          "centered": false,
          "md": "## **ERWIN M.**\n\nQualitativ hochwertigen Profitextilien für ein gutes Gefühl. Alles, was Menschen brauchen, von Küche über Bad bis zum Tisch – seit über 30 Jahren.",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389453/demo-content/LUSINI_MVP_Markenwelt_Bild_LUSINI.jpg",
          "imageLink": ""
        },
        "createdAt": 1615391293533,
        "updatedAt": 1615391573524,
        "hash": "547d9c6a09cf4c5fff390071e9a4df02"
      },
      "f8ac94bc688799b517315265": {
        "id": "f8ac94bc688799b517315265",
        "name": "Markdown",
        "props": {
          "gridArea": "Marke-JOBELINE-Text",
          "centered": false,
          "md": "## **JOBELINE**\n\nBerufsmode in 100 % Eigendesign, die einen guten Job macht: modisch, funktional und mit optimalen Passformen für einen guten Team-Geist.",
          "imageVisible": false,
          "imagePosition": "",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389453/demo-content/LUSINI_MVP_Markenwelt_Bild_LUSINI.jpg",
          "imageLink": ""
        },
        "createdAt": 1615391293533,
        "updatedAt": 1615391616490,
        "hash": "e0a8ad32a5f85b9c03dd6f85ae08dc81"
      },
      "3d65dff1cbf8ac58f36e9285": {
        "id": "3d65dff1cbf8ac58f36e9285",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Marke-LUSINI",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389453/demo-content/LUSINI_MVP_Markenwelt_Bild_LUSINI.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615389523064,
        "hash": "6ce9f1aede43faa28368b7aea97e6796"
      },
      "2c96ceac1674dcae79681163": {
        "id": "2c96ceac1674dcae79681163",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Marke-VEGA",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389435/demo-content/LUSINI_MVP_Markenwelt_Bild_VEGA.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615389540146,
        "hash": "3775e1163ddf414191e9365ce7b638dd"
      },
      "473a61ac6d0f71c4d8a25097": {
        "id": "473a61ac6d0f71c4d8a25097",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Marke-ERWINM",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389440/demo-content/LUSINI_MVP_Markenwelt_Bild_ERWIN_M.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615389557222,
        "hash": "79f28dc1650805e64928bc3a0bfc1950"
      },
      "f9f1dd58c1b986d6b142eabd": {
        "id": "f9f1dd58c1b986d6b142eabd",
        "name": "Image",
        "props": {
          "__version": 2,
          "gridArea": "Marke-JOBELINE",
          "imageSrc": "https://res.cloudinary.com/lusini/image/upload/v1615389447/demo-content/LUSINI_MVP_Markenwelt_Bild_JOBELINE.jpg",
          "imageLink": "",
          "imageCaption": "",
          "label": "",
          "isRounded": false
        },
        "createdAt": 1615384719485,
        "updatedAt": 1615389574410,
        "hash": "70586722639e798ee5737c3a223c977e"
      },
      "0c5e317457ad53f0b440511b": {
        "id": "0c5e317457ad53f0b440511b",
        "name": "Divider",
        "props": {
          "gridArea": "Divider-Transparent6",
          "transparent": true
        },
        "createdAt": 1615390455075,
        "updatedAt": 1615390930607,
        "hash": "4d8240cfa40b20b3b3334ae6980524d8"
      },
      "cdf47a9d2e365a282d94ce3a": {
        "id": "cdf47a9d2e365a282d94ce3a",
        "name": "Banner",
        "props": {
          "gridArea": "BannerNew",
          "selected": true,
          "foo": "foo",
          "otherLabel": "foo",
          "number": 2,
          "label": "Hello world",
          "todos": [
            "buy coffee",
            "star fireside on github"
          ],
          "objects": []
        },
        "createdAt": 1615584560241,
        "updatedAt": 1615584725028,
        "hash": "cd2459f5ec4eec9ab9c46c423003a44e"
      }
    },
    "allComponents": [
      "6bf3c91d9a8fc75925a516e2",
      "6b6e0a19297b3c5581dabd3c",
      "d6f9ee1f4ce8494527bb4f7d",
      "a456e450e78317faec21e810",
      "dff5867bd911369fca3f170f",
      "14129101599024ada8a56cd2",
      "3a5494147cc37b62eeb8be92",
      "5c3c95668dd7cd328bbbb7e6",
      "26c85b09245f67a7066203bf",
      "8237812129964de85c5836ae",
      "816fac5385d4b61c158020f9",
      "c4077ae79c63e6dd1c9b6b38",
      "5413089d1ad3f9af295076b3",
      "d7f48da04356f3821f0730a9",
      "8eb66a49e5ac7f69e7cd0d07",
      "08287e7a357f0038f76f4240",
      "edf81cba783298c8296505d7",
      "ef51bce160f553bc564b900e",
      "f369b8ea9f4c0c12f3dcb698",
      "ddfa7405deedc238a51cd717",
      "d1f5af31387779f932ee1ee1",
      "1e56b6fb7737e94444dc93ba",
      "a2507ce89cd0b090717d9dff",
      "ff101f747cd38151dc7c8123",
      "7b9be37111bc3e5c749479b4",
      "3a8f018adfd4f3690c2a7da0",
      "18343347b6ff81554ca73380",
      "12e1263041a41e136d931ca7",
      "312f4a1ca1786dd4275abe37",
      "a09c1624e95e3deaca9fe948",
      "14dac1f5e0157bca24110b1d",
      "3f570549995e5ef57fd230a8",
      "86a969df35dc9acf737a2abc",
      "c3ae7bb4fd699d7838d83f7f",
      "0ec740223a45f62f7ecac353",
      "96b682d644b73c1a905c5892",
      "85adf89a32563564ae084a6b",
      "24a6e4b26f564d258002ea10",
      "c7567c45ba21fe5a9b9a8942",
      "7959a8f01d788c6ff3104936",
      "279a9d6545583b3df523efa6",
      "403d07eb93d6eda422c1df3f",
      "9de1ac5f999cf35dd1e4d7ad",
      "f8ac94bc688799b517315265",
      "3d65dff1cbf8ac58f36e9285",
      "2c96ceac1674dcae79681163",
      "473a61ac6d0f71c4d8a25097",
      "f9f1dd58c1b986d6b142eabd",
      "0c5e317457ad53f0b440511b",
      "cdf47a9d2e365a282d94ce3a"
    ],
    "grids": {
      "XS": {
        "enabled": true,
        "gap": 10,
        "grid": [
          [
            "c3ae7bb4fd699d7838d83f7f",
            "c3ae7bb4fd699d7838d83f7f"
          ],
          [
            "0ec740223a45f62f7ecac353",
            "0ec740223a45f62f7ecac353"
          ],
          [
            "96b682d644b73c1a905c5892",
            "96b682d644b73c1a905c5892"
          ],
          [
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9"
          ],
          [
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698"
          ],
          [
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717"
          ],
          [
            "14129101599024ada8a56cd2",
            "3a5494147cc37b62eeb8be92"
          ],
          [
            "5c3c95668dd7cd328bbbb7e6",
            "26c85b09245f67a7066203bf"
          ],
          [
            "18343347b6ff81554ca73380",
            "d1f5af31387779f932ee1ee1"
          ],
          [
            "1e56b6fb7737e94444dc93ba",
            "a2507ce89cd0b090717d9dff"
          ],
          [
            "ff101f747cd38151dc7c8123",
            "7b9be37111bc3e5c749479b4"
          ],
          [
            "3a8f018adfd4f3690c2a7da0",
            "312f4a1ca1786dd4275abe37"
          ],
          [
            "a09c1624e95e3deaca9fe948",
            "14dac1f5e0157bca24110b1d"
          ],
          [
            "3f570549995e5ef57fd230a8",
            "86a969df35dc9acf737a2abc"
          ],
          [
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e"
          ],
          [
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10"
          ],
          [
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942"
          ],
          [
            "279a9d6545583b3df523efa6",
            "279a9d6545583b3df523efa6"
          ],
          [
            "7959a8f01d788c6ff3104936",
            "7959a8f01d788c6ff3104936"
          ],
          [
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38"
          ],
          [
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285"
          ],
          [
            "5413089d1ad3f9af295076b3",
            "5413089d1ad3f9af295076b3"
          ],
          [
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163"
          ],
          [
            "403d07eb93d6eda422c1df3f",
            "403d07eb93d6eda422c1df3f"
          ],
          [
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd"
          ],
          [
            "f8ac94bc688799b517315265",
            "f8ac94bc688799b517315265"
          ],
          [
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097"
          ],
          [
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad"
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
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
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
        "enabled": false,
        "gap": 15,
        "grid": [
          [
            ".",
            "."
          ]
        ],
        "widths": [
          "1fr",
          "1fr"
        ],
        "heights": [
          "auto"
        ]
      },
      "MD": {
        "enabled": true,
        "gap": 15,
        "grid": [
          [
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b"
          ],
          [
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9"
          ],
          [
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698"
          ],
          [
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717"
          ],
          [
            "14129101599024ada8a56cd2",
            "14129101599024ada8a56cd2",
            "14129101599024ada8a56cd2",
            "3a5494147cc37b62eeb8be92",
            "3a5494147cc37b62eeb8be92",
            "3a5494147cc37b62eeb8be92"
          ],
          [
            "5c3c95668dd7cd328bbbb7e6",
            "5c3c95668dd7cd328bbbb7e6",
            "5c3c95668dd7cd328bbbb7e6",
            "26c85b09245f67a7066203bf",
            "26c85b09245f67a7066203bf",
            "26c85b09245f67a7066203bf"
          ],
          [
            "18343347b6ff81554ca73380",
            "d1f5af31387779f932ee1ee1",
            "1e56b6fb7737e94444dc93ba",
            "a2507ce89cd0b090717d9dff",
            "ff101f747cd38151dc7c8123",
            "7b9be37111bc3e5c749479b4"
          ],
          [
            "3a8f018adfd4f3690c2a7da0",
            "312f4a1ca1786dd4275abe37",
            "a09c1624e95e3deaca9fe948",
            "14dac1f5e0157bca24110b1d",
            "3f570549995e5ef57fd230a8",
            "86a969df35dc9acf737a2abc"
          ],
          [
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e"
          ],
          [
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10"
          ],
          [
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "279a9d6545583b3df523efa6",
            "279a9d6545583b3df523efa6",
            "279a9d6545583b3df523efa6"
          ],
          [
            ".",
            ".",
            "7959a8f01d788c6ff3104936",
            "7959a8f01d788c6ff3104936",
            ".",
            "."
          ],
          [
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38"
          ],
          [
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07"
          ],
          [
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "5413089d1ad3f9af295076b3",
            "5413089d1ad3f9af295076b3",
            "5413089d1ad3f9af295076b3"
          ],
          [
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163"
          ],
          [
            "403d07eb93d6eda422c1df3f",
            "403d07eb93d6eda422c1df3f",
            "403d07eb93d6eda422c1df3f",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163"
          ],
          [
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad"
          ],
          [
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad"
          ],
          [
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd"
          ],
          [
            "f8ac94bc688799b517315265",
            "f8ac94bc688799b517315265",
            "f8ac94bc688799b517315265",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd"
          ]
        ],
        "widths": [
          "1fr",
          "1fr",
          "1fr",
          "1fr",
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
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
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
        "enabled": true,
        "gap": 20,
        "grid": [
          [
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b",
            "85adf89a32563564ae084a6b"
          ],
          [
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9",
            "816fac5385d4b61c158020f9"
          ],
          [
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698",
            "f369b8ea9f4c0c12f3dcb698"
          ],
          [
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717",
            "ddfa7405deedc238a51cd717"
          ],
          [
            "14129101599024ada8a56cd2",
            "14129101599024ada8a56cd2",
            "14129101599024ada8a56cd2",
            "3a5494147cc37b62eeb8be92",
            "3a5494147cc37b62eeb8be92",
            "3a5494147cc37b62eeb8be92",
            "5c3c95668dd7cd328bbbb7e6",
            "5c3c95668dd7cd328bbbb7e6",
            "5c3c95668dd7cd328bbbb7e6",
            "26c85b09245f67a7066203bf",
            "26c85b09245f67a7066203bf",
            "26c85b09245f67a7066203bf"
          ],
          [
            "18343347b6ff81554ca73380",
            "18343347b6ff81554ca73380",
            "d1f5af31387779f932ee1ee1",
            "d1f5af31387779f932ee1ee1",
            "1e56b6fb7737e94444dc93ba",
            "1e56b6fb7737e94444dc93ba",
            "a2507ce89cd0b090717d9dff",
            "a2507ce89cd0b090717d9dff",
            "ff101f747cd38151dc7c8123",
            "ff101f747cd38151dc7c8123",
            "7b9be37111bc3e5c749479b4",
            "7b9be37111bc3e5c749479b4"
          ],
          [
            "3a8f018adfd4f3690c2a7da0",
            "3a8f018adfd4f3690c2a7da0",
            "312f4a1ca1786dd4275abe37",
            "312f4a1ca1786dd4275abe37",
            "a09c1624e95e3deaca9fe948",
            "a09c1624e95e3deaca9fe948",
            "14dac1f5e0157bca24110b1d",
            "14dac1f5e0157bca24110b1d",
            "3f570549995e5ef57fd230a8",
            "3f570549995e5ef57fd230a8",
            "86a969df35dc9acf737a2abc",
            "86a969df35dc9acf737a2abc"
          ],
          [
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e",
            "ef51bce160f553bc564b900e"
          ],
          [
            ".",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "24a6e4b26f564d258002ea10",
            "."
          ],
          [
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "279a9d6545583b3df523efa6",
            "279a9d6545583b3df523efa6",
            "279a9d6545583b3df523efa6",
            "279a9d6545583b3df523efa6"
          ],
          [
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "c7567c45ba21fe5a9b9a8942",
            "7959a8f01d788c6ff3104936",
            "7959a8f01d788c6ff3104936",
            "7959a8f01d788c6ff3104936",
            "7959a8f01d788c6ff3104936"
          ],
          [
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38",
            "c4077ae79c63e6dd1c9b6b38"
          ],
          [
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07",
            "8eb66a49e5ac7f69e7cd0d07"
          ],
          [
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "3d65dff1cbf8ac58f36e9285",
            "5413089d1ad3f9af295076b3",
            "5413089d1ad3f9af295076b3",
            "5413089d1ad3f9af295076b3",
            ".",
            ".",
            "."
          ],
          [
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "08287e7a357f0038f76f4240",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163"
          ],
          [
            ".",
            ".",
            ".",
            "403d07eb93d6eda422c1df3f",
            "403d07eb93d6eda422c1df3f",
            "403d07eb93d6eda422c1df3f",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163",
            "2c96ceac1674dcae79681163"
          ],
          [
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7",
            "edf81cba783298c8296505d7"
          ],
          [
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "473a61ac6d0f71c4d8a25097",
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad",
            "9de1ac5f999cf35dd1e4d7ad",
            ".",
            ".",
            "."
          ],
          [
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "0c5e317457ad53f0b440511b",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd"
          ],
          [
            ".",
            ".",
            ".",
            "f8ac94bc688799b517315265",
            "f8ac94bc688799b517315265",
            "f8ac94bc688799b517315265",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd",
            "f9f1dd58c1b986d6b142eabd"
          ]
        ],
        "widths": [
          "1fr",
          "1fr",
          "1fr",
          "1fr",
          "1fr",
          "1fr",
          "1fr",
          "1fr",
          "1fr",
          "1fr",
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
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto",
          "auto"
        ]
      }
    },
    "hash": "6f49c052c0e88ec451ecf30308f04c1c",
    "plugins": {
      "fullWidth": {},
      "bg": {}
    }
  } as t.Story)
}, 1000)

export default connector