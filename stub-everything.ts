
import * as sinon from 'sinon';

export default function stubEverything(thingToMock) {

	if (Array.isArray(thingToMock)) {
		return thingToMock.map(stubEverything);
	}

	const enumerable = _isClass(thingToMock) ? thingToMock.prototype : thingToMock;
	for (let prop in enumerable) {
		if (enumerable.hasOwnProperty(prop)) {
			const value = enumerable[prop];

			if (typeof value === 'function') {
				enumerable[prop] = sinon.stub(enumerable, prop);
			}

			if (typeof value === 'object') {
				enumerable[prop] = stubEverything(value);
			}

			if (Array.isArray(value)) {
				enumerable[prop] = value.map(stubEverything);
			}
		}

	}

	return thingToMock;

}

export function restoreEverything(thingToRestore) {

	if (Array.isArray(thingToRestore)) {
		return thingToRestore.map(restoreEverything);
	}

	const enumerable = _isClass(thingToRestore) ? thingToRestore.prototype : thingToRestore;
	for (let prop in enumerable) {
		if (enumerable.hasOwnProperty(prop)) {
			const value = enumerable[prop];

			if (!value) continue;

			if (value.restore) {
				value.restore();
				continue;
			}

			if (typeof value === 'object') {
				enumerable[prop] = restoreEverything(value);
			}

			if (Array.isArray(value)) {
				enumerable[prop] = value.map(restoreEverything);
			}
		}
	}

	return thingToRestore;
}

function _isClass(v) {
	try {
		new v();
	} catch (err) {
		if (err.message.indexOf('is not a constructor') >= 0) {
			return false;
		}
	}
	return true;
}
