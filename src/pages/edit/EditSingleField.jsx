import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

//Components
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import ToastDisplay from "../../components/ToastDisplay";

//Icons
import { SlArrowRight } from "react-icons/sl";

const EditSingleField = () => {
  const { path, eID } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`/${path}/${eID}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(res.data.data);
        }
      } catch (err) {
        // console.log(err);
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const res = await axiosPrivate.patch(`/${path}`, {
        name: name,
        id: eID,
      });
      setName("");
      // console.log(res.data);
      if (res.data.msg === "success") {
        toast.success(
          <span className="capitalize">{path} Updated! Redirecting...</span>,
          { theme: "dark" }
        );

        setTimeout(() => {
          navigate(`/${path}`);
        }, 2000);
      }
    } catch (err) {
      setName("");
      if (!err?.response) {
        toast.error("No server Response");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized", { theme: "dark" });
      } else if (err.response?.status === 409) {
        toast.error("Duplicate Entry", {
          theme: "dark",
        });
      }
    }
  };

  return (
    <>
      <div className="py-5 ml-6 flex">
        <NavLink to={`/${path}`}>
          <h1 className="text-3xl text-gray-400/85 font-thin py-auto bg-white hover:text-teal-400">
            {path}
          </h1>
        </NavLink>
        <SlArrowRight size={25} className="mx-2 mt-2 text-gray-400" />
        <h1 className="text-3xl text-teal-400 font-thin py-auto">Edit</h1>
      </div>
      {data.length ? (
        <>
          <Card style={"xl:w-[75%] md:w-[90%] sm:mx-auto ml-2"}>
            <div className="flex gap-2 xl:px-2 flex-wrap px-4">
              <div className="flex-1">
                <div className="flex flex-col static">
                  <label
                    htmlFor={path}
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit capitalize"
                  >
                    {path}
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name={path}
                    value={data[0].name}
                    className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
                    id={path}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col static">
                  <label
                    htmlFor="id"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
                  >
                    ID:
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name="id"
                    value={data[0].id}
                    className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
                    id="id"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col static">
                  <label
                    htmlFor="status"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
                  >
                    Status:
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name="status"
                    value={data[0].status}
                    className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
                    id="status"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 xl:px-2 flex-wrap px-4">
              <div className="flex-1">
                <div className="flex flex-col static">
                  <label
                    htmlFor="createdby"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
                  >
                    Created By:
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name="createdby"
                    value={data[0].createdby}
                    className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
                    id="createdby"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col static">
                  <label
                    htmlFor="createddate"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
                  >
                    Created Date:
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name="createddate"
                    value={data[0].createddate}
                    className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
                    id="createddate"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card style={"xl:w-[75%] md:w-[90%] sm:mx-auto mt-3 ml-2"}>
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 xl:px-2 flex-wrap px-4"
            >
              <div className="flex-1">
                <div className="flex flex-col static">
                  <label
                    htmlFor="name"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit capitalize"
                  >
                    {`New ${path} Name:`}
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-teal-400 h-10 px-[10px] py-[11px] text-md bg-white border rounded-[5px] text-gray-600 focus:outline-none placeholder:text-black/25"
                    id="name"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="md:basis-[25%] basis-full">
                <Button style={"md:mt-6 mt-1 w-full h-10"}>Update</Button>
              </div>
            </form>
          </Card>
        </>
      ) : (
        <Spinner />
      )}
      <ToastDisplay />
    </>
  );
};

export default EditSingleField;
