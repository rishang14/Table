import React, { useEffect, useState } from "react";
import InputComp from "./FormInput";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [editableRow, setEditableRow] = useState("");
  let keys;
  if (tableData.length > 0) {
    keys = Object.keys(tableData[0]).filter((key) => key !== "id");
    keys.push("Action");
  }

  //HELPER FUNCTION
  function filterLogic(item, id) {
    return item.id !== id;
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

  return (
    <>
      <InputComp setData={setTableData} tabledata={tableData} />
      <div className="w-[80%] m-auto p-[4]">
        {tableData.length > 0 && (
          <table
            className="w-[100%]  "
            style={{ borderCollapse: "collapse", border: "1px solid black" }}
          >
            <thead>
              <tr className=" border-collapse ">
                <th style={{ border: "1px solid black", width: "50px" }}>
                  No.
                </th>
                {keys.map((keys) => {
                  return (
                    <th
                      className="w-[auto] border-collapse border  border-black"
                      key={keys}
                    >
                      {keys}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="p-2  text-center border-collapse border border-black">
                      {index + 1}
                    </td>
                    {keys.map((key) => {
                      return (
                        <td
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
      </div>
    </>
  );
};

export default Table;
