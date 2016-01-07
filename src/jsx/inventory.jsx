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

	deselectClover() {
		this.state.selectedClover = null;
	}

	selectClover(id) {
		this.setState({
			selectedClover: id
		});
	}

	render() {
		var self = this;

		var items = this.props.items.map(function(item, index) {
			var selected = (item.id == self.state.selectedClover);
			return (
				<Clover key={item.id} data={item} selected={selected} selectClover={self.selectClover.bind(self)}/>
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