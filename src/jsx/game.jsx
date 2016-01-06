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
			    })
			],
			breeders: [
				{
					clovers: []
				}
			]
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
		clearInterval(this.timerHandle);
	}

	tick(deltaTime) {
		//this.setState({
		//	counter: this.state.counter + deltaTime
		//});
	}

	render() {
		var self = this;

		//var time = parseFloat(this.state.counter).toFixed(2);
		var breeders = this.state.breeders.map(function(item, index) {
			var breederItems =  self.state.items.filter(function(item) {
				return item.location == 'breeder_'+index;
			});

			var data = {
				clovers: breederItems
			};

			return (
				<Breeder key={index} data={data}/>
			);
		});
		var inventoryItems = this.state.items.filter(function(item) {
			return item.location == 'inventory';
		});
		return (
			<div>
				<div className="row">
					<div className="col-xs-8">
						<Inventory items={inventoryItems}/>
					</div>
					<div className="col-xs-4">
						{breeders}
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
