import React from "react";
import styles from "./link.module.css"

export function Link(props) {
  return (
    <a className={`${styles.link} mt-4 mr-5 mb-4 ml-5`} href={props.link}>
      {props.image}
      <p className={`text ${props.addStyle}`}>{props.children}</p>
    </a>
  );
}
