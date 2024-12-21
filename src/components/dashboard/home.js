import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidePanel from "./sidePanel/sidePanel";
import { serviceConfig } from "../../config/config";
import { useSnackbar } from "notistack";
import PublicGroups from "./publicGroups";

function Home() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedItem, setSelectedItem] = useState("welcome");

  const onGroupClick = (group) => {
    console.log("Group clicked:", group);
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
          enqueueSnackbar("Session expired!");
          localStorage.clear();
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Something went wrong!");
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate, enqueueSnackbar]);

  // Function to render right section content based on selected item
  const renderRightSection = () => {
    switch (selectedItem) {
      case "welcome":
        return <h1>Welcome, User!</h1>
      case "public_groups":
        return <PublicGroups onGroupClick={onGroupClick}/>;
      case "private_groups":
        return <h1>private_groups</h1>;
      case "one_to_one_chat":
        return <h1>Private 1 to 1 chats feature will be available soon.</h1>;
      default:
        return <h1>Select an option from the side panel</h1>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Side Panel */}
      <SidePanel onItemClick={(item) => setSelectedItem(item)} />

      {/* Right Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        {renderRightSection()}
      </div>
    </div>
  );
}

export default Home;
