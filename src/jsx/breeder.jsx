import React from 'react';

import Clover from './clover.jsx';

class Breeder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			progress: props.data.progress
		};
	}

	tick(deltaTime) {
		var progress = 0;

		if(this.props.data.clovers.length == 2) {
			progress = this.state.progress + (deltaTime * 10);

			if(progress > 100) {
				progress -= 100;
			}
		}
		this.setState({
			progress: progress
		});
	}

	removeClover(id) {
		this.props.transferClover(id, 'inventory');
	}

	transferClover() {
		this.props.transferClover(null, 'breeder_'+this.props.index);
	}

	render() {
		var clovers = [
			<div key="ec_0" className="clover" onClick={this.transferClover.bind(this)}><div className="leaf empty"></div></div>,
			<div key="ec_1" className="clover" onClick={this.transferClover.bind(this)}><div className="leaf empty"></div></div>
			];
		if(this.props.data) {
			if(this.props.data.clovers[0]) {
				clovers[0] = <Clover key={this.props.data.clovers[0].id} data={this.props.data.clovers[0]} selectClover={this.removeClover.bind(this)}/>;
			}
			if(this.props.data.clovers[1]) {
				clovers[1] = <Clover key={this.props.data.clovers[1].id} data={this.props.data.clovers[1]} selectClover={this.removeClover.bind(this)}/>;
			}
		}
		var style = {
			width: this.state.progress + "%"
		};

		return (
			<div className="breeder">
				<div>{clovers}</div>
				<div className="progress">
					<div className="progress-bar" role="progressbar" style={style}></div>
				</div>
			</div>
		);
	}
}

export default Breeder;