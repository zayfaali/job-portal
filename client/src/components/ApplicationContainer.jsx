import Wrapper from "../assets/wrappers/JobsContainer";
import Application from "./Application";

const ApplicationContainer = ({ data }) => {
  const applications = data.jobApplications;

  if (data.jobApplications.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {applications.map((application) => {
          return (
            <Application key={application._id} application={application} />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default ApplicationContainer;
