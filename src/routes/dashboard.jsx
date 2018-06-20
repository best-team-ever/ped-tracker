import Dashboard from "views/Dashboard/Dashboard";
import Devices from "views/Devices/Devices";
import Device from "views/Devices/Device";
import Locations from "views/Locations/Locations";
import Users from "views/Users/Users";
import Help from "views/Help/Help";

import UserProfile from "views/UserProfile/UserProfile";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Notifications from "views/Notifications/Notifications";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/devices/new",
    component: Device,
    invisible: true
  },
  {
    path: "/devices/:id",
    component: Device,
    invisible: true
  },
  {
    path: "/devices",
    name: "Devices",
    icon: "pe-7s-calculator",
    component: Devices
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "pe-7s-map-2",
    component: Locations
  },
  {
    path: "/users",
    name: "Users",
    icon: "pe-7s-users",
    component: Users
  },
  {
    path: "/help",
    name: "Help",
    icon: "pe-7s-help1",
    component: Help
  },

  {
    path: "/form",
    name: "Sample form",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/typography",
    name: "Catalog Typography",
    icon: "pe-7s-news-paper",
    component: Typography
  },
  {
    path: "/icons",
    name: "Catalog Icons",
    icon: "pe-7s-science",
    component: Icons },
  {
    path: "/notifications",
    name: "Catalog Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  {
    redirect: true,
    path: "/",
    to: "/dashboard",
    name: "Dashboard" }
];

export default dashboardRoutes;
