interface NewInterfaceI {
  orderN: number;
  name: string;
  dni: string;
  address: string;
  total: number;
  exchange: number;
}

export const NewOrden = ({
  orderN,
  name,
  dni,
  address,
  total,
  exchange,
}: NewInterfaceI) => {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Inversiones Loan: Nueva orden de compra</title>
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

    table {
      width: 100%;
      table-layout: fixed;
      text-align: right;
    }

    th {
      background-color: white;
      color: black;
      text-align: justify;
    }

    td {
      color: black;
    }    
  </style>
</head>
<body>
    <div class="data">
        <div class="contenedor">
        <img src="https://adonai.inverloan.com/media/LOGO-TRANSPARENTE.webp" alt="Logo Inversiones Loan">
        <h1>¡Tu orden de compra ha sido procesada!</h1>
        <p>
          Estimado ${name},
        </p>
        <p>
          Te informamos que tu orden de compra con número ${orderN} esta siendo procesada.
        </p>
        <p>
          Los detalles de tu orden son los siguientes:
        </p>
        <table>
          <tr>
            <th>Cliente</th>
            <td>${name}</td>
          </tr>
          <tr>
            <th>Documento de identidad</th>
            <td>${dni}</td>
          </tr>
          <tr>
            <th>Dirección</th>
            <td>${address}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>${
              typeof total == "string"
                ? parseFloat(total).toFixed(2)
                : total.toFixed(2)
            }</td>
          </tr>
          <tr>
          <th>Total en BsS</th>
            <td>${(total * exchange).toFixed(2)}</td>
          </tr>
          <tr>
            <th>Tasa de cambio</th>
            <td>${
              typeof exchange == "string"
                ? parseFloat(exchange).toFixed(2)
                : exchange.toFixed(2)
            }</td>
          </tr>
        </table>
        <p>
          ¡Gracias por comprar en Inversiones Loan!
        </p>
      </div>
    </div>
</body>
</html>

  `;
};
