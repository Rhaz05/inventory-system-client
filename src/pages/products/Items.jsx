import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import Dropdown from "../../components/Dropdown";

import { FaSpinner } from "react-icons/fa";

const Types = [
  { id: 1, name: "MATERIAL" },
  { id: 2, name: "EQUIPMENT" },
];

const Items = () => {
  const axiosPrivate = useAxiosPrivate();
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getData = async () => {
      try {
        const res = await axiosPrivate.get(`/brand`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setBrand(res.data.data);
          setLoading(false);
        }
      } catch (err) {
        // console.log(err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return (
    <>
      <div className="flex flex-col xl:flex-row">
        <div className="flex-1 h-full order-2 xl:order-1">
          <Card>Table</Card>
        </div>
        <div className="basis-[35%] order-1 mb-2">
          <Card>
            <form action="">
              <div className="flex gap-2 xl:px-4 flex-wrap px-6">
                <div className="basis-full md:flex-1">
                  <Dropdown label={"Type:"} options={Types} />
                </div>
                <div className="flex-1">
                  {loading ? (
                    <Button style={"w-full mt-6 flex justify-center"}>
                      <FaSpinner className="animate-spin my-auto" size={22} />
                    </Button>
                  ) : (
                    <Dropdown label={"Brand:"} options={brand} />
                  )}
                </div>
                <div className="basis-full">
                  <Input label={"Description:"} />
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
    </>
  );
};

export default Items;
