import React from 'react';

class Clover extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var classes = ['clover'].concat(
			this.props.data.genes.map(function(gene) {
				return 'gene' + gene;
			})
		);

		return (
			<div className={classes.join(' ')}>
				<div className="leaf one-a"></div><div className="leaf one-b"></div><div className="leaf two-a"></div><div className="leaf two-b"></div><div className="leaf three-a"></div><div className="leaf three-b"></div><div className="leaf four"></div>
			</div>
		);
	}
}

export default Clover;