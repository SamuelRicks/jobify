import { FormRow, FormRowSelector, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useParams, useLoaderData } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const editJobQuery = (id) => {
  return {
    queryKey: ["jobs", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(editJobQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard/all-jobs");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await customFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job updated");
      return redirect("../all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(editJobQuery(id));

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4> Edit Job</h4>
        <div className="form-center">
          <FormRow name="position" defaultValue={job.position} />
          <FormRow name="company" defaultValue={job.company} />
          <FormRow name="location" defaultValue={job.jobLocation} />
          <FormRowSelector
            name="jobStatus"
            labelText="job status"
            defaultValue={job.JOB_STATUS}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelector
            name="jobType"
            labelText="job type"
            defaultValue={job.JOB_TYPE}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
