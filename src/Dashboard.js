import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useContext, useEffect, useState } from "react";
import { apiContext } from "./App";

function Dashboard() {
  const [count, setCount] = useState({ today: 0, month: 0 });
  const cards = [
    {
      count: count.today,
      subline: "created",
      infoline: "Today",
      icon: <TodayIcon sx={{ fontSize: 40, color: "#3B71CA" }} />,
      color: "#3B71CA",
    },
    {
      count: count.month,
      subline: "created",
      infoline: "this Month",
      icon: <CalendarMonthIcon sx={{ fontSize: 40, color: "#14A44D" }} />,
      color: "#14A44D",
    },
  ];

  const { serverApi } = useContext(apiContext);
  console.log(serverApi);

  async function checkGetStatsResponse(response) {
    const data = await response.json();
    console.log("stat data is", data);
    if (response.status === 200) {
      // const [today, month] = data.statData;
      setCount({ ...count, today: data.todayCount, month: data.monthCount });
      console.log(data.message);
    } else {
      console.log(data);
    }
  }

  function getStats() {
    fetch(`${serverApi}/url/getStats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        logintoken: localStorage.getItem("token"),
      },
    })
      .then((response) => checkGetStatsResponse(response))
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="cards-container d-flex flex-wrap gap-2">
          {cards.map((card) => (
            <Card card={card} />
          ))}
        </div>
      </div>
    </>
  );
}

function Card({ card }) {
  const { count, subline, icon, infoline, color } = card;
  return (
    <>
      <div
        style={{ borderColor: color, borderLeftWidth: "10px" }}
        className="card-container d-flex flex-column p-2"
      >
        <div className="section-1 d-flex align-items-center justify-content-between">
          <div className="content d-flex flex-column">
            <h3 className="count">{count}</h3>
            <h6>{subline}</h6>
          </div>
          <div className="logo">{icon}</div>
        </div>
        <div className="section-2">
          <h6>{infoline}</h6>
        </div>
      </div>
    </>
  );
}

export { Dashboard };
