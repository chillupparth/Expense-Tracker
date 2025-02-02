"use client";

import addTransaction from "@/app/actions/addTransaction";
import { useRef } from "react";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const clientAction = async (formdata: FormData) => {
    const { error, data } = await addTransaction(formdata);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Transaction added");
      formRef.current?.reset();
    }
  };
  return (
    <>
      <h3>Add a transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> (negavtive - expense, positive - income)
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter Amount"
            step="0.01"
          />
          <button className="btn">Add transaction</button>
        </div>
      </form>
    </>
  );
};
export default AddTransaction;
