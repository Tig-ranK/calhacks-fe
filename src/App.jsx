import { Flex, RingProgress, Space, Title } from "@mantine/core";
import "./App.css";
import {
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
} from "recharts";
import { emotions } from "./assets/emotions";

export const Ring = ({ emotion, intensity, color = "#101010" }) => (
   <RingProgress label={emotion} sections={[{ value: intensity, color }]} />
);

const renderLineChart = (
   <LineChart
      width={600}
      height={300}
      data={emotions}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
   >
      <Line type="monotone" dataKey="joy" stroke="#8884d8" />
      <Line type="monotone" dataKey="anger" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" name="Date" />
      <YAxis name="Intensity" dataKey={date} />
      <Tooltip />
   </LineChart>
);

function App() {
   return (
      <>
         {/* <Today />  */}
         <Title>Today</Title>
         <Space h="xl" />
         <Flex>
            <Ring emotion="Admiration" intensity={40} />
            <Ring emotion="Admiration" intensity={40} />
            <Ring emotion="Admiration" intensity={40} />
            <Ring emotion="Admiration" intensity={40} />
            <Ring emotion="Admiration" intensity={40} />
         </Flex>
         <Title>Last Week</Title>
         <Space h="xl" />
         {renderLineChart}
         {/* <LastWeek /> */}
      </>
   );
}

export default App;
