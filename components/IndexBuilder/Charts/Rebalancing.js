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

const OPTIONS = {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Past Rebalancing'
    },
    subtitle: {
        text: ''
    },
    xAxis: {

        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%b %d, %Y'    //ex- 01 Jan 2016
        } 
    },
    yAxis: {
        title: {
            text: '%'
        }
    },
    tooltip: {
        shared: true,
        // xDateFormat:  '%b %d, %Y',
        formatter: function() {
          var s = '<strong>' + moment(this.x).utc().format("MMM DD, YYYY") + '</strong></br>';
          
          var sortedPoints = this.points.sort(function(a, b){
            return b.y - a.y
          });

          for (var i = 0; i < Math.min( sortedPoints.length, 10); i ++ ) {
            s += '<br/><span style="color:'+ sortedPoints[i].series.color +'">' + sortedPoints[i].series.name + ': <b>' + Math.floor(sortedPoints[i].y * 10000)/100 + '% </b> </span>'
          }

          return s;
          },
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            }
        }
    },
    series: [
    ]
}

class RebalancingHighChart extends React.Component {

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
        let series = [], index = 0
        for (let key in this.props.events.data.portfolioRebalancedWeight[0]) {
            if (key == 'Date') continue
            series.push ({
                name: key,
                data: [],
                color: COLORS[index++]
            })
        }
        
        for (let i = 0; i < this.props.events.data.portfolioRebalancedWeight.length; i++ ) {
            const dt = this.props.events.data.portfolioRebalancedWeight[i].Date - now.getTimezoneOffset() * 60000
            index = 0
            for (let key in this.props.events.data.portfolioRebalancedWeight[i]) {
                if (key == 'Date') continue
                series[index++].data.push (
                    [
                        dt, this.props.events.data.portfolioRebalancedWeight[i][key]
                    ]
                )
            }
        }

        const startDate = moment(this.props.events.data.portfolioRebalancedWeight[0].Date - now.getTimezoneOffset() * 60000).format("MMM DD, YYYY")
        const endDate = moment(this.props.events.data.portfolioRebalancedWeight[this.props.events.data.portfolioRebalancedWeight.length - 1].Date - now.getTimezoneOffset() * 60000).format("MMM DD, YYYY")
  
        let { chartOptions } = this.state
        chartOptions.series = series
        
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
  events: state.events,
  query: state.eventsQuery
});

export default connect(mapState)(RebalancingHighChart)

