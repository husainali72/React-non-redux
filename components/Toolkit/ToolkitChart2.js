import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Price from './Charts/Price'
import MovingAverages from './Charts/MovingAverages'
import RiskA from './Charts/RiskA'
import RiskB from './Charts/RiskB'
import CorrelationA from './Charts/CorrelationA'
import CorrelationB from './Charts/CorrelationB'
import Events from './Charts/Events'

class ToolkitChart2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {currentChart: "Price"}
		this.toggleTab = this.toggleTab.bind(this)
	}

	toggleTab(event) {
		// console.log(event.target.dataset.index)
		// console.log(event.target.dataset.index)
		this.setState({currentChart: event.target.dataset.name})
	}

	render() {

		return (
		  <div id="chart-container" className="construction-charts">
		        <div id="tabs-container">
		          <button type="submit" data-name="Price" className={this.state.currentChart === "Price" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Diversification</button>
		          <button type="submit" data-name="Moving Averages" className={this.state.currentChart === "Moving Averages" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Comparison</button>
		          <button type="submit" data-name="Risk A" className={this.state.currentChart === "Risk A" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Out-of-Sample</button>
		          <button type="submit" data-name="Risk B" className={this.state.currentChart === "Risk B" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Discretionary Adjustment</button>
		          <button type="submit" data-name="Correlation A" className={this.state.currentChart === "Correlation A" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Execution</button>
		          <button type="submit" data-name="Correlation B" className={this.state.currentChart === "Correlation B" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Panda PoW Index</button>
		        </div>
			    { this.state.currentChart === "Price" && <Price /> }
			    { this.state.currentChart === "Moving Averages" && <MovingAverages /> }
			    { this.state.currentChart === "Risk A" && <RiskA /> }
			    { this.state.currentChart === "Risk B" && <RiskB /> }
			    { this.state.currentChart === "Correlation A" && <CorrelationA /> }
			    { this.state.currentChart === "Correlation B" && <CorrelationB /> }
			    { this.state.currentChart === "Events" && <Events /> }
		  </div>
		)
	}
}

// const mapState = state => {}

// const mapDispatch = dispatch => {}

// export default connect(mapState, mapDispatch)(Navbar)

export default ToolkitChart2