import React from 'react'
import { Row, Col } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import * as Scroll from 'react-scroll'

const ScrollLink = Scroll.Link
const animateScroll = Scroll.animateScroll

const cardContents = [
						{	img: "card_2.jpg",
							title: "Leverage the power of our analytical tools",
							description: "Start investing in crypto and blockchain assets using our intuitive research tools. By using our insightful analytics and calculated diversification techniques, you’ll receive a competitive edge in the crypto investing and education space.",
							link: "tool-two"},
						{	img: "card_3.jpg",
							title: "Execute your portfolio with automation",
							description: "Do you like the customized crypto portfolio our tools helped you create? Well your in luck because our robust automation system will allow you to invest with just a click of a button. No more tedious, manual trading or daily rebalancing, we do all that work for you.",
							link: "tool-one"},
						{	img: "card_4.jpg",
							title: "Invest directly into Panda's PoW index funds",
							description: "Are you considering allocating $100k or more into your crypto investments? Panda's complexity-free \"smart beta\" index funds will allow you to do so without the headache of dealing with custodian, trading, rebalancing, and tax calculation.",
							link: "panda-fund"}] 

const Landing = () => {
// constructor(props) {
// 	super(props)
// }

	return (
	<div id="landing" className="section">
			<h1 className="title spread"><span className="extra-bold">Panda</span><span className="light">Analytics</span></h1>
			<Col md={8} className="col-md-offset-2">
				<h5>A platform that offers analytics and automated execution for cryptocurrency and blockchain assets as well as complexity-free and investor-friendly index funds.</h5>
			</Col>
			<div id="cards-container">
				{
					cardContents.map((card, index) => {
						return (
							<div key={index} id="card" style={{backgroundImage: `url(${'./assets/' + card.img})`}}>
								<h5>{card.title}</h5>
								<p>{card.description}</p>
								<ScrollLink to={card.link} smooth={true} duration={500}><button type="submit" className="start-btn">LEARN MORE</button></ScrollLink>
							</div>
						)
					})
				}
			</div>
	</div>
    )
}

// const mapState = state => {}
// export default connect(mapState)(Landing)

export default Landing
