import React from 'react';

import Inventory from './inventory.jsx';
import Clover from './clover.jsx';
import Plant from './plant.js';
import Breeder from './breeder.jsx';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0,
			maxInventory: 20,
			items: [
				new Plant(),
				new Plant(),
				new Plant({
					genes: [1]
				}),
				new Plant({
					genes: [2]
				}),
				new Plant({
					genes: [3]
				}),
				new Plant({
					genes: [4]
				}),
				new Plant({
					genes: [5]
				}),
				new Plant({
					genes: [6]
				}),
				new Plant({
					genes: [7]
				}),
				new Plant({
					genes: [1,2]
				}),
				new Plant({
					genes: [3,4]
				}),
				new Plant({
					genes: [5,6]
				}),
				new Plant({
					genes: [1,2,3,4,5,6,7]
				}),
				new Plant({
					location: 'breeder_0'
				}),
				new Plant({
					genes: [2,3,6],
					location: 'breeder_1'
				}),
			    new Plant({
				    location: 'breeder_1'
			    })
			],
			breeders: [
				{
					progress: 10,
					clovers: []
				},
				{
					progress: 50,
					clovers: []
				}
			],
			inventory: []
		};

		this.state.breeders = this.setBreederItems(this.state.breeders);

		this.state.inventory = this.setInventoryItems(this.state.items);
	}

	setBreederItems(breeders) {
		var self = this;

		for(var b=0; b<breeders.length; b++) {
			var breederItems = self.state.items.filter(function (item, index) {
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
					breeders: this.setBreederItems(this.state.breeders)
				});
			}
		}
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

	render() {
		var self = this;
		function transferClover(id, location) {
			self.transferClover(id, location);
		}
		var breeders = this.state.breeders.map(function(breeder, index) {
			return (
				<Breeder key={index} data={breeder} ref={'breeder' + index} index={index} transferClover={transferClover}/>
			);
		});
		return (
			<div>
				<div className="row">
					<div className="col-xs-6 col-md-8">
						<Inventory items={this.state.inventory} maxInventory={this.state.maxInventory} ref="inventory"/>
					</div>
					<div className="col-xs-6 col-md-4">
						{breeders}
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
