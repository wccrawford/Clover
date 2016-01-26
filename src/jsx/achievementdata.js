var AchievementData = {
	leftLeafGenes: {
		title: 'Left Leaf',
		description: 'Get both genes for the left leaf on the same plant.',
		checkGenes: function(genes) {
			return (genes.indexOf(1) !== -1 && genes.indexOf(2) !== -1);
		}
	},
	middleLeafGenes: {
		title: 'Middle Leaf',
		description: 'Get both genes for the middle leaf on the same plant.',
		checkGenes: function(genes) {
			return (genes.indexOf(3) !== -1 && genes.indexOf(4) !== -1);
		}
	},
	rightLeafGenes: {
		title: 'Right Leaf',
		description: 'Get both genes for the right leaf on the same plant.',
		checkGenes: function(genes) {
			return (genes.indexOf(5) !== -1 && genes.indexOf(6) !== -1);
		}
	},
	stemGene: {
		title: 'Stem',
		description: 'Get the gene for the stem.',
		checkGenes: function(genes) {
			return (genes.indexOf(7) !== -1);
		}
	},
	fourLeafClover: {
		title: 'Four Leaf Clover',
		description: 'Get all genes and have a Four Leaf Clover!',
		checkGenes: function(genes) {
			return (
				genes.indexOf(1) !== -1 &&
				genes.indexOf(2) !== -1 &&
				genes.indexOf(3) !== -1 &&
				genes.indexOf(4) !== -1 &&
				genes.indexOf(5) !== -1 &&
				genes.indexOf(6) !== -1 &&
				genes.indexOf(7) !== -1
			);
		}
	},
	gold1000: {
		title: '1000 Gold',
		description: 'Amass 1000 gold.',
		checkGold: function(gold) {
			return gold >= 1000;
		}
	},
	gold100000: {
		title: '10,000 Gold',
		description: 'Amass 10,000 gold.',
		checkGold: function(gold) {
			return gold >= 10000;
		}
	},
	gold10000000: {
		title: '100,000 Gold',
		description: 'Amass 100,000 gold.',
		checkGold: function(gold) {
			return gold >= 100000;
		}
	}
};

export default AchievementData;