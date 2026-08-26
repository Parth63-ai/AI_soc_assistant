// Extract MITRE Technique ID (e.g., T1110)

export function extractTechniqueID(report){
    const match = report.match(/\bT\d{4}(?:\.\d{3})?\b/i);
    return match ? match[0] : "Not Found";
}

 // Extract Technique Name

export function extractTechniqueName(report){
    const match = report.match(/(?:T\d{4}(?:\.\d{3})?)\s*-\s*([A-Za-z\s]+)/i);
    return match ? match[1] : "Not Found";
}

