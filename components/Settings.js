import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { closeModal, getUser } from '../store'
import { DatePicker } from 'antd';
// import {Link} from 'react-router-dom'
// import { Row, Col } from 'react-bootstrap'

const dummyNews = [ {title: "CryptoUK Trade Association Calls on MPs", url: "http://pandaanalytics-dev.f6egrcznwr.us-east-2.elasticbeanstalk.com/indexbuilder"}, 
                    {title: "Blockchain is thr best thing ever says NYT", url: "http://pandaanalytics-dev.f6egrcznwr.us-east-2.elasticbeanstalk.com/indexbuilder"}, 
                    {title: "Panda Analytics raises $100 billion", url: "http://pandaanalytics-dev.f6egrcznwr.us-east-2.elasticbeanstalk.com/indexbuilder"}, 
                    {title: "Facebook hires engineering director for Blockchain", url: "http://pandaanalytics-dev.f6egrcznwr.us-east-2.elasticbeanstalk.com/indexbuilder"}]

class Settings extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div id="settings" className="section">
                <Link to="/dashboard" className="goback-btn"><img src="./assets/arrow_back.svg" />Back to dashboard</Link>
                <h3>Account Settings</h3>
                <div id="setting-box">
                    <div id="account-info">
                        <div className="input-container">
                            <p>Edit account information</p>
                            <input type="text" value="" placeholder="First Name" />
                            <input type="text" value="" placeholder="Last Name" />
                            <input type="text" value="" placeholder="Email" />
                            <input type="text" value="" placeholder="Password" />
                            <input type="text" value="" placeholder="Password Confirmation" />
                            <button type="submit" className="start-btn">SAVE</button>
                        </div>    
                    </div>
                     <div id="payment-info">
                        <div className="cc-container">
                            <p>Edit payment method</p>
                            <div>
                                <p>Billing Address</p>
                                <div className="input-container">
                                    <input type="text" value="" placeholder="First Name" />
                                    <input type="text" value="" placeholder="Last Name" />
                                    <input type="text" value="" placeholder="Address" />
                                    <input type="text" value="" placeholder="Unit" />
                                    <input type="text" value="" placeholder="City" />
                                    <input type="text" value="" placeholder="State" />
                                    <input type="text" value="" placeholder="Zip Code" />
                                </div>
                            </div>
                            <div>
                                <p>Credit Card</p>
                                <div className="input-container">
                                    <input type="text" value="" placeholder="Credit Card Number" />
                                    <input type="text" value="" placeholder="Exp Date" />
                                    <input type="text" value="" placeholder="CVV" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="start-btn">SAVE</button>
                    </div>
                </div>
                <div id="news-container">
                    <h5>News:</h5>
                    <div id="news-box">
                        {
                            dummyNews.map((news) => {
                                return <a href={news.url} target="_blank">{news.title}</a>
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }
}

const mapState = state => ({ user: state.user })
const mapDispatch = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        getUser: () => dispatch(getUser('John'))
    }
}

export default connect(mapState, mapDispatch)(Settings)
