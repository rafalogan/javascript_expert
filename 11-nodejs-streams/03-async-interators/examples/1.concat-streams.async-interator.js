import { Writable, PassThrough } from 'stream';
import axios from 'axios';

const API_01 = 'http://localhost:3000';
const API_O2 = 'http://localhost:4000';

const requests = await Promise.all([
    axios({
        method: 'get',
        url: API_01,
        responseType: 'stream'
    }),
    axios({
        method: 'get',
        url: API_O2,
        responseType: 'stream'
    })
]);

const results = requests.map(({data}) => data);

const output = Writable({
    write(chunk, enc, callback) {
        const data = chunk.toString().replace(/\n/, '');

        // ?=- -> ele faz a busca a partir do - de maneira reversa;
        // :"(?<name>.*) -> procura pelo conteudo a partir dos : que esta dentro das aspas e extrai o mesmo;
        const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;

        console.log(`[${name.toLowerCase()}]`, data);
        callback();
    }
})

const merge = (stream) => stream.reduce((prev, current, index, itens) => {
    // impede que a stream feche
    current.pipe(prev, { end: false });

    // como colocamos end: false, vamos manipular ksomento quando o nosso currtn encerrar.
    // Quando le terminar, verifica se todos encerraram para fechar toda a cadeia anterior.
    current.on('end', () => itens.every(s => s.ended) && prev.end());

    return prev
}, new PassThrough())

merge(results).pipe(output);

// result[0].pipe(output);
// result[1].pipe(output);
