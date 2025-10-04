export const NewUser = (name: string) => {
  return `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Inversiones Loan: ¡Bienvenido!</title>
    <style>
      .data {
        background-color: #013fb8;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: #fff;
        padding: 30px;
      }
  
      .contenedor {
        margin: 30px auto;
        width: 500px;
        background-color: #fff;
        padding: 20px;
      }
  
      h1 {
        font-size: 24px;
        font-weight: bold;
        margin-top: 0;
        color: black;
      }
  
      p {
        margin-bottom: 10px;
        color: black;
      }
  
      .boton {
        background-color: #013fb8;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
      }
  
      img {
        width: 170px;
        background-color: white;
        margin-right: auto;
        margin-left: auto;
      }
    </style>
  </head>
  <body>
    <div class="data">
        <div class="contenedor">
        <img src="http://148.113.136.150/media/LOGO-TRANSPARENTE.webp" alt="Logo Inversiones Loan">
        <h1>¡Bienvenido, ${name}!</h1>
        <p>
          Gracias por registrarte en Inversiones Loan. Estamos felices de tenerte como parte de nuestra comunidad.
        </p>
        <p>
          En Inversiones Loan te ofrecemos una amplia gama de productos para la comida y el hogar. Contamos con una selección de los mejores productos de las marcas más reconocidas.
        </p>
        <p>
          Para empezar, te invitamos a explorar nuestra plataforma. En la sección "Inicio" encontrarás información sobre nuestros productos y servicios. También puedes visitar nuestra sección "Ofertas" para encontrar las mejores promociones.
        </p>
        <p>
          Si tienes alguna pregunta, no dudes en contactarnos. Nuestro equipo de atención al cliente está disponible para ayudarte.
        </p>
        <p>
          ¡Te deseamos muchas compras felices en Inversiones Loan!
        </p>
        <a href="https://www.inverloan.com/" class="boton">Visitar la web</a>
      </div>
    </div>
  </body>
  </html>
  `;
};
