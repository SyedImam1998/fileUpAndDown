import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await axios.get("http://localhost:4000/getAllData");
        console.log("data", data);
        setData(data.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAllData();
  }, []);

  const uploadFileFun = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imamfile", file); /// this name and backend name must be same
    const data = await axios.post("http://localhost:4000/uploadFile", formData);
    console.info(data);
  };

  const fileAdded = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <form onSubmit={uploadFileFun}>
        <input type="file" name="imamfile1" onChange={fileAdded}></input>
        <button type="submit">Upload File</button>
      </form>
      <br></br>

      {data.length > 0 && data.map((item,index)=>{
        return <div key={index+1} className="">
          <img src={`http://localhost:4000/${item.profilePic}`} alt={item._id}/>
        </div>;
      })}
    </div>
  );
}

export default App;
