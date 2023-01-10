const http = require('http');
const fs = require('fs/promises');
const path = require('path');


const app = http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url;

    const jsonPath = path.resolve('./files/users.json');

    if(url === '/users') {
        // con la obtención de usuarios del archivo users.json
        if(method === 'GET') {

            const jsonFile = await fs.readFile(jsonPath, 'utf8');

            response.setHeader('Content-Type', 'application/json');
            response.write(jsonFile);

        }

        if(method === 'POST') {

            const jsonFile = await fs.readFile(jsonPath, 'utf-8');
            const usersArray = JSON.parse(jsonFile);
            request.on('data', (data) => {
                

                const user = JSON.parse(data);
                console.log(user);
                usersArray.push(user);
                const newJson = JSON.stringify(usersArray);
                fs.writeFile(jsonPath, newJson);

            });
        }
    } else {
        response.write('Recurso no disponible')
    }

    response.end();
});

const PORT = 8000;

app.listen(PORT);

console.log(`Servidor escuchando en el puerto ${PORT}`);