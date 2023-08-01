import { memo } from "react";
import styles from "./link.module.css"
import PropTypes from "prop-types";

function Link(props) {
  return (
    <a className={`${styles.link} mt-4 mr-5 mb-4 ml-5`} href={props.link}>
      {props.image}
      <p className={`text ${props.addStyle}`}>{props.children}</p>
    </a>
  );
}

Link.propTypes = {
  link: PropTypes.string.isRequired,
  image: PropTypes.node.isRequired,
  addStyle: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

export default memo(Link);