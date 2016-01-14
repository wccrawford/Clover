import React from 'react';
import UpgradeData from './upgradedata.js';

class Upgrades extends React.Component {
	buyUpgrade(key) {
		this.props.buyUpgrade(key);
	}

	render() {
		var self = this;

		var upgrades = Object.keys(UpgradeData).map(function(key, index) {
			var item = UpgradeData[key];
			var owned = (self.props.upgradesOwned.indexOf(key) != -1);
			var buyable = item.cost <= self.props.gold;
			var label = owned ? 'Bought' : item.cost + ' Gold';
			return <div key={key}><button className="btn btn-primary" disabled={owned || !buyable} onClick={self.buyUpgrade.bind(self, key)}>{label}</button> {item.description}</div>
		});
		return (
			<div className="container-fluid">
				{upgrades}
			</div>
		);
	}
}

export default Upgrades;
