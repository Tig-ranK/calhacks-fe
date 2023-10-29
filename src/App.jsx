import {
   Center,
   Flex,
   Grid,
   RingProgress,
   Space,
   Text,
   Title,
} from "@mantine/core";
import "./App.css";
import {
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
} from "recharts";
import { emotions } from "./assets/emotions";

export const Ring = ({ emotion, intensity, color = "#101010" }) => (
   <RingProgress
      roundCaps
      label={
         <Text size="xs" ta="center">
            {emotion}
         </Text>
      }
      sections={[
         { value: intensity, color, tooltip: `${Math.round(intensity)}%` },
      ]}
   />
);

const colorOf = {
   joy: "#FFEB3B",
   anger: "#F44336",
   sadness: "#2196F3",
   fear: "#FF5722",
   surprise: "#4CAF50",
   disgust: "#9C27B0",
   trust: "#00BCD4",
   anticipation: "#FF9800",
};

function getLastWeekEntries(data) {
   const today = new Date();
   const lastWeekStartDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
   );
   const lastWeekEndDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
   );

   const formattedStartDate = lastWeekStartDate.toISOString().split("T")[0];
   const formattedEndDate = lastWeekEndDate.toISOString().split("T")[0];

   return data.filter(
      (entry) =>
         entry.date >= formattedStartDate && entry.date <= formattedEndDate
   );
}

// There should be only one entry per day in the data
// As daily reports are cumulative

const lastWeekEmotions = emotions.slice(-7);
const lastDayEmotions = emotions.at(-1);

function calculateAverage(data) {
   const averages = {};

   data.forEach((entry) => {
      for (const emotion in entry) {
         if (emotion !== "date") {
            if (!averages[emotion]) {
               averages[emotion] = 0;
            }

            averages[emotion] += entry[emotion];
         }
      }
   });

   // Calculate the average for each emotion
   for (const emotion in averages) {
      averages[emotion] /= data.length;
   }

   return averages;
}

// const weeklyAverages = calculateAverage();

const renderLineChart = (
   <LineChart
      width={600}
      height={300}
      data={lastWeekEmotions}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
   >
      {Object.keys(colorOf).map((emotion) => (
         <Line
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={colorOf[emotion]}
         />
      ))}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" name="Date" />
      <YAxis name="Intensity" />
      <Tooltip />
      <Legend />
   </LineChart>
);

function App() {
   return (
      <>
         <Grid>
            <Grid.Col span={6}>
               <Title>Today</Title>
               <Space h="xl" />
               <Flex wrap={"wrap"}>
                  {Object.keys(colorOf).map((emotion) => (
                     <Ring
                        key={emotion}
                        emotion={emotion}
                        intensity={lastDayEmotions[emotion] * 100}
                        color={colorOf[emotion]}
                     />
                  ))}
               </Flex>
               <Space h="xl" />
               <Title>Last Week</Title>
               <Space h="xl" />
               {renderLineChart}
            </Grid.Col>
            <Grid.Col span={6}>
               <Title>Highlight</Title>
               <Space h="xl" />
               <Text>
                  Given the notably high level of surprise this time, can you
                  think back to what might have sparked that surprising 0.69
                  feeling?
               </Text>
               <Space h="xl" />
               <Title>Action</Title>
               <Space h="xl" />
               <Text>
                  Consider exploring more of these unexpected experiences to add
                  an element of excitement to your routine. Embrace surprises as
                  opportunities for growth and new perspectives.
               </Text>
            </Grid.Col>
         </Grid>
      </>
   );
}

export default App;
