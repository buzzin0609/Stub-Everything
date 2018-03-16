"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
function stubEverything(thingToMock) {
    if (Array.isArray(thingToMock)) {
        return thingToMock.map(stubEverything);
    }
    var enumerable = _isClass(thingToMock) ? thingToMock.prototype : thingToMock;
    for (var prop in enumerable) {
        if (enumerable.hasOwnProperty(prop)) {
            var value = enumerable[prop];
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
exports.default = stubEverything;
function restoreEverything(thingToRestore) {
    if (Array.isArray(thingToRestore)) {
        return thingToRestore.map(restoreEverything);
    }
    var enumerable = _isClass(thingToRestore) ? thingToRestore.prototype : thingToRestore;
    for (var prop in enumerable) {
        if (enumerable.hasOwnProperty(prop)) {
            var value = enumerable[prop];
            if (!value)
                continue;
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
exports.restoreEverything = restoreEverything;
function _isClass(v) {
    try {
        new v();
    }
    catch (err) {
        if (err.message.indexOf('is not a constructor') >= 0) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=stub-everything.js.map