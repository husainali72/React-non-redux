import React from 'react'
import { Collapse } from 'antd';

class Question extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const Panel = Collapse.Panel;
		return (
			<div id="question" className="flex-row">
					<Panel header={this.props.info.question} key="1">
						<p>{this.props.info.ans}</p>
					</Panel>
			</div>
	    )
	}
}

// const mapState = state => {}
// export default connect(mapState)(FAQ)

export default Question
