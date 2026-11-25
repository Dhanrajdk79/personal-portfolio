
import { useEffect, useRef, useState } from "react";
import { sendAIMessage } from "../services/api";
import "../styles/AIAssistant.css";

const QUICK_PROMPTS = [
  "Tell me about his AWS projects",
  "What are his technical skills?",
  "Tell me about the CPMS project",
];

function FormattedMessage({ text }) {
  const lines = text.split("\n");

  function renderFormattedLine(line, index) {
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <div key={index} className="ai-text-line">
        {parts.map((part, partIndex) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={partIndex}>
                {part.slice(2, -2)}
              </strong>
            );
          }

          return part;
        })}
      </div>
    );
  }

  return (
    <div className="ai-formatted-text">
      {lines.map((line, index) => {
        if (line.trim().startsWith("- ")) {
          return (
            <div key={index} className="ai-list-item">
              <span>•</span>
              <span>
                {renderFormattedLine(line.trim().slice(2), index)}
              </span>
            </div>
          );
        }

        if (!line.trim()) {
          return <div key={index} className="ai-message-spacing" />;
        }

        return renderFormattedLine(line, index);
      })}
    </div>
  );
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! 👋 I'm DK's AI assistant. Ask me about his skills, projects, experience, or career.",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendMessage(message) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: trimmedMessage,
      },
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const reply = await sendAIMessage(trimmedMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry! I'm having trouble connecting right now. Please try again in a moment. 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
<div className={`ai-assistant ${isOpen ? "is-open" : "is-closed"}`}>
          {!isOpen && (
        <button
          className="ai-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI assistant"
        >
          <span className="ai-button-icon">🤖</span>
          <span className="ai-button-pulse"></span>
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-avatar">🤖</div>

            <div className="ai-header-info">
              <h3>DK AI Assistant</h3>
              <span>
                <span className="ai-online-dot"></span>
                Online
              </span>
            </div>

            <button
              className="ai-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.role === "user"
                    ? "ai-user-message"
                    : "ai-assistant-message"
                }`}
              >
                <div className="ai-message-bubble">
                  {message.role === "assistant" ? (
                    <FormattedMessage text={message.text} />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="ai-quick-prompts">
                <p>Quick questions</p>

                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    disabled={isLoading}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="ai-message ai-assistant-message">
                <div className="ai-message-bubble ai-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <form className="ai-chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
