import React from 'react';
import { Link } from 'react-router-dom';
import { signupSchema } from "../../schemas/signupSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { NativeSelect } from "@mantine/core";
import clsx from 'clsx';
import {toast} from "react-hot-toast"
import useAddUserMutation from '../../hooks/user/use-add-user';

const UserSignup = ({session}) => {

  if (localStorage.getItem("session")) {
    window.location.replace("http://localhost:5173/")
  }
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });


  const {mutate: addUser, isLoading, isError} = useAddUserMutation();

  const onSignup = async (data) => {
    console.log(data); //comeback to this for database call
    addUser({
      ...data
    }, {
      onSuccess: ()=>{
        console.log("User added")
        window.location.replace("http://localhost:5173/login")
        toast.success("User added successfully");
      },
      onError: () => {
        console.log("Error adding user")
        toast.error("Error adding user");
      }
    })
  }
  return (
    <div className="h-screen w-full flex flex-col px-4 justify-center items-center m-auto bg-bglayer bg-no-repeat bg-cover gap-7">
      {/* Container div to give border */}
      <div className="w-full max-w-md xl:max-w-lg flex flex-col gap-9 p-5">
        <div className="flex items-center gap-2 m-auto">
          <h1 className="text-xl lg:text-2xl font-bold font-Hack">Signup</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSignup)}
          className="gap-2 form-control w-full"
        >
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder="Email..."
              className={clsx(
                "input input-primary rounded-md input-md xl:input-lg placeholder:italic placeholder:pl-1 indent-5 w-full border-primary focus:outline-primary",
                errors?.email && "border-error focus:outline-error"
              )}
              {...register("email")}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name=""
              id=""
              placeholder="Password..."
              className={clsx(
                "input input-primary rounded-md input-md xl:input-lg placeholder:italic placeholder:pl-1 indent-5 w-full border-primary focus:outline-primary",
                errors?.password && "border-error focus:outline-error"
              )}
              {...register("password")}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder="Name..."
              className={clsx(
                "input input-primary rounded-md input-md xl:input-lg placeholder:italic placeholder:pl-1 indent-5 w-full border-primary focus:outline-primary",
                errors?.name && "border-error focus:outline-error"
              )}
              {...register("name")}
            />
          </div>
          <div className="relative">
            <textarea
              type="text"
              name=""
              id=""
              placeholder="Address..."
              className={clsx(
                "input input-primary rounded-md input-md xl:input-lg placeholder:italic placeholder:pl-1 indent-5 w-full border-primary focus:outline-primary",
                errors?.address && "border-error focus:outline-error"
              )}
              {...register("address")}
            />
          </div>
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              placeholder="Phone #..."
              className={clsx(
                "input input-primary rounded-md input-md xl:input-lg placeholder:italic placeholder:pl-1 indent-5 w-full border-primary focus:outline-primary",
                errors?.phone && "border-error focus:outline-error"
              )}
              {...register("phone")}
            />
          </div>
          <NativeSelect
            name=""
            id=""
            {...register("branch")}
            data={["paris", "london", "new york"]}
            label="select your branch"
          ></NativeSelect>
          <NativeSelect
            name=""
            id=""
            {...register("type")}
            data={["current", "savings"]}
            label="select your account type"
          ></NativeSelect>
          <div className="text-center text-white">
            <input
              type="submit"
              value="Signup"
              name=""
              id=""
              className="w-full rounded-xl btn btn-primary bg-primary border-primary hover:bg-secondary hover:border-primary"
            />
          </div>
        </form>
      </div>
      <div className="px-2 sm:p-0">
        <span className="text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold link link-primary text-primary hover:text-secondary"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

export default UserSignup
