import { HashLoader } from "react-spinners";

// Override some of the CSS properties
const override = {
  display: "block",
  margin: "100px auto",
};

function Spinner({ isLoading }) {
  return (
    <HashLoader
      color="#4338ca"
      loading={isLoading}
      cssOverride={override}
      size={150}
      aria-label="Loading spinner"
    />
  );
}

export default Spinner;
