import React from "react";
import s from "./MenuItem.module.scss";
import { getFullClassName } from "lib/js/jsMic";

const MenuItem = ({ caption, className }) => {
  return (
    <>
      <li className={getFullClassName(className, s.item)}>
        <p>{caption}</p>
      </li>
    </>
  );
};

export default MenuItem;
