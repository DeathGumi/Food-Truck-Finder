
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



# Food-Truck-Finder


• When food truck drivers go live, the system
collects their GPS location and makes it
available to all consumers. (For this can do like turn on at random times of the day)

• Two options exist for going offline:
o Turn off the broadcast manually from the
app, or
o Select duration of time that they will be
live, after which the location broadcast
automatically stops.


# Food-Truck-Side
Users can locate food trucks and truck owners can find customers easily

Truck Coordinates of registered food trucks and provide information such as menu, dish photos , and prices for each specific food truck to consumers (how far away the food is from the main location -> phone number + location)


# Consumer Side
• Consumers can create a profile of their favorite dishes. (updates page with a picture + rating on their favorite food)
• Consumers can review a food truck and rate it (from 1 (Generate a bunch of fake reviews + take avg /5 for ratings)
to 5).
• Consumers can also rate any dish in the food truck’s
menu. 


# Implementation


- Implement map with food places
- Implement on hover show the place 
- On click send to specific page of the place 
- Send to specific Page (basically yelp pretty easy to impleemnt
- For current location probably just use the Pin as a current location thing can drag around will automatically locate how far location is from the pin
- Search bar for food truck


Possible Layout

/pages
  _app.js                 # Main App component
  index.js                # Landing page
  map.js                  # Full page map view
  [truckId].js            # Dynamic route for individual food truck pages
  /api
    search.js             # API route for search functionality
    trucks.js             # API route for food truck data (CRUD operations)

/components
  Layout.js               # Common layout wrapper
  Header.js               # Navigation header
  Footer.js               # Footer component
  Search.js               # Main search component
  Map.js                  # Map component
  ListView.js             # List view component for search results
  FoodTruckCard.js        # Card component for individual food truck in list view
  FoodTruckMarker.js      # Marker component for food trucks on the map
  SearchBar.js            # Search input component
  RatingStars.js          # Star rating component

/hooks
  useGeolocation.js       # Custom hook for getting user's location

/lib
  foodTruckData.js        # Mock data for food trucks
  localStorage.js         # Utility functions for interacting with local storage

/styles
  globals.js              # Global styles using styled-components or similar

/public
  /images                 # Store static images here
    logo.png              # Your app logo
    defaultTruckImage.jpg # Default image for food trucks