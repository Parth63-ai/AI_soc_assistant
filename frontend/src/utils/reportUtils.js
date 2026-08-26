export function extractSeverity(report) {
  const reportLower = report.toLowerCase();

  if (reportLower.includes("high")) {
    return "High";
  }

  if (reportLower.includes("medium")) {
    return "Medium";
  }

  if (reportLower.includes("low")) {
    return "Low";
  }

  return "Unknown";
}

export function extractAttackType(report) {
  const reportLower = report.toLowerCase();

  if (reportLower.includes("brute force")) {
    return "Brute Force";
  }

  if (reportLower.includes("sql injection")) {
    return "SQL Injection";
  }

  if (reportLower.includes("ransomware")) {
    return "Ransomware";
  }

  if (reportLower.includes("malware")) {
    return "Malware";
  }

  if (reportLower.includes("phishing")) {
    return "Phishing";
  }

  if (reportLower.includes("command and scripting")) {
    return "Command Execution";
  }

  return "Unknown";
}