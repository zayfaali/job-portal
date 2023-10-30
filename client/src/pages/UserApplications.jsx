import { toast } from "react-toastify";
import { customFetch } from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import UserApplicationContainer from "../components/UserApplicationContainer";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/applications/user-application");

    return data;
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const UserApplications = () => {
  const data = useLoaderData();
  return <UserApplicationContainer data={data} />;
};

export default UserApplications;
