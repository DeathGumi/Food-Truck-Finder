const dummyReviews = {
    '1': [
      { rating: 5, text: "Best tacos in town! The carne asada is to die for." },
      { rating: 4, text: "Great flavors, but portions could be a bit bigger." },
      { rating: 5, text: "The vegan jackfruit taco was surprisingly delicious!" },
      { rating: 4, text: "Authentic taste, friendly staff. Will come back!" },
    ],
    '2': [
      { rating: 5, text: "Wok on Wheels never disappoints. The Kung Pao Chicken is my go-to!" },
      { rating: 4, text: "Decent Chinese food, but a bit pricey for a food truck." },
      { rating: 5, text: "The vegetable chow mein is perfect for vegetarians like me." },
      { rating: 4, text: "Good food, but sometimes the wait can be long." },
    ],
    '3': [
      { rating: 5, text: "The Kimchi Quesadilla is a flavor explosion! Absolutely love it." },
      { rating: 5, text: "Fusion done right! The Sushi Taco is a must-try." },
      { rating: 4, text: "Interesting combinations, but some dishes work better than others." },
      { rating: 5, text: "Creative menu and friendly service. Will definitely return!" },
    ],
    '4': [
      { rating: 5, text: "Best burgers in Long Beach! The Bacon Avocado Burger is heavenly." },
      { rating: 4, text: "Good quality ingredients, but a bit messy to eat on the go." },
      { rating: 5, text: "The veggie burger actually tastes great! Kudos for the vegan options." },
      { rating: 4, text: "Solid burgers, but they could use more variety in sides." },
    ],
    '5': [
      { rating: 5, text: "The falafel wrap is as good as what I had in Greece!" },
      { rating: 4, text: "Tasty food, but sometimes it can be a bit dry." },
      { rating: 5, text: "Love the healthy options. The Greek salad is fresh and delicious." },
      { rating: 4, text: "Good Mediterranean food, but portion sizes vary." },
    ],
    '6': [
      { rating: 4, text: "Fresh sushi on the go! The spicy tuna roll is my favorite." },
      { rating: 5, text: "Surprisingly good quality for a food truck. Love the teriyaki bowl!" },
      { rating: 4, text: "Decent sushi, but limited options compared to a restaurant." },
      { rating: 4, text: "Good for a quick sushi fix, but not gourmet level." },
    ],
    '7': [
      { rating: 5, text: "The Nutella Banana Crepe is like a little piece of Paris!" },
      { rating: 5, text: "Both sweet and savory crepes are delicious. Great dessert stop!" },
      { rating: 4, text: "Tasty crepes, but sometimes the wait can be long." },
      { rating: 5, text: "The Vegetarian Ratatouille Crepe is surprisingly filling and tasty!" },
    ],
    '8': [
      { rating: 4, text: "Perfect for a quick bite between classes. Love the loaded fries!" },
      { rating: 5, text: "The veggie wrap is fresh and tasty. Great healthy option on campus." },
      { rating: 4, text: "Good comfort food, but could use more variety." },
      { rating: 4, text: "Chicken tenders are always a safe bet. Wish they had more sauces though." },
    ],
    '9': [
      { rating: 5, text: "Best pho near campus! The broth is so flavorful." },
      { rating: 4, text: "The banh mi is good, but I wish the bread was crustier." },
      { rating: 5, text: "Vegetarian spring rolls are fresh and delicious. Great light lunch!" },
      { rating: 4, text: "Solid Vietnamese food, but sometimes they run out of popular items." },
    ],
    '10': [
      { rating: 5, text: "Finally, a food truck with great vegan options! The Impossible Burger is amazing." },
      { rating: 4, text: "Love the healthy choices, but prices are a bit high for students." },
      { rating: 5, text: "The acai bowl is perfect for a post-workout snack. So refreshing!" },
      { rating: 4, text: "Good food, but sometimes the wait can be long during peak hours." },
    ],
    '11': [
      { rating: 5, text: "Best pizza near campus! The crust is perfectly crispy." },
      { rating: 4, text: "Good pizza, but limited topping options compared to a pizzeria." },
      { rating: 5, text: "The garlic knots are addictive! Great for sharing with friends." },
      { rating: 4, text: "Tasty pizza, but it can get pretty busy during lunch rush." },
    ],
    '12': [
      { rating: 5, text: "The rotisserie chicken is so juicy! Love the homestyle sides too." },
      { rating: 4, text: "Good food, but sometimes the chicken can be a bit salty." },
      { rating: 5, text: "The chicken sandwich with Buldak sauce is a flavor explosion!" },
      { rating: 5, text: "Great value for money. The whole chicken easily feeds a family." },
    ],
    '13': [
      { rating: 5, text: "Authentic Middle Eastern flavors! The lamb gyro is to die for." },
      { rating: 4, text: "Tasty food, but portions could be a bit bigger." },
      { rating: 5, text: "Best falafel in Orange County! Crispy outside, fluffy inside." },
      { rating: 5, text: "Love that it's halal. The chicken shawarma wrap is my go-to lunch." },
    ],
    '14': [
      { rating: 4, text: "Quick and tasty Chinese-American food. Perfect for busy students." },
      { rating: 5, text: "The orange chicken is addictive! Always fresh and hot." },
      { rating: 4, text: "Good food, but wish they had more vegetarian options." },
      { rating: 4, text: "Reliable and fast. The chow mein is always a solid choice." },
    ],
    '15': [
      { rating: 5, text: "The Big D Special is huge and delicious! Great value for money." },
      { rating: 5, text: "Love the Kenstyle Delight Sandwich. It's my new favorite lunch spot." },
      { rating: 4, text: "Good sandwiches, but they can be a bit messy to eat on the go." },
      { rating: 5, text: "Fresh ingredients and generous portions. The Turkey Avocado Club is amazing!" },
    ],
    '16': [
      { rating: 5, text: "Best grilled cheese I've ever had! The cheese blend is perfect." },
      { rating: 4, text: "The Mac 'n' Cheese Melt is comfort food heaven, but so indulgent." },
      { rating: 5, text: "Love the crispy bread and gooey cheese. Simple but delicious!" },
      { rating: 4, text: "Good cheesy options, but could use some more variety in the menu." },
    ],
    '17': [
      { rating: 5, text: "The Monster Burger lives up to its name! Huge and tasty." },
      { rating: 4, text: "BBQ Pulled Pork Pizza is delicious, but super messy to eat." },
      { rating: 5, text: "Best Philly Cheesesteak outside of Philadelphia! So good!" },
      { rating: 4, text: "Portions are massive, which is great, but prices are a bit high." },
    ],
    '18': [
      { rating: 5, text: "The Sea Salt Coffee is addictive! Perfect balance of sweet and salty." },
      { rating: 5, text: "Love the Taro Bread. It's not too sweet and has a great texture." },
      { rating: 4, text: "Good Asian-inspired pastries, but sometimes they sell out quickly." },
      { rating: 5, text: "The Glizzy Buns are so unique and tasty! A must-try for sure." },
    ],
  };
  
  export default dummyReviews;