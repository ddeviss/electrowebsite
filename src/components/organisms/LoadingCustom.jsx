import React from "react";
import { CircularProgress } from "@material-ui/core";

export const LoadingCustom = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};
