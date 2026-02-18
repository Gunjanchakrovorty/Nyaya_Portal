import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 I am Nyaya AI. Describe your legal issue for assessment.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const res = await fetch("http://localhost:5000/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    const aiReply = {
      sender: "ai",
      text: data.reply,
    };

    setMessages((prev) => [...prev, aiReply]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: "AI server error. Try again." },
    ]);
  }
};


  const generateAIResponse = (query: string) => {
    if (query.toLowerCase().includes("delay"))
      return "This may involve procedural delays. Consider filing for expedited hearing.";
    if (query.toLowerCase().includes("fraud"))
      return "This appears to be a criminal fraud matter. Consult a criminal lawyer immediately.";
    return "Based on your input, this may fall under civil jurisdiction. Please provide more details.";
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-br from-primary to-yellow-600 text-white p-4 rounded-full shadow-xl hover:scale-105 transition"
        >
          {open ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-6 w-80 bg-[#0b1c2d] border border-primary/30 rounded-xl shadow-2xl p-4 z-50"
          >
            <h3 className="text-primary font-semibold mb-3">
              Nyaya AI Assessment
            </h3>

            <div className="h-60 overflow-y-auto space-y-2 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg ${
                    msg.sender === "ai"
                      ? "bg-primary/20 text-white"
                      : "bg-yellow-600 text-black text-right"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex mt-3 gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your issue..."
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white px-3 rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
