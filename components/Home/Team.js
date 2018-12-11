import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Founder from './Founder';

const founders = [{
	index: 0,
	image: 'profile_bill.jpg',
	name: 'Bill Xing',
	title: 'CEO',
	description: 'Bill is a technology entrepreneur and a talented coder with a deep understanding of finance and blockchain technology. He is passionate about empowering investors with the best tools to navigate the emerging crypto asset class. Bill holds a Master Degree in Financial Engineering from the University of Illinois at Urbana-Champaign.',
	linkedIn: 'https://www.linkedin.com/in/billy-x-323266107'
},
{
	index: 1,
	image: 'profile_leon.jpg',
	name: 'Leon Kim',
	title: 'Data Scientist',
	description: 'Leon is a developer with passion for building data analytics software. Prior to Panda Analytics, he has workd on building software & analytics research for Adivsory Board Company, ThirdPoint, LLC, Empricius Capital Management, and StudyTree. He manages Panda Analytics technology platform by day and organizes Philadelphia data science community by night.',
	linkedIn: 'https://www.linkedin.com/in/leonkim92'
},
{
	index: 2,
	image: 'profile_vlad.jpg',
	name: 'Vladimir Jelisavcic',
	title: 'Director/Advisor',
	description: 'Vlad is currently an investor and incubator of Panda Analytics. He was co-founder and portfolio manager of Longacre Fund Management, LLC and founder of Bowery Investment Management, LLC. Vlad brings decades of experience in distressed debt and special situation investing along with a strong track record of delivering strong risk adjusted returns to shareholders.',
	linkedIn: 'https://www.linkedin.com/in/vladimir-jelisavcic-17222688',
},
{
	index: 3,
	image: 'profile_jim.jpg',
	name: 'James Larkin',
	title: 'Director/Advisor',
	description: 'Jim is a New York State Licensed Certified Public Accountant with a history in audit, compliance and operations. He worked in the New York City financial services audit practices of KPMG and Grant Thornton, LLP prior to entering the hedge fund industry in 2001.  James has since worked in two hedge funds, Longacre Fund Management, LLC and Bowery Investment Management LLC, where he assumed a variety of roles including Chief Operating Officer and Chief Compliance Officer.',
	linkedIn: 'https://www.linkedin.com/in/jim-larkin-0a9a0b12'
},
{
	index: 4,
	image: 'profile_max.png',
	name: 'Max Galka',
	title: 'Advisor',
	description: 'Max is the Cofounder/CEO of the blockchain analytics platform Elementus. He teaches data science at the University of Pennsylvania and has 10+ years of industry experience trading derivatives at Credit Suisse and Deutsche Bank.',
	linkedIn: 'https://www.linkedin.com/in/maxgalka',
	twitter: 'https://twitter.com/galka_max?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
}]

const Team = () => {
	return (
		<div id="team" className="section">
			<Row className="top">
				<Col md={6}>
					<h1>Team/Advisors</h1>
					<p>This is the team behind Panda Analytics</p>
					<p className="learn-more"><button type="submit" class="start-btn learn-btn">LEARN MORE</button></p>
				</Col>
				<Col md={6} className="flex-row">
					<Col md={3} className="col-md-offset-1">
						<h2>40</h2>
						<p>Years of investment experience</p>
					</Col>
					<Col md={3} className="col-md-offset-1">
						<h2>15</h2>
						<p>Years of software experience</p>
					</Col>
					<Col md={3} className="col-md-offset-1">
						<h2>4</h2>
						<p>Years of cryptocurrency experience</p>
					</Col>
				</Col>
			</Row>
			<Row id="founders-container" className="bottom">
				{
					founders.map(founder => <Founder key={founder.name} info={founder} />)
				}
			</Row>
		</div>
	)
}

// const mapState = state => {}
// export default connect(mapState)(Team)

export default Team
