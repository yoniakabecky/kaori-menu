import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";

export default function Skeletons({ className }) {
  return (
    <>
      <Skeleton variant="rect" className={className} />
      <Skeleton variant="rect" className={className} />
      <Skeleton variant="rect" className={className} />
      <Skeleton variant="rect" className={className} />
      <Skeleton variant="rect" className={className} />
      <Skeleton variant="rect" className={className} />
      <Skeleton variant="rect" className={className} />
    </>
  );
}
