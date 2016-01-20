import React from 'react';
import Clover from './clover.jsx';
import Plant from './plant.js';

class Inventory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedClover: null
		};
	}

	getSelectedClover() {
		return this.state.selectedClover;
	}

	deselectClover() {
		this.state.selectedClover = null;
	}

	selectClover(id) {
		this.setState({
			selectedClover: id
		});
	}

	render() {
		var items = this.props.items.map(item => {
			var selected = (item.id == this.state.selectedClover);
			return (
				<Clover key={item.id} data={item} selected={selected} selectClover={this.selectClover.bind(this)}/>
			);
		});

		var count = items.length;
		var max = this.props.maxInventory;

		return (
			<div className="inventory">
				<div>
					{items}
				</div>
				<div className="countHolder">{count} / {max}</div>
			</div>
		);
	}
}

export default Inventory;