import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as Scroll from 'react-scroll';
import history from '../history'
import { getUser } from '../store'
import {DropdownButton, MenuItem} from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';

const ScrollLink = Scroll.Link
const animateScroll = Scroll.animateScroll

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.checkLocation = this.checkLocation.bind(this)
    this.logout = this.logout.bind(this)
    this.openSettings = this.openSettings.bind(this)
    this.state = {
      isHome: true,
      width: props.width
    };
  }

  componentWillMount(){
    this.setState({width: window.innerWidth});
  }

  checkLocation(position, isHome) {
    var oldIsHome = history.location.pathname === '/' || history.location.pathname === '/home';
    var newIsHome = isHome;

    this.setState({
      position: position,
      isHome: newIsHome
    })

    if (newIsHome === false) {
      history.push("/"+position)
      window.scrollTo(0, 0);
      return;
    }

    if (newIsHome === true && oldIsHome === false) {
      history.push("/")
    }

    this.forceUpdate();

    {/*Close the dropdown menu*/}
    document.dispatchEvent(new MouseEvent('click'));

    setTimeout(function() {
      var destination = document.querySelector("#"+position);
      const elementPosition = destination.offsetTop - 50;
      animateScroll.scrollTo(elementPosition, {smooth:true,duration:500})
    }.bind(this), 200)
  }

  logout() {
     this.props.getUser("")
     history.push("/")
  }

  openSettings() {
     history.push("/settings")
  }

  render() {
    var position = this.state.position;
    var isHome = this.state.isHome;
    return (
        <div id="navbar">
          <div className="left">
              {/*<Link to="/home">About</Link>*/}
              <DropdownButton className={position === 'toolkit' || position === 'indexbuilder' ? 'active' : ''} title={'Tools'} id="tools-dropdown">
                <MenuItem onClick={() => this.checkLocation('toolkit', false)} to="/toolkit" componentClass={Link} active={position === 'toolkit'}>Crypto Analytical Toolkits</MenuItem>
                <MenuItem onClick={() => this.checkLocation('indexbuilder', false)} to="/indexbuilder" componentClass={Link} active={position === 'indexbuilder'}>Crypto Index Builder</MenuItem>
                <MenuItem divider />
                <li role="presentation">
                      <a onClick={() => this.checkLocation('about', true)}>Learn the Basics<br /><p>It’s easy to get lost or overwhelmed in the new and noisy world of crypto. If you’re new to the crypto space, we highly recommend reading our carefully curated beginner{"\'"}s guide.</p></a>
                </li>
              </DropdownButton>

                  <a id="hbwFundLink" onClick={() => this.checkLocation('hbw-fund',true)} className={position === 'hbw-fund' ? 'active' : ''}><div className="hidden-xs">Panda PoW Index Funds</div><div className="hidden-sm hidden-md hidden-lg hidden-xl">Panda Funds</div></a>
          </div>
          <div className="middle">
                  <a onClick={() => this.checkLocation('landing',true)}><img id="logo" src="./assets/hbw_icon_white.svg" /></a>
          </div>
          <div className="right">
                  <a onClick={() => this.checkLocation('team',true)} className={position === 'team' ? 'active' : ''}>Team</a>

                  <a onClick={() => this.checkLocation('faq', true)} className={position === 'faq' ? 'active' : ''}>FAQ</a>
          </div>
          {
            this.props.user &&
            <div className="loggedin">
              <div className="loggedinContainer">
                <div id="initial-icon">{this.props.user.slice(0, 1)}</div>
                <p onClick={() => this.checkLocation('settings',false)}>Welcome, {this.props.user}</p>
              </div>
                <a onClick= {() => this.checkLocation('dashboard',false)} className={position === 'dashboard' ? 'active' : ''}>Dashboard</a>
                <a onClick={this.logout}>Log Out</a>
            </div>
          }
        </div>
    )
  }
}

const mapState = state => ({ user: state.user })

const mapDispatch = dispatch => ({
  getUser: (user) => dispatch(getUser(user))
})

export default connect(mapState, mapDispatch)(Navbar)

// export default Navbar

// <ScrollLink activeClass="active" to="about" smooth={true} duration={500}>About</ScrollLink>
