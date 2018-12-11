import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const Tools = () => {
    return (
      <div id="tools">
        <Row id="tool-two" className="section">
            <Col md={12} >
                <h1>Diversify your portfolio<br />with our tools.</h1>
            </Col>
            <Col md={8} className="col-md-offset-2">
              <Row>
                <Col md={4}>
                    <h3>Investing Toolkit</h3>
                    <Link to="/indexbuilder"><button type="submit" className="start-btn">START FOR FREE</button></Link>
                </Col>
                <Col md={7} className="col-md-offset-1 right">
                    <img id="toolkit-1" src="./assets/toolkit_1.png" />
                    <img id="toolkit-2" src="./assets/toolkit_2.png" />
                </Col>
              </Row>
            </Col>
        </Row>
        <Row id="tool-one" className="section">
            <Col md={6} >
                <img src="./assets/crypto_index_builder.png" />
            </Col>
            <Col md={6} className="right">
                <h1>Create a customized<br />index and execute it!</h1>
                <p className="section-text">A diversified, passive investing system with regular rebalancing is very attractive, so why aren{"\'"}t more people using one?
                <br></br><br></br>
                There are three main factors why:
                <br></br>
                <ul>
                  <li>It{"\'"}s hard to stay disciplined to the task at hand</li>
                  <li>Manual trading and rebalancing is very tedious</li>
                  <li>Finding a tailored rule that fits your specific risk appetite is difficult</li>
                </ul>
                Our tools are here to make these issues obsolete. We modularize and execute every step of the investment process, so you don't need to do any of the heavy lifting.
                </p>
                <Link to="/indexbuilder"><p className="section-button-wrapper"><button type="submit" class="start-btn ">LEARN MORE</button></p></Link>
                
            </Col>
        </Row>
      </div>
    )
}

// const mapState = state => {}
// export default connect(mapState)(PandaFund)

export default Tools
