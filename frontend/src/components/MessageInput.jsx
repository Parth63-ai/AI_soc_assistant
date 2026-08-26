import "../styles/MessageInput.css";

function MessageInput({
  message,
  setMessage,
  handleSend,
  handleKeyDown,
  isLoading,
}) {
  return (
    <div className="message-input-container">
      <input
        type="text"
        placeholder="Ask anything..."
        value={message}
        disabled={isLoading}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className="message-input"
      />

      <button
        onClick={handleSend}
        disabled={isLoading}
        className="send-btn"
      >
        {isLoading ? "Thinking..." : "🚀 Send"}
      </button>
    </div>
  );
}

export default MessageInput;