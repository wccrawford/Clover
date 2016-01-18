import React from 'react';

class Help extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<p>Breed clovers by clicking on them and then an empty spot in a breeder box to the right.  When 2 clovers are in the box, they'll being to breed.  Click on a clover in a breeder box to remove it.  You can sell clovers from the inventory by clicking on one to select one and then clicking 'Sell'.</p>
				<p>Gold can be used to buy upgrades to improve various aspects of the breeding process.</p>
				<p>Occasionally, while breeding, mutations will occur.  There are a total of 7 genes that can mutate.  Parts of the clover will turn gold when the associated gene is mutated.</p>
				<p>If the inventory box is full, excess clovers will be discarded.</p>
			</div>
		);
	}
}

export default Help;