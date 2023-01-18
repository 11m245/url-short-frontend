import DashboardIcon from "@mui/icons-material/Dashboard";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";

function Sidebar() {
  const sideOptions = [
    {
      name: "Dashboard",
      path: "/user",
      icon: <DashboardIcon sx={{ color: "#3B71CA" }} />,
      type: "link",
    },
    {
      name: "create new Url",
      path: "new-url",
      icon: <SwitchAccessShortcutAddIcon sx={{ color: "#14A44D" }} />,
      type: "link",
    },
    {
      name: "List Urls",
      path: "list-url",
      icon: <ListAltIcon sx={{ color: "#9c27b0" }} />,
      type: "link",
    },
  ];
  return (
    <>
      <div className="sidebar-container">
        <div className="options-container">
          {sideOptions.map((option) => (
            <SideOption option={option} />
          ))}
        </div>
      </div>
    </>
  );
}

function SideOption({ option }) {
  const { name, path, icon, type } = option;

  return (
    <>
      <Link
        to={path}
        className="option-container d-flex align-items-center gap-1"
      >
        <div className="option-icon">{icon}</div>
        <h6 className="option-name">{name}</h6>
      </Link>
    </>
  );
}
export { Sidebar };
