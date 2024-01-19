import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BusinessIcon from "@mui/icons-material/Business";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Logo from "@/Assets/Logo_1.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NestedList() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  function Logouthandler() {
    localStorage.removeItem("token");
    router.push("/login");
  }
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex flex-col">
      <div className="h-[120px] z-50 flex flex-row bg-black w-full justify-center items-center border-b-2 border-white">
        <Image className="ml-6 mt-2" src={Logo} width="60" height="60"></Image>
        <h1 className="text-white text-2xl m-0 w-full text-center">
          HBTU INVENTORY
        </h1>
      </div>
      <div>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <div style={{ textAlign: "center", paddingBottom: "16px" }}>
            <button
              style={{
                backgroundColor: "#4CAF50", // Contrasting color
                color: "white",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                width: "90%",
                fontSize: "18px",
              }}
            >
              <AddCircleIcon fontSize="large" style={{ marginRight: "8px" }} />
              Create New Order
            </button>
          </div>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Sent mail" style={{ color: "white" }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Alert" style={{ color: "white" }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BarChartIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Statistics" style={{ color: "white" }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <BusinessIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Manage Stocks" style={{ color: "white" }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText
              primary="Inventory Setting"
              style={{ color: "white" }}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Items" style={{ color: "white" }} />
          </ListItemButton>
          <ListItemButton onClick={Logouthandler}>
            <ListItemIcon>
              <ExitToAppIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" style={{ color: "white" }} />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="About" style={{ color: "white" }} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder style={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Query" style={{ color: "white" }} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
}
