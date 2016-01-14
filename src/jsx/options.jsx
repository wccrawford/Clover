import React from 'react';

class Options extends React.Component {
	deleteGame() {
		if(window.confirm('Are you sure you want to completely reset the game?')) {
			localStorage.removeItem('clover-state');
			window.location.href = window.location.href;
		}
	}
	render() {
		return (
			<div className="container-fluid">
				<button className="btn btn-primary" onClick={this.deleteGame}>Delete Game</button>
			</div>
		);
	}
}

export default Options;
