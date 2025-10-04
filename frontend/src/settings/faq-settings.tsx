import React from 'react';
export const faq: { id: number; title: string; content: React.ReactNode }[] = [
  {
    id: 1,
    title: '¿Quienes somos?',
    content: (
      <p>
        https://inverloan.com/ es un Marketplace (tienda en línea) que facilita
        la compra de alimentos y productos de primera necesidad a venezolanos en
        el exterior o a nivel nacional para ser entregados dentro de todo el
        estado Carabobo, tenemos la capacidad y logística necesaria para enviar
        los pedidos a sus familiares o amigos en los principales sectores:
        <ul className="list-disc list-inside">
          <li>
            <span className="font-semibold">NAGUANAGUA</span>: Av. Universidad,
            Av. Bolívar, Urb. El Cafetal, Urb. El Naranjal, Urb. La Campiña,
            Urb. El Rincón, Urb. La Granja, Urb. Las Palmas, Guayabal, Mañongo,
            La Begoña, La Urb. Las Quintas, Urb. Los Candiles, Los Guayabitos,
            Palma Real, Piedras Pintadas, Río Sil, Tazajal, Terrazas de
            Naguanagua, Valle Alto, La Entrada, Universidad de Carabobo,
            Bárbula,Barrio Unión, Av. 190, Vivienda Rural de Bárbula, Terrazas
            de Paramacay.
          </li>
          <li>
            <span className="font-semibold">SAN DIEGO</span>: Castillito, Res.
            Montemayor, Centro de San Diego, Chalets Country, El Morro I y II,
            El Remanso, El Tulipán, La Esmeralda, Las Gaviotas, Lomas de la
            Hacienda, Los Jarales, Los Magallanes, Monteresino, Parqueresino,
            Paso Real, Poblado San Diego, Pueblo de San Diego, San Antonio,
            Sansur, Terrazas de San Diego, Valencey, Valle de Oro, Valle
            Topacio, Valle Verde, Yuma I, II, y III, Las Morochas.
          </li>
          <li>
            <span className="font-semibold">VALENCIA CENTRO-SUR</span>: Av.
            Lara, Av. Branger, Centro de Valencia, Urb. Fundación Mendoza,
            Sector La Candelaria, Urb. Michelena, Urb. Ritec, Sector Periférico
            de Valencia, San Blas, Santa Rosa, Av. Las Ferias.{' '}
          </li>
          <li>
            <span className="font-semibold">VALENCIA SUR-ESTE</span>: Urb. La
            Quizanda, Urb. La Isabelica, Urb. Parque Valencia, Zona Industrial.
            Ciertas zonas aplican recargo.
          </li>
          <li>
            <span className="font-semibold">VALENCIA NORTE</span>: Agua Blanca,
            Altos de Guataparo, Av. Cedeño, Av Bolivar Norte, Campo Alegre ,
            Centro-Norte, Colinas de Guataparo, Terrazas del Country,
            Portachuelos, El Solar, Hato Royal, Guataparo Country Club , El
            Bosque, El Mirador, El Parque, Urb. El Parral, Urb. El Trigal, Urb.
            El Viñedo, Urb. Guaparo, La Alegria, La Ceiba , La Manguita, Urb. La
            Trigaleña, Urb. La Viña, Las Acacias, Urb. Las Chimeneas, Lomas del
            Country, Lomas del Este , Los Colorados, Los Mangos, Los Nisperos,
            Majay, Padre Alfonzo, Urb. Prebo 1, 2, y 3. San Jose de Tarbes,
            Santa Cecilia , Terrazas de los Nisperos, Valles de Camoruco, Urb.
            Kerdell.
          </li>
          {/* Agrega más elementos de la lista aquí */}
        </ul>
      </p>
    ),
  },
  {
    id: 2,
    title: '¿Cómo comprar en https://inverloan.com/?',
    content: (
      <ol>
        <li>Ingresa a la página web de Inverloan.</li>
        <li>Busca los productos que deseas comprar.</li>
        <li>Agrega los productos al carrito de compras.</li>
        <li>Ingresa los datos de entrega.</li>
        <li>Elige el método de pago.</li>
        <li>Confirma el pedido.</li>
      </ol>
    ),
  },
  {
    id: 3,
    title:
      '¿Puedo comprar productos desde el exterior para que sean entregados en Valencia?',
    content: (
      <p>
        Sí, https://inverloan.com/ permite que los clientes en el exterior
        envíen productos desde cualquier parte del mundo a sus familiares o
        amigos en Valencia.
      </p>
    ),
  },
  {
    id: 4,
    title: '¿Cuánto se demora en llegar mi mercado?',
    content: (
      <p>
        https://inverloan.com/ ofrece una promesa de entrega de 6 horas máximo,
        desde la aprobación del pedido. El tiempo de entrega comienza a contar a
        partir de la aprobación del pago. Hay dos bloques de entrega: mañana de
        9 a.m. a 12 m y tarde de 12 m a 7 p.m., y el cliente elige el de su
        preferencia. El valor de envío es de 5 USD según zona.
      </p>
    ),
  },
  {
    id: 4,
    title: '¿Cómo ponerse en contacto con el servicio de atención al cliente?',
    content: (
      <p>
        Nuestro equipo de experiencia del cliente está disponible los 7 días de
        la semana y ofrecemos 2 formas de ponerse en contacto: correo
        electrónico y chat. Intentamos responder rápidamente, ¡así que no
        necesita esperar demasiado para recibir una respuesta!
      </p>
    ),
  },
  {
    id: 4,
    title:
      'Falló la instalación de la aplicación, ¿cómo actualizar la información del sistema?',
    content: (
      <p>
        Lea la documentación detenidamente. También tenemos algunos videos
        tutoriales en línea sobre este tema. Si el problema persiste, abra un
        ticket en el foro de soporte.
      </p>
    ),
  },
];
