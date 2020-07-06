# Installation instructions:

## Pre-requisites

NodeJS installed\
MongoDB installed

## Running instructions

1. Open the terminal
2. Go to the route of the project
3. Run the following:

```
npm install
```

Then run the following:

```
node index.js
```

Now the endpoints are alive

## Instructions to use automatic insertions

1. Open another terminal
2. Go to the route of the project
3. Run the following:

```
node autoInsertions.js
```

## API Documentation

### Default URLs

- Web server: `http://localhost:3000`

### Get wiki action

- **URL**

  /wikis/:id

- **Method**

  `GET`

- **URL params**

  **Required:**

  `id_repositorio=[integer]`

### Post wiki action

- **URL**

  /wikis

- **Method**

  `POST`

- **Body**

  **Required:**

  ```json
  {
    "paginas": [
      {
        "pagina": {
          "titulo": "Any title",
          "creador": "Any creator",
          "fecha_ultima_modificacion": "Any date",
          "contenido": "Any content",
          "revisiones": [
            {
              "contenido": "Any content",
              "fecha": "Any date"
            },
            {
              "contenido": "Any content",
              "fecha": "Any date"
            }
          ]
        }
      }
    ],
    "id_repositorio": "Any number"
  }
  ```
