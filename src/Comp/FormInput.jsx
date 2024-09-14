import { useState } from "react";
//@ts-ignore
const InputComp = () => {
  let initialValues = {
    firstname: "",
    lastName: "",
    Age: 0,
    MoblieNo: "",
    Dept: "",
  };
  const [fieldValue, setFieldValue] = useState(initialValues);
  const [validateError, setValidateError] = useState({});

  const handleChange = (e) => {
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let error = {};
    if (!isNaN(fieldValue.firstname) == true || fieldValue.firstname == " ") {
      error.fistname = "Please Enter First Name";
    }
    if (!isNaN(fieldValue.firstname) == true || fieldValue.lastName == " ") {
      error.lastName = "Please Enter Last Name";
    }
    if (!isNaN(fieldValue.Dept) == true || fieldValue.Dept == " ") {
      error.lastName = "Please Enter Last Name";
    }
    if (fieldValue.Age < 18) {
      error.age = "Age is not valid";
    }
    if (
      !isNaN(fieldValue.MoblieNo) == false &&
      fieldValue.MoblieNo.length < 10 
    ) {
      error.MoblieNo = "Please enter valid number";
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateForm();
    console.log(error);
    setValidateError(error);
    if (Object.keys(error).length > 0) {
      return;
    } 
      console.log("from Submitted", fieldValue);
      setFieldValue(initialValues);
  };

  return (
    <>
      <div className="p-4  m-2 flex flex-col rounded-md  border  w-[500px]">
        <h1 className="font-bold text-center"> Enter Details</h1>
        <form onSubmit={handleSubmit} className="flex  flex-col w-full">
          <div className="p-2  w-full">
            <input
              name="firstname"
              className="p-2  w-full"
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
              value={fieldValue.lastName}
              onChange={handleChange}
              required
              placeholder="Enter Last name"
            />
            {validateError?.name && (
              <span className="text-red-700">{validateError.name}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <input
              name="Age"
              type="number"
              min={0}
              required
              value={fieldValue.Age}
              onChange={handleChange}
              className="p-2  w-full"
              placeholder="Age"
            />
            {validateError?.age && (
              <span className="text-red-700">{validateError.age}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <input
              name="MoblieNo"
              className="p-2  w-full"
              required
              value={fieldValue.MoblieNo}
              onChange={handleChange}
              placeholder="PhoneNumber"
            />
            {validateError?.MoblieNo && (
              <span className="text-red-700">{validateError.MoblieNo}</span>
            )}
          </div>
          <div className="p-2  w-full">
            <input
              name="Dept"
              required
              className="p-2  w-full"
              value={fieldValue.Dept}
              onChange={handleChange}
              placeholder="Department"
            />
            {validateError?.Dept && (
              <span className="text-red-700">{validateError.Dept}</span>
            )}
          </div>
          <div className="p-2  mx-auto ">
            <button className="p-2  bg-slate-200 m-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputComp;
