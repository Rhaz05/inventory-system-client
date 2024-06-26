import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading, size = 150 }) => {
  return (
    <ClipLoader
      color="#38cac5"
      loading={loading}
      cssOverride={override}
      size={size}
    />
  );
};
export default Spinner;
