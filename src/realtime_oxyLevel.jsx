import {database} from "./firebase.js"
import { useEffect, useState  } from "react"
import { ref, onValue } from "firebase/database";
function RealOxy(){

    
    const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, "OxygenLevel");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);


    return <div className=" bg-black shadow-md sm:h-[200px] sm:w-[250px] h-[110px] w-[100px] rounded-t-[28px] rounded-bl-[17px] sm:p-[30px] p-[15px] rounded-br-none flex flex-col items-center justify-around">
        <div className="flex flex-row items-center justify-evenly ">
            <p className="font-sans text-[#cfcdcd] sm:text-[25px] text-[15px]">Oxygen Level</p><br/>
            </div>
        <h1 className="sm:text-[40px] text-center font-sans font-semibold text-[20px] w-[100%]">{data}%</h1>
    </div>
}

export default RealOxy