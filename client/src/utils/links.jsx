import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms, FaStickyNote } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  { text: "add job", path: ".", icon: <FaWpforms /> },
  { text: "all jobs", path: "all-jobs", icon: <MdQueryStats /> },
  { text: "my jobs", path: "user-applications", icon: <FaStickyNote /> },
  { text: "application stats", path: "user-stats", icon: <IoBarChartSharp /> },
  { text: "stats", path: "stats", icon: <IoBarChartSharp /> },
  { text: "profile", path: "profile", icon: <ImProfile /> },
  { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
  {
    text: "job applications",
    path: "job-applications",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
