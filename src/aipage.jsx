import { LifeLine } from "react-loading-indicators"
import PromptAI from "./propmptAIbutton"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState } from "react"

function Aipromptpage({ prop }) {
    const [promptl, setPromptl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handlePrompt() {
        setIsLoading(true)
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyDzBWoOg0EpIPxQrCQWDv-npcP8YNIRhow")
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

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

            const result = await model.generateContent(prompt)
            const text = await result.response.text()
            setPromptl(text)
        } catch (error) {
            setPromptl("⚠️ Error generating analysis. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const formatResponse = (text) => {
        return text.split('\n').map((line, index) => {
            let icon = ''
            if (line.includes('🔔')) icon = '🔼'
            if (line.includes('🚨')) icon = '⚠️'
            if (line.includes('📋')) icon = '📝'
            
            return (
                <p key={index} className={`text-lg mb-3 ${line.includes('🚨') ? 'text-red-600 font-semibold' : ''}`}>
                    {icon && <span className="mr-2">{icon}</span>}
                    {line.replace(/^\*\*/, '').replace(/\*\*$/, '')}
                </p>
            )
        })
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl mx-auto my-8 border border-gray-200 transition-all duration-300 hover:shadow-2xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Health Analysis Assistant</h2>
                <p className="text-gray-600 text-lg">AI-powered insights based on your vital signs</p>
            </div>

            <div className="flex flex-col items-center gap-6 text-black">
                <PromptAI 
                    onClick={handlePrompt}
                    className="transform transition-transform hover:scale-105"
                />

                <div className="w-full min-h-[300px] bg-gray-50 rounded-xl p-6 transition-all duration-300">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <LifeLine color="#4F46E5" size="large" />
                            <p className="mt-4 text-black">Analyzing your health data...</p>
                        </div>
                    ) : promptl ? (
                        <div className="space-y-4 prose max-w-none">
                            {formatResponse(promptl)}
                            <p className="text-sm text-black mt-6 italic">
                                *Always consult a healthcare professional for medical advice
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="mt-4">Click the button to generate health analysis</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                Analysis based on last 20 readings | Updated in real-time
            </div>
        </div>
    )
}

export default Aipromptpage