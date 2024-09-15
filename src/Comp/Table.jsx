import React, { useEffect, useState } from "react";
import InputComp from "./FormInput";
import { data } from "autoprefixer";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  let keys;
  if (tableData.length > 0) {
    keys = Object.keys(tableData[0]).filter((key) => key !== "id");
    keys.push("Action");
  } 

  //HELPER FUNCTION 
  function filterLogic(item,id){
    return item.id !== id
  }

  const handleDelete = (id) => {
    //filter based on id
    const newdata = tableData.filter(item => filterLogic(item,id)); 
    //get data from localestorage 
    const StorageData=JSON.parse(localStorage.getItem("usersDetails")) 
    const filteredData=StorageData.filter(item => filterLogic(item,id))
    //update localstorage and table with new data
     localStorage.setItem("usersDetails", JSON.stringify(filteredData));
     setTableData(newdata);
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
                              <button className="p-2 border border-b-black rounded-lg gap-2 mr-[10px] ">
                                Edit
                              </button>
                              <button
                                className="p-2 border border-b-black rounded-lg gap-2 "
                                onClick={() => handleDelete(data.id)}
                              >
                                Delete
                              </button>
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
