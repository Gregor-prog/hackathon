import { LifeLine } from "react-loading-indicators"
function Aiprompt(){
    return <div className="bg-white shadow-xl h-[100%] w-[100%] rounded-t-[28px] rounded-bl-[17px] p-[30px] rounded-br-none flex flex-col items-center justify-around border border-[6px]">
        <LifeLine color="black" size="medium" text="" textColor="" />
        <div className="text-black">
            <p>AI prompt</p>
            <p>gives suggestions and advises based off of your vitals...</p>
        </div>
    </div>
}

export default Aiprompt