# Formula One Explorer

A web app to explore Formula one seasons, races for each season, and individual race details and statistics.

## Live Demo
https://ahmedbasem20.github.io/Formula1-Explorer/

## Running The Project Locally

- Clone the repository
- On terminal, run: `npm install`
- run: `npm run dev`
- Open a web browser and hit `http://localhost:5173`


## Main Features
- **List & Card view switch**: For seasons and races
- **Pagination**: to handle long lists of seasons/races efficiently.
- **Pin Races**: Pin your favorite races to display them on top.
- **Race Details**: Race standings table and Plots for visualizing drivers performance.


## Technical Details
This project is designed to provide a modular, responsive, and efficient user experience by utilizing React's component-based architecture alongside Vite for faster development and build times. Key technical decisions include:

- **Component Structure**: The app is broken down into three main pages on `src/pages/` folder (`SeasonsPage`, `RacesPage`, `RaceDetailsPage`). Each page is served with reusable components responsible for specific parts of the UI, those components are located on `src/components/`. This approach supports a clean and maintainable codebase.
- **Routing**: The seamless navigation through seasons, races for each seasons, and individual race details is carried out by `react-router` package.
- **State Management**: To manage global state (such as pinned races across seasons), the Context API is used.

- **Data**: The data is powered by [Ergast API](http://ergast.com/mrd/), a comprehensive and free API for Formula 1 data. Services are implemented in `src/services` API management, with functions for fetching seasons, races, and race details.

- **Plots**: I used Plotly to create the relevant race performance charts.

- **UI**: Created a simple and general responsive styles to support different screen sizes.
