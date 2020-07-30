import React from 'react';
import "./DoughnutChart.scss"
import { PieChart } from 'react-minimal-pie-chart';

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
        data={[{ value: data, color: chartColor }]}
        totalValue={maxValue}
        lineWidth={20}
        label={({ dataEntry }) => percent ? `${dataEntry.value}%` : dataEntry.value}
        labelStyle={{
          fontSize,
          fill: fontColor,
        }}
        labelPosition={0}
        background={background}
        startAngle={270}
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