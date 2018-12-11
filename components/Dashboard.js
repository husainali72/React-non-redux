import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { closeModal, getUser } from '../store'
import InfoBox from './Home/About-InfoContainer'
import CumulativeReturn from './IndexBuilder/Charts/CumulativeReturn'
// import {Link} from 'react-router-dom'
// import { Row, Col } from 'react-bootstrap'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div id="dashboard" className="section">
                <div className="title">
                    <h3>Welcome, {this.props.user}</h3>
                    <Link to="/settings">Edit account</Link>
                </div>
                <h3>Dashboard</h3>
                <div className="btn-container">
                    <Link to="/indexbuilder"><button type="submit" className="start-btn index-btn">RETURN TO CRYPTO INDEX BUILDER</button></Link>
                    <Link to="/toolkit"><button type="submit" className="start-btn tool-btn">RETURN TO INVESTMENT TOOLKIT</button></Link>
                </div>
                <div className="chart-container">
                    <CumulativeReturn />
                </div>
                <div className="price-container">
                    <InfoBox />
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

export default connect(mapState, mapDispatch)(Dashboard)
