import React, { Component } from 'react';
// import Highcharts from 'highcharts';
// import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea, ResponsiveContainer  } from 'recharts';
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import ScaleLoader from 'react-spinners/ScaleLoader'

const now = new Date()

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

// Colors for line graphs. Same for CumulativeReturn.js and Drawdowns.js
const COLORS = 
  [
    '#E69F00', '#009E73', '#0072B2', '#D55E00'
  ];

const OPTIONS = {
  chart: {
    zoomType: 'x'
  },

  yAxis: {
    labels: {
        formatter: function () {
          return (this.value > 0 ? ' + ' : '') + (Math.abs(this.value) >= 1000 ? this.value / 1000 + 'K': this.value)
        }
    },
    plotLines: [{
        value: 0,
        width: 2,
        color: 'silver'
    }],
    title: {
      text: '%'
    },
    opposite:false
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      day: '%b %d, %Y'    //ex- 01 Jan 2016
    }
  },
  plotOptions: {
      series: {
          // compare: 'percent',
          showInNavigator: true
      }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
    valueDecimals: 2,
    valueSuffix: ' %',
    shared: false,
    xDateFormat:  '%b %d, %Y',

  },
  legend: { 
    enabled: true,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom'
  },
  title: {
      text: 'Cumulative Return'
  },
  subtitle: {
      text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
  },      
  series: []
}


class CumulativeReturnHighChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartOptions: OPTIONS,
    } 
    this.updateChart = this.updateChart.bind(this)
  }

  render() {
    const { chartOptions } = this.state;
    return (
      <div className="chart-box">
        {this.state.chartOptions.series[0] &&
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={chartOptions}
          oneToOne={false}
        />
        }
        { !this.state.chartOptions.series[0] &&
          <div className="blank-chart">
            { this.props.events.loading && 
              <div className="blank-chart">
                <ScaleLoader
                  sizeUnit={"px"}
                  height={40}
                  width={5}
                  margin={"2px"}
                  color={'#666666'}
                  loading={true}
                />
              </div>
            }
            { !this.props.events.loading &&
              <div className="blank-chart">
                Please press "Submit" to build your personal index
              </div>
            }
          </div>
        }
      </div>
    );
  }
  updateChart() {
    if (this.props.events.data) {

      let series = [ 
        {
          name: 'your portfolio with rebalancing',
          data: [],
          marker: {
            enabled: true,
            radius: 3
          },
          color: COLORS [0]
        },
        {
          name: 'your portfolio without rebalancing',
          data: [],
          marker: {
            enabled: true,
            radius: 3
          },
          color: COLORS [1]
        },
        {
          name: 'customized benchmark with rebalancing',
          data: [],
          marker: {
            enabled: true,
            radius: 3
          },
          color: COLORS [2]
        },
        {
          name: 'customized benchmark without rebalancing',
          data: [],
          marker: {
            enabled: true,
            radius: 3
          },
          color: COLORS [3]
        }
      ]

      for (let i = 0; i < this.props.events.data.portfolioReturn.length; i++ ) {
        series[0].data.push([this.props.events.data.portfolioReturn[i].date, this.props.events.data.portfolioReturn[i].portfolioRebalancedCumReturn*100])
        series[1].data.push([this.props.events.data.portfolioReturn[i].date, this.props.events.data.portfolioReturn[i].portfolioNotRebalancedCumReturn*100])
        series[2].data.push([this.props.events.data.portfolioReturn[i].date, this.props.events.data.portfolioReturn[i].benchmarkRebalancedCumReturn*100])
        series[3].data.push([this.props.events.data.portfolioReturn[i].date, this.props.events.data.portfolioReturn[i].benchmarkNotRebalancedCumReturn*100])
      }

      const startDate = moment(this.props.events.data.portfolioReturn[0].date + now.getTimezoneOffset() * 60000).format("MMM DD, YYYY")
      const endDate = moment(this.props.events.data.portfolioReturn[this.props.events.data.portfolioReturn.length-1].date + now.getTimezoneOffset() * 60000).format("MMM DD, YYYY")

      let { chartOptions } = this.state
      chartOptions.series = series
      chartOptions.title.text = `Cumulative Return from ${startDate} to ${endDate}`
      chartOptions.subtitle.text = `rebalancing every ${this.props.events.query.rebalancingFrequency} days & transaction fee is assumed to be ${this.props.events.query.transactionCostPerc * 100}%`
      
      this.setState ({
        chartOptions: chartOptions,
      })

    }
  }
  componentDidMount() {
    this.updateChart()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.events !== this.props.events) {
      this.updateChart()
    }
  }
}

const mapState = state => ({ 
  events: state.events
});

export default connect(mapState)(CumulativeReturnHighChart)
