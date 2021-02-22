const restaurants = [
  {
    name: "Chicken City",
    description: "A nice restaurant with all-chicken everything.",
    address: {
      street: "2929 NW Nicolai St, Portland, OR 97210",
      city: "Portland",
      state: "OR",
      zip: 97210,
    },
    location: {
      latitude: 45.53861829560881,
      longitude: -122.71220591415464,
    },
    menu: [
      {
        name: "Chicken",
        image:
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2Farchive%2F0f9d4548ea77f774030c30c2bbb6376418b4cc26",
        shortDesc: "Just some plain chicken.",
        longDesc: "Just some plain chicken, dipped in nothing.",
        price: 9.0,
        Allergens: "chicken",
        category: "Entree",
        mandatoryMods: [
          {
            modName: "How do you want that cooked?",
            modOptions: [
              { option: "Rare", adtlPrice: 0 },
              { option: "Medium-rare", adtlPrice: 0 },
              { option: "Medium", adtlPrice: 0 },
              { option: "Well-done", adtlPrice: 0 },
            ],
          },
          {
            modName: "Would you like utensils?",
            modOptions: [
              { option: "No (recommended)", adtlPrice: 0 },
              { option: "yes", adtlPrice: 0 },
            ],
          },
        ],
        nonMandatoryMods: [
          {
            modName: "Extras",
            modOptions: [
              { option: "More Chicken", adtlPrice: 5.45 },
              { option: "Less Chicken", adtlPrice: 10.0 },
            ],
          },
        ],
      },
      {
        name: "French Fries",
        image:
          "https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2010/07/parmchickenstrips_xl.jpg",
        shortDesc: "Thin pieces of chicken.",
        longDesc: "They're actually also just chicken but in thinner pieces.",
        price: 6.0,
        category: "Side",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
      {
        name: "Rotisserie Chicken",
        image:
          "https://www.dinneratthezoo.com/wp-content/uploads/2019/06/rotisserie-chicken-3.jpg",
        shortDesc: "A whole rotisserie chicken.",
        longDesc: "A whole entire rotisserie chicken.",
        price: 22.0,
        category: "Entree",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
      {
        name: "Chick on a Plate",
        image:
          "https://image.shutterstock.com/z/stock-photo-a-live-chicken-on-a-plate-knife-and-fork-concept-do-not-eat-animals-402618625.jpg",
        shortDesc: "A live chick.",
        longDesc:
          "In the middle of your plate with plenty of watermarks, this chick is what keeps customers coming back.",
        price: 4.99,
        category: "Appetizer",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
      {
        name: "Chicken Hat",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/41xAAr5ue4L._AC_.jpg",
        shortDesc: "An inedible chicken hat.",
        longDesc:
          "Don't try to eat this! Fun for the whole family, this hat looks like a chicken.",
        price: 19.99,
        category: "Merch",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
    ],
    picURL:
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/12/bd/2f/20160923-123311-largejpg.jpg",
  },
  {
    name: "Jim's Formal Wear (and Restaurant)",
    description:
      "Men's clothing store with an illegal restaurant behind the pants rack.",
    address: {
      street: "3180 Fulton Rd",
      city: "Cleveland",
      state: "OH",
      zip: 44109,
    },
    location: {
      latitude: 41.467385796579364,
      longitude: -81.70773329375706,
    },
    menu: [
      {
        name: "Fettuccine Alfredo",
        image:
          "https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg",
        shortDesc: "Fresh pasta with fresh tomatoes.",
        longDesc:
          "Hand-rolled fresh pasta with fresh tomatoes from the Jim's Formal Wear garden.",
        price: 845.99,
        Allergens: "gluten",
        category: "Entree",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
    ],
    picURL:
      "https://www.duttiled.com/wp-content/uploads/2018/12/Dutti-D0056-LED-chandelier-for-clothing-store-restaurant-living-room-dining-room-bedroom-Nordic-crystal-warm-romantic-personality-creative-art-postmodern-lighting-2.jpg",
  },
  {
    name: "The Midnight Snack Colosseum",
    description:
      "Your one-stop-shop for all things midnight snacks. Only open from midnight to one.",
    address: {
      street: "614 SE 202nd Ave",
      city: "Portland",
      state: "OR",
      zip: 97233,
    },
    location: {
      latitude: 45.518164486329056,
      longitude: -122.45485314817385,
    },
    menu: [
      {
        name: "String Cheese",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/%C3%9Aden%C3%BD_korb%C3%A1%C4%8Dik_%28Slovakia%29.jpg/1200px-%C3%9Aden%C3%BD_korb%C3%A1%C4%8Dik_%28Slovakia%29.jpg",
        longDesc:
          "A piece of string cheese, already peeled for your convenience.",
        shortDesc: "It's-a-mozzarella",
        price: 0.75,
        category: "Side",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
    ],
    picURL:
      "https://i.pinimg.com/originals/6b/71/ee/6b71ee703bca0811ec5041f11b2b9206.jpg",
  },
  {
    name: "Tom's Restaurant",
    description:
      "Bwah bwah-bwah-bwah-bwah bwah bwah-bwah-bwah, bwah bwah bwah bwah-bwah-bwah bwah bwah bwah bwah bwah, duh-nuh.",
    address: {
      street: "2880 Broadway",
      city: "New York",
      state: "NY",
      zip: 10025,
    },
    location: {
      latitude: 40.80636327866863,
      longitude: -73.96556036136899,
    },
    menu: [
      {
        name: "Big Salad",
        image:
          "https://images.news18.com/ibnlive/uploads/2011/09/weirdworldrecords25.jpg",
        longDesc: "An asbolutely massive collection of lettuce.",
        shortDesc: "A large collection of lettuce.",
        price: 18.95,
        category: "Entree",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
    ],
    picURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/280px-Tom%27s_Restaurant%2C_NYC.jpg",
  },
  {
    name: "Sear's Fried Catalogues",
    description:
      "Lloyd Center's last frontier: sweet and garlicky stir-fried magazines.",
    address: {
      street: "2201 Lloyd Center",
      city: "Portland",
      state: "OR",
      zip: 97232,
    },
    location: {
      latitude: 45.53267381284505,
      longitude: -122.65353245851188,
    },
    menu: [
      {
        name: "Raw, aged catalogue",
        image:
          "https://i.pinimg.com/originals/b1/44/af/b144af888087b2d993c673c84ec4fd4c.jpg",
        shortDesc: "A glossy refreshment.",
        longDesc: "A complimentary vintage magazine for light snacking.",
        price: 0.0,
        category: "Appetizer",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
    ],
    picURL:
      "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/sears-bankruptcy-stores-close.png?itok=GULgIeNx",
  },
  {
    name: "Shia LaBeouf's Popcorn Paradise",
    description:
      "The world's best all-you-can-eat popcorn bar, brought to you by an international legend.",
    address: {
      street: "3341 SE Hawthorne Blvd.",
      city: "Portland",
      state: "OR",
      zip: 97214,
    },
    location: {
      latitude: 45.51225885504484,
      longitude: -122.63003793580931,
    },
    menu: [
      {
        name: "All-you-can-eat popcorn",
        image:
          "https://i.pinimg.com/originals/ba/99/2c/ba992ce8d47ee9f40fb52f305045b76d.jpg",
        longDesc:
          "Full access to the all-inclusive 75-topping popcorn bar (for up to two hours).",
        shortDesc: "Popcorn buffet.",
        price: 29.99,
        category: "Buffet",
        mandatoryMods: [],
        nonMandatoryMods: [],
      },
    ],
    picURL:
      "https://static.onecms.io/wp-content/uploads/sites/6/2015/11/shia-labeouf.jpg",
  },
];

export default restaurants;
