import { useState } from "react";
import ReactMarkdown from "react-markdown";
import IOCCards from "./IOCcard";
import MITRECard from "./MITRECard";
import "../styles/ChatWindow.css";

function ChatWindow({
  messages,
  isLoading,
  messagesEndRef,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const downloadReport = (text) => {

  const blob = new Blob([text], {
    type: "text/markdown",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  const date = new Date();

  const filename = `SOC_Report_${date
    .toISOString()
    .replace(/[:.]/g, "-")}.md`;

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={
            msg.sender === "You"
              ? "message user"
              : "message ai"
          }
        >
          <div className="sender">
            {msg.sender}
          </div>

          <div className="bubble">
            <ReactMarkdown>
              {msg.text}
            </ReactMarkdown>
          </div>

          {msg.sender === "AI" && (
            <>
              <IOCCards report={msg.text} />
              <MITRECard report={msg.text} />
            </>
          )}

          {/* Copy button only for AI messages */}
          {msg.sender === "AI" && (
            <div className="action-buttons">
              <button
                className="copy-btn"
                onClick={() =>
                  copyToClipboard(msg.text, index)
                }
              >
                {copiedIndex === index
                  ? "✔ Copied!"
                  : "📋 Copy Report"}
              </button>

              <button
                className="download-btn"
                onClick={() => downloadReport(msg.text)}
              >
                ⬇ Download Report
              </button>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="message ai">
          <div className="sender">
            AI
          </div>

          <div className="bubble">
            🤖 AI is analyzing your request...
          </div>
        </div>
      )}

      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default ChatWindow;