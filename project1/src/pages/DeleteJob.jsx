import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job is deleted");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("../all-jobs");
  };

const DeleteJob = () => {};

export default DeleteJob;
