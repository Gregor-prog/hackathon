import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon(prop) {
    function run(){
        console.log("okay")
    }
  return (
    <Button className="bg-black text-white hover:bg-gray-900" onClick={prop.onClick}>
      <Send /> register vitals
    </Button>
  )
}
