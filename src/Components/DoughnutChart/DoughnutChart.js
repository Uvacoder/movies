import React from 'react';
import "./DoughnutChart.scss"
import { PieChart } from 'react-minimal-pie-chart';

const DOUGHNUT_CHART_LINE_WIDTH = 20;
const DOUGHNUT_CHART_LABEL_POSITION = 0;
const DOUGHNUT_CHART_START_ANGLE = 270;
const MAX_VALUE_COLOR = 'gold';

const DoughnutChart = (props) => {
    const {
        data,
        maxValue,
        chartColor,
        fontSize,
        fontColor,
        percent,
        background
    } = props;

    return (
      <PieChart
      data={[{ value: Math.min(data, maxValue), color: data >= maxValue ? MAX_VALUE_COLOR : chartColor }]}
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
  data: 25,
  maxValue: 100,
  chartColor: 'rgb(9, 197, 214)',
  fontSize: '25px',
  fontColor: 'rgb(9, 197, 214)',
  percent: true,
  background: "#a9ae9e26",
}
export default DoughnutChart