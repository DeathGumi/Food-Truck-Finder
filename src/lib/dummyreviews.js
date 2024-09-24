const dummyReviews = {
  '1': [
    { rating: 5, text: "Best tacos in town! The carne asada is to die for.", date: "8/15/24" },
    { rating: 4, text: "Great flavors, but portions could be a bit bigger.", date: "7/22/24" },
    { rating: 5, text: "The vegan jackfruit taco was surprisingly delicious!", date: "6/30/24" },
    { rating: 4, text: "Authentic taste, friendly staff. Will come back!", date: "6/5/24" },
  ],
  '2': [
    { rating: 5, text: "Wok on Wheels never disappoints. The Kung Pao Chicken is my go-to!", date: "8/10/24" },
    { rating: 4, text: "Decent Chinese food, but a bit pricey for a food truck.", date: "7/18/24" },
    { rating: 5, text: "The vegetable chow mein is perfect for vegetarians like me.", date: "7/1/24" },
    { rating: 4, text: "Good food, but sometimes the wait can be long.", date: "6/12/24" },
  ],
  '3': [
    { rating: 5, text: "The Kimchi Quesadilla is a flavor explosion! Absolutely love it.", date: "8/20/24" },
    { rating: 5, text: "Fusion done right! The Sushi Taco is a must-try.", date: "7/30/24" },
    { rating: 4, text: "Interesting combinations, but some dishes work better than others.", date: "7/5/24" },
    { rating: 5, text: "Creative menu and friendly service. Will definitely return!", date: "6/18/24" },
  ],
  '4': [
    { rating: 5, text: "Best burgers in Long Beach! The Bacon Avocado Burger is heavenly.", date: "8/25/24" },
    { rating: 4, text: "Good quality ingredients, but a bit messy to eat on the go.", date: "8/2/24" },
    { rating: 5, text: "The veggie burger actually tastes great! Kudos for the vegan options.", date: "7/10/24" },
    { rating: 4, text: "Solid burgers, but they could use more variety in sides.", date: "6/22/24" },
  ],
  '5': [
    { rating: 5, text: "The falafel wrap is as good as what I had in Greece!", date: "8/18/24" },
    { rating: 4, text: "Tasty food, but sometimes it can be a bit dry.", date: "7/26/24" },
    { rating: 5, text: "Love the healthy options. The Greek salad is fresh and delicious.", date: "7/3/24" },
    { rating: 4, text: "Good Mediterranean food, but portion sizes vary.", date: "6/15/24" },
  ],
  '6': [
    { rating: 4, text: "Fresh sushi on the go! The spicy tuna roll is my favorite.", date: "8/22/24" },
    { rating: 5, text: "Surprisingly good quality for a food truck. Love the teriyaki bowl!", date: "7/29/24" },
    { rating: 4, text: "Decent sushi, but limited options compared to a restaurant.", date: "7/7/24" },
    { rating: 4, text: "Good for a quick sushi fix, but not gourmet level.", date: "6/20/24" },
  ],
  '7': [
    { rating: 5, text: "The Nutella Banana Crepe is like a little piece of Paris!", date: "8/28/24" },
    { rating: 5, text: "Both sweet and savory crepes are delicious. Great dessert stop!", date: "8/5/24" },
    { rating: 4, text: "Tasty crepes, but sometimes the wait can be long.", date: "7/13/24" },
    { rating: 5, text: "The Vegetarian Ratatouille Crepe is surprisingly filling and tasty!", date: "6/25/24" },
  ],
  '8': [
    { rating: 4, text: "Perfect for a quick bite between classes. Love the loaded fries!", date: "8/30/24" },
    { rating: 5, text: "The veggie wrap is fresh and tasty. Great healthy option on campus.", date: "8/8/24" },
    { rating: 4, text: "Good comfort food, but could use more variety.", date: "7/16/24" },
    { rating: 4, text: "Chicken tenders are always a safe bet. Wish they had more sauces though.", date: "6/28/24" },
  ],
  '9': [
    { rating: 5, text: "Best pho near campus! The broth is so flavorful.", date: "9/2/24" },
    { rating: 4, text: "The banh mi is good, but I wish the bread was crustier.", date: "8/11/24" },
    { rating: 5, text: "Vegetarian spring rolls are fresh and delicious. Great light lunch!", date: "7/19/24" },
    { rating: 4, text: "Solid Vietnamese food, but sometimes they run out of popular items.", date: "7/1/24" },
  ],
  '10': [
    { rating: 5, text: "Finally, a food truck with great vegan options! The Impossible Burger is amazing.", date: "9/5/24" },
    { rating: 4, text: "Love the healthy choices, but prices are a bit high for students.", date: "8/14/24" },
    { rating: 5, text: "The acai bowl is perfect for a post-workout snack. So refreshing!", date: "7/22/24" },
    { rating: 4, text: "Good food, but sometimes the wait can be long during peak hours.", date: "7/4/24" },
  ],
  '11': [
    { rating: 5, text: "Best pizza near campus! The crust is perfectly crispy.", date: "9/8/24" },
    { rating: 4, text: "Good pizza, but limited topping options compared to a pizzeria.", date: "8/17/24" },
    { rating: 5, text: "The garlic knots are addictive! Great for sharing with friends.", date: "7/25/24" },
    { rating: 4, text: "Tasty pizza, but it can get pretty busy during lunch rush.", date: "7/7/24" },
  ],
  '12': [
    { rating: 5, text: "The rotisserie chicken is so juicy! Love the homestyle sides too.", date: "9/11/24" },
    { rating: 4, text: "Good food, but sometimes the chicken can be a bit salty.", date: "8/20/24" },
    { rating: 5, text: "The chicken sandwich with Buldak sauce is a flavor explosion!", date: "7/28/24" },
    { rating: 5, text: "Great value for money. The whole chicken easily feeds a family.", date: "7/10/24" },
  ],
  '13': [
    { rating: 5, text: "Authentic Middle Eastern flavors! The lamb gyro is to die for.", date: "9/14/24" },
    { rating: 4, text: "Tasty food, but portions could be a bit bigger.", date: "8/23/24" },
    { rating: 5, text: "Best falafel in Orange County! Crispy outside, fluffy inside.", date: "7/31/24" },
    { rating: 5, text: "Love that it's halal. The chicken shawarma wrap is my go-to lunch.", date: "7/13/24" },
  ],
  '14': [
    { rating: 4, text: "Quick and tasty Chinese-American food. Perfect for busy students.", date: "9/17/24" },
    { rating: 5, text: "The orange chicken is addictive! Always fresh and hot.", date: "8/26/24" },
    { rating: 4, text: "Good food, but wish they had more vegetarian options.", date: "8/3/24" },
    { rating: 4, text: "Reliable and fast. The chow mein is always a solid choice.", date: "7/16/24" },
  ],
  '15': [
    { rating: 5, text: "The Big D Special is huge and delicious! Great value for money.", date: "9/20/24" },
    { rating: 5, text: "Love the Kenstyle Delight Sandwich. It's my new favorite lunch spot.", date: "8/29/24" },
    { rating: 4, text: "Good sandwiches, but they can be a bit messy to eat on the go.", date: "8/6/24" },
    { rating: 5, text: "Fresh ingredients and generous portions. The Turkey Avocado Club is amazing!", date: "7/19/24" },
  ],
  '16': [
    { rating: 5, text: "Best grilled cheese I've ever had! The cheese blend is perfect.", date: "9/23/24" },
    { rating: 4, text: "The Mac 'n' Cheese Melt is comfort food heaven, but so indulgent.", date: "9/1/24" },
    { rating: 5, text: "Love the crispy bread and gooey cheese. Simple but delicious!", date: "8/9/24" },
    { rating: 4, text: "Good cheesy options, but could use some more variety in the menu.", date: "7/22/24" },
  ],
  '17': [
    { rating: 5, text: "The Monster Burger lives up to its name! Huge and tasty.", date: "9/26/24" },
    { rating: 4, text: "BBQ Pulled Pork Pizza is delicious, but super messy to eat.", date: "9/4/24" },
    { rating: 5, text: "Best Philly Cheesesteak outside of Philadelphia! So good!", date: "8/12/24" },
    { rating: 4, text: "Portions are massive, which is great, but prices are a bit high.", date: "7/25/24" },
  ],
  '18': [
    { rating: 5, text: "The Sea Salt Coffee is addictive! Perfect balance of sweet and salty.", date: "9/29/24" },
    { rating: 5, text: "Love the Taro Bread. It's not too sweet and has a great texture.", date: "9/7/24" },
    { rating: 4, text: "Good Asian-inspired pastries, but sometimes they sell out quickly.", date: "8/15/24" },
    { rating: 5, text: "The Glizzy Buns are so unique and tasty! A must-try for sure.", date: "7/28/24" },
  ],
};

export default dummyReviews;