import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const bgColor = "rgb(255, 218, 149)";


const formatBigNumber = (value) => {
  const abbreviations = {
    B: 1000000000,
    M: 1000000,
    K: 1000,
  };

  for (const key in abbreviations) {
    if (Math.abs(value) >= abbreviations[key]) {
      return `${(value / abbreviations[key]).toFixed(1)}${key}`;
    }
  }

  return value.toString();
};
export const PopulationChart = (props) => {

  const { dataList, chartTitle, domain } = props;
  return (
    <div>
      <hr></hr>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>{chartTitle}</h1>
      </div>
      <ResponsiveContainer height={600} width="100%">
        <BarChart data={dataList}>
          <Bar dataKey="population"
            fill={bgColor}
            radius={[10, 10, 0, 0]}
          />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={formatBigNumber} domain={domain} />
          <Tooltip
            contentStyle={{ borderRadius: '10px', backgroundColor: "grey", color: "white" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const TemperatureChart = (props) => {
  const { dataList, chartTitle, domain } = props;
  return (
    <div style={{ margin: "50px 0px" }}>
      <hr></hr>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>{chartTitle}</h1>
      </div>
      <ResponsiveContainer height={600} width="100%">
        <LineChart data={dataList}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="maxTemp" stroke="#fc0303" />
          <Line type="monotone" dataKey="avgTemp" stroke="#fc5a03" />
          <Line type="monotone" dataKey="minTemp" stroke="#fcb103" />
          <XAxis dataKey="year" />
          <YAxis domain={domain} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export const WorldPopulationRanking = (props) => {

  const { dataList, chartTitle } = props;
  return (
    <div>
      <hr></hr>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h1>{chartTitle}</h1>
      </div>
      <ResponsiveContainer height={2000} width="100%" >
        <BarChart width={600} height={300} data={dataList} layout="vertical" margin={{ left: 40 }}>
          <XAxis type="number" domain={[17000, 7230000000]} />
          <YAxis dataKey="countryName" type="category" />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip
            contentStyle={{ borderRadius: '10px', backgroundColor: "grey", color: "white" }}
          />
          <Legend />
          <Bar dataKey="population"
            fill={bgColor}
            radius={[0, 10, 10, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}