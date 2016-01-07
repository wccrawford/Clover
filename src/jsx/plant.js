import Guid from 'guid';

class Plant {
	constructor(data) {
		if(!data) {
			data = {};
		}

		this.genes = data.genes || [];
		this.location = data.location || 'inventory';
		this.id = data.id || Guid.raw();
	}
}

export default Plant;