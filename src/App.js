import "./App.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tableData , setTableData] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(()=>{
      const total = tableData.reduce((total, row) => (total = total + Number(row.salary)),0);
      setTotalSalary(total);
  },[tableData])

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = () => {
    axios
    .get("https://sheet.best/api/sheets/e26e8d72-78d3-4d24-9e4e-8550990dd941")
    .then((res) => {
     console.log(res)
     setTableData(res.data);
    })
  }


  const submitFormToGoogle = (data) => {
    axios
      .post(
        "https://sheet.best/api/sheets/e26e8d72-78d3-4d24-9e4e-8550990dd941",
        data
      )
      .then((res) => {
        alert("Row Successfully Added");
        console.log(res);
        setTableData([...tableData , data])
      })
      .catch((err) => alert(err.message));
  };

  
  return (
    <div className="contactForm">
    
         <table>
         {tableData.map(({name,age,salary,hobby}) => (
          <>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Hobby</th>
            </tr>

            <tr>
              <td>{name}</td>
              <td>{age}</td>
              <td>{salary}</td>
              <td>{hobby}</td>
            </tr>

            
          </>
          ))}
         </table>

         <h2>THE TOTAL SALARIES ${totalSalary}</h2>
    

      <form onSubmit={handleSubmit(submitFormToGoogle)}>
        <TextField
          name="name"
          {...register("name", { required: true })}
          error={errors.name}
          helperText={errors.name && "The Name Is Required"}
          label="Name"
        />
        <TextField
          name="age"
          {...register("age", { required: true })}
          error={errors.age}
          helperText={errors.age && "The Age Is Required"}
          label="Age"
        />
        <TextField
          name="salary"
          {...register("salary", { required: true })}
          error={errors.salary}
          helperText={errors.salary && "The Salary Is Required"}
          label="Salary"
        />
        <TextField
          name="hobby"
          {...register("hobby", { required: true })}
          error={errors.hobby}
          helperText={errors.hobby && "The Hobby Is Required"}
          label="Hobby"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default App;
