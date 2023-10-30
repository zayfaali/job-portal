import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

import Wrapper from "../assets/wrappers/Application";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const UserApplication = ({ application }) => {
  const { company, position, jobLocation, jobType, jobStatus, createdAt } =
    application.job;

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
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        {/* <footer className="actions">
          <Link to={`../edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../submit-application/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Apply
            </button>
          </Form>
        </footer> */}
      </div>
    </Wrapper>
  );
};

export default UserApplication;
