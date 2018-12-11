import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
// import PropTypes from 'prop-types'
import { Home, IndexBuilder, Toolkit, Registration, Dashboard, Settings, Schedule } from './components'

class Routes extends Component {
  componentDidMount() {
  }

  render() {

    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/indexbuilder" component={IndexBuilder} />
          <Route path="/toolkit" component={Toolkit} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/settings" component={Settings} />
        </Switch>
        { this.props.registrationModal && <Registration />}
        { this.props.iframeModal && <Schedule />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    registrationModal: state.registrationModal,
    iframeModal: state.iframeModal,
    user: state.user
  }
}

// const mapDispatch = dispatch => {}

export default withRouter(connect(mapState)(Routes))

// export default withRouter(Routes)
