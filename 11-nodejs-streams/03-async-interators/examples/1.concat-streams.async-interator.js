import { pipeline } from 'stream/promises';
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

async function* output(stream){
	for await (const data of stream) {
		// ?=- -> ele faz a busca a partir do - de maneira reversa;
		// :"(?<name>.*) -> procura pelo conteudo a partir dos : que esta dentro das aspas e extrai o mesmo;
		const name = data.match(/:"(?<name>.*)(?=-)/).groups.name;
		console.log(`[${name.toLowerCase()}]`, data);
	}
}

async function* merge(streams){
	for (const readable of streams) {
		// faz trabalhar com object mode
		readable.setEncoding('utf8');
		for await (const chunk of readable) {
			for (const line of chunk.trim().split('\n')) {
				yield line;
			}
		}

	}
}

await pipeline(
	merge(results),
	output
)
