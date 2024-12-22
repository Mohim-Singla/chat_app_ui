import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { serviceConfig } from "../../config/config";

function GroupMessages() {
  const { groupId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    const user = localStorage.getItem("user");
    const token = user ? JSON.parse(user).token : null;

    try {
      setLoading(true);
      const response = await fetch(
        `${serviceConfig.CHAT_SERVER.HOST}${(serviceConfig.CHAT_SERVER.ENDPOINTS.FETCH_GROUP_MESSAGES).replace(":groupId", groupId)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessages(result.response || []);
      } else {
        console.error("Failed to fetch messages:", response.status);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [groupId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <header style={{ marginBottom: "10px" }}>
        <h1 style={{ fontSize: "1.5rem", color: "#333" }}>
          Group Messages: {groupId}
        </h1>
      </header>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#e3f2fd",
                textAlign: "left",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", color: "#1976d2" }}>
                User: {message.userId}
              </p>
              <p style={{ margin: "5px 0" }}>{message.messageContent}</p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "gray",
                  textAlign: "right",
                  margin: 0,
                }}
              >
                {new Date(message.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>

      {/* Input Box */}
      <footer style={{ marginTop: "10px" }}>
        <button
          onClick={fetchMessages}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Fetch Messages
        </button>
      </footer>
    </div>
  );
}

export default GroupMessages;
