const foodTrucks = [
  {
    id: '1',
    name: "Taco Fiesta Wheels",
    cuisine: "Mexican",
    description: "Authentic street tacos with a modern twist",
    menu: [
      { item: "Carne Asada Taco", price: 3.50 },
      { item: "Fish Taco", price: 4.00 },
      { item: "Vegan Jackfruit Taco", price: 3.75 }
    ],
    rating: 4.7,
    reviews: 312,
    priceRange: "$$",
    hours: "11:00 AM - 9:00 PM",
    location: { lat: 33.7701, lng: -118.1937 } // Downtown Long Beach
  },
  {
    id: '2',
    name: "Wok on Wheels",
    cuisine: "Chinese",
    description: "Traditional Chinese cuisine served fresh and hot",
    menu: [
      { item: "Kung Pao Chicken", price: 9.99 },
      { item: "Vegetable Chow Mein", price: 8.50 },
      { item: "Beef and Broccoli", price: 10.50 }
    ],
    rating: 4.5,
    reviews: 189,
    priceRange: "$$",
    hours: "11:30 AM - 8:30 PM",
    location: { lat: 33.7829, lng: -118.1414 } // Near Cal State Long Beach
  },
  {
    id: '3',
    name: "Fusion Flavor Express",
    cuisine: "Fusion",
    description: "Exciting blend of Asian and Latin flavors",
    menu: [
      { item: "Kimchi Quesadilla", price: 7.50 },
      { item: "Teriyaki Chicken Burrito", price: 8.99 },
      { item: "Sushi Taco", price: 6.75 }
    ],
    rating: 4.8,
    reviews: 276,
    priceRange: "$$",
    hours: "12:00 PM - 10:00 PM",
    location: { lat: 33.7618, lng: -118.1671 } // Belmont Shore
  },
  {
    id: '4',
    name: "Burger Bliss",
    cuisine: "American",
    description: "Gourmet burgers made with locally sourced ingredients",
    menu: [
      { item: "Classic Cheeseburger", price: 6.99 },
      { item: "Veggie Burger", price: 7.50 },
      { item: "Bacon Avocado Burger", price: 8.99 }
    ],
    rating: 4.6,
    reviews: 423,
    priceRange: "$$",
    hours: "11:00 AM - 9:00 PM",
    location: { lat: 33.8089, lng: -118.1953 } // North Long Beach
  },
  {
    id: '5',
    name: "Mediterranean Delights",
    cuisine: "Mediterranean",
    description: "Healthy and delicious Mediterranean street food",
    menu: [
      { item: "Falafel Wrap", price: 7.25 },
      { item: "Chicken Shawarma Plate", price: 9.99 },
      { item: "Greek Salad", price: 6.50 }
    ],
    rating: 4.4,
    reviews: 156,
    priceRange: "$$",
    hours: "11:30 AM - 8:00 PM",
    location: { lat: 33.7900, lng: -118.1364 } // Near Traffic Circle
  },
  {
    id: '6',
    name: "Sushi Roll",
    cuisine: "Japanese",
    description: "Fresh sushi and Japanese favorites on the go",
    menu: [
      { item: "California Roll", price: 5.50 },
      { item: "Spicy Tuna Roll", price: 6.00 },
      { item: "Teriyaki Chicken Bowl", price: 8.75 }
    ],
    rating: 4.3,
    reviews: 201,
    priceRange: "$$",
    hours: "11:00 AM - 9:30 PM",
    location: { lat: 33.7683, lng: -118.1956 } // Shoreline Village
  },
  {
    id: '7',
    name: "Crepe Escape",
    cuisine: "French",
    description: "Sweet and savory crepes made to order",
    menu: [
      { item: "Nutella Banana Crepe", price: 6.99 },
      { item: "Ham and Cheese Crepe", price: 7.50 },
      { item: "Vegetarian Ratatouille Crepe", price: 8.25 }
    ],
    rating: 4.7,
    reviews: 287,
    priceRange: "$$",
    hours: "8:00 AM - 8:00 PM",
    location: { lat: 33.7542, lng: -118.1305 } // Near 2nd Street, Naples
  },
  // New food trucks near CSULB
  {
    id: '8',
    name: "Campus Bites",
    cuisine: "American",
    description: "Quick and tasty comfort food for students on the go",
    menu: [
      { item: "Loaded Fries", price: 5.99 },
      { item: "Chicken Tenders", price: 6.50 },
      { item: "Veggie Wrap", price: 7.25 }
    ],
    rating: 4.2,
    reviews: 178,
    priceRange: "$",
    hours: "10:00 AM - 7:00 PM",
    location: { lat: 33.7838, lng: -118.1141 } // Near CSULB
  },
  {
    id: '9',
    name: "Pho on the Go",
    cuisine: "Vietnamese",
    description: "Authentic Vietnamese pho and banh mi",
    menu: [
      { item: "Beef Pho", price: 8.99 },
      { item: "Grilled Pork Banh Mi", price: 6.50 },
      { item: "Vegetarian Spring Rolls", price: 4.75 }
    ],
    rating: 4.6,
    reviews: 210,
    priceRange: "$$",
    hours: "11:00 AM - 8:00 PM",
    location: { lat: 33.7845, lng: -118.1165 } // Near CSULB
  },
  {
    id: '10',
    name: "Green Machine",
    cuisine: "Vegan",
    description: "Healthy vegan options for the eco-conscious student",
    menu: [
      { item: "Acai Bowl", price: 7.99 },
      { item: "Impossible Burger", price: 9.50 },
      { item: "Kale Caesar Salad", price: 8.25 }
    ],
    rating: 4.4,
    reviews: 156,
    priceRange: "$$",
    hours: "9:00 AM - 6:00 PM",
    location: { lat: 33.7820, lng: -118.1190 } // Near CSULB
  },
  {
    id: '11',
    name: "Pizza Pronto",
    cuisine: "Italian",
    description: "Wood-fired pizzas made in minutes",
    menu: [
      { item: "Margherita Pizza", price: 8.99 },
      { item: "Pepperoni Pizza", price: 9.99 },
      { item: "Garlic Knots", price: 4.50 }
    ],
    rating: 4.5,
    reviews: 232,
    priceRange: "$$",
    hours: "11:00 AM - 9:00 PM",
    location: { lat: 33.7810, lng: -118.1130 } // Near CSULB
  },
  {
    id: '12',
    name: "Nelson and Alex Rotisserie Chicken",
    cuisine: "American",
    description: "Juicy rotisserie chicken with homestyle sides",
    menu: [
      { item: "Whole Rotisserie Chicken", price: 15.99 },
      { item: "Half Chicken Meal", price: 10.99 },
      { item: "Chicken Sandwich", price: 8.50 },
      { item: "Side of Buldak Sauce", price: 0.50 }
    ],
    rating: 4.6,
    reviews: 187,
    priceRange: "$$",
    hours: "11:00 AM - 8:00 PM",
    location: { lat: 33.6595, lng: -117.9988 } // Huntington Beach, CA
  },
  {
    id: '13',
    name: "Kareem's Halal Bros",
    cuisine: "Middle Eastern",
    description: "Authentic halal Middle Eastern street food",
    menu: [
      { item: "Chicken Shawarma Wrap", price: 8.99 },
      { item: "Falafel Plate", price: 9.50 },
      { item: "Lamb Gyro", price: 10.99 }
    ],
    rating: 4.7,
    reviews: 230,
    priceRange: "$$",
    hours: "11:00 AM - 9:00 PM",
    location: { lat: 33.7090, lng: -117.9549 } // Fountain Valley, CA
  },
  {
    id: '14',
    name: "Peter's Panda Express",
    cuisine: "Chinese-American",
    description: "Quick and tasty Chinese-American favorites for students",
    menu: [
      { item: "Orange Chicken", price: 9.50 },
      { item: "Beijing Beef", price: 9.99 },
      { item: "Chow Mein", price: 5.50 }
    ],
    rating: 4.2,
    reviews: 312,
    priceRange: "$",
    hours: "10:00 AM - 8:00 PM",
    location: { lat: 34.0689, lng: -118.4452 } // near UCLA
  },
  {
    id: '15',
    name: "Big D's Sandwich Shop",
    cuisine: "American",
    description: "Hearty, homemade sandwiches piled high with fresh ingredients",
    menu: [
      { item: "The Big D Special", price: 10.99 },
      { item: "Kenstyle Delight Sandwich", price: 8.99 },
      { item: "Turkey Avocado Club", price: 9.50 }
    ],
    rating: 4.8,
    reviews: 176,
    priceRange: "$$",
    hours: "10:30 AM - 7:00 PM",
    location: { lat: 33.7070, lng: -117.9559 } // Fountain Valley, CA
  },
  {
    id: '16',
    name: "Chongers Cheese",
    cuisine: "American",
    description: "Gourmet grilled cheese sandwiches and cheesy delights",
    menu: [
      { item: "Classic Grilled Cheese", price: 6.99 },
      { item: "Mac 'n' Cheese Melt", price: 8.50 },
      { item: "Cheesy Quesadilla", price: 4.99 }
    ],
    rating: 4.5,
    reviews: 142,
    priceRange: "$",
    hours: "11:00 AM - 8:00 PM",
    location: { lat: 33.7092, lng: -117.9535 } // Fountain Valley, CA
  },
  {
    id: '17',
    name: "Nam's Monster Muncher",
    cuisine: "American Fusion",
    description: "Oversized burgers, pizzas, and sandwiches with a unique twist",
    menu: [
      { item: "Monster Burger", price: 12.99 },
      { item: "BBQ Pulled Pork Pizza", price: 15.99 },
      { item: "Philly Cheesesteak Sandwich", price: 10.99 }
    ],
    rating: 4.6,
    reviews: 203,
    priceRange: "$$",
    hours: "11:00 AM - 10:00 PM",
    location: { lat: 33.7743, lng: -117.9380 } // Garden Grove, CA
  },
  {
    id: '18',
    name: "Kenny's 85 Degrees Bakery",
    cuisine: "Bakery & Coffee",
    description: "Fresh Asian-inspired pastries and specialty coffee drinks",
    menu: [
      { item: "Sea Salt Coffee", price: 4.50 },
      { item: "Taro Bread", price: 3.25 },
      { item: "Glizzy Buns", price: 2.75 }
    ],
    rating: 4.7,
    reviews: 289,
    priceRange: "$$",
    hours: "7:00 AM - 9:00 PM",
    location: { lat: 33.7597, lng: -117.9965 } // Westminster, CA
  }
];

export function getAllFoodTrucks() {
  return foodTrucks;
}

export function getFoodTruckById(id) {
  return foodTrucks.find(truck => truck.id === id);
}

export function searchFoodTrucks(term) {
  return foodTrucks.filter(truck => 
    truck.name.toLowerCase().includes(term.toLowerCase()) ||
    truck.cuisine.toLowerCase().includes(term.toLowerCase()) ||
    truck.description.toLowerCase().includes(term.toLowerCase())
  );
}