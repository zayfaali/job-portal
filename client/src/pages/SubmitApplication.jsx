import { redirect } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";

export async function action({ params }) {
  try {
    await customFetch.post(`/applications/${params.jobId}`);
    toast.success("Job Application submitted");
  } catch (error) {
    toast.error(error.response.data.msg);
  }
  return redirect("/dashboard/all-jobs");
}
