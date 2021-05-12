import greeter from '../src/index';

test('Index', () => {
    const greeting = greeter('Test');

    expect(greeting).toBe('Hello, Test');

    expect(greeter('error')).not.toBe('Hello,Test');
});
