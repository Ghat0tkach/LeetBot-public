import React, { useEffect, useRef, useState } from "react";
import { GetAnswers } from "../../api/googleGemini";
import Loader from "./Loader";

function ChatLayout() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botMessage = {
      id: messages.length + 2,
      text: <Loader />,
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    const reply = await handleResponse(newMessage);
    setNewMessage("");

    const updatedBotMessage = { ...botMessage, text: reply.content };
    setMessages((prevMessages) => [
      ...prevMessages.slice(0, -1),
      updatedBotMessage,
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleResponse = async (text) => {
    return await GetAnswers(text);
  };

  return (
    <div className="2xl ml-2 mt-2 flex flex-col justify-between rounded-md w-[95%] h-[80vh] p-4 bg-slate-600 bg-opacity-20 backdrop-filter backdrop-blur-lg">
      <div className="overflow-y-auto rounded-md overflow-x-hidden">
        <p className="text-center text-1xl text-white">
          Click on the hints to get started
        </p>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-2 ${
              message.sender === "user" ? "text-white" : "text-slate-400"
            }`}
          >
            {message.sender === "bot" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Bot Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {message.sender === "user" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mb-2">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="rounded-md text-wrap px-2 py-1 max-w-[80%]">
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-md bg-transparent border border-white text-white focus:outline-none"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={sendMessage}
        >
          Send
        </button>
      </div> */}
    </div>
  );
}

export default ChatLayout;
