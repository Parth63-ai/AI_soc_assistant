import "../styles/HistoryPanel.css";

const getSeverityColor = (severity) => {

  switch(severity){

    case "High":
      return "#dc2626";

    case "Medium":
      return "#f59e0b";

    case "Low":
      return "#16a34a";

    default:
      return "#64748b";

  }

};

function HistoryPanel({
  history,
  searchTerm,
  setSearchTerm,

}){

  return (

    <div className="history-panel">

      <h2>📂 Analysis History</h2>

      <input
        type="text"
        placeholder="🔍 Search by filename, severity or attack..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="history-search"
      />

      {history.length === 0 ? (

        <p className="no-history">
          No matching reports found.
         </p>

      ) : (

        history.map((item) => (

          <div
            key={item.id}
            className="history-card"
          >

            <h4>{item.filename}</h4>

            <p>

              <strong>🚨 Severity:</strong>

              <span
                style={{
                  color: getSeverityColor(item.severity),
                  fontWeight: "bold",
                }}
              >
                {" "}
                {item.severity}
              </span>

            </p>
           <p>

              <strong>⚔️ Attack:</strong>
               {item.attackType} 
               </p>
               
               <p>⏱ {item.analysisTime}s</p>

               <p>🧠 {item.chunksRetrieved} Chunks</p>

               <p>
              <strong>📅 Time:</strong>
               {item.timestamp}
           </p>

          </div>

        ))
       )}

    </div>
 );
}
export default HistoryPanel;
