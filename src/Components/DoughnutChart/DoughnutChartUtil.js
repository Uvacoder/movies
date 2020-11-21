const COLOR_OF_10_PERCENT = '#800000B3'
const COLOR_OF_20_PERCENT = '#FF0000B3'
const COLOR_OF_30_PERCENT = '#FF7F50B3'
const COLOR_OF_40_PERCENT = '#FFA500B3'
const COLOR_OF_50_PERCENT = '#FFFF00B3'
const COLOR_OF_60_PERCENT = '#9ACD32B3'
const COLOR_OF_70_PERCENT = '#96FF00B3'
const COLOR_OF_80_PERCENT = '#7CFC00B3'
const COLOR_OF_90_PERCENT = '#00FF7FB3'
const COLOR_OF_100_PERCENT = '#00FF00B3'
const COLOR_OF_EQUAL_100_PERCENT = '#00BFFFB3'

export const getColor = (data, maxValue) => {
  if (data <= (0.1 * maxValue)) {
    return COLOR_OF_10_PERCENT
  }
  if (data <= (0.2 * maxValue)) {
    return COLOR_OF_20_PERCENT
  }
  if (data <= (0.3 * maxValue)) {
    return COLOR_OF_30_PERCENT
  }
  if (data <= (0.4 * maxValue)) {
    return COLOR_OF_40_PERCENT
  }
  if (data <= (0.5 * maxValue)) {
    return COLOR_OF_50_PERCENT
  }
  if (data <= (0.6 * maxValue)) {
    return COLOR_OF_60_PERCENT
  }
  if (data <= (0.7 * maxValue)) {
    return COLOR_OF_70_PERCENT
  }
  if (data <= (0.8 * maxValue)) {
    return COLOR_OF_80_PERCENT
  }
  if (data <= (0.9 * maxValue)) {
    return COLOR_OF_90_PERCENT
  }
  if (data < maxValue) {
    return COLOR_OF_100_PERCENT
  }
  if (data >=  maxValue) {
    return COLOR_OF_EQUAL_100_PERCENT
  };
};