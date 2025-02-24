// import Component from "./barchart1"
import RealTemp from "./realtime_temp"
import RealBeat from "./realtime_heartbeat"
import RealOxy from "./realtime_oxyLevel"
import Oxyheartmin from "./oxy-heart"
import Aiprompt from "./aiprompt"
import { Toaster, toast } from 'sonner';
import { SidebarTrigger } from "./components/ui/sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import TemperatureBar from "./temp_bar"
import { ButtonWithIcon } from "./button"
import {database} from "./firebase.js"
import { ref, onValue } from "firebase/database";

function Dashboard(prop){
    const [heart, setheart] = useState(0)
    const [oxtl, setoxyl] = useState(0)
    const [temp, settemp] = useState(0)

    async function Post(){
    const dataRef = ref(database, "SensorData/HeartRate");
    onValue(dataRef, (snapshot) => {
      const HeartRate = snapshot.val(); 
       setheart(HeartRate)
    })

    const datRef = ref(database, "SensorData/SpO2");
    onValue(datRef, (snapshot) => {
      const SpO2 = snapshot.val(); 
       setoxyl(SpO2)
    })

    const daRef = ref(database, "SensorData/Temperature");
    onValue(daRef, (snapshot) => {
      const Temperature= snapshot.val(); 
       settemp(Temperature)
    })

    try {
        if (temp < 1) {
            throw new Error("Temperature is not found");
        }
        if (heart < 1) {
            throw new Error("Heart Rate is not found");
        }
        if (oxtl < 1) {
            throw new Error("Oxygen Level is not found");
        }
        
        const response = await axios.post("https://health-vitals-api.onrender.com/postVitals", {
            temperature: temp,
            heartRate: heart,
            OxygenLevel: oxtl
        }, {
            headers: { "Content-Type": "application/json" }
        });
    
        console.log("Response:", response.data);
        toast.success(response.message)
    } catch (error) {
        toast.error(error.message)
        console.log(error.message)
    }
    

    }


    return <div className=" bg-white w-[100%]">
        <div className="flex flex-row items-center justify-evenly my-[30px]">
        <RealTemp/>
        <RealBeat/>
        <RealOxy/>
        </div>
    <div><ButtonWithIcon onClick={Post}/></div>
        <div className="sm:grid grid-cols-2 gap-4 w-full max-w-[100%] mx-auto sm:h-[400px] h-[300px]">
  <div className=" text-white p-4 text-center"><Oxyheartmin prop={prop.prop}/></div>
  <div className=" text-white p-4 text-center row-span-2"><Aiprompt prop={prop.prop}/></div>
  <div className=" text-white p-4 text-center"><TemperatureBar prop={prop.prop}/></div>  
  <Toaster className="text-black"/>
</div>


    </div>
}
export default Dashboard