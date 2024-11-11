import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRaceDetails } from "../services/ergastAPI";
import DriverList from "../components/DriverList";
import { PointsChart, FastestLapComparison, RaceFinishingTimeComparison } from "../components/PerformanceChart";

export default function RaceDetailsPage() {
  const { season, round } = useParams();
  const [raceResult, setRaceResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const loadRaceResult = async (season, round) => {
    try {
      setLoading(true);
      const data = await fetchRaceDetails(season, round);
      setRaceResult(data)
      console.log(data.Results)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRaceResult(season, round)
  }, [season, round])


  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <h1>Formula 1 {raceResult.raceName} {season} - Race Result</h1>
      <DriverList driverData={raceResult.Results} />
      <h2>Performance Insights</h2>
      <PointsChart raceResults={raceResult.Results} />

      <FastestLapComparison raceResults={raceResult.Results} />

      <RaceFinishingTimeComparison raceResults={raceResult.Results} />

    </>
  )
}
