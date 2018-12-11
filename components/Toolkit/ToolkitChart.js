import React from 'react'
//import PropTypes from 'prop-types'
//import {connect} from 'react-redux'
//import {Link} from 'react-router-dom'
import Price from './Charts/Price'
import MovingAverages from './Charts/MovingAverages'
import RiskA from './Charts/RiskA'
import RiskB from './Charts/RiskB'
import CorrelationA from './Charts/CorrelationA'
import CorrelationB from './Charts/CorrelationB'
import Events from './Charts/Events'

class ToolkitChart extends React.Component {
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
		  <div id="chart-container">
		        <div id="tabs-container">
		          <button type="submit" data-name="Price" className={this.state.currentChart === "Price" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Price</button>
		          <button type="submit" data-name="Moving Averages" className={this.state.currentChart === "Moving Averages" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Moving Averages</button>
		          <button type="submit" data-name="Risk A" className={this.state.currentChart === "Risk A" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Risk Statistics A</button>
		          <button type="submit" data-name="Risk B" className={this.state.currentChart === "Risk B" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Risk Statistics B</button>
		          <button type="submit" data-name="Correlation A" className={this.state.currentChart === "Correlation A" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Correlation A</button>
		          <button type="submit" data-name="Correlation B" className={this.state.currentChart === "Correlation B" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Correlation B</button>
		          <button type="submit" data-name="Horse Racing" className={this.state.currentChart === "Horse Racing" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Horse Racing</button>
		          <button type="submit" data-name="Events" className={this.state.currentChart === "Events" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Events</button>
		          <button type="submit" data-name="Trend" className={this.state.currentChart === "Trend" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Google Trend</button>
		          <button type="submit" data-name="Final Universe" className={this.state.currentChart === "Final Universe" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Final Universe</button>
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

export default ToolkitChart
