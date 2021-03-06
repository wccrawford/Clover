import React from 'react';
import Guid from 'guid';

import Inventory from './inventory.jsx';
import Clover from './clover.jsx';
//import Plant from './plant.js';
import Breeder from './breeder.jsx';
import Options from './options.jsx';
import Upgrades from './upgrades.jsx';
import Help from './help.jsx';
import Achievements from './achievements.jsx';

import UpgradeData from './upgradedata.js';
import AchievementData from './achievementdata.js';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.defaultStats = {
			maxInventory: 5,
			mutationChance: 1,
			breederCount: 1,
			breederTime: 15
		};

		this.state = this.loadState() || {
			counter: 0,
			maxInventory: 5,
			mutationChance: 1,
			breederCount: 1,
			breederTime: 15,
			gold: 0,
			items: [
				this.createClover(),
				this.createClover()
			],
			breeders: [],
			inventory: [],
			upgrades: [],
			achievements: []
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
			if(state.upgrades && state.upgrades.indexOf(upgrade) != -1) {
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
		var breeders = state.breeders;

		for(var b=0; b<state.breederCount; b++) {
			if(!breeders[b]) {
				breeders[b] = {
					progress: 0,
					clovers: []
				}
			}
			var breederItems = state.items.filter(item => {
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

	getSelectedClovers() {
		return this.refs.inventory.getSelectedClovers();
	}

	transferClover(id, location) {
		if (!id) {
			id = this.getSelectedClovers()[0];
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
				this.refs.inventory.deselectClover(id);
			}
		}
	}

	sellSelectedClovers() {
		if(this.state.items.length <= 2) {
			return;
		}
		var ids = this.getSelectedClovers();

		var inventory = this.state.items;

		var clovers = [];

		for(var index=ids.length-1; index >= 0; index--) {
			var id = ids[index];

			if (id) {
				for (var i = 0; i < inventory.length; i++) {
					if (inventory[i].id == id) {
						var clover = inventory.splice(i, 1);
						if (clover[0]) {
							//this.sellClover(clover[0]);
							clovers.push(clover[0]);
						}
					}
				}
			}
		}

		if(clovers.length) {
			this.sellClovers(clovers);
		}

		this.setState({
			items: inventory,
			inventory: this.setInventoryItems(inventory)
		});
	}

	addAchievement(key) {
		var achievements = this.state.achievements;
		if(achievements.indexOf(key) === -1) {
			achievements.push(key);
			this.setState({
				achievements: achievements
			});
		}
	}

	addClover(data) {
		Object.keys(AchievementData).forEach((key) => {
			var ach = AchievementData[key];
			if((this.state.achievements.indexOf(key) === -1) && ach.checkGenes && ach.checkGenes(data.genes)) {
				this.addAchievement(key);
			}
		});
		if(this.state.inventory.length < this.state.maxInventory) {
			var items = this.state.items;
			items.push(this.createClover(data));
			this.setState({
				items: items,
				inventory: this.setInventoryItems(items)
			});
		} else if(this.state.upgrades.indexOf('sellExcess') != -1) {
			this.sellClovers([data]);
		}
	}

	sellClovers(clovers) {
		var totalGold = this.state.gold;
		
		for(var c in clovers) {
			var clover = clovers[c];
			var gold = Math.pow(2, clover.genes.length);
			totalGold += gold;

			Object.keys(AchievementData).forEach((key) => {
				var ach = AchievementData[key];
				if ((this.state.achievements.indexOf(key) === -1) && ach.checkGold && ach.checkGold(totalGold)) {
					this.addAchievement(key);
				}
			});

			this.refs.inventory.deselectClover(clover.id);
		}

		this.setState({
			gold: totalGold
		});
	}

	//sellClover(data) {
	//	var gold = Math.pow(2, data.genes.length);
	//	var totalGold = this.state.gold + gold;
	//	this.setState({
	//		gold: totalGold
	//	});
	//
	//	Object.keys(AchievementData).forEach((key) => {
	//		var ach = AchievementData[key];
	//		if ((this.state.achievements.indexOf(key) === -1) && ach.checkGold && ach.checkGold(totalGold)) {
	//			this.addAchievement(key);
	//		}
	//	});
	//
	//	this.refs.inventory.deselectClover(data.id);
	//}

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
		var breeders = this.state.breeders.map((breeder, index) => {
			return (
				<Breeder key={index} data={breeder} ref={'breeder' + index} index={index} transferClover={this.transferClover.bind(this)} addClover={this.addClover.bind(this)} mutationChance={this.state.mutationChance} breederTime={this.state.breederTime}/>
			);
		});
		return (
			<div>
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Clovers</a></li>
					<li role="presentation"><a href="#upgrades" aria-controls="upgrades" role="tab" data-toggle="tab">Upgrades</a></li>
					<li role="presentation"><a href="#options" aria-controls="options" role="tab" data-toggle="tab">Options</a></li>
					<li role="presentation"><a href="#achievements" aria-controls="achievements" role="tab" data-toggle="tab">Achievements</a></li>
					<li role="presentation"><a href="#help" aria-controls="help" role="tab" data-toggle="tab">Help</a></li>
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
									<button id="sellButton" className="btn btn-primary" onClick={this.sellSelectedClovers.bind(this)}>Sell</button>
								</div>
								<div className="col-xs-3 col-md-4">
									{breeders}
								</div>
							</div>
						</div>
					</div>
					<div role="tabpanel" className="tab-pane" id="upgrades">
						<Upgrades upgradesOwned={this.state.upgrades} buyUpgrade={this.buyUpgrade.bind(this)} gold={this.state.gold}/>
					</div>
					<div role="tabpanel" className="tab-pane" id="options">
						<Options />
					</div>
					<div role="tabpanel" className="tab-pane" id="achievements">
						<Achievements achievements={this.state.achievements}/>
					</div>
					<div role="tabpanel" className="tab-pane" id="help">
						<Help />
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
