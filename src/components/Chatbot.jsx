import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Chatbot.css"; 

const API_KEY = "AIzaSyDaR2VbhtIGfY8r_kpv9PsoNaG5k23JagI";

const Chatbot = React.memo(() => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentinelData, setSentinelData] = useState(null);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(() => sessionStorage.getItem("chatbotOpen") === "true");
  useEffect(() => sessionStorage.setItem("chatbotOpen", isOpen), [isOpen]);

  if (location.pathname === "/") return null; 

  // Load sentinelData.json from public folder
  useEffect(() => {
    const fetchSentinelData = async () => {
      try {
        const res = await fetch("/sentinelData.json");
        setSentinelData(await res.json());
      } catch (error) {
        console.error("Error loading Sentinel data:", error);
      }
    };
    fetchSentinelData();
  }, []);

  // Search function to check for answers in sentinelData.json
  const searchJSONData = (query) => {
    if (!sentinelData) return null;
    const lowerQuery = query.toLowerCase();
    const sections = [
      sentinelData.generalQuestions,
      sentinelData.understandingOutputs,
      sentinelData.dataVisualization,
      sentinelData.advancedQueries,
    ];

    for (const section of sections) {
      for (const [key, value] of Object.entries(section || {})) {
        if (key.toLowerCase().includes(lowerQuery)) return value;
      }
    }
    return null;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Check if answer exists in sentinelData.json
    const jsonResponse = searchJSONData(input);
    if (jsonResponse) {
      setResponse(jsonResponse);
      setLoading(false);
      return;
    }

    // Ask Gemini if no predefined response exists
    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are an AI assistant for Project Sentinel, an advanced AI-powered dashboard. Answer based on Sentinel's features, ensuring responses align with its futuristic theme. User: ${input}\nAI:`,
                },
              ],
            },
          ],
        }
      );
      setResponse(res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.");
    } catch (error) {
      setResponse("Error: Could not get a response from the AI.");
    }

    setLoading(false);
  };

  return (
    <>
      {!isOpen && <button className="chat-toggle-button" onClick={() => setIsOpen(true)}>💬</button>}
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <span>Sentinel Chatbot 🤖</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-box">
            {response && (
              <div className="chat-message bot">
                <strong>AI:</strong> {response.split("\n").map((line, index) => <p key={index}>{line}</p>)}
              </div>
            )}
          </div>
          <div className="chat-input">
            <Form.Control
              type="text"
              placeholder="Ask Sentinel a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleSendMessage} disabled={loading}>
              {loading ? "Loading..." : "Send"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
});

export default Chatbot;












