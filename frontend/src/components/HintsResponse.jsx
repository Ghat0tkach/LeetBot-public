import React, { useEffect, useRef, useState } from "react";
import Loader from "./../components/ui/Loader";
import { handleAnswerResponse, handleHintsResponse } from "../api/googleGemini";
import TextGenerateEffectDemo from "./ui/AnimatedText";
import { HoverBorderGradient } from "./ui/hoverButton";
import ReactMarkdown from "react-markdown";

function HintsResponse({ response, hints, setHints }) {
  const { description } = response;
  const [messages, setMessages] = useState([]);
  const [currentHint, setCurrentHint] = useState("hint1");
  const [hintsJson, setHintsJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const [button2, setButton] = useState(false);

  const handleAnswer = async () => {
    setButton(true);
    const answer = await handleAnswerResponse(description);
    setAnswer(answer);
    setAnswerLoading(false);
  };
  const renderers = {
    TextGenerateEffectDemo: ({ node }) => (
      <TextGenerateEffectDemo classname="text-[1px]" words={node.props.words} />
    ),
  };
  const AnswerDiv = ({ answer }) => {
    return (
      <div className={`flex items-start mb-2 text-slate-400 `}>
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
          <img
            src="https://via.placeholder.com/50"
            alt="Bot Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-md text-wrap px-2 py-1 text-xs max-w-[80%] overflow-x-hidden">
          {answerLoading ? (
            <Loader />
          ) : (
            <>
              <ReactMarkdown
                components={renderers}
              >{`${answer}`}</ReactMarkdown>
            </>
          )}
        </div>
      </div>
    );
  };
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!isFirstRun.current && hints === 2) {
      getMessage();
    } else {
      isFirstRun.current = false;
    }
  }, [hints]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getMessage = async () => {
    setLoading(true);
    const botMessage = {
      id: messages.length + 2,
      text: <Loader />,
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    const result = await handleHintsResponse(description);
    setHintsJson(result);
    const updatedBotMessage = { ...botMessage, text: result.hint1 };
    setMessages((prevMessages) => [
      ...prevMessages.filter((msg) => msg.id !== botMessage.id),
      updatedBotMessage,
    ]);
    setLoading(false);
    return;
  };

  const showNextHint = () => {
    if (currentHint === "hint1") {
      setHints(hints - 1);
      setLoading(true);
      setCurrentHint("hint2");
      const updatedBotMessage = {
        id: messages.length + 2,
        text: hintsJson.hint2,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, updatedBotMessage]);
      setLoading(false);
    } else if (currentHint === "hint2") {
      setHints(hints - 1);
      setLoading(true);
      setCurrentHint("hint3");
      const updatedBotMessage = {
        id: messages.length + 2,
        text: hintsJson.hint3,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, updatedBotMessage]);
      setLoading(false);
    }
  };

  const messagesEndRef = useRef(null);

  return (
    <div className="2xl ml-2 mt-2 flex flex-col justify-between rounded-md w-[95%] h-[80vh] p-4 bg-slate-600 bg-opacity-20 backdrop-filter backdrop-blur-lg">
      <div className="overflow-y-scroll scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-slate-600 scrollbar-track-transparent rounded-md">
        {hints === 3 && (
          <p className="text-center text-1xl text-white">
            Click on the hints to get started
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start mb-2 ${
              message.sender === "user" ? "text-slate-800" : "text-slate-400"
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
            <div className="rounded-md text-wrap px-2 py-1 text-xs max-w-[80%] overflow-x-hidden">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <TextGenerateEffectDemo
                    classname="text-[1px]"
                    words={`${message.text}`}
                  />
                </>
              )}
            </div>
          </div>
        ))}
        {button2 &&
          (answerLoading ? <Loader /> : <AnswerDiv answer={answer} />)}
        <div ref={messagesEndRef} />

        {currentHint === "hint1" && hints == 2 && (
          <HoverBorderGradient className="bg-red text-xs">
            <button onClick={showNextHint}>💡💡</button>
          </HoverBorderGradient>
        )}
        {currentHint === "hint2" && (
          <HoverBorderGradient className="bg-red text-xs">
            <button onClick={showNextHint}>💡💡💡</button>
          </HoverBorderGradient>
        )}
        {currentHint === "hint3" && !button2 && (
          <HoverBorderGradient className="bg-red text-xs">
            <button onClick={handleAnswer}>Answer?</button>
          </HoverBorderGradient>
        )}
      </div>

      {/* <ActionButton /> */}
    </div>
  );
}

export default HintsResponse;
