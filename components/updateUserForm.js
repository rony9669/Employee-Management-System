/* eslint-disable react-hooks/rules-of-hooks */
import { useReducer, useState, React } from "react";
import { BiBrush } from "react-icons/bi";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, getUsers, updateUser } from "../lib/helper";

const UpdateUserForm = ({ formId, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(["users", formId], () =>
    getUser(formId)
  );
  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      // queryClient.setQueriesData("users",(old)=>[data])
      queryClient.prefetchQuery("users", getUsers);
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return toast.error(`${addMutation.error.message}`);
  if (addMutation.isSuccess) return toast.success("Update Successfully!");
  const { name, avatar, salary, date, email, status } = data;
  const [firstname, lastname] = name ? name.split(" ") : formData;

  const handleSubmit = async (event) => {
    event.preventDefault();

    toast.success("Successfully updated!");

    let userName = `${formData.firstname ?? firstname} ${
      formData.lastname ?? lastname
    }`;
    let updated = Object.assign({}, data, formData, { name: userName });
    await UpdateMutation.mutate(updated);
  };

  return (
    <div>
      <form
        className="grid lg:grid-cols-2 w-4/6 gap-4 "
        onSubmit={handleSubmit}
      >
        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="firstname"
            defaultValue={firstname}
            className="border w-full px-5 py-3 focus:outline-none rounded-md "
            placeholder="First Name"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="lastname"
            defaultValue={lastname}
            className="border w-full px-5 py-3 focus:outline-none rounded-md "
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="email"
            defaultValue={email}
            className="border w-full px-5 py-3 focus:outline-none rounded-md "
            placeholder="Email"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="text"
            onChange={setFormData}
            name="salary"
            defaultValue={salary}
            className="border w-full px-5 py-3 focus:outline-none rounded-md "
            placeholder="Salary"
            required
          />
        </div>
        <div className="input-type">
          <input
            type="date"
            onChange={setFormData}
            name="date"
            defaultValue={date}
            className="border px-5 py-3 focus:outline-none rounded-md "
            placeholder="Salary"
            required
          />
        </div>
        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              type="radio"
              onChange={setFormData}
              defaultChecked={status == "Active"}
              value="Active"
              id="radioDefault1"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer  "
              required
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-800"
            >
              Active
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              onChange={setFormData}
              value="Inactive"
              defaultChecked={status != "Active"}
              id="radioDefault25"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer  "
              required
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-800"
            >
              Inactive
            </label>
          </div>
        </div>
        <button className="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
          Update{" "}
          <span className="px-[2px]">
            <BiBrush />
          </span>
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
