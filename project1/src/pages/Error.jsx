import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not Found" />
          <h3> Something Went Wrong</h3>
          <p>We can't seem to find this page you are looking for.</p>
          <Link to="/dashboard"> Return Back</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <div>
      <h3>Something went wrong.</h3>
    </div>
  );
};

export default Error;
