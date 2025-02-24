"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect,useState } from "react"
import axios from "axios"



function Oxyheartmin({prop}) {
  const [vitals,setvitals] = useState()
  console.log(prop)
  let newData = prop != undefined? prop.slice(0,7).map((obj) => {
    return {
      "Time" : obj.createdAt.slice(8, 10) + "/" +  obj.createdAt.slice(5, 7) + " " + obj.createdAt.slice(11, 13),
      "BPM":obj.heartRrate,
      "SpO2": obj.oxygenLevel,
    }
  }) : null
  console.log(newData)
const chartData = newData

const chartConfig = {
  desktop: {
    label: "Heart Rate (BPM)",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Oxygen Level (SpO2%)",
    color: "hsl(var(--chart-2))",
  },
}

  return (
    <Card>
      <CardHeader>
        <CardTitle className="">Vital Signs Overview</CardTitle>
        <CardDescription>{newData?.length 
            ? `Latest ${newData.length} readings` 
            : "No data available"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="BPM" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="SpO2" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        <div className="flex gap-2 font-medium leading-none">
          {newData?.[0] ? (
            <>
              Latest: {newData.reverse()[newData.length -1].BPM} BPM /{' '}
              {newData[0].SpO2}% SpO2
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            "No recent measurements"
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Normal ranges: 60-100 BPM (Heart Rate) / 95-100% (SpO2)
        </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Oxyheartmin