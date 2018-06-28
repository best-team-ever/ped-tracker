import Dashboard from "../views/Dashboard/Dashboard";
import Device from "../views/Devices/Device";
import Devices from "../views/Devices/Devices";
import Location from "../views/Locations/Location";
import Locations from "../views/Locations/Locations";
import User from "../views/Users/User";
import Users from "../views/Users/Users";
import Events from "../views/Events/Events";
import Help from "../views/Help/Help";
import Cashier from "../views/Ped/Ped";

import Typography from "../views/Typography/Typography";
import Icons from "../views/Icons/Icons";
import Notifications from "../views/Notifications/Notifications";

const dashboardRoutes = [
  {
    path: "/ped",
    name: "PED",
    icon: "pe-7s-cash",
    component: Cashier
  },
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
    path: "/locations/new",
    component: Location,
    invisible: true
  },
  {
    path: "/locations/:id",
    component: Location,
    invisible: true
  },
  {
    path: "/locations",
    name: "Locations",
    icon: "pe-7s-map-2",
    component: Locations
  },
  {
    path: "/users/new",
    component: User,
    invisible: true
  },
  {
    path: "/users/:id",
    component: User,
    invisible: true
  },
  {
    path: "/users",
    name: "Users",
    icon: "pe-7s-users",
    component: Users
  },
  {
    path: "/events",
    name: "Events",
    icon: "pe-7s-clock",
    component: Events
  },
  {
    path: "/help",
    name: "Help",
    icon: "pe-7s-help1",
    component: Help
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
