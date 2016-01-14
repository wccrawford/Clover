import React from 'react';
import Guid from 'guid';

import Inventory from './inventory.jsx';
import Clover from './clover.jsx';
//import Plant from './plant.js';
import Breeder from './breeder.jsx';
import Options from './options.jsx';
import Upgrades from './upgrades.jsx';

import UpgradeData from './upgradedata.js';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.defaultStats = {
			maxInventory: 5,
			mutationChance: 1,
			breederCount: 1
		};

		this.state = this.loadState() || {
			counter: 0,
			maxInventory: 5,
			mutationChance: 1,
			breederCount: 1,
			gold: 0,
			items: [
				this.createClover(),
				this.createClover()
			],
			breeders: [],
			inventory: [],
			upgrades: []
		};

		Object.assign(this.state, this.processUpgrades(this.state));

		this.state.breeders = this.setBreederItems(this.state);

		this.state.inventory = this.setInventoryItems(this.state.items);
	}

	componentDidUpdate() {
		localStorage.setItem('clover-state', JSON.stringify(this.state));
	}

	processUpgrades(state) {
		var data = Object.assign({}, this.defaultStats);
		for(var upgrade in UpgradeData) {
			if(state.upgrades.indexOf(upgrade) != -1) {
				if(typeof(UpgradeData[upgrade].process) == 'function') {
					data = UpgradeData[upgrade].process(data);
				}
			}
		}

		return data;
	}

	loadState() {
		var state = localStorage.getItem('clover-state');
		if(state){
			try {
				state = JSON.parse(state);
			} catch(exc) {
				state = null;
			}
		}

		return state;
	}

	setBreederItems(state) {
		var self = this;
		var breeders = state.breeders;

		for(var b=0; b<state.breederCount; b++) {
			if(!breeders[b]) {
				breeders[b] = {
					progress: 0,
					clovers: []
				}
			}
			var breederItems = state.items.filter(function (item, index) {
				return item.location == 'breeder_' + b;
			});
			breeders[b].clovers = breederItems;
		}

		return breeders;
	}

	setInventoryItems(items) {
		var inventoryItems = items.filter(function(item) {
			return item.location == 'inventory';
		});

		return inventoryItems;
	}

	getSelectedClover() {
		return this.refs.inventory.getSelectedClover();
	}

	transferClover(id, location) {
		if (!id) {
			id = this.getSelectedClover();
		}

		if (id) {
			var inventory = this.state.items;
			var changed = false;
			for(var i=0; i<inventory.length; i++) {
				if(inventory[i].id == id) {
					inventory[i].location = location;
					changed = true;
				}
			}
			if (changed) {
				this.setState({
					items: inventory,
					inventory: this.setInventoryItems(inventory),
					breeders: this.setBreederItems(this.state)
				});
			}
		}
	}

	sellSelectedClover() {
		if(this.state.items.length <= 2) {
			return;
		}
		var id = this.getSelectedClover();

		if(id) {
			var inventory = this.state.items;
			for(var i=0; i<inventory.length; i++) {
				if(inventory[i].id == id) {
					var clover = inventory.splice(i, 1);
					if(clover[0]) {
						var gold = Math.pow(2, clover[0].genes.length);
						this.setState({
							gold: this.state.gold + gold
						});
					}
				}
			}

			this.setState({
				items: inventory,
				inventory: this.setInventoryItems(inventory)
			});
		}
	}

	addClover(data) {
		if(this.state.inventory.length < this.state.maxInventory) {
			var items = this.state.items;
			items.push(this.createClover(data));
			this.setState({
				items: items,
				inventory: this.setInventoryItems(items)
			});
		}
	}

	createClover(data) {
		var clover = {
			id: Guid.raw(),
			location: 'inventory',
			genes: []
		};
		if(data) {
			if(data.id) {
				clover.id = data.id;
			}
			if(data.location) {
				clover.location = data.location;
			}
			if(data.genes) {
				clover.genes = data.genes;
			}
		}
		return clover;
	}

	componentDidMount() {
		var self = this;
		this.time = new Date().getTime();

		function animationFrame() {
			var time = new Date().getTime();
			self.tick((time - self.time) / 1000);
			self.time = time;
			window.requestAnimationFrame(function() {
				animationFrame();
			});
		}

		animationFrame();
	}

	componentWillUnmount() {
	}

	tick(deltaTime) {
		var breeders = this.state.breeders;
		for(var b=0; b<breeders.length; b++) {
			var breeder = breeders[b];

			if(this.refs['breeder' + b]) {
				this.refs['breeder' + b].tick(deltaTime);
			}
			//if(breeder.clovers.length == 2) {
			//	breeder.progress += deltaTime * 10;
			//	if (breeder.progress >= 100) {
			//		breeder.progress -= 100;
			//	}
			//} else {
			//	breeder.progress = 0;
			//}
		}

		//this.setState({
		//	breeders: breeders
		//});
	}

	buyUpgrade(key) {
		var state = this.state;
		state.upgrades.push(key);

		var data = this.processUpgrades(state);
		data.breeders = state.breeders;
		data.items = state.items;
		data.gold = this.state.gold - UpgradeData[key].cost;
		data.upgrades = state.upgrades;
		data.breeders = this.setBreederItems(data);

		this.setState(data);
	}

	render() {
		var self = this;
		function transferClover(id, location) {
			self.transferClover(id, location);
		}
		var breeders = this.state.breeders.map(function(breeder, index) {
			return (
				<Breeder key={index} data={breeder} ref={'breeder' + index} index={index} transferClover={transferClover} addClover={self.addClover.bind(self)} mutationChance={self.state.mutationChance}/>
			);
		});
		return (
			<div>
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Clovers</a></li>
					<li role="presentation"><a href="#upgrades" aria-controls="upgrades" role="tab" data-toggle="tab">Upgrades</a></li>
					<li role="presentation"><a href="#options" aria-controls="options" role="tab" data-toggle="tab">Options</a></li>
				</ul>
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active" id="home">
						<div className="container-fluid">
						<div className="row">
							<div className="col-xs-12">
								Gold: {this.state.gold}
							</div>
						</div>
						<div className="row">
							<div className="col-xs-9 col-md-8">
								<Inventory items={this.state.inventory} maxInventory={this.state.maxInventory} ref="inventory"/>
							</div>
							<div className="col-xs-3 col-md-4">
								{breeders}
							</div>
						</div>
						<button id="sellButton" className="btn btn-primary" onClick={this.sellSelectedClover.bind(this)}>Sell</button>
						</div>
					</div>
					<div role="tabpanel" className="tab-pane" id="upgrades">
						<Upgrades upgradesOwned={this.state.upgrades} buyUpgrade={this.buyUpgrade.bind(this)} gold={this.state.gold}/>
					</div>
					<div role="tabpanel" className="tab-pane" id="options">
						<Options />
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
