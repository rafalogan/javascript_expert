import timers from 'timers/promises';

const timeoutAsync = timers.setTimeout;

/*
const results =  ['1', '2'].map( async (item) => {
    console.log('starting process!');
    await timeoutAsync(100);
    console.log(item)
    console.count('debug');
    console.log(await Promise.resolve('timeout oder!'));
    await timeoutAsync(100);
    console.count('debug');

    return parseInt(item) * 2;
});

console.log('results', results);
console.log('results', await Promise.all(results));
*/

setTimeout(async () => {
    console.log('starting process!');
    await timeoutAsync(100);
    console.count('debug');
    console.log(await Promise.resolve('timeout oder!'));
    await timeoutAsync(100);
    console.count('debug');

    await Promise.reject('promise rejected on timeout!')
}, 1000);

const throwError = (msg) => { throw new Error(msg) };

try {
    console.log('Hello');
    console.log('world');

    throwError('error in try/catch')
} catch(err) {
    console.log('pego no catch!', err.message)
} finally {
    console.log('execulte after all!')
}

process.on('unhandledRejection', (e) => {
    console.error('unhandledRejection', e.message || e)
})

process.on('uncaughtException', (e) => {
    console.log('uncaughtException', e.message || e);
    // process.exit(1)
})

// se a Promise.reject estiver em um outro contextlo ele cai no unhandledRejection.
setTimeout(async () => {
    await Promise.reject('promised async/await rejected!')
});

// uncaughtException
setTimeout(() => throwError('Erro fora do catch!'));

Promise.reject('promisse rejected!');
await Promise.reject('promisse rejected!');
