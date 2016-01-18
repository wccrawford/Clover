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
		var multiplier = 100 / this.props.breederTime;

		if(this.props.data.clovers.length == 2) {
			progress = this.state.progress + (deltaTime * multiplier);

			if(progress > 100) {
				progress -= 100;
				this.addClover(this.props.data.clovers);
			}
		}
		this.setState({
			progress: progress
		});
	}

	addClover(clovers) {
		var genes = [];

		for(var g=1; g<=7; g++) {
			var c = Math.floor(Math.random()*2);
			var gene = clovers[c].genes.indexOf(g) !== -1;
			var mutation = (Math.random()*100);
			if(mutation <= this.props.mutationChance) {
				gene = !gene;
			}
			if(gene) {
				genes.push(g);
			}
		}

		this.props.addClover({genes: genes});
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