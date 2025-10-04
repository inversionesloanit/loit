export const ForgotPassword = ({ req, token, user }): any => {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Inversiones Loan: Recuperar contraseña</title>
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
        <img src="https://adonai.inverloan.com/media/LOGO-TRANSPARENTE.webp" alt="Logo Inversiones Loan">
        <h1>¿Has olvidado tu contraseña?</h1>
        <p>
          No te preocupes, podemos ayudarte a recuperarla.
        </p>
        <p>
          Para ello, haz clic en el siguiente enlace:
        </p>
        <a href="https://inverloan.com/nueva-contrasena?token=${token}">Recuperar contraseña</a>
        <p>
          Este enlace te llevará a una página donde podrás ingresar tu dirección de correo electrónico y generar una nueva contraseña.
        </p>
        <p>
          Si no recibes el correo electrónico, asegúrate de revisar tu carpeta de spam.
        </p>
        <p>
          Si tienes alguna pregunta, no dudes en contactarnos. Nuestro equipo de atención al cliente está disponible para ayudarte.
        </p>
        <p>
          ¡Gracias por utilizar Inversiones Loan!
        </p>
      </div>
    </div>
</body>
</html>

  `;
};
