import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchRaces } from "../services/ergastAPI";
import Pagination from "../components/Pagination";
import RaceCard from "../components/RaceCard";
import RaceListItem from "../components/RaceListItem";
import ViewToggle from "../components/ViewToggle";
import { usePinnedRaces } from "../contexts/PinnedRacesContext";

export default function RacesPage() {
    const { season } = useParams()
    const [races, setRaces] = useState([]);
    const [totalRaces, setTotalRaces] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewType, setViewType] = useState("list");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    //const [pinnedRaces, setPinnedRaces] = useState(new Set());
    const { togglePinRace, isRacePinned } = usePinnedRaces();
    const limit = 30;


    const loadRaces = async (page) => {
        const offset = (page - 1) * limit;

        try {
            setLoading(true);
            const data = await fetchRaces(season, offset, limit);
            setRaces(data.races);
            setTotalRaces(data.count);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRaces(currentPage)
    }, [currentPage])

    const handlePageChange = (page) => setCurrentPage(page);
    const pinnedRaces = races.filter((race) => isRacePinned(season, race.round));
    const unpinnedRaces = races.filter((race) => !isRacePinned(season, race.round));


    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="races-page">
            <h1>Formula One Races</h1>
            <ViewToggle viewType={viewType} setViewType={setViewType} />
            <div className={viewType === "card" ? "card-view" : "list-view"}>
                {[...pinnedRaces, ...unpinnedRaces].map((race) =>
                    viewType === "card" ? (
                        <RaceCard
                            key={race.round}
                            race={race}
                            isPinned={isRacePinned(season, race.round)}
                            togglePin={() => togglePinRace(season, race.round)}
                        />
                    ) : (
                        <RaceListItem
                            key={race.round}
                            race={race}
                            isPinned={isRacePinned(season, race.round)}
                            togglePin={() => togglePinRace(season, race.round)}
                        />
                    )
                )}
            </div>
            <Pagination
                totalItems={totalRaces}
                itemsPerPage={limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

        </div>
    )
}
