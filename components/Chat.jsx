import { useEffect, useState } from "react";
import "../src/App.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("https://localhost:7026/api/Chat/Messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");

  const sendMessage = async () => {
    try {
      if (!newMessage.trim()) return;
      if (!username.trim()) return;
      await fetch("https://localhost:7026/api/Chat/Message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, messages: newMessage }),
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header"><h1>Live Chat</h1></div>
      <div className="chat-messages">
        <h2>Chat</h2>
        {messages.map((msg) => (
          <p key={msg.id}>{msg.username}: {msg.messages}</p>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chat-input-message" placeholder="Type a message..." />
        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className="chat-input-name" placeholder="Type your name..." />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;