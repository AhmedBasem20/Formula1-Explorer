import { useEffect, useState } from "react"
import { fetchSeasons } from "../services/ergastAPI";
import Pagination from "../components/Pagination";
import SeasonCard from "../components/SeasonCard";
import ViewToggle from "../components/ViewToggle";
import SeasonListItem from "../components/SeasonListItem";

export default function SeasonsPage() {
    const [seasons, setSeasons] = useState([]);
    const [totalSeasons, setTotalSeasons] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewType, setViewType] = useState("list");
    const [error, setError] = useState(null);
    const limit = 30;
    const [loading, setLoading] = useState(true)

    const loadSeasons = async (page) => {
        const offset = (page - 1) * limit;

        try {
            setLoading(true);
            const data = await fetchSeasons(offset, limit);
            setSeasons(data.seasons);
            setTotalSeasons(data.count);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSeasons(currentPage)
    }, [currentPage])

    const handlePageChange = (page) => setCurrentPage(page);

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="seasons-page">
            <h1>Formula One Seasons</h1>
            <ViewToggle viewType={viewType} setViewType={setViewType} />
            <div className={viewType === "card" ? "card-view" : "season-view"}>
                {seasons.map((season) =>
                    viewType === "card" ? (
                        <SeasonCard key={season.season} season={season} />
                    ) : (
                        <SeasonListItem key={season.season} season={season} />
                    )
                )}
            </div>
            <Pagination
                totalItems={totalSeasons}
                itemsPerPage={limit}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

        </div>
    )
}
