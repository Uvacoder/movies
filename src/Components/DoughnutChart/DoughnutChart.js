import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { getColor } from './DoughnutChartUtil'

const DOUGHNUT_CHART_LINE_WIDTH = 20;
const DOUGHNUT_CHART_LABEL_POSITION = 0;
const DOUGHNUT_CHART_START_ANGLE = 270;

const DoughnutChart = (props) => {
  const {
    data,
    maxValue,
    fontSize,
    fontColor,
    percent,
    background
  } = props;
console.log(props)
  return (
    <PieChart
      data={[{ 
        value: Math.min(data, maxValue), 
        color: getColor(data, maxValue)
      }]}
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
      animate={ true }
      animationDuration = { 2000 }
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
};

export default DoughnutChart