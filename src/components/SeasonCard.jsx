import React from "react";
import { Link } from "react-router-dom";

const SeasonCard = ({ season }) => {
    return (
        <Link to={`/seasons/${season.season}`} className="card-item">
            <h2>Season {season.season}</h2>
            <p>Explore races for this season</p>
        </Link>
    );
};

export default SeasonCard;
