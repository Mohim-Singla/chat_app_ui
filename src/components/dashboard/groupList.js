import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { serviceConfig } from "../../config/config";
import { Divider } from "@mui/material";

function GroupList({ groupType, onGroupClick }) {
  const { enqueueSnackbar } = useSnackbar();
  const [groups, setGroups] = useState([]);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = user ? JSON.parse(user).token : null;

        let endpoint;
        switch (groupType) {
          case "public":
            endpoint = serviceConfig.CHAT_SERVER.ENDPOINTS.FETCH_PUBLIC_GROUPS;
            break;
          case "private":
            endpoint = serviceConfig.CHAT_SERVER.ENDPOINTS.FETCH_PRIVATE_GROUPS;
            break;
          default:
            throw new Error("Invalid group type!");
        }
        
        const response = await fetch(
          `${serviceConfig.CHAT_SERVER.HOST}${endpoint}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGroups(data.response);
        } else {
          enqueueSnackbar(`Failed to fetch ${groupType} groups!`, {
            variant: "error",
          });
        }
      } catch (error) {
        console.error(`Error fetching ${groupType} groups:`, error);
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [groupType, enqueueSnackbar]);

  if (loading) {
    return <p>Loading {groupType} groups...</p>;
  }

  if (groups?.length === 0) {
    return <p>No {groupType} groups available.</p>;
  }

  return (
    <div>
      <h2>{groupType === "public" ? "Public Groups" : "Private Groups"}</h2>

      <Divider sx={{ backgroundColor: "white", marginBottom: "20px" }} />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {groups.map((group) => (
          <li
            key={group.groupId}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor:
                hoveredGroup === group.groupId ? "#f0f0f0" : "transparent",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={() => setHoveredGroup(group.groupId)}
            onMouseLeave={() => setHoveredGroup(null)}
            onClick={() => onGroupClick(group.groupId)}
          >
            {group.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupList;
