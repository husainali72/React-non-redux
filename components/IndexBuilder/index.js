import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Popover, OverlayTrigger, Button } from 'react-bootstrap'
import IndexBuilderChart from './IndexBuilderChart'
import Slider from '../Slider'
import { openModal, getAnalytics } from '../../store'
import { Layout, DatePicker } from 'antd'
import { Calendar } from 'antd-mobile';
import moment from 'moment'
import Select from 'react-select'
import 'antd-mobile/dist/antd-mobile.css';
import enUS from 'antd-mobile/lib/calendar/locale/en_US'
import ScaleLoader from 'react-spinners/ScaleLoader'
import NotificationSystem from 'react-notification-system'

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker
const now = new Date()
const dateFormat = 'MMM DD, YYYY'

const popoverBottomTechnologyMatters = (
	<Popover id="popover-positioned-bottom" title="consensus algorithms">
		A consensus algorithm is a process in computer science used to achieve agreement on sigle data value among distributed processes or systems.
	</Popover>
)


class IndexBuilder extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			slider1: 20,
			slider2: 0.5,
			slider3: 60,
			statisticalMethod: 'median',
			numDays: 7,
			indexRank: 'marketCap',
			startDate: 'Jan 1, 2017', //moment().startOf('year').format(dateFormat),
			minDate: moment("2013-04-28"),
			endDate: moment().add(-1, 'days').format(dateFormat),
			maxDate: moment().add(-1, 'days'),
			customDateRange: true,
			upperBound: 0.3,
			lowerBound: 0.01,
			rebalancingFrequency: 30,
			proofType: ['PoW'],
			dummyInput: ['A'],
			initialInvestment: 1000,
			algorithm: "Consensus algorithms",
			showCalendar: false,
			initialInvestmentValidated: true,
			boundValuesValidated: true,
			dateRangeValidated1: true,
			dateRangeValidated2: true,
			dateRangeValidated3: true,
			technologyMattersValidated: true,
			dummyInputValidated: true,
			siderShow: true
		}
		this.slider1Change = this.slider1Change.bind(this)
		this.slider2Change = this.slider2Change.bind(this)
		this.slider3Change = this.slider3Change.bind(this)
		this.onDatesChange = this.onDatesChange.bind(this)
		this.onCalendarClick = this.onCalendarClick.bind(this)
		this.onConfirm = this.onConfirm.bind(this)
		this.onCancel = this.onCancel.bind(this)
		this.upperBoundChange = this.upperBoundChange.bind(this)
		this.upperBoundClick = this.upperBoundClick.bind(this)
		this.upperBoundBlur = this.upperBoundBlur.bind(this)
		this.lowerBoundChange = this.lowerBoundChange.bind(this)
		this.lowerBoundClick = this.lowerBoundClick.bind(this)
		this.lowerBoundBlur = this.lowerBoundBlur.bind(this)
		this.rebalancingChange = this.rebalancingChange.bind(this)
		this.proofTypeChange = this.proofTypeChange.bind(this)
		this.dummyInputChange = this.dummyInputChange.bind(this)
		this.investmentChange = this.investmentChange.bind(this)
		this.algorithmChange = this.algorithmChange.bind(this)
		this.submitQuery = this.submitQuery.bind(this)
		this.dateRangeOptionChange = this.dateRangeOptionChange.bind(this)
		this.bodyOnClick = this.bodyOnClick.bind(this)
		this.numDaysChange = this.numDaysChange.bind(this)
		this.indexRankChange = this.indexRankChange.bind(this)
		this.toggleSider = this.toggleSider.bind(this)
	}
	componentDidMount() {
		document.getElementsByTagName("body")[0].addEventListener("click", this.bodyOnClick)
		this._notificationSystem = this.refs.notificationSystem
	}

	componentWillUnmount() {
		document.getElementsByTagName("body")[0].addEventListener("click", this.bodyOnClick)
	}

	bodyOnClick(event) {
		if (event.target.className === 'tooltip-button') return
		if (this.refs.trigger.state.show) {
			this.refs.trigger.setState({
				show: false
			})
		}
	}

	slider1Change(event, value) {
		event.preventDefault()
		this.setState({ slider1: value })
	}

	slider2Change(event, value) {
		event.preventDefault()
		this.setState({ slider2: value })
	}

	slider3Change(event, value) {
		event.preventDefault()
		this.setState({ slider3: value })
	}

	statisticalMethodChange(event) {
		this.setState({ statisticalMethod: event.target.value })
	}

	numDaysChange(event) {
		const startMoment = moment(this.state.startDate, dateFormat)
		const endMoment = moment(this.state.endDate, dateFormat)
		const days = endMoment.diff(startMoment, 'days')
		const dateRangeValidated2 = days * 1.0 > event.target.value * 1.0

		this.setState(
			{
				numDays: event.target.value,
				dateRangeValidated2: dateRangeValidated2
			}
		)
	}

	indexRankChange(event) {
		this.setState({
			indexRank: event.target.value
		})
	}

	dateRangeOptionChange(event) {
		if (event.target.value == 0) {
			this.setState(
				{ customDateRange: true }
			)
		} else if (event.target.value == 1) {
			this.setState(
				{
					customDateRange: false,
					startDate: moment().startOf('year').format(dateFormat)
				}
			)
		} else {
			this.setState(
				{
					customDateRange: false,
					startDate: 'Dec 17, 2017',
					endDate: moment().format(dateFormat)
				}
			)
		}
	}

	upperBoundChange(event) {
		const upperBound = event.target.value.replace(/[^0-9.]/gi, '')
		const lowerBound = this.state.lowerBound
		this.setState({
			upperBound: upperBound,
			boundValuesValidated: upperBound >= lowerBound
		})
	}

	upperBoundClick(event) {
		this.setState({
			upperBound: '0.'
		})
	}

	upperBoundBlur(event) {
		const upperBound = event.target.value.replace(/[^0-9.]/gi, '')
		const lowerBound = this.state.lowerBound
		this.setState({
			upperBound: upperBound * 1.0,
			boundValuesValidated: upperBound >= lowerBound
		})
	}

	lowerBoundChange(event) {
		const upperBound = this.state.upperBound
		const lowerBound = event.target.value.replace(/[^0-9.]/gi, '')
		this.setState({
			lowerBound: lowerBound,
			boundValuesValidated: upperBound >= lowerBound
		})
	}

	lowerBoundClick(event) {
		this.setState({
			lowerBound: '0.'
		})
	}

	lowerBoundBlur(event) {
		const upperBound = this.state.upperBound
		const lowerBound = event.target.value.replace(/[^0-9.]/gi, '')
		this.setState({
			lowerBound: lowerBound * 1.0,
			boundValuesValidated: upperBound >= lowerBound
		})
	}


	rebalancingChange(item) {
		const startMoment = moment(this.state.startDate, dateFormat)
		const endMoment = moment(this.state.endDate, dateFormat)
		const days = endMoment.diff(startMoment, 'days')
		const dateRangeValidated1 = days * 1.0 > item.value * 1.0
		this.setState({
			rebalancingFrequency: item.value,
			dateRangeValidated1: dateRangeValidated1
		})
	}

	proofTypeChange(item) {
		let proofType = item.map(obj => obj.value);
		var technologyMattersValidated = true;
		if (!proofType || proofType.length <= 0) {
			var technologyMattersValidated = false;
		}

		this.setState({
			proofType: proofType,
			technologyMattersValidated: technologyMattersValidated
		});
	}

	dummyInputChange(item) {
		let dummyInput = item.map(obj => obj.value);
		var dummyInputValidated = true;
		if (!dummyInput || dummyInput.length <= 0) {
			var dummyInputValidated = false;
		}

		this.setState({
			dummyInput: dummyInput,
			dummyInputValidated: dummyInputValidated
		});
	}

	investmentChange(event) {
		const inputValue = event.target.value.replace(/[^0-9]/gi, '')

		this.setState({
			initialInvestmentValidated: inputValue < 100000
		})

		this.setState({
			initialInvestment: event.target.value.replace(/[^0-9]/gi, '')
		})
	}

	onDatesChange(date, dateString) {
		const startMoment = moment(dateString[0], dateFormat)
		const endMoment = moment(dateString[1], dateFormat)
		const days = endMoment.diff(startMoment, 'days')
		const dateRangeValidated1 = days * 1.0 > this.state.rebalancingFrequency * 1.0
		const dateRangeValidated2 = days * 1.0 > this.state.numDays * 1.0
		var validateDateRange = true;
		if (!(startMoment.isSameOrAfter(this.state.minDate) && endMoment.isSameOrBefore(this.state.maxDate))) {
			validateDateRange = false;
		}

		console.log('For breaktrace');

		this.setState({
			startDate: dateString[0],
			endDate: dateString[1],
			customDateRange: true,
			dateRangeValidated1: dateRangeValidated1,
			dateRangeValidated2: dateRangeValidated2,
			dateRangeValidated3: validateDateRange
		})
	}

	algorithmChange(event) {
		console.log(event)
		this.setState({ algorithm: event.target.name })
	}

	submitQuery(event) {
		const offsetTime = now.getTimezoneOffset() * 60000
		const startMoment = moment.utc(this.state.startDate, dateFormat)
		const endMoment = moment.utc(this.state.endDate, dateFormat)

		const proofType = this.state.proofType ? this.state.proofType : []

		let query = {
			"startTime": startMoment.valueOf(),
			"endTime": endMoment.valueOf(),
			"proofType": proofType,
			"rankMethod": this.state.statisticalMethod,
			"thresholdBackwardWindow": this.state.numDays,
			"thresholdRank": this.state.slider1,
			"positionValue": this.state.initialInvestment,
			"rebalancingFrequency": this.state.rebalancingFrequency,
			"customizedBenchmark": [
				{
					"assetId": 1,
					"percentage": this.state.slider3 / 100.0
				},
				{
					"assetId": 1027,
					"percentage": 1.0 - this.state.slider3 / 100.0
				}
			],
			"transactionCostPerc": this.state.slider2 / 100.0,
			"boundLower": this.state.lowerBound,
			"boundUpper": this.state.upperBound,
			"scaleFactor": 252
		}
		if (document.body.clientWidth < 1200) {
			this.toggleSider()
		}
		this.props.getIndexMetric(query)
	}


	onCalendarClick() {
		this.setState({ showCalendar: true })
	}

	onConfirm(startDate, endDate) {
		document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY
		this.setState({
			showCalendar: false,
			startDate: moment(startDate).format(dateFormat),
			endDate: moment(endDate).format(dateFormat),
		})
	}
	onCancel() {
		document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY
		this.setState({
			showCalendar: false,
			startDate: moment().format(dateFormat),
			endDate: moment().endOf('month').format(dateFormat),
		})
	}

	toggleSider() {
		let { siderShow } = this.state
		this.setState({
			siderShow: !siderShow
		})
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.error) {
			if (prevProps.error !== this.props.error) {
				console.log(this.props.error)
				this._notificationSystem.addNotification({
					message: `${this.props.error.statusText} ( ${this.props.error.status} )`,
					level: this.props.error.status < 400 ? 'success' : 'error'
				});
			}
		}
	}



	render() {
		return (
			<div style={{ height: '100vh', paddingTop: 80 }}>
				<Layout className="indexBuilderLayout">
					<a className="showSider" style={{ left: (this.state.siderShow) ? '350px' : '0px' }} onClick={this.toggleSider.bind(this)}>
						<div>+</div>
					</a>
					<Sider className="indexBuilderSider" style={{ marginLeft: (this.state.siderShow) ? '0px' : '-350px' }}>
						<div className="switchpage-container" >
							<Link to="/toolkit"><button type="submit" className="start-btn">GO TO INVESTMENT TOOLKIT</button></Link>
						</div>

						<div className="input-field">
							<h4>Capture the Market Without Making Individual Bets</h4>
							<div>
								<p>Pick the number of top assets (based on market cap) to include in your index</p>
								<Slider min={0} max={50} defaultValue={20} radius={this.state.slider1} onChange={this.slider1Change} step={1} />
								<div className="slider-label-container"><div>1</div><div>25</div><div>50</div></div>
							</div>
							<div>
								<p>Choose a statistical method to reduce the effect of pumping and dumping</p>
								<div className="checkboxContainer">
									<input id="pd-median" type="radio" value="median" checked={this.state.statisticalMethod === "median"} onChange={this.statisticalMethodChange.bind(this)} />
									<label htmlFor="pd-median">Median</label>
									<input id="pd-mean" type="radio" value="mean" checked={this.state.statisticalMethod === "mean"} onChange={this.statisticalMethodChange.bind(this)} />
									<label htmlFor="pd-mean">Mean</label>
								</div>
							</div>
							<div>
								<p>Number of days to look backwards to apply the chosen statistical method</p>
								<div className="checkboxContainer">
									<input id="seven" type="radio" value="7" checked={this.state.numDays == 7} onChange={this.numDaysChange.bind(this)} />
									<label htmlFor="seven" className={(this.state.numDays == 7 && !this.state.dateRangeValidated2) ? 'option-input-error' : ''}>1 week</label>
									<input id="fifteen" type="radio" value="15" checked={this.state.numDays == 15} onChange={this.numDaysChange.bind(this)} />
									<label htmlFor="fifteen" className={(this.state.numDays == 15 && !this.state.dateRangeValidated2) ? 'option-input-error' : ''}>15 days</label>
									<input id="thirty" type="radio" value="30" checked={this.state.numDays == 30} onChange={this.numDaysChange.bind(this)} />
									<label htmlFor="thirty" className={(this.state.numDays == 30 && !this.state.dateRangeValidated2) ? 'option-input-error' : ''}>30 days</label>
									<input id="sixty" type="radio" value="60" checked={this.state.numDays == 60} onChange={this.numDaysChange.bind(this)} />
									<label htmlFor="sixty" className={(this.state.numDays == 60 && !this.state.dateRangeValidated2) ? 'option-input-error' : ''}>60 days</label>
									<input id="ninety" type="radio" value="90" checked={this.state.numDays == 90} onChange={this.numDaysChange.bind(this)} />
									<label htmlFor="ninety" className={(this.state.numDays == 90 && !this.state.dateRangeValidated2) ? 'option-input-error' : ''}>90 days</label>
								</div>
							</div>
							<div>
								<p>Rank</p>
								<div className="checkboxContainer">
									<input id="marketCap" type="radio" value="marketCap" checked={this.state.indexRank == "marketCap"} onChange={this.indexRankChange.bind(this)} />
									<label htmlFor="marketCap">Market Capital</label>
									<input id="volume" type="radio" value="volume" checked={this.state.indexRank == "volume"} onChange={this.indexRankChange.bind(this)} />
									<label htmlFor="volume">Volume</label>
								</div>
							</div>
						</div>
						<div className="input-field">
							<h4>Promote Diversification Further</h4>
							<div>
								<p>A currency should not make up more than this proportion in my index</p>
								<input className={this.state.boundValuesValidated ? 'text-input' : 'text-input validate validation-error'} type="text" value={this.state.upperBound} placeholder="Input" onChange={this.upperBoundChange.bind(this)} onClick={this.upperBoundClick.bind(this)} onBlur={this.upperBoundBlur.bind(this)} />
							</div>
							<div>
								<p>A currency should be at least this proportion in my index</p>
								<input className={this.state.boundValuesValidated ? 'text-input' : 'text-input validate validation-error'} type="text" value={this.state.lowerBound} placeholder="Input" onChange={this.lowerBoundChange.bind(this)} onClick={this.lowerBoundClick.bind(this)} onBlur={this.lowerBoundBlur.bind(this)} />
							</div>
							{!this.state.boundValuesValidated && <div>
								<small className="validation-error">You cannot spcify upper bound that is lower than the lower bound</small>
							</div>}
						</div>
						<div className="input-field">
							<h4>Catch Up With Rebalancing In An Evolving Market</h4>
							<div className={this.state.dateRangeValidated1 ? 'select-rebalancing-frequency' : 'select-rebalancing-frequency date-validation-error'}>
								<p>Select the rebalancing frequency (days)</p>
								{/* <form>
									<input className="text-input" type="text" value={this.state.rebalancingFrequency} placeholder="Input" onChange={this.rebalancingChange.bind(this)} />
								</form> */}
								<Select
									defaultValue={[{ label: '30 days', value: 30 }]}
									name="hash-functions"
									options={[
										{ label: '1 week', value: 7 },
										{ label: '15 days', value: 15 },
										{ label: '30 days', value: 30 },
										{ label: '60 days', value: 60 },
										{ label: '90 days', value: 90 }
									]}
									onChange={this.rebalancingChange.bind(this)}
									className="basic-multi-select"
									classNamePrefix="select"
								/>
								{!this.state.dateRangeValidated1 && <small className="validation-error">The specified date range is not long enough for the specified rebalancing frequency</small>}
							</div>
							<div>
								<h4>Technology Matters</h4>
								<small id="invalid-input-initial-investment" className="form-text text-muted">
									consensus algorithms
								</small>
								<OverlayTrigger ref="trigger" trigger="click" placement="bottom" overlay={popoverBottomTechnologyMatters}>
									<button className="tooltip-button">?</button>
								</OverlayTrigger>
								<Select
									defaultValue={[{ value: "PoW", label: "PoW" }, { value: "PoW/PoS", label: "PoW/PoS" }, { value: "Other", label: "Other" }]}
									isMulti
									name="hash-functions"
									options={[{ value: "PoW", label: "PoW" }, { value: "PoW/PoS", label: "PoW/PoS" }, { value: "Other", label: "Other" }]}
									className="basic-multi-select"
									classNamePrefix="select"
									onChange={this.proofTypeChange.bind(this)}
								/>
								{!this.state.technologyMattersValidated && <small className="validation-error">Consensus algorithm must have atleast one value</small>}
							</div>
							<div>
								<h4>Dummy Input</h4>
								<Select
									defaultValue={[{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }]}
									isMulti
									name="hash-functions"
									options={[{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }]}
									className="basic-multi-select"
									classNamePrefix="select"
									onChange={this.dummyInputChange.bind(this)}
								/>
								{!this.state.dummyInputValidated && <small className="validation-error">Please at least one value from above</small>}
							</div>
						</div>
						<div className="input-field">
							<h4>Practical Matters</h4>
							<div>
								<p>Transaction Cost (%)</p>
								<Slider min={0.1} max={5} radius={this.state.slider2} onChange={this.slider2Change} step={0.01} />
								<div className="slider-label-container"><div>0.1</div><div>2.5</div><div>5%</div></div>
							</div>
							<div>
								<p>Initial Investment (USD)</p>
								<form>
									<div className="form-group-initial-investment">
										<input className={this.state.initialInvestmentValidated ? 'text-input' : 'text-input validation-error'} type="text" value={'$' + this.state.initialInvestment} placeholder="$" onChange={this.investmentChange.bind(this)} />
										{!this.state.initialInvestmentValidated && <small id="invalid-input-initial-investment" className="form-text text-muted validation-error">For large investments, consider using &nbsp;
											<Link className="link-small" to="/#hbw-fund" target="_blank">Panda PoW Index Funds</Link>
										</small>}
									</div>
								</form>
							</div>
						</div>
						<div className="input-field calendar-box">
							<h4>Backtest to Prove the Idea</h4>
							<p>Pick the date range</p>
							<div id="web-date-range" className={(this.state.dateRangeValidated1 && this.state.dateRangeValidated2) ? '' : 'date-validation-error'}>
								<RangePicker
									onChange={this.onDatesChange}
									format={dateFormat}
									ranges={{ 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
									defaultValue={[moment().startOf('year'), moment()]}
									value={[moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]}
									popupStyle={{ display: 'flex' }}
								/>
								{(!this.state.dateRangeValidated1 || !this.state.dateRangeValidated2) && <small className="validation-error">The specified date range is not long enough for the specified rebalancing frequency</small>}
								{(!this.state.dateRangeValidated3) && <small className="validation-error">Date should between 23 April 2013 and before today</small>}
							</div>
							<div id="mobile-date-range">
								<div id="mobile-date-range-output" onClick={this.onCalendarClick}>
									{this.state.startDate}<div>~</div>{this.state.endDate}
								</div>
								<Calendar
									locale={enUS}
									visible={this.state.showCalendar}
									onCancel={this.onCancel}
									onConfirm={this.onConfirm}
									getDateExtra={this.getDateExtra}
									defaultDate={now}
									minDate={new Date(+now - 5184000000)}
									maxDate={new Date(+now + 31536000000)}
								/>
							</div>
							<div className="checkboxContainer">
								<input id="customRange" type="radio" value="0"
									checked={this.state.customDateRange}
									onChange={this.dateRangeOptionChange.bind(this)} />
								<label htmlFor="customRange">Custom</label>
								<input id="ytdRange" type="radio" value="1"
									checked={!this.state.customDateRange && this.state.startDate === moment().startOf('year').format(dateFormat)}
									onChange={this.dateRangeOptionChange.bind(this)} />
								<label htmlFor="ytdRange">YTD</label>
								<input id="peakRange" type="radio" value="2"
									checked={!this.state.customDateRange && this.state.startDate === 'Dec 17, 2017' && this.state.endDate === moment().format(dateFormat)}
									onChange={this.dateRangeOptionChange.bind(this)} />
								<label htmlFor="peakRange">Since 2017 Bitcoin Peak</label>
							</div>
						</div>
						<div className="input-field">
							<h4>Customize the Benchmark</h4>
							<p>{this.state.slider3}% BTC, {100 - this.state.slider3}% ETH</p>
							<Slider min={0} max={100} radius={this.state.slider3} onChange={this.slider3Change} step={1} />
							<div className="slider-label-container"><div>0%</div><div>25%</div><div>50</div><div>75%</div><div>100%</div></div>
						</div>
					</Sider>
					<div id="execute-container" style={{ marginLeft: (this.state.siderShow) ? '0px' : '-350px' }}>
						{/* <button type="submit" className="start-btn" onClick={this.props.openModal}>execute</button> */}
						{!this.props.loading &&
							<button className="start-btn"
								onClick={this.submitQuery} disabled={!this.state.boundValuesValidated || !this.state.initialInvestmentValidated || !this.state.dateRangeValidated1 || !this.state.dateRangeValidated2 || !this.state.technologyMattersValidated || !this.state.dummyInputValidated || !this.state.dateRangeValidated3}>
								Submit
							</button>}
						{this.props.loading &&
							<button className="start-btn" disabled={true}>
								<ScaleLoader
									sizeUnit={"px"}
									height={20}
									width={3}
									margin={"1px"}
									color={'#efefef'}
									loading={true}
								/>
							</button>
						}
					</div>
					<Content>
						<IndexBuilderChart />
						<NotificationSystem ref="notificationSystem" />
					</Content>
				</Layout>
			</div>
		)
	}
}

const mapState = state => ({
	loading: state.events.loading,
	error: state.events.error
});

const mapDispatch = dispatch => {
	return {
		openModal: () => dispatch(openModal()),
		getIndexMetric: (query) => dispatch(getAnalytics(query))
	}
}

export default connect(mapState, mapDispatch)(IndexBuilder)
