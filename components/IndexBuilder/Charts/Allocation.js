import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux'
import { openModal, getAnalytics } from '../../../store'
import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import moment from 'moment'
import ScaleLoader from 'react-spinners/ScaleLoader'


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

 
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy-10} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <text x={cx} y={cy+10} dy={8} textAnchor="middle" fill={fill}>{ Math.floor(value * 10000) / 100.0 } %</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#a6a6a6"
      />
      <Sector
        cx={cx} 
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name} ${value}`}</text>
      {/*<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
              {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>*/}
    </g>
  );
};

class AllocationHighChart extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
      activeIndex: 0,
      data: null,
      dateList: null,
      activeChartIndex: 0
    }
    this.onPieEnter = this.onPieEnter.bind(this)
    this.updateChart = this.updateChart.bind(this)
    this.changeDate = this.changeDate.bind(this)
	}

	onPieEnter(data, index) {
		this.setState({
		  activeIndex: index,
		})
	}
	render () {
    let {data, dateList, activeChartIndex, activeIndex} = this.state
		return (
      <Row>
        { data && <Col md={12} lg={8}>
          <div className="chart-box">
            <div className="select-date-box">
              <Select
                  className="select-date"
                  defaultValue={[dateList[(dateList.length-1)]]}
                  name="hash-functions"
                  options={dateList}
                  onChange={this.changeDate}
                  className="basic-multi-select"
                  classNamePrefix="select"
              />
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart >
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={data[activeChartIndex]}
                  cx="50%"
                  cy="50%"
                  innerRadius="45"
                  outerRadius="60%"
                  fill="#FF0000"
                  dataKey="value"
                  onMouseEnter={this.onPieEnter}
                >
                {
                  data[activeChartIndex].map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} key={index} />)
                }
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col> }
        { data && <Col md={12} lg={4} className="chart-legend">
          <Row>
            {data[activeChartIndex].slice(0, 5).map((entry, index) => (
              <Col className="chart-legend-item-wrapper" key={index} xs={12}>
                
                <div className="chart-legend-item">
                  <div className="color-box" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  {entry.name} : <strong>{Math.floor(entry.value * 10000)/100} %</strong>
                </div>
              </Col>)
            )}          
          </Row>
        </Col> }
        { data && 
          <Col>
            <div className="submit-container">
              <button type="submit" className="start-btn" onClick={this.props.openModal}>Execute</button>
            </div>
          </Col> 
        }
        { !data && 
          <Col>
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
          </Col>
        }
      </Row>

	    )
  }
  changeDate(e) {
    let {dateList, activeChartIndex} = this.state
    for (let i = 0; i < dateList.length; i ++) {
      if (e.value === dateList[i].value) {
        activeChartIndex = i
        break
      }
    }
    this.setState ({activeChartIndex: activeChartIndex})
  }
  updateChart() {
    if (this.props.events.data) {
      let data = [], dateList = [], recentDate = null, recentDateIndex = 0
      for (let i = 0; i < this.props.events.data.portfolioDistribution.length; i ++) {
        const obj = this.props.events.data.portfolioDistribution[i]
        let dataTemp = []
        Object.keys(obj).forEach(function(key) {
          if (key === 'Date') {
            const date = new Date(obj[key])
            let formatedDate =  moment(obj[key]).utc().format("MMM DD, YYYY") //date.toISOString().slice(0,10).replace(/-/g, '/');
            dateList.push({value:obj[key], label:formatedDate})
            if (!recentDate || obj[key] < recentDate) {
              recentDate = obj[key]
              recentDateIndex = i
            }
          } else {
            dataTemp.push({name:key, value:obj[key]})
          }
        })
        data.push(dataTemp.sort(function(a, b){
          return b.value - a.value
        }))
      }
      console.log(data)


      this.setState({data: data, dateList: dateList, activeChartIndex: recentDateIndex})
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

const mapDispatch = dispatch => {
  return {
      openModal: () => dispatch(openModal())
  }
}

export default connect(mapState, mapDispatch)(AllocationHighChart)

 