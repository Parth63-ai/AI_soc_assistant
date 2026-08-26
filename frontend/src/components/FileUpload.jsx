import "../styles/FileUpload.css";

function FileUpload({
  file,
  fileInputRef,
  handleFileUpload,
  handleAnalyzeLog,
  isLoading,
}) {
  return (
    <div className="upload-card">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      <button
        className="choose-btn"
        onClick={() =>
          fileInputRef.current.click()
        }
        
      >
        📂 Choose File
      </button>

      <button
        className="analyze-btn"
        onClick={handleAnalyzeLog}
        disabled={!file || isLoading}
        
      >
        🛡 Analyze Log
      </button>

      {file && (
        <div
          className="selected-file"
        >
          <strong>Selected File:</strong>

          {file.name}
        </div>
      )}
    </div>
  );
}

export default FileUpload;