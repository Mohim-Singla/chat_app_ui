import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidePanel from "./sidePanel/sidePanel";
import { serviceConfig } from "../../config/config";
import { useSnackbar } from "notistack";
import GroupList from "./groupList"; // Importing the reusable GroupList component

function Home() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedItem, setSelectedItem] = useState("welcome");

  const onGroupClick = (groupId) => {
    console.log("Group clicked:", groupId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;

      try {
        const response = await fetch(
          `${serviceConfig.AUTH_SERVER.HOST}${serviceConfig.AUTH_SERVER.ENDPOINTS.VALIDATE_TOKEN}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          enqueueSnackbar("Session expired!", { variant: "warning" });
          localStorage.clear();
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Something went wrong!", { variant: "error" });
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate, enqueueSnackbar]);

  // Mapping of components to `selectedItem`
  const componentsMap = {
    welcome: <h1>Welcome, User!</h1>,
    public_groups: <GroupList groupType="public" onGroupClick={onGroupClick} />,
    private_groups: <GroupList groupType="private" onGroupClick={onGroupClick} />,
    one_to_one_chat: <h1>Private 1 to 1 chats feature will be available soon.</h1>,
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Side Panel */}
      <SidePanel onItemClick={setSelectedItem} />

      {/* Right Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        {componentsMap[selectedItem] || (
          <h1 style={{ color: "gray" }}>Select an option from the side panel</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
