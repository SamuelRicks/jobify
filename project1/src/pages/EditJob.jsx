import { FormRow, FormRowSelector, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useParams, useLoaderData } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("../all-jobs");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success("Job updated");
    return redirect("../all-jobs");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();

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
