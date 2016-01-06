import React from 'react';
import Clover from './clover.jsx';
import Plant from './plant.js';

class Inventory extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		var items = this.props.items.map(function(item, index) {
			return (
				<Clover key={item.id} data={item}/>
			);
		});

		return (
			<div className="inventory">
				{items}
			</div>
		);
	}
}

export default Inventory;