import React from 'react';

class Clover extends React.Component {
	constructor(props) {
		super(props);
	}

	selectClover() {
		if(this.props.selectClover) {
			this.props.selectClover(this.props.data.id);
		}
	}

	render() {
		var classes = ['clover'].concat(
			this.props.data.genes.map(function(gene) {
				return 'gene' + gene;
			})
		);
		if(this.props.selected) {
			classes.push('selected');
		}

		return (
			<div className={classes.join(' ')} onClick={this.selectClover.bind(this)}>
				<div className="leaf one-a"></div><div className="leaf one-b"></div><div className="leaf two-a"></div><div className="leaf two-b"></div><div className="leaf three-a"></div><div className="leaf three-b"></div><div className="leaf four"></div>
			</div>
		);
	}
}

export default Clover;