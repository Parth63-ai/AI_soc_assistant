import "../styles/Dashboard.css";

function Dashboard({ history }) {

  const totalReports = history.length;

  const highCount = history.filter(
    (item) => item.severity === "High"
  ).length;

  const mediumCount = history.filter(
    (item) => item.severity === "Medium"
  ).length;

  const lowCount = history.filter(
    (item) => item.severity === "Low"
  ).length;


  // Count attack types
  const attackCounts = {};

  history.forEach((item) => {

    if (attackCounts[item.attackType]) {
      attackCounts[item.attackType]++;
    } else {
      attackCounts[item.attackType] = 1;
    }

  });


  // Find most common attack
  let topAttack = "N/A";
  let maxCount = 0;

  for (const attack in attackCounts) {

    if (attackCounts[attack] > maxCount) {

      maxCount = attackCounts[attack];
      topAttack = attack;

    }

  }


  // Calculate average analysis time
  let avgTime = 0;

  if (totalReports > 0) {

    let totalTime = 0;

    history.forEach((item) => {
      totalTime += item.analysisTime || 0;
    });

    avgTime = (totalTime / totalReports).toFixed(2);
  }


  // Calculate average retrieved chunks
  let avgChunks = 0;

  if (totalReports > 0) {

    let totalChunks = 0;

    history.forEach((item) => {
      totalChunks += item.chunksRetrieved || 0;
    });

    avgChunks = (totalChunks / totalReports).toFixed(1);
  }


  // Find latest report
  let latestReport = "No Reports";

  if (history.length > 0) {
    latestReport = history[history.length - 1].filename;
  }


  return (

    <div className="dashboard">

      <h2>📊 SOC Dashboard</h2>

      <div className="dashboard-grid">

        <div className="card">
          <h3>📁 Total Reports</h3>
          <p>{totalReports}</p>
        </div>


        <div className="card high">
          <h3>🔴 High</h3>
          <p>{highCount}</p>
        </div>


        <div className="card medium">
          <h3>🟠 Medium</h3>
          <p>{mediumCount}</p>
        </div>


        <div className="card low">
          <h3>🟢 Low</h3>
          <p>{lowCount}</p>
        </div>


        <div className="card">
          <h3>⚔️ Top Attack</h3>
          <p>{topAttack}</p>
        </div>


        <div className="card">
          <h3>📄 Latest Report</h3>
          <p>{latestReport}</p>
        </div>


        <div className="card">
          <h3>⏱️ Avg Analysis</h3>
          <p>{avgTime}s</p>
        </div>


        <div className="card">
          <h3>🧠 Avg Chunks</h3>
          <p>{avgChunks}</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;