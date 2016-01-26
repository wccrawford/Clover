import React from 'react';
import Clover from './clover.jsx';
import Plant from './plant.js';

class Inventory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedClovers: []
		};
	}

	getSelectedClovers() {
		return this.state.selectedClovers;
	}

	deselectClover(id) {
		var index = this.state.selectedClovers.indexOf(id);
		if(index !== -1) {
			var clovers = this.state.selectedClovers;
			clovers.splice(index, 1);
			this.setState({
				selectedClovers: clovers
			});
		}
	}

	selectClover(id) {
		var index = this.state.selectedClovers.indexOf(id);
		if(index === -1) {
			var clovers = this.state.selectedClovers;
			clovers.push(id);
			this.setState({
				selectedClovers: clovers
			});
		}
	}

	toggleSelectClover(id) {
		var index = this.state.selectedClovers.indexOf(id);
		if(index === -1) {
			this.selectClover(id);
		} else {
			this.deselectClover(id);
		}
	}

	render() {
		var items = this.props.items.map(item => {
			var selected = (this.state.selectedClovers.indexOf(item.id) !== -1);
			return (
				<Clover key={item.id} data={item} selected={selected} selectClover={this.toggleSelectClover.bind(this)}/>
			);
		});

		var count = items.length;
		var max = this.props.maxInventory;

		return (
			<div className="inventory">
				<div className="label">Inventory</div>
				<div>
					{items}
				</div>
				<div className="countHolder">{count} / {max}</div>
			</div>
		);
	}
}

export default Inventory;