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
      location: { lat: 33.7542, lng: -118.1305 } // Near 2nd Street, Naples
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