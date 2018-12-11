import React from 'react'
import { Row, Col } from 'react-bootstrap'

const About = () => {
    return (
        <div id="about" className="section">
            <Col md={5} >
                <img src="./assets/homepage_chart.png" />
            </Col>
            <Col md={7} className="right">
                <h1 className="bold">Start small.<br />Learn through investing.</h1>
                <p className="section-text">It is easy to be overwhelmed the first time entering into the crypto world. Luckily our Panda Analytics platform is here to help. Easily comprehend the new blockchain environment, analyze your new favorite crypto assets, and plan your future investment strategies all in a matter of minutes. New doesn't need to be scary, we're here to keep things simple.
                </p>
                <p className="section-button-wrapper">
                    <button type="submit" class="start-btn learn-btn">LEARN MORE</button>
                </p>
            </Col>
        </div>
    )
}

// const mapState = state => {}
// export default connect(mapState)(About)

export default About
