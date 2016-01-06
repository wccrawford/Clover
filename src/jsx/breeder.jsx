import React from 'react';

import Clover from './clover.jsx';

class Breeder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var clovers = [
			<div key="ec_0" className="clover"><div className="leaf empty"></div></div>,
			<div key="ec_1" className="clover"><div className="leaf empty"></div></div>
			];
		if(this.props.data) {
			if(this.props.data.clovers[0]) {
				clovers[0] = <Clover key={this.props.data.clovers[0].id} data={this.props.data.clovers[0]}/>;
			}
			if(this.props.data.clovers[1]) {
				clovers[1] = <Clover key={this.props.data.clovers[1].id} data={this.props.data.clovers[1]}/>;
			}
		}
		return (
			<div className="breeder">{clovers}</div>
		);
	}
}

export default Breeder;