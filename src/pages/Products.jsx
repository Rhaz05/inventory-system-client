import { useParams } from "react-router-dom";

const Products = () => {
  const { pID } = useParams();
  return <h1>Products / {pID}</h1>;
};

export default Products;
