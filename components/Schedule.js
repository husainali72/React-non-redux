import React from 'react'
import { connect } from 'react-redux'
import { closeIframe, getUser } from '../store'
import history from '../history'

class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isLoading: true}
        this.escFunction = this.escFunction.bind(this)
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false)
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false)
    }

    escFunction(event){
        if (event.keyCode === 27) {
            this.props.closeIframe()
        }
    }

    _iframeLoaded() {
        this.setState({
            isLoading: false
        })
    }

    render() {

        return (
            <div id="iframe-modal">
                <div id="schedule-form">
                    <iframe src="https://calendly.com/hbw-bill/hbw-pow-index-fund-info" width="100%" height="100%" frameborder="0" ></iframe>
                    <div className="exit-btn" onClick={this.props.closeIframe}>X</div>
                </div>
            </div>
        )
    }
}

const mapState = state => ({})
const mapDispatch = dispatch => {
    return {
        closeIframe: () => dispatch(closeIframe())
    }
}

export default connect(mapState, mapDispatch)(Registration)
