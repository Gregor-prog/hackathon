import { LifeLine } from "react-loading-indicators"
import PromptAI from "./propmptAIbutton"
// import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react"; 
import { Mosaic } from "react-loading-indicators"
function Aiprompt({prop}){
    const [promptl,setpromptl] = useState("")
    const [load, setload] = useState(false)
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
with the trend in patients health, with emphasis focused on the most latest and recent data,and talk about the health trend
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
note: dont use amigeous medical terms, use terms that even the most naive person would understand, remember, you are talking to the patient and not a medical practitioner

`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text())
    result?setpromptl(result.response.text()): null;
    Promptfunc()
    }

    function Promptfunc(){
        console.log("propmptfunc")
        setload(true)
        return <>
        {promptl == ""? <Mosaic color="black" size="medium" text="" textColor="" /> : <p className="text-whitw text-[20px]">{promptl}</p>}
        </>
    }


    return <div className="w-full h-auto bg-background shadow-md rounded-t-2xl rounded-bl-lg rounded-br-none p-6 flex flex-col items-center justify-center gap-4 border-2 border-primary">
  <PromptAI onClick={prompt} />
  
  {load ? (
    <Promptfunc className="text-white"/>
  ) : (
    <LifeLine 
      color="white" 
      size="md" 
      className="h-4 w-4 text-muted-foreground"
    />
  )}

  <div className="text-center space-y-1">
    <p className="text-sm font-medium text-foreground">AI Health Assistant</p>
    <p className="text-sm text-muted-foreground">
      Provides personalized health insights based on your vital signs
    </p>
  </div>
</div>
}

export default Aiprompt