import { data } from "autoprefixer";
import { useState, useEffect } from "react";
const InputComp = ({ setData, tabledata, showForm }) => {
  let initialValues = {
    firstname: "",
    lastName: "",
    Age: 0,
    MoblieNo: "",
    Dept: "",
  };
  let key = "usersDetails";
  const [fieldValue, setFieldValue] = useState(initialValues);
  const [validateError, setValidateError] = useState({});
  useEffect(() => {
    // retriving data

    const details = localStorage.getItem(key);
    // if data
    if (details) {
      try {
        const data = JSON.parse(details);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No data Found");
    }
  }, [key, setData]);

  const handleChange = (e) => {
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let error = {};
    if (!isNaN(fieldValue.firstname) == true || fieldValue.firstname == " ") {
      error.fistname = "Please Enter First Name";
    }
    if (!isNaN(fieldValue.lastName) == true || fieldValue.lastName == " ") {
      error.lastName = "Please Enter Last Name";
    }
    if (!isNaN(fieldValue.Dept) == true || fieldValue.Dept == " ") {
      error.lastName = "Please Enter Last Name";
    }
    if (fieldValue.Age < 18) {
      error.age = "Age is not valid";
    }
    if (
      !isNaN(fieldValue.MoblieNo) == false ||
      fieldValue.MoblieNo.length != 10
    ) {
      error.MoblieNo = "Please enter valid number";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    setValidateError(error);
    //if (key) return
    if (Object.keys(error).length > 0) {
      return;
    }
    //data with id
    const newDataWithId = { ...fieldValue, id: Date.now() };
    //passing it to table
    const updateItem = [...tabledata, newDataWithId];
    //setting up with table
    setData(updateItem);
    //saving the data in localStorage
    localStorage.setItem(key, JSON.stringify(updateItem));
    //setting input values to empty
    setFieldValue(initialValues);
    //hide form
    showForm((prev) => !prev);
  };

  return (
    <>
      <div className="p-4  m-2 flex flex-col rounded-md  border  w-[500px] bg-gray-200">
        <h1 className="font-bold text-center"> Enter Details</h1>
        <span
          className="absolute right-[30px] top-[15px] cursor-pointer text-2xl"
          onClick={() => {
            showForm((prev) => !prev);
            setFieldValue(initialValues);
          }}
        >
          x
        </span>
        <form onSubmit={handleSubmit} className="flex  flex-col w-full">
          <div className="p-2  w-full">
            <input
              name="firstname"
              className="p-2  w-full"
              style={{ border: "1px solid #ccc" }}
              value={fieldValue.firstname}
              onChange={handleChange}
              required
              placeholder="Enter First name"
            />
            {validateError?.name && (
              <span className="text-red-700">{validateError.name}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <input
              name="lastName"
              className="p-2  w-full"
              style={{ border: "1px solid #ccc" }}
              required
              placeholder="Enter Last name"
              value={fieldValue.lastName}
              onChange={handleChange}
            />
            {validateError?.name && (
              <span className="text-red-700">{validateError.name}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <label>Enter Age</label>
            <input
              className="p-2  w-full"
              style={{ border: "1px solid #ccc" }}
              name="Age"
              type="number"
              placeholder="Age"
              min={0}
              required
              value={fieldValue.Age}
              onChange={handleChange}
            />
            {validateError?.age && (
              <span className="text-red-700">{validateError.age}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <input
              name="MoblieNo"
              className="p-2  w-full"
              style={{ border: "1px solid #ccc" }}
              required
              placeholder="PhoneNumber"
              value={fieldValue.MoblieNo}
              onChange={handleChange}
            />
            {validateError?.MoblieNo && (
              <span className="text-red-700">{validateError.MoblieNo}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <input
              name="Dept"
              style={{ border: "1px solid #ccc" }}
              required
              className="p-2  w-full"
              placeholder="Department"
              value={fieldValue.Dept}
              onChange={handleChange}
            />
            {validateError?.Dept && (
              <span className="text-red-700">{validateError.Dept}</span>
            )}
          </div>
          <div className="p-2  mx-auto ">
            <button
              className="p-2  bg-slate-500 m-2 rounded-lg hover:bg-slate-200"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputComp;
