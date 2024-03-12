export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number)
}

export const isIllegalTemperature = (obj) => {
  if (!(obj.avgTemp && obj.minTemp && obj.maxTemp)) {
    return false;
  }
  return true;
}

export const isIllegalNumber = (number) => {
  const num = parseInt(number, 10);
  return Number.isInteger(num) && num >= 1;
}

export const extractDetails = (field) => {
  const result = {
    cityName: "city",
    stateName: "state",
    year: "year"
  };

  return result[field];
};

export const checkRegionNull = (region) => {
  return region === null;
}
