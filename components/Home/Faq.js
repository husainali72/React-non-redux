import React from 'react'

const generalQ = [	{	num: 1, question: "What is our mission?",
						ans: `Cryptocurrency integration is inevitable. It will become a legitimate asset class in coming years. Our mission is to help serious investors, rather than speculators, get the proper amount of exposure in the crypto space with the most effective methods (i.e. our software tools and complexity-free investment vehicles).`},
					{	num: 2, question: "What do we offer?",
						ans: `We essentially offer three things.
							<ol>
							<li>Analytical tools</li>
								<ul>
									<li>Help investors understand and study crypto assets with analytical insights</li>
									<li>Help investors understand how crypto assets as the "secret sauce" could improve their existing portfolios</li>
								</ul>
							<li>Customizable index builder with execution capacity</li>
								<ul>
									<li>Assist investors in the construction of a thoughtful index which can fit into their risk profile</li>
									<li>Help investors buy and rebalance through software automation</li>
								</ul>
							<li>"Smart beta" index funds</li>
								<ul>
									<li>A complexity-free and investor-friendly index product which tracks the Proof-of-Work index created by the Panda Analytics team</li>
								</ul>
							</ol>`},
					{	num: 3, question: "Who are our ideal users?",
						ans: `Our software tools and index funds are built for medium to long-term investors, not for day traders or speculators. We believe that patience, systematic approaches, and low fees are the most critical factors in order for crypto investors to succeed at the end of the day.`},
					{	num: 4, question: "How do we make money?",
						ans: `The analytical tools and the index builder are free to use. However, investors may choose to subscribe to Panda Analytics if they want to utilize the execution capacity of our platform as well as other benefits for only $5 a month.
							As for our index funds, we've replicated the traditional hedge fund structure and only charge a 1.5% management fee; no performance fee.`}]
const technicalQ = [{	num: 5, question: "How to use the analytical tools?",
						ans: 'Our tools are designed to be intuitive and self-explained. The educational aspect is embedded into the process of using the tools. But, if you want to learn more and dig deeper, you could view our tutorials situated next to the respected tool.'},
					{	num: 6, question: "How to utilize the execution capacity of our platform?",
						ans: `This feature is only available after purchasing your Panda Analytics subscription. When you use our customizable index builder, you may create an index that perfectly compliments your risk profile. If you want to invest in the index, you need to input your trade-only API keys and click invest. It's that easy. We are currently supporting Binance and Bittrex exchanges, but more exchanges will be integrated soon.`},
					{	num: 7, question: "Can Panda Analytics withdraw funds from your account?",
						ans: `No. We test API keys during the setup process to ensure that withdrawal is not enabled for your account. You can withdraw your earnings whenever you want.`}]
const powQ = [		{	num: 8, question: "What is Proof-of-Work?",
						ans: `There is a lot we can say about proof-of-work, but you could learn the basics <a href="https://cointelegraph.com/explained/proof-of-work-explained" target="_blank">here</a>.`},
					{	num: 9, question: "Why did we create a Proof-of-Work index?",
						ans: `Due to the fundamental virtues of the proof-of-work consensus mechanism, we believe that it is a smart beta, which means is not aware of by the major public at this immature stage of the market. To learn more about the rationale behind our PoW index, you could read our research report on the website.`},
					{	num: 10, question: "Who should consider investing in our index funds?",
						ans: `Investors who want to capture the long-term asymmetric opportunities brought by blockchain and cryptocurrency technology should consider investing through our smart beta index. This will allow them to reduce their fees paid and avoid heavy-headed work, such as trading, rebalancing, custodian, and taxation.`}]

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
