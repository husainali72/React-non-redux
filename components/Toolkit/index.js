import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, DropdownButton, MenuItem } from 'react-bootstrap'
import Slider from '../Slider'
import { openModal } from '../../store'
import ToolkitChart from './ToolkitChart'
import ToolkitChart2 from './ToolkitChart2'
// import { withStyles } from '@material-ui/core/styles';
import Select from 'react-select'
import Mailchimp from 'react-mailchimp-form';

class Toolkit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 0,
			chartTab: "research",
			volume: 50,
			marketCap: 500,
			minLifeDays: 90,
			sentimentAssets: [],
			fundamental: "Nothing selected"
		}
		this.sliderChange = this.sliderChange.bind(this)
		this.chartTabChange = this.chartTabChange.bind(this)
		this.volumeChange = this.volumeChange.bind(this)
		this.marketCapChange = this.marketCapChange.bind(this)
		this.minLifeDaysChange = this.minLifeDaysChange.bind(this)
		this.sentimentAssetsChange = this.sentimentAssetsChange.bind(this)
		this.fundamentalChange = this.fundamentalChange.bind(this)
	}

	sliderChange(event, value) {
		event.preventDefault()
		this.setState({ value: value })
	}

	chartTabChange(event) {
		this.setState({ chartTab: event.target.dataset.name })
	}

	volumeChange(event) {
		this.setState({
			volume: event.target.value.replace(/[^0-9]/gi, '')
		})
	}

	marketCapChange(event) {
		this.setState({
			marketCap: event.target.value.replace(/[^0-9]/gi, '')
		})
	}

	minLifeDaysChange(event) {
		this.setState({
			minLifeDays: event.target.value.replace(/[^0-9]/gi, '')
		})
	}

	sentimentAssetsChange(event) {
		var assets = this.state.sentimentAssets;
		if (event.target.checked) {
			assets.push(event.target.name)
		} else {
			var index = assets.indexOf(event.target.name);
			if (index > -1) {
				assets.splice(index, 1);
			}
		}
		this.setState({
			sentimentAssets: assets
		})
	}

	fundamentalChange(event) {
		this.setState({ fundamental: event.target.name })
	}

	render() {
		const multiOptions = [{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }, { value: "D", label: "D" }]
		const checkBoxOptions = [{ key: 1, name: "s&p500", label: "S&P 500" },
		{ key: 2, name: "nasdaq100", label: "NASDAQ 100" },
		{ key: 3, name: "20yearbond", label: "20-year bond" },
		{ key: 4, name: "corporatebond", label: "Corporate Bond" },
		{ key: 5, name: "gold", label: "Gold" },
		{ key: 6, name: "realestate", label: "Real Estate" },
		{ key: 7, name: "netflix", label: "Netflix" },
		{ key: 8, name: "totalstockmarket", label: "Total Stock Market" },
		{ key: 9, name: "facebook", label: "Facebook" },
		{ key: 10, name: "amazon", label: "Amazon" },
		{ key: 11, name: "google", label: "Google" },
		{ key: 12, name: "amd", label: "AMD" },
		{ key: 13, name: "nvidia", label: "NVIDIA" }]

		return (
			<div>

				<div className="switchpage-container">
					<Link to="/indexbuilder"><button type="submit" className="start-btn">GO TO CRYPTO INDEX BUILDER</button></Link>
				</div>
				<div id="toolkit">
					<Row>
						<Col md={3} xs={12} id="newsletter-container">
						</Col>
						<Col md={6} xs={12} id="newsletter-container">
							<div className="toolkit-newsletter"></div>
							<h5>Subscribe to Newsletter</h5>
							<span className="nl-top-space"></span>
							<Mailchimp
								action='https://pandaanalytics.us18.list-manage.com/subscribe/post?u=8118fd69874c52c9d1df04277&amp;id=7ff1de4427'
								fields={[
									{
										name: 'FNAME',
										placeholder: 'name',
										type: 'text',
										required: true
									},
									{
										name: 'EMAIL',
										placeholder: 'info@pandaanalytics.com',
										type: 'email',
										required: true
									}
								]}
							/>
						</Col>
						<Col md={3} xs={12} id="newsletter-container">
						</Col>
					</Row>
					{/*<Row>
						<Col lg={4} id="filter-title"><h4>Powerful Filters</h4></Col>
					</Row>
				    <Row>
						<Col lg={4} className="input-container">
							<div className="input-field">
								<h4>Liquidity</h4>
								<div>
									<p>Backward looking window (used for calculating median values)</p>
									<Slider min={1} max={4} value={this.state.value} aria-labelledby="label" onChange={this.sliderChange} step={1} />
									<div className="slider-label-container"><div>1 week</div><div>2 weeks</div><div>3 weeks</div><div>1 month</div></div>
								</div>
								<div>
									<div>
										<p>Threshold of Median Daily Volume ($MM)</p>
										<input className="text-input" type="text" value={this.state.volume} placeholder="Input" onChange={this.volumeChange.bind(this)} />
									</div>
									<div>
										<p>Threshold of Median Daily Market Cap ($MM)</p>
										<input className="text-input" type="text" value={this.state.marketCap} placeholder="Input" onChange={this.marketCapChange.bind(this)} />
									</div>
								</div>
							</div>
						</Col>
						<Col lg={4} className="input-container">
							<div className="input-field">
								<h4>Sustainability/ Technology/ Fundamental</h4>
								<div>
									<p>Minimum life of the assets (days)</p>
									<input className="text-input" type="text" value={this.state.minLifeDays} placeholder="Input" onChange={this.minLifeDaysChange.bind(this)} />
								</div>
								<div>
									<p>Consensus algorithms</p>
									<Select
									    defaultValue={multiOptions}
									    isMulti
									    name="consensus-algorithms"
									    options={multiOptions}
									    className="basic-multi-select"
									    classNamePrefix="select"
									/>
								</div>
								<div>
									<p>Cryptographic hash functions</p>
									<Select
									    defaultValue={multiOptions}
									    isMulti
									    name="hash-functions"
									    options={multiOptions}
									    className="basic-multi-select"
									    classNamePrefix="select"
									/>
								</div>
								<div>
									<p>Fundamental of the assets</p>
									<DropdownButton title={this.state.fundamental} id="dropdown-size-medium">
								      <MenuItem eventKey="1" name="Currency/Payment Methods Only" onClick={this.fundamentalChange.bind(this)}>Currency/Payment Methods Only</MenuItem>
								      <MenuItem eventKey="2" name="General Computational Platforms" onClick={this.fundamentalChange.bind(this)}>General Computational Platforms</MenuItem>
								      <MenuItem eventKey="3" name="DApps Built on Top of other Platforms" onClick={this.fundamentalChange.bind(this)}>DApps Built on Top of other Platforms</MenuItem>
									</DropdownButton>
								</div>
							</div>
						</Col>
						<Col lg={4} className="input-container">
							<div className="input-field">
								<h4>Sentiment and other assets</h4>
								<div className="checkboxContainer">
									{
										checkBoxOptions.map(item => (
											<div key={item.key} className="checkboxWrapper">
												<input type="checkbox" name={item.name} checked={this.state.sentimentAssets.indexOf(item.name) > -1} onChange={this.sentimentAssetsChange.bind(this)} />
												<label htmlFor={item.name}>{item.label}</label>
											</div>
										))
									}
									<div className="checkboxClear"></div>
								</div>
							</div>
						</Col>
				    </Row>
				    <div id="execute-container">
						<button type="submit" className="start-btn" onClick={this.props.openModal}>EXECUTE</button>
				    </div>
				    {
				    	this.state.chartTab === "research" &&
				    	<div>
				    		<h3>Research and Analytics<img src="./assets/arrow_right.svg" data-name="portfolio" onClick={this.chartTabChange} /></h3>
							<ToolkitChart />
				    	</div>
				    }
				    {
				    	this.state.chartTab === "portfolio" &&
				    	<div>
				    		<h3><img src="./assets/arrow_left.svg" data-name="research" onClick={this.chartTabChange} />Portfolio Construction</h3>
							<ToolkitChart2 />
				    	</div>
					}*/}

				</div>
			</div>
		)
	}
}

const mapState = state => ({})

const mapDispatch = dispatch => {
	return {
		openModal: () => dispatch(openModal())
	}
}

export default connect(mapState, mapDispatch)(Toolkit)
