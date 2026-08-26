// Extract IPv4 addresses
export function extractIPs(text) {

    const matches = text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g);

    return matches ? [...new Set(matches)] : [];

}

// Extract domains
export function extractDomains(text) {

    const matches = text.match(/\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b/g);

    return matches ? [...new Set(matches)] : [];

}

// Extract suspicious file names
export function extractFiles(text) {

    const matches = text.match(/\b[\w-]+\.(exe|dll|bat|ps1|sh|js|zip|rar|txt)\b/gi);

    return matches ? [...new Set(matches)] : [];

}

// Extract usernames after "User:"
export function extractUsers(text) {

    const matches = text.match(/User\s*:\s*(\w+)/gi);

    if (!matches) return [];

    return matches.map(item =>
        item.split(":")[1].trim()
    );

}