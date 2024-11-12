import "./loading.scss";

const Loadig = ({ ...props }) => {
  return (
    <img
      className="loading-gif"
      src="/images/loading-gif.gif"
      alt="Loading gif"
      {...props}
    />
  );
};

export default Loadig;
