import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaUserAlt,
} from "react-icons/fa";

import { Form, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Application";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Application = ({ application }) => {
  const { company, position, jobLocation, jobType, jobStatus, createdAt } =
    application.job;

  const { _id } = application;

  const { name, lastName } = application.user;
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <JobInfo icon={<FaUserAlt />} text={`${name} ${lastName}`} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link to={`../edit-application/${_id}`} className="btn edit-btn">
            Edit
          </Link>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Application;
