import { useState, useEffect, useRef } from "react";
import { sendMessage, uploadLog } from "./api/api";

import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import FileUpload from "./components/FileUpload";
import HistoryPanel from "./components/HistoryPanel";
import { extractSeverity,extractAttackType } from "./utils/reportUtils";
import Dashboard from "./components/Dashboard";

const defaultMessage = [
  {
    sender: "AI",
    text: "Hello! 👋 I am your AI SOC Assistant. How can I help you today?",
  }
];

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatHistory");

    return savedMessages
      ? JSON.parse(savedMessages)
      : defaultMessage;
  });

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("analyzeHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("analyzeHistory", JSON.stringify(history));
  }, [history]);

  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Select File
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected:", selectedFile.name);
    }
  };

  // Send Chat Message
  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: currentMessage,
      },
    ]);

    setMessage("");

    try {
      const aiReply = await sendMessage(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: aiReply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: "❌ Error while contacting backend.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze Uploaded Log
  const handleAnalyzeLog = async () => {

  if (!file) {
    alert("Please choose a log file first.");
    return;
  }

  setIsLoading(true);

  try {

    const result = await uploadLog(file);

    const historyItem = {
      id: Date.now(),
      filename: file.name,
      timestamp: new Date().toLocaleString(),
      type: "Log Analysis",

      report: result.analysis,

      severity: extractSeverity(result.analysis),
      attackType: extractAttackType(result.analysis),

      analysisTime: result.analysis_time,
      chunksRetrieved: result.chunks_retrieved,
    };

    setHistory((prev) => [...prev, historyItem]);

    setMessages((prev) => [
      ...prev,
      {
        sender: "AI",
        text: result.analysis,
      },
    ]);

  } catch (error) {

    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        sender: "AI",
        text: "❌ Failed to analyze uploaded log.",
      },
    ]);

  } finally {

    setIsLoading(false);

  }
};
  
  const openHistory = (report) => {
    setMessages([
      {
        sender: "AI",
        text: report,
      },
    ]);
  };

  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages(defaultMessage);
  };

  const filteredHistory = history.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.filename.toLowerCase().includes(search) ||
      item.report.toLowerCase().includes(search) ||
      item.severity.toLowerCase().includes(search) ||
      item.attackType.toLowerCase().includes(search)
    );
  });

  return (
    <div
    style={{
    padding: "30px",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Segoe UI",
    backgroundColor: "#eef2f7",
    minHeight: "100vh",
  }}
    >
      <Header />

      <button
      onClick={clearChat}
       style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        🗑 Clear Chat
      </button>

      <Dashboard history={history} />

      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      <MessageInput
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
      />

      <hr style={{ margin: "30px 0" }} />

      <FileUpload
        file={file}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        handleAnalyzeLog={handleAnalyzeLog}
        isLoading={isLoading}
      />

      <HistoryPanel 
        history={filteredHistory}
        openHistory={openHistory} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
       />
    </div>
  );
}

export default App;