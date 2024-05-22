import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastDisplay = () => {
  return <ToastContainer transition={Slide} />;
};

export default ToastDisplay;
