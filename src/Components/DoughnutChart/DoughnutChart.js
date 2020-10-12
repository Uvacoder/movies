import React from 'react';
import "./DoughnutChart.scss"
import { PieChart } from 'react-minimal-pie-chart';

const DOUGHNUT_CHART_LINE_WIDTH = 20;
const DOUGHNUT_CHART_LABEL_POSITION = 0;
const DOUGHNUT_CHART_START_ANGLE = 270;
const COLOR_OF_10_PERCENT = '#800000B3'
const COLOR_OF_20_PERCENT = '#FF0000B3'
const COLOR_OF_30_PERCENT = '#FF7F50B3'
const COLOR_OF_40_PERCENT = '#FFA500B3'
const COLOR_OF_50_PERCENT = '#FFFF00B3'
const COLOR_OF_60_PERCENT = '#9ACD32B3'
const COLOR_OF_70_PERCENT = '#7CFC00B3'
const COLOR_OF_80_PERCENT = '#00FF7FB3'
const COLOR_OF_90_PERCENT = '#00FF00B3'
const COLOR_OF_100_PERCENT = '#00BFFFB3'

const DoughnutChart = (props) => {
    const {
        data,
        maxValue,
        fontSize,
        fontColor,
        percent,
        background
    } = props;
    
  const getColor = () => {
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
    if (data >=  maxValue) {
      return COLOR_OF_100_PERCENT
    }
  }

  return (
    <PieChart
    data={[{ value: Math.min(data, maxValue), color: getColor()}]}
    totalValue={maxValue}
    lineWidth={DOUGHNUT_CHART_LINE_WIDTH}
    label={({ dataEntry }) => percent ? `${dataEntry.value}%` : dataEntry.value}
    labelStyle={{
      fontSize,
      fill: fontColor,
    }}
    labelPosition={DOUGHNUT_CHART_LABEL_POSITION}
    background={background}
    startAngle={DOUGHNUT_CHART_START_ANGLE}
    onClick={ props.onClick }
    />     
  );
};

DoughnutChart.defaultProps = {
  data: 0,
  maxValue: 100,
  fontSize: '25px',
  fontColor: 'rgb(9, 197, 214)',
  percent: true,
  background: "#a9ae9e26",
}
export default DoughnutChart