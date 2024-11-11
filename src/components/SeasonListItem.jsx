import React from "react";
import { Link } from "react-router-dom";

const SeasonListItem = ({ season }) => {
    return (
        <Link to={`/Formula1-Explorer/seasons/${season.season}`} className="list-item">
            <span>Season {season.season}</span>
        </Link>
    );
};

export default SeasonListItem;
