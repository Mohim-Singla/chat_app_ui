import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use this if using React Router
import SidePanel from "./sidePanel/sidePanel";
import { serviceConfig } from "../../config/config";

function Home() {
  const navigate = useNavigate(); // For navigation

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
          localStorage.clear();
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return <SidePanel />;
}

export default Home;
