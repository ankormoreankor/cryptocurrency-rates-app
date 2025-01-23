# FE test task

### **React & TypeScript Frontend Developer Interview Task with State Management**

## Objective

Develop a single-page application using **React** and **TypeScript** that displays a list of cryptocurrency rates, fetching data from [**https://app.youhodler.com/api/v3/rates/extended**](https://app.youhodler.com/api/v3/rates/extended). The rates should be relative to the **USD.**

Each of the items in the list should be links leading to page dedicated for each coin (like `/btc` , `/etc`) where you should display all the information available from this endpoint (`rate` - medium price, `ask` - ask price, `bid` - bid price, `diff24h` - 24 hours movement of the price).

## Technical Requirements

1. **Framework & Language:** Build the application with **React** using functional components and hooks, entirely typed with **TypeScript**.
2. **State Management:** Implement a state management library of your choice to efficiently manage the application's state.

    <aside>
    📱 Although task is trivial and you may be tempted to just use react’s context or even just local state it is important to ***choose state*** management library and ***use it*** to complete the task

    </aside>

3. **API Integration and Type Safety:** Fetch cryptocurrency rates from the given API endpoint. Use **TypeScript** to ensure type safety for the API response, and handle errors gracefully.
4. **Deployment & GitHub:** Deploy the application to a any hosting service (e.g., **Vercel**, **Netlify**, **GitHub Pages,** etc) and ensure your project code is on **GitHub**. Provide links to both the deployed application and the GitHub repository in your submission.
5. **Design and UX:** design and the UX is intentionally left out from the task. Use your own taste.

## Bonus Points

- **MobX for State Management:** Earn bonus points by using **MobX** for state management, showcasing your ability to leverage its features for efficient state handling.
- **Expo App Development:** Creating a version of your application with **React Native** using **Expo**, available through Expo Go ([**https://expo.dev/client**](https://expo.dev/client)).

    <aside>
    📱 If you choose to create **React Native** app - it ***would not be required for you to submit the web version of this app*** on Vercel or other hosting; although there would be extra points if you provide both native and web version of the app.

    </aside>

- **Extra functionality**: search, sorting, good overall design, etc.

## Submission Guidelines

- Provide the URL of your **GitHub** repository, ensuring it's public.
- Include the **link to the deployed application** or provide expo **application url.**
