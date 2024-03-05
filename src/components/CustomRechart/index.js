import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export const CustomRechart = (props) => {

  const { dataList, dataListKey } = props;
  <ResponsiveContainer height={600} width="100%">
    <BarChart data={dataList}
      margin={{ left: 35 }}>
      <Bar dataKey={dataListKey} fill="green" />
      <XAxis dataKey="year" />
      <YAxis />
    </BarChart>
  </ResponsiveContainer>
}