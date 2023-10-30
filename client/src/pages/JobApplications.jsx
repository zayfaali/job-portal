import ApplicationContainer from "../components/ApplicationContainer";
import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/applications");

    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const JobApplications = () => {
  const data = useLoaderData();
  return <ApplicationContainer data={data} />;
};

export default JobApplications;
