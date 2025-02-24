import { SidebarTrigger } from "./components/ui/sidebar"
import  AppSidebar  from "./sidebar"
import { DashboardSkeleton } from "./dashboardskeleton"
import { useEffect, useState } from "react"

function App(){
  const [info, setinfo] = useState([])
  useEffect(() =>{
    async function getData(){
      try {
    // let response= await axios.get("https://health-vitals-api.onrender.com/getVitals")
    // let data = await response.data 
    //   setvitals(data)
    //   console.log(data)
    //   console.log(vitals)
    let response = await fetch("https://health-vitals-api.onrender.com/getVitals")
    let data = await response.json()
    data ? setinfo(data) : null
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    console.log(info)
  },[])
  
  
  return <div className=" bg-[white] w-[100vw]">
  {console.log(info)}
  {info.length === 0 ? <DashboardSkeleton/>: < AppSidebar data={info.data}/>}
  </div>
}

export default App