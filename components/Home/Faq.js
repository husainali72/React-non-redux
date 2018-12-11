import React from 'react'

const generalQ = [	]

class FAQ extends React.Component {
	constructor(props) {
		super(props)
		this.state = {opened: [false, false, false, false, false, false, false, false, false, false, false]}
		this.handleCollapse = this.handleCollapse.bind(this)
	}

	handleCollapse(e) {
		console.log('hi')
		this.setState((prevState) => {
			prevState.opened[e] = !prevState.opened[e]
			return {opened: [...prevState.opened]}
		})
	}

	render() {
		return (
	      <div id="faq" className="section">
				<h1>FAQ</h1>
				<h3>General</h3>
				<div>
					{
						generalQ.map(question => {
							return (
								<div key={question.num}>
									<div className="question" onClick={this.handleCollapse.bind(null, parseInt(question.num) - 1)}>
										<h3>{question.num}</h3>
										<h5>{question.question}</h5>
									</div>
									{this.state.opened[parseInt(question.num) - 1] && <p dangerouslySetInnerHTML={{__html: question.ans}}></p>}
								</div>
							)
						})
					}
				</div>
				<h3>Technical</h3>
				<div>
					{
						technicalQ.map(question => {
							return (
								<div key={question.num}>
									<div className="question" onClick={this.handleCollapse.bind(null, parseInt(question.num) - 1)}>
										<h3>{question.num}</h3>
										<h5>{question.question}</h5>
									</div>
									{this.state.opened[parseInt(question.num) - 1] && <p>{question.ans}</p>}
								</div>
							)
						})
					}
				</div>
				<h3>Panda Proof-of-Work Index Funds</h3>
				<div>
					{
						powQ.map(question => {
							return (
								<div key={question.num}>
									<div className="question" onClick={this.handleCollapse.bind(null, parseInt(question.num) - 1)}>
										<h3>{question.num}</h3>
										<h5>{question.question}</h5>
									</div>
									{this.state.opened[parseInt(question.num) - 1] && <p dangerouslySetInnerHTML={{__html: question.ans}}></p>}
								</div>
							)
						})
					}
				</div>
	      </div>
	    )
	}
}

// const mapState = state => {}
// export default connect(mapState)(FAQ)

export default FAQ
