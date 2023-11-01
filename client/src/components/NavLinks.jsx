import { useContext } from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  console.log(user.role);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (
          (role !== "admin" && path === "admin") ||
          (role !== "employer" && path === ".") ||
          (role !== "employer" && path === "job-applications") ||
          (role === "employer" && path === "user-applications") ||
          (role === "employer" && path === "user-stats") ||
          (role === "user" && path === "stats")
        )
          return;

        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
