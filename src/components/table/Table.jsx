import "./table.scss";

const Table = (props) => {
  return <table id="customers">{props.children}</table>;
};

export default Table;
