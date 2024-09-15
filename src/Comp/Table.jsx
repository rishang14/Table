import React, { useEffect, useState } from 'react'
import InputComp from './FormInput';

const Table = () => {  
    const [tableData,setTableData]=useState([]);
    useEffect(()=>{
     console.log(tableData)
    },[tableData])
  return (
   <> 
   <InputComp setData={setTableData} tabledata={tableData}/>
   </>
  )
};

export default Table;