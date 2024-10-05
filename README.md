
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

Library Used: React Leaflet for map

# Sept 19th
- [x] Adjust the card so doesnt show black
- [x] Instead of click put hover to show the place
- [x] On card show rating
- [x] Have it autocalculate the distance current location is from the marker
- [x] Also  make it so can move the marker arond


# Sept 20th
- [x] Since introduces tar rating adjust the listview since can just call on startrating
- [x] Make list on left side Sort by closest to current location
- [x] Can make individual pages on click
- [x] Make so popup applies to click on map too
- [x] When press on name send back to main search page (No longer needed since thoguht of pop up solution)
- [x] Make it so the trucks actually show png 
- [ ] Need to make it so add review saves review
- [ ] Need to add dummy reviews
- [ ] Need to add pictures 

# Sept 21st
- [x] Need to make it so add review saves review
- [x] Need to add dummy reviews
- [x] Need to add pictures for each foodtruck


# Sept 22nd 
- [x] Need to be able to add pictures in the review
- [ ] Maybe add food truck and save somewhere (can add image)
- [x] Allow for delete 
- [ ] Add date on reviews 
- [x] Added images to all 
- [ ] Make it so logo is specific (Chinese, Mexican (Separate from the rest))


# Sept 23rd
- [ ] Maybe add food truck and save somewhere (can add image)
- [x] Add date on reviews 
- [x] Make it so logo is specific (Chinese, Mexican (Separate from the rest)) (essentially a tag) for the (cuisine)
- [ ] Reformat a little make page look better (different fonts)
- [x] Since the locate me takes a long time adding a locating... 


# Sept 24th
- [ ] Maybe add food truck and save somewhere (can add image)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [x] Reformated the Time + Reviews + stars on the modal (clearer)
    - [ ] Still need to fix modal make look better
    - [ ] Add review button under the picture
- [ ] Add time when food open (When past time for example its current time is 3:32 but food doesnt open till 4 so it doesnt appear)
- [ ] Change search (black clearer)

# Sept 25th

- [ ] Maybe add food truck and save somewhere (can add image)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Add review button under the picture
    - [ ] Add menu button instead of straight up showing the menu
- [x] Add time when food open (When past time for example its current time is 3:32 but food doesnt open till 4 so it doesnt appear)
- [x] Change search (black clearer)


# Sept 26th

- [ ] Maybe add food truck and save somewhere (can add image)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [x] Add review button under the picture
    - [x] Add menu button instead of straight up showing the menu
    - [x] Changed the Font of the title to differentiate
    - [ ] Maybe change the color of the font 
    - [ ] Add seperator betweeen List, Map, Header
    - [ ] Maybe add a popularity/busy so people dont have to wait in line

# Sept 27th 

- [ ] Maybe add food truck and save somewhere (can add image)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 
    - [x] Add seperator betweeen List, Map, Header
    - [ ] Maybe add a popularity/busy so people dont have to wait in line
    - [x] Filter


# Sept 28th

- [ ] Maybe add food truck and save somewhere (can add image)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 
    - [ ] Forgot to add open and closed to the map 
    - [x] Maybe add a popularity/busy so people dont have to wait in line

# Sept 29th

- [ ] Maybe add food truck and save somewhere (can add image)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 
    - [x] Forgot to add open and closed to the map 
    - [x] added tag for cusine
    - [x] added busyness indicator


# Sept 30th

- [ ] Maybe add food truck and save somewhere (can add image)
    - [x] Can add image
    - [ ] Fix delete foodtruck
    - [x] menu is able to work properly 
    - [ ] need to set if review is added change review on the main
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 


# Oct 1st


- [ ] Maybe add food truck and save somewhere (can add image)
    - [ ] Fix delete foodtruck (Still bugged)
    - [ ] need to set if review is added change review on the main (stars show up and reviews update + 1) (Still bugged)
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 

- [x] For New food Trucks show the Title and all of the data liek the otheer food trucks keep same format if no picture just dispaly like an empty default space
- [x] Update + 1 review at least

# Oct 2 

- [ ] Maybe add food truck and save somewhere (can add image)
    - [ ] Fix delete foodtruck (Still bugged)
    - [ ] need to set if review is added change review on the main (stars show up and reviews update + 1) (Still bugged)
        - [ ] Issue where when i add a review it replaces other review figure out first
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 


# Oct 3 

- [ ] Maybe add food truck and save somewhere (can add image)
    - [ ] Fix delete foodtruck (Still bugged)
    - [x] need to set if review is added change review on the main (stars show up and reviews update + 1) (Still bugged)
        - [x] Issue where when i add a review it replaces other review figure out first
        
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 
    - [ ] Star rating should be updated in real time 

# Oct 4

- [ ] Maybe add food truck and save somewhere (can add image)
    - [ ] Fix delete foodtruck (Still bugged)

        
- [ ] Reformat a little make page look better (different fonts) / See what to add or remove
    - [ ] Still need to fix modal make look better
    - [ ] Maybe change the color of the font 
    - [x] Star rating should be updated in real time 
    - [ ] Maybe add a foodtruck owner mode and a user mode (essentiall owners can add foodtrucks delete foodtrucks) (users are just use the website and normal features)