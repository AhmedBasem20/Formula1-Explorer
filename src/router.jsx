// src/router.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeasonsPage from "./pages/SeasonsPage";
import RacesPage from "./pages/RacesPage";
import RaceDetailsPage from "./pages/RaceDetailsPage";

const AppRouter = () => (
    <Router>
        <Routes>
            {/* Route for the Seasons listing page */}
            <Route path="/Formula1-Explorer/" element={<SeasonsPage />} />

            {/* Route for Races of a selected season */}
            <Route path="/Formula1-Explorer/seasons/:season" element={<RacesPage />} />

            {/* Route for Race Details of a specific race in a season */}
            <Route path="/Formula1-Explorer/seasons/:season/races/:round" element={<RaceDetailsPage />} />

        </Routes>
    </Router>
);

export default AppRouter;
