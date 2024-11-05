import style from "./button.module.scss";

const Button = ({ success, children, ...props }) => {
  return (
    <button className={success ? style.success : style.danger} {...props}>
      {children}
    </button>
  );
};

export default Button;
