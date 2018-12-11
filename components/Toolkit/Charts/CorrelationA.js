import React, { Component } from 'react';
import Select from 'react-select'
// import Highcharts from 'highcharts';
import { ScatterChart, Scatter, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer  } from 'recharts';

const data01 = [
  {x: 100, y: 200, z: 200},
  {x: 120, y: 100, z: 260},
  {x: 170, y: 300, z: 400},
  {x: 140, y: 250, z: 280},
  {x: 150, y: 400, z: 500},
  {x: 110, y: 280, z: 200},
];
const data02 = [
  {x: 300, y: 300, z: 200},
  {x: 400, y: 500, z: 260},
  {x: 200, y: 700, z: 400},
  {x: 340, y: 350, z: 280},
  {x: 560, y: 500, z: 500},
  {x: 230, y: 780, z: 200},
  {x: 500, y: 400, z: 200},
  {x: 300, y: 500, z: 260},
  {x: 240, y: 300, z: 400},
  {x: 320, y: 550, z: 280},
  {x: 500, y: 400, z: 500},
  {x: 420, y: 280, z: 200},
  {x: 334, y: 300, z: 200},
  {x: 476, y: 500, z: 260},
  {x: 456, y: 700, z: 400},
  {x: 789, y: 350, z: 280},
  {x: 234, y: 500, z: 500},
  {x: 789, y: 780, z: 200},
  {x: 123, y: 400, z: 200},
  {x: 355, y: 500, z: 260},
  {x: 247, y: 300, z: 400},
  {x: 835, y: 550, z: 280},
  {x: 432, y: 400, z: 500},
  {x: 420, y: 280, z: 200},
]

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
      {name: 'Page H', uv: 124000, pv: 34400, amt: 2400},
      {name: 'Page I', uv: 1000, pv: 1398, amt: 2210},
      {name: 'Page J', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page K', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page L', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page M', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page N', uv: 3490, pv: 4300, amt: 2100},
];

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

class CorrelationA extends React.Component {
	render () {
	  	return (
	  		<div>
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
	        	<h3>Binance Coin (BNB) Daily Return</h3>
            <div className="chart-box">
  	        	<ResponsiveContainer width="100%" height="85%">
    			    	<ScatterChart margin={{top: 20, right: 20, bottom: 20, left: 20}}>
    				      	<XAxis type="number" dataKey={'x'} name='stature' unit='cm'/>
    				      	<CartesianGrid />
    				      	<YAxis yAxisId="left" type="number" dataKey="y" name='weight' unit='kg' stroke="#8884d8" />
    				        <YAxis yAxisId="right" type="number" dataKey="y" name='weight' unit='kg' orientation="right" stroke="#82ca9d"/>
    				      	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
    				        <Scatter yAxisId="left" name='A school' data={data01} fill='#8884d8'/>
    				        <Scatter yAxisId="right" name='A school' data={data02} fill='#82ca9d'/>
    			      	</ScatterChart>
  		      	</ResponsiveContainer>
            </div>
            <div className="chart-box">
  		      	<ResponsiveContainer width="100%" height="85%">
    			    	<AreaChart data={data}
      				            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
      				        <CartesianGrid strokeDasharray="3 3"/>
      				        <XAxis dataKey="name"/>
      				        <YAxis/>
      				        <Tooltip/>
      				        <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
      				        <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
      					</AreaChart>
  				    </ResponsiveContainer>
            </div>
	      	</div>
	    )
  }
}


export default CorrelationA
