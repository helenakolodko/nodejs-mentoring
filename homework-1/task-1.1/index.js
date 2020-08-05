process.stdin.on('data', (input) => {
    let reversed = input.reverse().toString();
    let result = reversed.replace(/^[\r\n]+/, '');

    process.stdout.write(`${result}\n\n`);
});
