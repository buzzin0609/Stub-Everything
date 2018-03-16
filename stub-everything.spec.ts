/**
 * Test suite for tsMockAnything module
 */

import stubEverything from './stub-everything';

describe('tsMockAnything:', function () {
    it('should mock methods on classes', function() {
        class Foo {
            bar() {

            }
        }

        const newFoo = new (stubEverything(Foo))();
        newFoo.bar();
        expect(newFoo.bar.called).toEqual(true);

    });

    it('should mock methods on objects', function() {
        const foo = {
            bar: () => {}
        };

        const stub = stubEverything(foo);
        expect(stub).toBeTruthy();
        expect(stub.bar).toBeTruthy();

        stub.bar();
        expect(stub.bar.called).toBeTruthy();
    });

    it('should mock functions on nested objects', function() {
        const foo = {
            bar: {
                fizz: () => {}
            }
        };

        const stub = stubEverything(foo);
        expect(stub.bar).toBeTruthy();
        expect(stub.bar.fizz).toBeTruthy();
        stub.bar.fizz();
        expect(stub.bar.fizz.called).toEqual(true);
    });

    it('should mock array of objects', function() {
        const foo = {
            bar: () => {}
        };

        const bar = {
            foo: () => {}
        };

        const [newFoo, newBar] = stubEverything([foo, bar]);

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
        const foo = {
            bar: () => {}
        };

        const stub = stubEverything(foo);
        expect(foo.bar).toBeTruthy();
        foo.bar();
        expect(stub.bar.called).toEqual(true);
    });

    it('should mock injected classes to functions without typescript moaning like a bitch', function () {

        class Foo {
            bar(): string {
                return '';
            }
        }

        class Bar {
            foo: Foo;
            constructor(foo: Foo) {
                this.foo = foo;
            }
        }

        const stubbed = new (stubEverything(Foo));

        expect(stubbed.bar).toBeTruthy();

        const bar = new Bar(stubbed);
        expect(bar.foo).toBeTruthy();

        bar.foo.bar();
        expect(stubbed.bar.called).toEqual(true);

    });
});
