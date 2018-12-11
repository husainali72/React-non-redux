import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CumulativeReturn from './Charts/CumulativeReturn'
import Drawdown from './Charts/Drawdown'
import Allocation from './Charts/Allocation'
import Rebalancing from './Charts/Rebalancing'
import Statistics from './Charts/Statistics'

class IndexBuilderChart extends React.Component {
	constructor(props) {
		super(props)
		this.state = {currentChart: "Allocation"}
		this.toggleTab = this.toggleTab.bind(this)
	}

	toggleTab(event) {
		this.setState({currentChart: event.target.dataset.name})
	}

	render() {
		return (
		  <div id="chart-container">
		        <div id="tabs-container">		          
							<button type="submit" data-name="Allocation" className={this.state.currentChart === "Allocation" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Current Allocation</button>
		          <button type="submit" data-name="CumulativeReturn" className={this.state.currentChart === "CumulativeReturn" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Cumulative Return</button>
		          <button type="submit" data-name="Drawdown" className={this.state.currentChart === "Drawdown" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Drawdown</button>
		          <button type="submit" data-name="Rebalancing" className={this.state.currentChart === "Rebalancing" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Past Rebalancing</button>
		          <button type="submit" data-name="Statistics" className={this.state.currentChart === "Statistics" ? "tab-btn-active" : "tab-btn"} onClick={this.toggleTab}>Financial Statistics</button>
		        </div>
						{ this.state.currentChart === "Allocation" && <Allocation /> }
		        { this.state.currentChart === "CumulativeReturn" && <CumulativeReturn /> }
		        { this.state.currentChart === "Drawdown" && <Drawdown /> }
		        { this.state.currentChart === "Rebalancing" && <Rebalancing /> }
		        { this.state.currentChart === "Statistics" && <Statistics /> }
		  </div>
		)
	} 
}

// const mapState = state => {}

// const mapDispatch = dispatch => {}

// export default connect(mapState, mapDispatch)(Navbar)

export default IndexBuilderChart

