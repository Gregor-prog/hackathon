import { LifeLine } from "react-loading-indicators"
import PromptAI from "./propmptAIbutton"
// import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
function Aiprompt({prop}){
    const [promptl,setpromptl] = useState("")
    console.log(prop.map((obj) => obj.temperature ))

    async function prompt(){
        console.log("okay")
    const genAI = new GoogleGenerativeAI("AIzaSyDzBWoOg0EpIPxQrCQWDv-npcP8YNIRhow");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `**Role**: You are an experienced medical AI assistant analyzing patient vital signs. 
Provide professional, evidence-based recommendations while maintaining empathy. 
Your analysis should consider:

**Patient Data** (last 20 entries):
{Insert formatted vital data here with: 
- Timestamp (ISO format)
- Heart Rate (BPM) 
- SpO2 (%) 
- Temperature (°C/F)
}

patients data: ${JSON.stringify(prop.map((obj) => {
    return{
        "created At" : obj.createdAt,
        "heart Rate" : obj.heartRrate,
        "oxygen Level":obj.oxygenLevel,
        "temperature":obj.temperature
    }
}).reverse())}
with the trend in patients health, with emphasis focused on the most latest and recent data,like the most latest data you can find the dataset and display the most latest data too, when is the latest date? and talk about the health trend
**Quick Analysis**:
1. 🔍 Identify 1-2 main concerns
2. ⚠️ Highlight urgent issues (if any)
3. 💡 Suggest 3 simple actions

**Format**:
"🔔 Main Concern: [1-sentence summary]

🚨 Urgent: [Yes/No] 
   - If yes: [1 critical action]

📋 Next Steps:
   - [Action 1]
   - [Action 2]
   - [Action 3]

*Always consult a doctor for medical advice*"


`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text())
    result?setpromptl(result.response.text()): null;
    }


    return <div className="bg-white shadow-xl sm:h-[100%] sm:text-[30px] w-[100%] rounded-t-[28px] rounded-bl-[17px] p-[30px] rounded-br-none flex flex-col items-center justify-around border border-[6px]">
        <PromptAI onClick={prompt}/>
        {promptl == ""?<LifeLine color="black" size="medium" text="" textColor="" className="h-[10px] w-[10px]"/>:<p className="text-[15px] text-[black]">{promptl}</p>}
        <div className="text-black">
            <p>AI prompt</p>
            <p>gives suggestions and advises based off of your vitals...</p>
        </div>
    </div>
}

export default Aiprompt