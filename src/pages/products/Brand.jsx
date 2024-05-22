import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

//Components
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import Table from "../../components/Table";
import ToastDisplay from "../../components/ToastDisplay";
import Button from "../../components/Button";

import { FaEdit, FaEye, FaSpinner, FaEyeSlash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Brand = () => {
  const BASE_PATH = "brand";
  const [data, setData] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAccess = async () => {
      try {
        const res = await axiosPrivate.get("/brand", {
          signal: controller.signal,
        });
        if (isMounted) {
          setData(res.data.data);
        }
      } catch (err) {
        // console.log(err);
      }
    };

    getAccess();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosPrivate.post("/brand", {
        name: brandName,
        user: auth.userInfo.id,
      });
      setBrandName("");
      const res = await axiosPrivate.get("/brand");
      setData(res.data.data);
      console.log(res.data.msg);
      if (res.data.msg === "success") {
        toast.success("Access Added", { theme: "dark" });
      }
    } catch (err) {
      setBrandName("");
      if (!err?.response) {
        toast.error("No server Response");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized", { theme: "dark" });
      } else if (err.response?.status === 409) {
        toast.error("Duplicate Entry", {
          theme: "dark",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const statusUpdate = async (id, statusData) => {
    try {
      await axiosPrivate.patch(`/brand/status/${id}`, {
        status: statusData,
      });
      const res = await axiosPrivate.get("/brand");
      setData(res.data.data);
      if (res.data.msg === "success") {
        toast.success("Status Updated", { theme: "dark" });
      }
    } catch (err) {
      if (!err?.response) {
        toast.error("No server Response");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized", { theme: "dark" });
      }
    }
  };

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Brand",
      accessorKey: "name",
    },
    {
      header: "Created By",
      accessorKey: "createdby",
    },
    {
      header: "Created Date",
      accessorKey: "createddate",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const value = getValue();
        const statusClass =
          value === "ACTIVE"
            ? "bg-green-500/85 text-white"
            : "bg-red-500 text-white";
        return (
          <span className={`px-2 py-1 rounded ${statusClass}`}>{value}</span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.original.status;
        return (
          <div className="flex gap-2">
            {}
            {status === "ACTIVE" ? (
              <FaEye
                size={17}
                className="text-gray-700 cursor-pointer"
                onClick={() => statusUpdate(id, status)}
              />
            ) : (
              <FaEyeSlash
                size={17}
                className="text-gray-700 cursor-pointer"
                onClick={() => statusUpdate(id, status)}
              />
            )}

            <NavLink to={`/edit/${BASE_PATH}/${id}`}>
              <FaEdit
                size={17}
                className="text-gray-700 mr-auto cursor-pointer"
              />
            </NavLink>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Card style={"mb-2"}>
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex flex-col static w-[25rem] ml-[2rem]">
            <label
              htmlFor="brand"
              className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
            >
              Brand:
            </label>
            <input
              type="text"
              placeholder="Write here..."
              name="brand"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="border-teal-400 px-[10px] py-[11px] text-md bg-white border rounded-[5px] focus:outline-none placeholder:text-black/25"
              id="brand"
              autoComplete="off"
              required
            />
          </div>
          <Button style={"mt-[1.65rem] ml-2"} isDisabled={loading}>
            {loading ? (
              <FaSpinner className="animate-spin my-auto" size={22} />
            ) : (
              <>
                <div className="flex">
                  <IoMdAdd size={22} className="my-auto" />
                  <span className="my-auto text-md ml-1">ADD</span>
                </div>
              </>
            )}
          </Button>
        </form>
      </Card>
      {data.length ? (
        <Card>
          <Table columns={columns} data={data} />
        </Card>
      ) : (
        <Spinner />
      )}
      <ToastDisplay />
    </>
  );
};

export default Brand;
