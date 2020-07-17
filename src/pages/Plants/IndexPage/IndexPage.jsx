import React from 'react';

function IndexPage(props) {

    const style = {
        marginTop: '5vh',
    };

    return (
        <>
            <div className="row row-center-card" style={style}>
                <div className="col s12 m10">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-title">
                                <h5>Registered plants:</h5>
                            </div>
                            <div>
                                <table className="centered">
                                    <thead>
                                        <tr>
                                            <th>Common Name</th>
                                            <th>Scientific Name</th>
                                            <th>NatureServe Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.plants.map((plant) =>
                                            <tr key={plant._id}>
                                                <td>{plant.commonName}</td>
                                                <td>{plant.scientificName}</td>
                                                <td><a href={plant.nsxUrl} target="_blank" rel="noopener noreferrer">LINK</a></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndexPage;