import React from "react";
import { Link } from "react-router-dom";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";

const RaceListItem = ({ race, isPinned, togglePin }) => {
    return (
        <div className="list-item">
            <Link to={`/seasons/${race.season}/races/${race.round}`}>
                <span>Race: {race.raceName}</span>
            </Link>
            {/* <h5>Circuet: {race.Circuit.circuitName}</h5>
            <span>November 24, 2024</span> */}
            <button onClick={() => togglePin()} className="pin-button">
                {isPinned ? <TbPinnedFilled size={20} /> : <TbPinned size={20} />}

            </button>
        </div>
    );
};

export default RaceListItem;
