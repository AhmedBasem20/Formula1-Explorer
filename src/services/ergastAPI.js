// src/services/ergastAPI.js

const BASE_URL = "https://ergast.com/api/f1";

/**
 * Fetches all available seasons.
 * @returns {Promise<Object>} A promise that resolves to the seasons data.
 */
export const fetchSeasons = async (offset = 0, limit = 30) => {
    try {
        const response = await fetch(`${BASE_URL}/seasons.json?offset=${offset}&limit=${limit}`);
        if (!response.ok) {
            throw new Error("Failed to fetch seasons");
        }
        const data = await response.json();
        return {
            'seasons': data.MRData.SeasonTable.Seasons,
            'count': data.MRData.total
        }
    } catch (error) {
        console.error("Error fetching seasons:", error);
        throw error;
    }
};

/**
 * Fetches races for a specific season.
 * @param {string} season - The season year (e.g., "2024").
 * @returns {Promise<Object>} A promise that resolves to the races data for the season.
 */
export const fetchRaces = async (season, offset = 0, limit = 30) => {
    try {
        const response = await fetch(`${BASE_URL}/${season}/races.json?offset=${offset}&limit=${limit}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch races for season ${season}`);
        }
        const data = await response.json();
        return {
            'races': data.MRData.RaceTable.Races,
            'count': data.MRData.total
        }
    } catch (error) {
        console.error(`Error fetching races for season ${season}:`, error);
        throw error;
    }
};

/**
 * Fetches details for a specific race within a season.
 * @param {string} season - The season year (e.g., "2024").
 * @param {string} round - The round number of the race (e.g., "1" for the first race).
 * @returns {Promise<Object>} A promise that resolves to the race details.
 */
export const fetchRaceDetails = async (season, round) => {
    try {
        const response = await fetch(`${BASE_URL}/${season}/${round}/results.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch race details for season ${season}, round ${round}`);
        }
        const data = await response.json();
        return data.MRData.RaceTable.Races[0];
    } catch (error) {
        console.error(`Error fetching race details for season ${season}, round ${round}:`, error);
        throw error;
    }
};
