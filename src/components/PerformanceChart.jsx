import React from 'react';
import Plot from 'react-plotly.js';

export const PointsChart = ({ raceResults }) => {
    // Prepare data for the chart
    const driverNames = raceResults.map(result => result.Driver.familyName);
    const points = raceResults.map(result => parseInt(result.points));

    const data = [
        {
            x: driverNames,
            y: points,
            type: 'bar',
            marker: { color: 'rgb(99, 110, 250)' },
            text: raceResults.map((result) => `${result.Driver.familyName} - Points: ${result.points}`),
            hoverinfo: 'text',
        },
    ];

    const layout = {
        title: 'Driver Points for the Race',
        xaxis: { title: 'Driver' },
        yaxis: { title: 'Points' },
        margin: { t: 50, l: 50, r: 50, b: 50 },
        responsive: true,
    };

    return (
        <Plot
            id='total-points'
            data={data}
            layout={layout}
            config={{ responsive: true }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export const FastestLapComparison = ({ raceResults }) => {
    const driverNames = raceResults.map(result => result.Driver.familyName);

    const lapNumbers = raceResults.map(result => parseInt(result.FastestLap?.lap));
    const fastestLapTimes = raceResults.map(result => {
        const timeString = result.FastestLap?.Time?.time;
        if (timeString) {
            const [minutes, seconds] = timeString.split(':');
            return parseFloat(minutes) * 60 + parseFloat(seconds);
        } else {
            return null;
        }
    }).filter(time => time !== null);

    const averageSpeeds = raceResults.map(result => parseFloat(result.FastestLap?.AverageSpeed.speed));

    const data = [
        {
            x: lapNumbers,
            y: fastestLapTimes,
            text: driverNames.map((name, index) => `${name}: ${fastestLapTimes[index]}s`),
            mode: 'markers',
            marker: {
                size: averageSpeeds,
                sizemode: 'area',
                sizeref: 2 * Math.max(...averageSpeeds) / 100,
                color: lapNumbers,
                colorscale: 'Viridis',
                showscale: true,
                colorbar: {
                    title: 'Lap Number',
                },
            },
            hoverinfo: 'text+name',
        },
    ];

    const layout = {
        title: 'Fastest Lap Comparison',
        xaxis: { title: 'Lap Number' },
        yaxis: { title: 'Fastest Lap Time (seconds)' },
        margin: { t: 50, l: 50, r: 50, b: 50 },
        responsive: true,
    };

    return (
        <Plot
            id='fastest-lap'
            data={data}
            layout={layout}
            config={{ responsive: true }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};


export const RaceFinishingTimeComparison = ({ raceResults }) => {
    // Prepare data for the chart
    const driverNames = raceResults.map(result => result.Driver.familyName);
    const finishingTimes = raceResults.map(result => {
        return result.Time ? parseFloat(result.Time.millis) / 1000 : null;
    });

    // Sort drivers and times by finishing time in ascending order
    const sortedData = driverNames
        .map((name, index) => ({ name, time: finishingTimes[index] }))
        .filter(data => data.time !== null) // Remove entries with missing times
        .sort((a, b) => a.time - b.time);

    const sortedDriverNames = sortedData.map(data => data.name);
    const sortedFinishingTimes = sortedData.map(data => data.time / 1000);

    return (
        <Plot
            id='finishing-time'
            data={[
                {
                    x: sortedFinishingTimes,
                    y: sortedDriverNames,
                    type: 'bar',
                    orientation: 'h', // Horizontal bars
                    marker: {
                        color: 'rgba(255, 99, 71, 0.6)',
                        line: { color: 'rgba(255, 99, 71, 1)', width: 1 }
                    }
                }
            ]}
            layout={{
                title: 'Race Finishing Time Comparison',
                xaxis: {
                    title: 'Finishing Time (seconds)',
                },
                yaxis: {
                    title: 'Driver',
                    autorange: 'reversed' // Shortest time at the top
                },
                margin: {
                    l: 100,
                    r: 50,
                    t: 50,
                    b: 50
                }
            }}
        />
    );
};

  //fix pinned races state >> Done
  //sort by pinned races >> Done
  //format race date >> Done
  //css naming >> Done
  //fix charts overlapping
  //3 unit tests
  //push, deploy, and send
  //move view toggle to context state
