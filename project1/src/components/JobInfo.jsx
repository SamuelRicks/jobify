import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <div className="job-icon">{icon}</div>
      <div className="job-text">{text}</div>
    </Wrapper>
  );
};

export default JobInfo;
