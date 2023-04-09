const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick || null}
      className={props.className}
    >
      {props.children}
    </button>
  );
};

export default Button;
