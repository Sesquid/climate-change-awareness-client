import style from "./style.module.css"
import Loading from "../../components/Loading";
import { useRegionNumber } from "../../hooks/useRegion";
import { useYearRange } from "../../hooks/useYearRange";
import { useAllCountriesPopulation, useCountryPopulation } from "../../hooks/usePopulation";
import { useWorldTemperature } from "../../hooks/useTemperature";
import { PopulationChart, TemperatureChart, WorldPopulationRanking } from "../../components/CustomRechart";
const Overview = () => {

  const { data: numberOfRegions, isLoading: isNumberOfRegionsLoading } = useRegionNumber();
  const { data: dataYearRange, isLoading: isYearRangeLoading } = useYearRange();
  const { data: worldPopulation, isLoading: isWorldPopulationLoading } = useCountryPopulation("WLD");
  const { data: worldTemperature, isLoading: isWorldTemperatureLoading } = useWorldTemperature();
  const { data: allCountriesPopulation, isLoading: isAllCountriesPopulationLoading } = useAllCountriesPopulation(2013);

  if (isNumberOfRegionsLoading || isYearRangeLoading || isWorldPopulationLoading
    || isWorldTemperatureLoading || isAllCountriesPopulationLoading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <div className={style.overview_title}>
        <div>Climate Change Awareness</div>
      </div>
      <div className={style.overview_body}>
        <div className={`col-3`}></div>
        {Object.entries(numberOfRegions ?? {}).map(([key, value]) => {
          return (
            <div key={key} className={`col-2 ${style.number_of_regions_cell}`}>
              NUMBER OF {key.toUpperCase()}
              <br></br>
              {value}
            </div>
          )
        })}
        <div className={`col-3`}></div>
      </div>

      <div className={style.overview_body}>
        <div className={`col-3`}></div>
        {Object.entries(dataYearRange ?? {}).map(([key, value]) => {
          return (
            <div key={key} className={`col-2 ${style.year_range_cell}`}>
              {key.toUpperCase()} {key !== "population" ? "TEMPERATURE DATA" : "DATA"}
              <br></br>
              {value.startYear} - {value.endYear}
            </div>
          )
        })}
        <div className={`col-3`}></div>
      </div>
      <div className={style.chart_site}>
        <PopulationChart
          dataList={worldPopulation}
          chartTitle="World Population"
          domain={[2000000000, 7230000000]}
        ></PopulationChart>
        <TemperatureChart
          dataList={worldTemperature}
          chartTitle="World Temperature"
          domain={[-3, 20]}
        ></TemperatureChart>
        <WorldPopulationRanking
          dataList={allCountriesPopulation}
          chartTitle="World Population Ranking in 2013"
        ></WorldPopulationRanking>
      </div>
    </div>

  )
}

export default Overview;

