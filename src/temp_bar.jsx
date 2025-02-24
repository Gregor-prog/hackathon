"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


 function TemperatureBar({prop}) {

    let newData = prop != undefined? prop.slice(0,7).map((obj) => {
        return {
          "Time" : obj.createdAt.slice(8, 10) + "/" +  obj.createdAt.slice(5, 7) + " " + obj.createdAt.slice(11, 13),
          "Temperature":obj.temperature,
        }
      }).reverse() : null
      console.log(newData)
    const chartData = newData
    
      const chartConfig = {
        desktop: {
          label: "Temperature",
          unit: "°C",
          color: "hsl(var(--chart-1))",
        },
        mobile: {
          label: "Mobile",
          color: "hsl(var(--chart-2))",
        },
      };
      
  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Temperature Trends</CardTitle>
        <CardDescription>{prop?.length ? `Latest ${prop.length} readings` : "No temperature data available"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="Temperature"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
        {prop?.[0]?.temperature 
      ? `Latest reading: ${prop[0].temperature}°C`
      : "No recent measurements"} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
        {prop?.length ? `Showing last ${newData.length} measurements` : ""}
        </div>
      </CardFooter>
    </Card>
  );
}

export default TemperatureBar