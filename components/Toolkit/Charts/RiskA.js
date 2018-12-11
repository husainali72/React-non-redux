import React, { Component } from 'react';
import Select from 'react-select'
// import Highcharts from 'highcharts';
import { BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: -3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: -2000, pv: -9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: -1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: -3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]
const cryptoOptions = [ {value: "bch", label: "BITCOIN"},
            {value: "ada", label: "CARDANO"},
            {value: "dash", label: "DASH"},
            {value: "eos", label: "EOS"},
            {value: "eth", label: "ETHEREUM"},
            {value: "etc", label: "ETHEREUM CLASSIC"},
            {value: "ltc", label: "LITECOIN"},
            {value: "neo", label: "NEO"},
            {value: "qtum", label: "QTUM"},
            {value: "xlm", label: "STELLAR"},
            {value: "tron", label: "TRON"},
            {value: "xrp", label: "XRP"},
            {value: "zcash", label: "Zcash"}]
const assetOptions = [  {value: "qqq", label: "QQQ"},
            {value: "spy", label: "SPY"},
            {value: "tlt", label: "TLT"}]

class RiskA extends React.Component {
  constructor(props) {
    super(props)
  }
	render () {
  	return (
      <div>
        <h3>Risk Statistics</h3>
        <div className="chart-filter-container">
          <div className="chart-filter">
            <p>Pick cryptos in your universe</p>
            <Select
            defaultValue={cryptoOptions.slice(0, 3)}
            isMulti
            name="hash-functions"
            options={cryptoOptions}
            classNamePrefix="select"
            />
          </div>
          <div className="chart-filter">
            <p>Pick traditional assets in your universe</p>
            <Select
            defaultValue={assetOptions.slice(0, 3)}
            isMulti
            name="hash-functions"
            options={assetOptions}
            classNamePrefix="select"
            />
          </div>
        </div>
        <div className="chart-box">
        <ResponsiveContainer width="100%" height="85%">
        	<BarChart data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip/>
           <Legend />
           <ReferenceLine y={0} stroke='#000'/>
           <Bar dataKey="pv" fill="#8884d8" />
           <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    );
  }
}


export default RiskA
