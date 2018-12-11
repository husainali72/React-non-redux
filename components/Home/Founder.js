import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Icon } from 'antd'
// import 'ant-design-icons/dist/anticons.min.css'

const Founder = (props) => {
	return (
		<Col md={4} id="singleFounder" className={(props.info.index == 0 ? 'col-md-offset-2' : '')}>
			<img className="img-circle founder-profile" src={'./assets/' + props.info.image} />
			<div> 
				<h4>{props.info.name}</h4>
				<p>{props.info.title}</p>
				<div className="icon-container">
					{ props.info.twitter && <a href="#"><Icon type="twitter" /></a>}
					{ props.info.linkedIn && <a href="#"><Icon type="linkedin" /></a>}
					{ props.info.URL && <a href="#"><Icon type="global" /></a>}
				</div>
			</div>
			<div>
				<p>{props.info.description}</p>
				
				{/* <div className="icon-container">
	        	{
	        		props.info.icon.map(icon => {
	        			return <i key={icon} className={icon} style={{fontSize: "20px"}} />
	        		})
	        	}
	        </div> */}
			</div>
		</Col>
	)
}

// const mapState = state => {}
// export default connect(mapState)(FAQ)
export default Founder
