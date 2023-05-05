const app = require('../src/app');
const session = require('supertest');
const request = session(app);

const character = {
    id : 111,
    name : 'Zoulger',
    species : 'Humano?',
    gender : 'Male',
    status : 'Dead?',
    origin : 'Earth -0',
    image : null,
}
describe("test de Rutas",() => {
    describe("GET /rickandmorty/character/:id", () => {
        it("Responde con status: 200", async () => {
            const response = await request.get('/rickandmorty/character/1')
            expect(response.statusCode).toBe(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await request.get('/rickandmorty/character/1');
            for(const prop in response.body){
                expect(response.body).toHaveProperty(prop)
            }
        });

        it('Si hay un error responde con status: 500', async () => {
            const response = await request.get('/rickandmorty/character/1a1a1');
            expect(response.statusCode).toBe(500);
        });

        describe("GET /rickandmorty/login", () => {
            const access = { access: true };
            it("Responde con un objeto con la propiedad access en true si la info. es válida", async () => {
                const response = await request.get('/rickandmorty/login?email=lauti@gmail.com&password=henry123');
                expect(response.body).toEqual(access);
            });

            it("Responde con un objeto con la propiedad access en true si la info. no es válida", async () => {
                const response = await request.get('/rickandmorty/login?email=lauti@gmail.com&password=henry321');
                access.access = false;
                expect(response.body).toEqual(access);
            });
        });

        describe("POST /rickandmorty/fav", () =>{
            it("Debe guardar el personaje en favoritos", async () => {
                const response = await request.post('/rickandmorty/fav').
                send(character);
                expect(response.body).toContainEqual(character);
            });

            it("Debe agregar personajes a favoritos sin eliminar los existentes", async () => {
                character.id = 6543;
                character.name = 'Sr_ZOU';
                const response = await request.post('/rickandmorty/fav').
                send(character);
                expect(response.body.length).toBe(2);
            });
        });

        describe("DELETE /rickandmorty/fav/:id", () => {
            it("Si el ID solicitado no existe, debería retornar un arreglo con todos los favoritos", async () => {
                const response = await request.delete('/rickandmorty/fav/2gh56');
                expect(response.body.length).toBe(2);
            })

            it("Si el ID enviado no existe, debería eliminarlo de favoritos", async () => {
                const response = await request.delete('/rickandmorty/fav/6543');
                expect(response.body.length).toBe(1);
            })
        });
    })
})