import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
import * as Scroll from 'react-scroll';
import Landing from './Landing'
import About from './About'
import PandaFund from './PandaFund'
import Tools from './Tools'
import Team from './Team'
import Faq from './Faq'
import Footer from './Footer'

// import News from './News'

let Element = Scroll.Element;

const Home = () => {
  return (
    <div id="home">
      <Element name="landing"><Landing /></Element>
      <About />
      <Element name="tools"><Tools /></Element>
      <Element name="panda-fund"><PandaFund /></Element>
      <Element name="team"><Team /></Element>
      <Element name="faq"><Faq /></Element>
      {/*<Element name="news"><News /></Element>*/}
      <Footer />
    </div>
  )
}

// const mapState = state => {}
// export default connect(mapState)(Home)

export default Home
