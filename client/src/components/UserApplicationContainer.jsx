import Wrapper from "../assets/wrappers/JobsContainer";
import UserApplication from "./UserApplication";
const UserApplicationContainer = ({ data }) => {
  const applications = data.jobApplications;
  console.log(applications);

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
            <UserApplication key={application._id} application={application} />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default UserApplicationContainer;
