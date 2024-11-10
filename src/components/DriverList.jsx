export default function DriverList({ driverData }) {
    return (
        <>
            <div className="driver-table">
                <table>
                    <thead>
                        <tr>
                            <th>POS</th>
                            <th>NO</th>
                            <th>DRIVER</th>
                            <th>CAR</th>
                            <th>NATIONALITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {driverData.map((results) => (
                            <tr>
                                <td>{results.position}</td>
                                <td>{results.number}</td>
                                <td>{`${results.Driver.givenName} ${results.Driver.familyName}`}</td>
                                <td>{results.Constructor.name}</td>
                                <td>{results.Driver.nationality}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}
