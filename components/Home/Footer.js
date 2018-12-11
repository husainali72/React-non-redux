import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import * as Scroll from 'react-scroll';
import { Row, Col } from 'react-bootstrap'
import { Icon } from 'antd'
import Mailchimp from 'react-mailchimp-form';

let ScrollLink = Scroll.Link;

const Footer = () => (
  <div id="footer">
    <Row>
        <Col md={6} className="left">
          <img src="./assets/hbw_events_icon.svg" />
          <p>Panda Analytics, Inc. &copy; 2018</p>
        </Col>
        <Col md={6} className="right">
        	<div id="nav-links">
        		<ScrollLink activeClass="active" to="tools" smooth={true} duration={500}>Tools</ScrollLink>
				<ScrollLink activeClass="active" to="hbw-fund" smooth={true} duration={500}>Panda Index Fund</ScrollLink>
				<ScrollLink activeClass="active" to="team" smooth={true} duration={500}>Team</ScrollLink>
				<ScrollLink activeClass="active" to="faq" smooth={true} duration={500}>FAQ</ScrollLink>
        	</div>
        	<div id="middle-container">
        		<div id="icons-group">
        			{/*<img src="./assets/ico_messenger.svg" />*/}
              <a href="#" target="_blank"><i className="ai-linkedin"/></a>
        			<a href="#" target="_blank"><img src="./assets/ico_twitter.svg" /></a>
              <a href="#" target="_blank"><img src="./assets/ico_telegram.svg" /></a>
              {/*<Link to=""><img src="./assets/ico_discord.svg" style={{opacity:"0.4"}}/></Link>*/}
        		</div>
        	</div>
        	<div id="terms">
        		<p>Privacy Policy</p>
        		<p>Terms and Conditions</p>
        	</div>
        </Col>
      </Row>
      <Row>
        <Col md={6} xs={12} id="newsletter-container">
         {/*<form>
          <h5>Subscribe to Newsletter</h5>
          <input type="email" placeholder="info@hbwevents.com" />
          <button type="submit" className="start-btn">Subscribe</button>
         </form>*/}
        <h5>Subscribe to Newsletter</h5>
        <Mailchimp
        action='#'
        fields={[
          {
            name: 'FNAME',
            placeholder: 'name',
            type: 'text',
            required: true
          },
          {
            name: 'EMAIL',
            placeholder: 'info@hbwebsol.com',
            type: 'email',
            required: true
          }
        ]}
        />
        </Col>
      </Row>
  </div>
)

// const mapState = state => {}

// const mapDispatch = dispatch => {}

// export default connect(mapState, mapDispatch)(Navbar)

export default Footer
