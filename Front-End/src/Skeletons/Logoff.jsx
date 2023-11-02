import React from "react";
import Cookies from 'js-cookie';

export default function Logoff() {
  return (
    <>
      {Cookies.remove("token")}
    </>
  );
}