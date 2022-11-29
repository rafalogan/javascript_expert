import Http from 'http';
import { log, error } from 'console';

let count = 1;
const handler = async (req, res ) => {
    count++;
    try {
        if (count % 2 === 0) await Promise.reject('erro on handler!');

        for await (const data of req) {
            try {
                if (count % 2 !== 0 ) await Promise.reject('error in for!');
                res.end()
            } catch (err) {
                error('ERROR: a request error has happened');
                res.writeHead(500);
                res.write(JSON.stringify({ message: 'internal server errro!' }));
                res.end()
            }
        }
    } catch (err) {
        error('ERROR: a server error has happened', err);
        res.writeHead(500);
        res.write(JSON.stringify({ message: 'intenal server error!' }));
        res.end()
    }

};

Http.createServer(handler)
    .listen(3000, () => log('running at 3000'));
