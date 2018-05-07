export function objFilter(dataObj: Object, filterObj?: Object): boolean {
	if (!filterObj) {
		return true;
	}

	let pass = true;

	for (let name of Object.keys(filterObj)) {
		let isEqual = filterObj[name] === dataObj[name];

		if (!isEqual) {
			pass = false;
			break;
		}
	}

	return pass;
}
