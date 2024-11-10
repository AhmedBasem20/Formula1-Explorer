import React from "react";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";

const ViewToggle = ({ viewType, setViewType }) => {
    return (
        <div className="view-toggle">
            <FaList onClick={() => setViewType("list")} className={viewType === "list" ? "toggle active" : "toggle"}>
            </FaList>
            <IoGrid onClick={() => setViewType("card")} className={viewType === "card" ? "toggle active" : "toggle"}>
            </IoGrid>
        </div>
    );
};

export default ViewToggle;
