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
        description: "Just some plain chicken.",
        price: 9.00,
        picURL: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2Farchive%2F0f9d4548ea77f774030c30c2bbb6376418b4cc26",
      },
      {
        name: "French Fries",
        description: "They're actually also just chicken but in thinner pieces.",
        price: 6.00,
      },
    ],
    picURL: "https://media-cdn.tripadvisor.com/media/photo-s/0d/12/bd/2f/20160923-123311-largejpg.jpg",
  },
  {
    name: "Jim's Formal Wear (and Restaurant)",
    description: "Men's clothing store with an illegal restaurant behind the pants rack.",
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
        description: "Hand-rolled fresh pasta with fresh tomatoes from the Jim's Formal Wear garden.",
        price: 845.99,
        picURL: "https://s3-media0.fl.yelpcdn.com/bphoto/FEQXwyuEk8Uuhq067nhI4A/258s.jpg",
      },
      {
        name: "Breadsticks",
        description: "Imported from Olive Garden, Italy, these breadsticks are something to write home about.",
        price: 1.99,
      },
    ],
    picURL: "https://www.duttiled.com/wp-content/uploads/2018/12/Dutti-D0056-LED-chandelier-for-clothing-store-restaurant-living-room-dining-room-bedroom-Nordic-crystal-warm-romantic-personality-creative-art-postmodern-lighting-2.jpg",
  },
  {
    name: "The Midnight Snack Colosseum",
    description: "Your one-stop-shop for all things midnight snacks. Only open from midnight to one.",
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
        description: "A piece of string cheese, already peeled for your convenience.",
        price: 0.75,
        picURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/%C3%9Aden%C3%BD_korb%C3%A1%C4%8Dik_%28Slovakia%29.jpg/1200px-%C3%9Aden%C3%BD_korb%C3%A1%C4%8Dik_%28Slovakia%29.jpg",
      },
      {
        name: "Pepperoni Souflé",
        description: "Everyone's favorite midnight snacks, pizza and souflés, merged into one delectable dish.",
        price: 17.99,
      },
    ],
    picURL: "https://i.pinimg.com/originals/6b/71/ee/6b71ee703bca0811ec5041f11b2b9206.jpg",
  },
  {
    name: "Tom's Restaurant",
    description: "Bwah bwah-bwah-bwah-bwah bwah bwah-bwah-bwah, bwah bwah bwah bwah-bwah-bwah bwah bwah bwah bwah bwah, duh-nuh.",
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
        description: "A large collection of lettuce.",
        price: 18.95,
        picURL: "https://images.news18.com/ibnlive/uploads/2011/09/weirdworldrecords25.jpg",
      },
      {
        name: "Soup",
        description: "Some soup for you.",
        price: 8.95,
      },
    ],
    picURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/280px-Tom%27s_Restaurant%2C_NYC.jpg",
  },
  {
    name: "John's Restaurant",
    description: "Like Tom's restaurant, but made more lazily.",
    address: {
      street: "2882 Broadway",
      city: "New York",
      state: "NY",
      zip: 10025,
    },
    location: {
      latitude: 40.80636327866864,
      longitude: -73.96556036136898,
    },
    menu: [
      {
        name: "Small Salad",
        description: "A tiny collection of lettuce.",
        price: 17.95,
        picURL: "https://www.adweek.com/wp-content/uploads/2017/10/dole-mini-salad-fun-size-hed-2017-600x315.jpg",
      },
      {
        name: "Oranges",
        description: "Some oranges for you.",
        price: 8.95,
      },
    ],
    picURL: "https://images.getbento.com/accounts/37b2aa867625f5bb658fe9bec68d9b7a/media/accounts/media/DGkmBp7ZTWm07ph8xXlw_Logo%20Version2.jpg?w=600&fit=max&auto=compress,format&h=600",
  },
  {
    name: "Sear's Fried Catalogues",
    description: "Lloyd Center's last frontier: sweet and garlicky stir-fried magazines.",
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
        description: "A complimentary vintage magazine for light snacking.",
        price: 0.0,
        picURL: "https://i.pinimg.com/originals/b1/44/af/b144af888087b2d993c673c84ec4fd4c.jpg",
      },
      {
        name: "The Sear's Catalogue Stir-Fry",
        description: "Our specialty! Three different varieties of magazine, all stir-fried to golden perfection.",
        price: 11.95,
      },
    ],
    picURL: "https://www.supermarketnews.com/sites/supermarketnews.com/files/styles/article_featured_retina/public/sears-bankruptcy-stores-close.png?itok=GULgIeNx",
  },
  {
    name: "Shia LaBeouf's Popcorn Paradise",
    description: "The world's best all-you-can-eat popcorn bar, brought to you by an international legend.",
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
        description: "Full access to the all-inclusive 75-topping popcorn bar (for up to two hours).",
        price: 29.99,
        picURL: "https://i.pinimg.com/originals/ba/99/2c/ba992ce8d47ee9f40fb52f305045b76d.jpg",
      },
    ],
    picURL: "https://static.onecms.io/wp-content/uploads/sites/6/2015/11/shia-labeouf.jpg",
  },
  {
    name: "Sarah's Swedish Sweets",
    description: "An upscale restaurant that only sells Swedish fish.",
    address: {
      street: "738 E Burnside St.",
      city: "Portland",
      state: "OR",
      zip: 97214,
    },
    location: {
      latitude: 45.52330238179709,
      longitude: -122.65807089205349,
    },
    menu: [
      {
        name: "Swedish Fish",
        description: "A full plate of Swedish fish..",
        price: 46.99,
        picURL: "https://cdnimg.webstaurantstore.com/images/products/extra_large/483133/1944862.jpg",
      },
    ],
    picURL: "https://assets3.thrillist.com/v1/image/734770/1000x666.6666666666666/flatten;crop;jpeg_quality=70",
  },
];

export default restaurants;