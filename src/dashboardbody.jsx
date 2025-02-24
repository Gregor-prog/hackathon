// import Component from "./barchart1"
import RealTemp from "./realtime_temp"
import RealBeat from "./realtime_heartbeat"
import RealOxy from "./realtime_oxyLevel"
import Oxyheartmin from "./oxy-heart"
import Aiprompt from "./aiprompt"
import { SidebarTrigger } from "./components/ui/sidebar"
import { useEffect, useState } from "react"
import axios from "axios"
import TemperatureBar from "./temp_bar"

function Dashboard(prop){

    return <div className=" bg-white w-[100%]">
        <div className="flex flex-row items-center justify-evenly my-[30px]">
        <RealTemp/>
        <RealBeat/>
        <RealOxy/>
        </div>

        <div className="sm:grid grid-cols-2 gap-4 w-full max-w-[100%] mx-auto sm:h-[400px] h-[300px]">
  <div className=" text-white p-4 text-center"><Oxyheartmin prop={prop.prop}/></div>
  <div className=" text-white p-4 text-center row-span-2"><Aiprompt/></div>
  <div className=" text-white p-4 text-center"><TemperatureBar prop={prop.prop}/></div>  
</div>


    </div>
}
export default Dashboard