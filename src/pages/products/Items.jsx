import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

//components
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Table from "../../components/Table";
import ToastDisplay from "../../components/ToastDisplay";

//icons
import { IoMdAdd } from "react-icons/io";
import { FaEdit, FaEye, FaSpinner, FaEyeSlash } from "react-icons/fa";

const Types = [
  { id: 1, name: "MATERIAL" },
  { id: 2, name: "EQUIPMENT" },
];

const Items = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(Types[0]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(`/brand`, {
          signal: controller.signal,
        });
        const result = await axiosPrivate.get(`/items`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setBrand(res.data.data);
          setSelectedBrand(res.data.data[0]);
          setLoading(false);
          setTableData(result.data.data);
        }
      } catch (err) {
        // console.log(err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosPrivate.post("/items", {
        brand: selectedBrand.id,
        type: selectedType.name,
        description: description,
        user: auth.userInfo.id,
      });
      const result = await axiosPrivate.get("/items");
      setTableData(result.data.data);
      setDescription("");
      if (res.data.msg === "success") {
        toast.success("Item Added Successfully!", { theme: "dark" });
      }
    } catch (err) {
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

  /** @type import('@tanstack/react-table').columnDef<any> */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Brand",
      accessorKey: "brandid",
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Description",
      accessorKey: "description",
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

            <NavLink to={`/edit/items/${id}`}>
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
      <div className="flex flex-col xl:flex-row">
        <div className="flex-1 h-full order-2 xl:order-1">
          <Card>
            <Table columns={columns} data={tableData} />
          </Card>
        </div>
        <div className="basis-[35%] order-1 mb-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 xl:px-4 flex-wrap px-6">
                <div className="basis-full md:flex-1">
                  <Dropdown
                    label={"Type:"}
                    options={Types}
                    selected={selectedType}
                    setSelected={setSelectedType}
                  />
                </div>
                <div className="flex-1">
                  {loading ? (
                    <Button style={"w-full mt-6 flex justify-center"}>
                      <FaSpinner className="animate-spin my-auto" size={22} />
                    </Button>
                  ) : (
                    <Dropdown
                      label={"Brand:"}
                      options={brand}
                      selected={selectedBrand}
                      setSelected={setSelectedBrand}
                    />
                  )}
                </div>
                <div className="basis-full">
                  <Input
                    label={"Description:"}
                    value={description}
                    eventHandler={(e) => setDescription(e.target.value)}
                    id={"description"}
                  />
                </div>
              </div>
              <div className="flex gap-2 xl:px-4 flex-wrap px-6 w-full">
                <Button style={"w-full mt-4 flex justify-center"}>
                  <IoMdAdd size={22} /> ADD
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <ToastDisplay />
    </>
  );
};

export default Items;
