import React from "react";
import loader from "../images/loader.gif";
type LoaderProps = {
  size: "sm" | "md" | "lg";
};
export const Loader = (props: LoaderProps) => {
  return (
    <img
      width={
        props.size === "sm" ? "50px" : props.size === "md" ? "75px" : "100px"
      }
      src={loader}
      alt=""
    />
  );
};
