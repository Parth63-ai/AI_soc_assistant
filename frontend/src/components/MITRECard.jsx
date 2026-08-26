import "../styles/MITRECard.css";

import {extractTechniqueName,extractTechniqueID} from "../utils/mitreUtils";

function MITRECards({ report }){
    const techniqueID = extractTechniqueID(report);
    const techniqueName = extractTechniqueName(report);

    if(techniqueID === "Not Found" && techniqueName === "Not Found"){
        return null;
    }
    return(
        <div className="mitre-container">
            <h2>MITRE ATT&CK</h2>
            <div className="mitre-card">
                <strong>Technique ID</strong>
                <p>{techniqueID}</p>
            </div>
            <div className="mitre-card">
                <strong>Technique Name</strong>
                <p>{techniqueName}</p>
            </div>
        </div>
            
    );
}

export default MITRECards;