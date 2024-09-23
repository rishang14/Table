import React, { useEffect, useState } from "react";
import InputComp from "./FormInput";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [editableRow, setEditableRow] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortKey, setSortKey] = useState(null);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  let keys;
  if (tableData.length > 0) {
    keys = Object.keys(tableData[0]).filter((key) => key !== "id");
    keys.push("Action");
  }

  //HELPER FUNCTIONS
  function filterLogic(item, id) {
    return item.id !== id;
  }

  function sortByKey(key) {
    return function (a, b) {
      //check if key Value is  string
      if (typeof a[key] === "string") {
        {
          return sortOrder === "asc"
            ? a[key].localeCompare(b[key])
            : b[key].localeCompare(a[key]);
        }
      }
      //check if key value is number
      if (typeof a[key] === "number") {
        if (sortOrder === "asc") {
          return a[key] > b[key] ? 1 : -1;
        } else {
          return b[key] > a[key] ? 1 : -1;
        }
      }
    };
  }

  function handleFilterLogic(searchValue) {
    return (arr) => { 
      for (let key in arr) { 
      // here getting all the keys
      //looping through each values 
      //converting in string and lowercase 
      //checking it contains searchvalue or not 
      return arr[key].toString().toLowerCase().
      includes(searchValue.toLowerCase()) 
      ? true : false 
      }
    }                        
  }

  const handleDelete = (id) => {
    //filter based on id
    const newdata = tableData.filter((item) => filterLogic(item, id));
    //get data from localestorage
    const StorageData = JSON.parse(localStorage.getItem("usersDetails"));
    const filteredData = StorageData.filter((item) => filterLogic(item, id));
    //update localstorage and table with new data
    localStorage.setItem("usersDetails", JSON.stringify(filteredData));
    setTableData(newdata);
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  };

  const handleEditChange = (e, id) => {
    //filtering in tabledata
    const newdata = tableData.map((item) => {
      //if it matches
      if (item.id === id) {
        //make changes
        return { ...item, [e.target.name]: e.target.value };
      }
      //return previous ones
      return item;
    });

    //set in tabledate and localestroage
    setTableData(newdata);
    localStorage.setItem("usersDetails", JSON.stringify(newdata));
  };

  const handleSave = (id) => {
    //fetch from localeStorage
    const data = JSON.parse(localStorage.getItem("usersDetails"));
    //set in table
    setTableData(data);
    //make editable null so it not show
    setEditableRow("");
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    const newData = [...tableData].sort(sortByKey(key));
    localStorage.setItem("usersDetails", JSON.stringify(newData));
    setTableData(newData);
  };

  const filterTableData = tableData.filter(handleFilterLogic(searchValue));
  console.log(filterTableData);

  return (
    <>
      <div className="p-2  m-4 w-[full] h-[full]">
        <div className="w-[100%] mx-auto p-1">
          <h1 className="text-2xl font-extrabold text-center">
            Your daily Entry Partner.
          </h1>
          <div className="p-2 mt-2 mx-auto w-[50%]">
            <h3 className="text-xl  text-center font-semibold">Features</h3>
            <p className=" text-center font-semibold">
              *All input field in form are validated correctly.
            </p>
            <p className=" text-center font-semibold">
              *Datas are stored and retrived from localeStorage.
            </p>
            <p className=" text-center font-semibold">
              *you can edit and delete data.
            </p>
            <p className=" text-center font-semibold">* Pagination.</p>
          </div>
        </div>
        <div className="p-2 w-[100%] mx-auto flex justify-center mt-[15px]">
          <button
            className="p-2 rounded-md border-none bg-zinc-500 mx-auto hover:bg-zinc-300"
            onClick={() => setShowForm((prev) => !prev)}
          >
            Enter Details
          </button>
        </div>
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99999]"
          style={{ display: showForm ? "block" : "none" }}
        >
          <InputComp
            setData={setTableData}
            tabledata={tableData}
            showForm={setShowForm}
          />
        </div>

        <div className="w-[80%]  relative mt-[10px]   mx-auto border bg-slate-100">
          <input
            className="p-2 mb-[5px] w-[250px] border rounden-md border-b-slate-500"
            placeholder="search data"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {tableData.length > 0 && (
            <table
              className="w-[100%] p-4 relative"
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              <thead>
                <tr className=" border-collapse  ">
                  <th style={{ border: "1px solid black", width: "50px" }}>
                    No.
                  </th>
                  {keys.map((keys) => {
                    return (
                      <th
                        className="w-[auto] border-collapse border   border-black"
                        key={keys}
                      >
                        {keys}{" "}
                        {keys !== "Action" && (
                          <span
                            className="p-1 cursor-pointer"
                            title="Sort"
                            onClick={() => handleSort(keys)}
                          >
                            {" "}
                            ↕️{" "}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filterTableData.slice(page * 5 - 5, page * 5).map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2  text-center border-collapse border border-black">
                        {index + 1}
                      </td>
                      {keys.map((key, idx) => {
                        return (
                          <td
                            key={`${data.id}-${idx}`}
                            className="p-2 w-auto text-center border-collapse border border-black"
                            style={{ width: key == "Action" && "200px" }}
                          >
                            {key == "Action" ? (
                              <>
                                {editableRow == data.id ? (
                                  <button
                                    className="p-2 border border-b-black rounded-lg gap-2 mr-[10px] "
                                    onClick={() => handleSave(data.id)}
                                  >
                                    Save
                                  </button>
                                ) : (
                                  <button
                                    className="p-2 border border-b-black rounded-lg gap-2 mr-[10px] "
                                    onClick={() => handleEdit(data.id)}
                                  >
                                    Edit
                                  </button>
                                )}
                                <button
                                  className="p-2 border border-b-black rounded-lg gap-2 "
                                  onClick={() => handleDelete(data.id)}
                                >
                                  Delete
                                </button>
                              </>
                            ) : editableRow == data.id ? (
                              <>
                                <input
                                  name={key}
                                  className="p-2  w-full"
                                  style={{ border: "1px solid #ccc" }}
                                  value={data[key]}
                                  onChange={(e) => handleEditChange(e, data.id)}
                                />
                              </>
                            ) : (
                              data[key]
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="absolute right-0 p-2 m-2">
            {page > 1 && (
              <button
                className="p-2 border border-b-black rounded-lg gap-2 mr-[10px] bg-slate-200 hover:bg-slate-100"
                onClick={() => setPage((prev) => prev - 1)}
              >
                {" "}
                Prev Page
              </button>
            )}
            {tableData.length > page * 5 && (
              <button
                className="p-2 border border-b-black rounded-lg gap-2 mr-[10px]  bg-slate-200  hover:bg-slate-100"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next Page
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
