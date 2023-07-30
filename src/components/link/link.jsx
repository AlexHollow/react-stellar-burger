import styles from "./link.module.css"
import PropTypes from "prop-types";

export function Link(props) {
  return (
    <a className={`${styles.link} mt-4 mr-5 mb-4 ml-5`} href={props.link}>
      {props.image}
      <p className={`text ${props.addStyle}`}>{props.children}</p>
    </a>
  );
}

Link.propTypes = {
  link: PropTypes.string,
  image: PropTypes.node,
  addStyle: PropTypes.string,
  children: PropTypes.string
}