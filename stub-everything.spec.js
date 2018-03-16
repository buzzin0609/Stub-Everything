"use strict";
/**
 * Test suite for tsMockAnything module
 */
Object.defineProperty(exports, "__esModule", { value: true });
var stub_everything_1 = require("./stub-everything");
describe('tsMockAnything:', function () {
    it('should mock methods on classes', function () {
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            Foo.prototype.bar = function () {
            };
            return Foo;
        }());
        var newFoo = new (stub_everything_1.default(Foo))();
        newFoo.bar();
        expect(newFoo.bar.called).toEqual(true);
    });
    it('should mock methods on objects', function () {
        var foo = {
            bar: function () { }
        };
        var stub = stub_everything_1.default(foo);
        expect(stub).toBeTruthy();
        expect(stub.bar).toBeTruthy();
        stub.bar();
        expect(stub.bar.called).toBeTruthy();
    });
    it('should mock functions on nested objects', function () {
        var foo = {
            bar: {
                fizz: function () { }
            }
        };
        var stub = stub_everything_1.default(foo);
        expect(stub.bar).toBeTruthy();
        expect(stub.bar.fizz).toBeTruthy();
        stub.bar.fizz();
        expect(stub.bar.fizz.called).toEqual(true);
    });
    it('should mock array of objects', function () {
        var foo = {
            bar: function () { }
        };
        var bar = {
            foo: function () { }
        };
        var _a = stub_everything_1.default([foo, bar]), newFoo = _a[0], newBar = _a[1];
        expect(newFoo).toBeTruthy();
        expect(newBar).toBeTruthy();
        expect(newFoo.bar).toBeDefined();
        expect(newBar.foo).toBeDefined();
        newFoo.bar();
        newBar.foo();
        expect(newFoo.bar.called).toEqual(true);
        expect(newBar.foo.called).toEqual(true);
    });
    it('should mock the passed in object by reference', function () {
        var foo = {
            bar: function () { }
        };
        var stub = stub_everything_1.default(foo);
        expect(foo.bar).toBeTruthy();
        foo.bar();
        expect(stub.bar.called).toEqual(true);
    });
    it('should mock injected classes to functions without typescript moaning like a bitch', function () {
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            Foo.prototype.bar = function () {
                return '';
            };
            return Foo;
        }());
        var Bar = /** @class */ (function () {
            function Bar(foo) {
                this.foo = foo;
            }
            return Bar;
        }());
        var stubbed = new (stub_everything_1.default(Foo));
        expect(stubbed.bar).toBeTruthy();
        var bar = new Bar(stubbed);
        expect(bar.foo).toBeTruthy();
        bar.foo.bar();
        expect(stubbed.bar.called).toEqual(true);
    });
});
//# sourceMappingURL=stub-everything.spec.js.map