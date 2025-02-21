// import Component from "./barchart1"
import RealTemp from "./realtime_temp"
import RealBeat from "./realtime_heartbeat"
import RealOxy from "./realtime_oxyLevel"

function Dashboard(){
    return <div className="w-[100%]">
        {/* <Component/> */}
        <div className="flex flex-row items-center justify-evenly my-[30px]">
        <RealTemp/>
        <RealBeat/>
        <RealOxy/>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-[100%] mx-auto h-[400px]">
  <div className="bg-blue-500 text-white p-4 text-center">Column 1, Row 1</div>
  <div className="bg-green-500 text-white p-4 text-center row-span-2">Column 2, Row 1</div>
  <div className="bg-red-500 text-white p-4 text-center">Column 1, Row 2</div>  
</div>


    </div>
}
export default Dashboard