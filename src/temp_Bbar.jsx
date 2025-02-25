"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];



function Temp_Bbar({prop}) {
    let newData = prop != undefined? prop.splice(0,9).map((obj) => {
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
          color: "hsl(var(--chart-1))",
        },
      };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Bar</CardTitle>
        <CardDescription>Latest vital trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Temperature" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      
      </CardFooter>
    </Card>
  );
}

export default Temp_Bbar;
