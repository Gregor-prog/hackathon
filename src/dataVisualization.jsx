import Oxy_bar from "./oxy-heartbbar"
import Temp_Bbar from "./temp_Bbar"
import Tablecom from "./table"

// page.tsx
import { Card } from "@/components/ui/card"

 function DataVisualization(prop) {
  return (
    <div className="p-6 space-y-6 max-w-full">
      {/* --- First Chart Slot --- */}
      <Card className="p-4">
        {/* Your first chart component goes here */}
        <Oxy_bar prop={prop.prop}/>
        {console.log(prop.prop)}
      </Card>

      {/* --- Second Chart Slot --- */}
      <Card className="p-4">
        {/* Your second chart component goes here */}
        <Temp_Bbar prop={prop.prop}/>
      </Card>
      
      <Card className="p-4">
        {/* Your table component goes here */}
        <Tablecom  prop={prop.prop}/>
      </Card>
    </div>
  )
}

export default DataVisualization