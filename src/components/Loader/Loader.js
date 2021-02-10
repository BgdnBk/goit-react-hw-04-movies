import React from "react";
import Loader from "react-loader-spinner";

export default function LoaderFoo() {
  return (
    <div className="loader">
      <Loader type="Rings" color="#00BFFF" height={200} width={200} />
    </div>
  );
}
