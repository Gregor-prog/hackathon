import { HeartPulse } from "lucide-react"

import { Button } from "@/components/ui/button"

function PromptAI({onClick}) {
    

  return (
    <Button className="bg-black text-white hover:bg-gray-900" onClick={onClick}>
      <HeartPulse /> Prompt
    </Button>
  )
}

export default PromptAI