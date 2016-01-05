import React from 'react';

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			counter: 0
		};
	}

	componentDidMount() {
		var self = this;
		this.time = new Date().getTime();
		this.timerHandle = setInterval(function() {
			var time = new Date().getTime();
			self.tick((time - self.time) / 1000);
			self.time = time;
		}, 50);
	}

	componentWillUnmount() {
		clearInterval(this.timerHandle);
	}

	tick(deltaTime) {
		this.setState({
			counter: this.state.counter + deltaTime
		});
	}

	render() {
		var time = parseFloat(this.state.counter).toFixed(2);
		return (
			<div>Game - {time}</div>
		);
	}
}

export default Game;
