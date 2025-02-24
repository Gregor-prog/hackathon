import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  
function Tablecom({prop}) {
    let count = 0
    const data = prop.map((obj) => {
        count += 1
        return {
            index : count,
            heartRate: obj.heartRrate,
            oxygenLevel: obj.oxygenLevel,
            temperature: obj.temperature,
            Time: obj.createdAt.slice(0, 10) + " " + obj.createdAt.slice(11, 16)
        }
    })
    console.log(data)


    return (
      <Table>
        <TableCaption>A list of your recent vital readings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>Heart Rate (BPM)</TableHead>
            <TableHead>Oxygen Level (%)</TableHead>
            <TableHead className="text-right">Temperature (°C)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((reading) => (
          <TableRow key={reading.index}>
            <TableCell className="font-medium">{reading.index}</TableCell>
            <TableCell>{reading.heartRate} BPM</TableCell>
            <TableCell>{reading.oxygenLevel} %</TableCell>
            <TableCell>{reading.temperature} °C</TableCell>
            <TableCell className="text-right">{reading.time}</TableCell>
          </TableRow>
        ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  
  export default Tablecom