import React from 'react'
import NumberFormat from 'react-number-format';
import { Col } from 'react-bootstrap'

const Info = (props) => {
  return (
    // <div id="singleInfo" className="flex-row">    
    <div>
      <div id="singleInfo">
        <Col md={2} xs={2} sm={2}>
          <img src={"./assets/coins/" + props.info.image} className="coin-image" />
        </Col>
        <Col md={6} xs={6} sm={6}>
          <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>{props.info.name}</div>
        </Col>
        <Col md={4} xs={4} sm={4} style={{ color: '#fff', fontSize: '16px', textAlign: 'right' }} className={props.info.priceClass}>
          <NumberFormat value={props.info.price} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$ '} renderText={value => <div>{value}</div>} />
        </Col>
        {/*<div>{props.info.otherinfo}</div>
    <div style={{color: 'lightgreen'}}>{props.info.percent}</div>*/}
      </div>
    </div>
  )
}

// const mapState = state => {}
// export default connect(mapState)(FAQ)

export default Info
