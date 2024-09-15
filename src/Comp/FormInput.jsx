import { data } from "autoprefixer";
import { useState, useEffect } from "react";
const InputComp = ({ setData ,tabledata}) => {
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
  let value = JSON.stringify(fieldValue);
  const handleChange = (e) => {
    setFieldValue({ ...fieldValue, [e.target.name]: e.target.value });
  };
  useEffect(() => { 
    // retriving data
    const details = localStorage.getItem(key);
    // if data
    if (details && fieldValue !== initialValues) {
      const data = JSON.parse(details);
      setData([...tabledata, { data }]);
    } else {
      console.log("No data Found");
    }
  }, [fieldValue]);


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
      fieldValue.MoblieNo.length < 10 ||
      (!isNaN(fieldValue.MoblieNo) == true &&
        fieldValue.MoblieNo.length < 10) ||
      (!isNaN(fieldValue.MoblieNo) == true && fieldValue.MoblieNo.length > 10)
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

    localStorage.setItem(key, value);
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
            <input
              className="p-2  w-full"
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
