import React, { useEffect, useState } from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import { getUsers } from "../lib/helper";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";
import axios from "axios";

export const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://employee-management-system-8iea.vercel.app/api/users"
      );

      setData(result.data);
    };

    fetchData();
  }, [data]);

  // const { isLoading, isFetching, isError, data, error } = useQuery(
  //   "users",
  //   getUsers
  // );

  // const {
  //   isFetching,
  //   isLoading,
  //   error,
  //   data = [],
  // } = useQuery({
  //   queryKey: ["repoData"],
  //   queryFn: () =>
  //     fetch("https://employee-management-system-8iea.vercel.app/api/users").then((res) => res.json()),
  // });

  // if (isFetching) return <div>Employee is Loading...</div>;
  // if (isLoading) return <div>Employee is Loading...</div>;
  // if (error) return <div>Error:{error}</div>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-6 py-2">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-6 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      {/* body */}
      <tbody className="bg-gray-200">
        {Array.isArray(data) && data.map((obj, i) => <Tr {...obj} key={i} />)}
      </tbody>
    </table>
  );
};

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };
  const onDelete = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(deleteAction(_id));
      toast.success("Deleted Successfully!");
    }
  };
  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={avatar || "#"}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">{name}</span>
      </td>
      <td className="px-16 py-2">
        <span className="break-all">{email}</span>
      </td>
      <td className="px-16 py-2">
        <span>${salary}</span>
      </td>
      <td className="px-16 py-2">
        <span>{date}</span>
      </td>
      <td className="px-16 py-2">
        <button className="cursor">
          <span
            className={`${
              status == "Active" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status}
          </span>
        </button>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button className="cursor">
          <BiEdit onClick={onUpdate} size={25} color={"rgb(34,197,94"} />
        </button>
        <button className="cursor">
          <BiTrashAlt onClick={onDelete} size={25} color={"rgb(244,63,94"} />
        </button>
      </td>
    </tr>
  );
}
