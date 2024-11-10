import React from "react";
import { Link } from "react-router-dom";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { formatDate } from "../utils/dateFormatter";

const RaceCard = ({ race, isPinned, togglePin }) => {
    return (
        <div className="card-item">
            <button onClick={() => togglePin(race.round)} className="pin-button">
                {isPinned ? <TbPinnedFilled size={20} /> : <TbPinned size={20} />}

            </button>
            <Link to={`/seasons/${race.season}/races/${race.round}`}>
                <h2>Race: {race.raceName}</h2>
            </Link>
            <h3>Circuet: {race.Circuit.circuitName}</h3>
            <p>{formatDate(race.date)}</p>
        </div>
    );
};

export default RaceCard;
