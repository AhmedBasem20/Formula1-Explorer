import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const PinnedRacesContext = createContext();

export const PinnedRacesProvider = ({ children }) => {
    const [pinnedRaces, setPinnedRaces] = useLocalStorage("pinnedRaces", {});

    const togglePinRace = (season, raceId) => {
        
        setPinnedRaces((prev) => {
            const updated = { ...prev };
            debugger
            if (!updated[season]) updated[season] = [];
            if (updated[season].includes(raceId)) {
                updated[season] = updated[season].filter((id) => id !== raceId);
            } else {
                updated[season].push(raceId);
            }
            return updated;
        });
    };

    const isRacePinned = (season, raceId) => {
        return pinnedRaces[season]?.includes(raceId) || false;
    };

    return (
        <PinnedRacesContext.Provider value={{ pinnedRaces, togglePinRace, isRacePinned }}>
            {children}
        </PinnedRacesContext.Provider>
    );
};

export const usePinnedRaces = () => useContext(PinnedRacesContext);
