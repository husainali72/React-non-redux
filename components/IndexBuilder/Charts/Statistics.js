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

const COLORS = 
  [
    '#ef9a9a', '#9fa8da', '#80cbc4', '#f48fb1', 
    '#f48fb1', '#90caf9', '#a5d6a7', '#ffe082', 
    '#ce93d8', '#81d4fa', '#c5e1a5', '#ffcc80', 
    '#b39ddb', '#80deea', '#e6ee9c', '#ffab91',

    '#e57373', '#7986cb', '#4db6ac', '#fff176',
    '#f06292', '#64b5f6', '#81c784', '#ffd54f',
    '#ba68c8', '#4fc3f7', '#aed581', '#ffb74d',
    '#9575cd', '#4dd0e1', '#dce775', '#ff8a65'
  ];

const OPTIONS1 = {
	chart: {
		type: 'column'
	},
	title: {
			text: 'Daily Volatility'
	},
	xAxis: {
			categories: ['your portfolio with rebalancing', 'your portfolio without rebalancing', 'customized benchmark with rebalancing', 'customized benchmark without rebalancing']
	},
	yAxis: {
		title: {
				text: '%'
		},
		labels: {
				formatter: function () {
						return (Math.abs(this.value) >= 10 ? this.value / 10 + 'K': this.value * 100)
				}
		}
	},
	legend: {
		enabled: false,
	},
	tooltip: {
		shared: true,
		xDateFormat:  '%b %d, %Y',
		pointFormatter: function() {
		  console.log(this)
		  var string = '<span style="color:this.series.name ></span>' + Math.floor(this.y * 10000)/100.0 + ' % <br/>'
		  // string += 'Second: ' + this.series.options.data2[this.index] + '<br>';
		  // string += 'Third: ' + this.series.options.data3[this.index];
		  return string;
		},
		valueDecimals: 2
},
	credits: {
			enabled: false
	},
	series: [{
			name: 'Daily Volatility',
			data: []
	}]
}

const OPTIONS2 = {
	chart: {
		type: 'column'
	},
	title: {
			text: 'Sharpe Ratio (scale factor of 252)'
	},
	xAxis: {
			categories: ['your portfolio with rebalancing', 'your portfolio without rebalancing', 'customized benchmark with rebalancing', 'customized benchmark without rebalancing']
	},
	yAxis: {
		title: {
				text: ''
		}
	},
	legend: {
		enabled: false,
	},
	credits: {
			enabled: false
	},
	series: [{
			name: 'Sharpe Ratio (scale of 252)',
			data: []
	}]
}
class StatisticChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
			chartOptions1: OPTIONS1,
			chartOptions2: OPTIONS2,
    } 
    this.updateChart = this.updateChart.bind(this)
  }

  render() {
		const { chartOptions1, chartOptions2 } = this.state;
		console.log(chartOptions1, chartOptions2)
    return (
      <div className="chart-box">
				{this.props.events.data &&
					<Row>
						<Col lg={6}>
							<HighchartsReact
								highcharts={Highcharts}
								options={chartOptions1}
								oneToOne={false}
							/>				
						</Col>
						<Col lg={6}>
							<HighchartsReact
								highcharts={Highcharts}
								options={chartOptions2}
								oneToOne={false}
							/>				
						</Col>
					</Row>
        }
        { !this.props.events.data &&
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
			console.log(this.props.events.data.financialStatistics.dailyVolatility[0])
			let data1 = [
				this.props.events.data.financialStatistics.dailyVolatility[0].portfolioRebalanced,
				this.props.events.data.financialStatistics.dailyVolatility[0].portfolioNotRebalanced,
				this.props.events.data.financialStatistics.dailyVolatility[0].benchmarkRebalanced,
				this.props.events.data.financialStatistics.dailyVolatility[0].benchmarkNotRebalanced
			]
			let data2 = [
				this.props.events.data.financialStatistics.sharpeRatio[0].portfolioRebalanced,
				this.props.events.data.financialStatistics.sharpeRatio[0].portfolioNotRebalanced,
				this.props.events.data.financialStatistics.sharpeRatio[0].benchmarkRebalanced,
				this.props.events.data.financialStatistics.sharpeRatio[0].benchmarkNotRebalanced
			]

      let { chartOptions1, chartOptions2 } = this.state
			chartOptions1.series[0].data = data1
			chartOptions2.series[0].data = data2
			
			console.log(chartOptions1, chartOptions2)
      this.setState ({
				chartOptions1: {chartOptions1},
				chartOptions2: {chartOptions2}
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
  events: state.events,
  query: state.eventsQuery
});

export default connect(mapState)(StatisticChart)

