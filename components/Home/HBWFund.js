import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import InfoBox from './About-InfoContainer';
import { openIframe } from '../../store';

const PandaFund = (props) => {
    var email = 'ir@hbwevents.com';
    var subject = 'Request for more information';
    return (
        <div id="hbw-fund">
            <Row className="section">
                <Col md={6} className="left">
                    <img id="pow-img" src="./assets/hbw_pow.svg" />
                    <p className="opaque">We are the world’s first Proof-of-Work (PoW) index fund available to both U.S. and non-U.S. investors. With the help of this complexity-free vehicle, our investors are able to capture the long run growth of this emerging new asset class.
                    </p>
                    {/*Show this layout on desktop, not on mobile
                <div className="hidden-xs hidden-sm">*/}
                    <Row>
                        <Col md={6} xs={12} sm={12} className="flex-row">
                            <h2>1</h2>
                            <p>Diversifying into an asset class uncorrelated with the traditional financial market is very beneficial. It has the potential to become a safe haven when the next business cycle occurs.</p>
                        </Col>
                        <Col md={6} xs={12} sm={12} className="flex-row">
                            <h2>3</h2>
                            <p>Every major technology evolution in history has brought large, asymmetric investment opportunities. However, it is also critical to avoid scams and hyped assets in this immature market.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xs={12} sm={12} className="flex-row">
                            <h2>2</h2>
                            <p>A passive index strategy with systematic rebalancing will prevent our investors from missing out in the long run benefits of this new technology; all without paying high fees.</p>
                        </Col>
                        <Col md={6} xs={12} sm={12} className="flex-row">
                            <h2>4</h2>
                            <p>Proof-of-Work backed protocols, with the “mining” community behind it, have better decentralized ownership, fairer distributions, more secure networks, and thus, an increased chance to grow and excel.</p>
                        </Col>
                    </Row>
                    {/*</div>
                <div className="hidden-md hidden-lg hidden-xl">
                  <div className="flex-row">
                    <h2>1</h2>
                    <p>Diversifying into an asset class uncorrelated with the traditional financial market is very beneficial. It has the potential to become a safe haven when the next business cycle occurs.</p>
                  </div>
                  <div className="flex-row">
                    <h2>2</h2>
                    <p>A passive index strategy with systematic rebalancing will prevent our investors from missing out in the long run benefits of this new technology; all without paying high fees.</p>
                  </div>
                  <div className="flex-row">
                    <h2>3</h2>
                    <p>Every major technology evolution in history has brought large, asymmetric investment opportunities. However, it is also critical to avoid scams and hyped assets in this immature market.</p>
                  </div>
                  <div className="flex-row">
                    <h2>5</h2>
                    <p>Proof-of-Work backed protocols, with the “mining” community behind it, have better decentralized ownership, fairer distributions, more secure networks, and thus, an increased chance to grow and excel.</p>
                  </div>
                </div>*/}
                </Col>
                <Col md={6} className="right">
                    <Row className="hidden-xs">
                        <InfoBox />
                    </Row>
                    <div className="button-container">
                        <a href={"mailto:" + email + "?subject=" + subject}><button type="submit" className="start-btn">INVEST NOW</button></a>
                        <button type="submit" className="start-btn call-btn" onClick={props.openIframe}>SCHEDULE A CALL</button>
                    </div>
                </Col>                
            </Row >
        </div >
    )
}

const mapState = state => ({})
const mapDispatch = dispatch => {
    return {
        openIframe: () => {
            return dispatch(openIframe())
        }
    }
}
export default connect(mapState, mapDispatch)(PandaFund)
