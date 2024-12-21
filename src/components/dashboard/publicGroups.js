import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { serviceConfig } from "../../config/config";
import { Divider } from "@mui/material";

function PublicGroups({ onGroupClick }) {
  const { enqueueSnackbar } = useSnackbar();
  const [publicGroups, setPublicGroups] = useState([]);
  const [hoveredGroup, setHoveredGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicGroups = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = user ? JSON.parse(user).token : null;
        const response = await fetch(
          `${serviceConfig.CHAT_SERVER.HOST}${serviceConfig.CHAT_SERVER.ENDPOINTS.FETCH_PUBLIC_GROUPS}`,
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
          setPublicGroups(data.response);
        } else {
          enqueueSnackbar("Failed to fetch public groups!", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching public groups:", error);
        enqueueSnackbar("Something went wrong!", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchPublicGroups();
  }, [enqueueSnackbar]);

  if (loading) {
    return <p>Loading public groups...</p>;
  }

  if (publicGroups?.length === 0) {
    return <p>No public groups available.</p>;
  }

  return (
    <div>
      <h2>Public Groups</h2>

      <Divider sx={{ backgroundColor: 'white', marginBottom: '20px' }} />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {publicGroups?.map((group) => (
          <li
            key={group.groupId}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: hoveredGroup === group.groupId ? "#f0f0f0" : "transparent",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={() => {
              setHoveredGroup(group.groupId)
            }}
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

export default PublicGroups;