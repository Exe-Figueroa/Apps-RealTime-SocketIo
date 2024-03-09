# Curso de Aplicaciones en Tiempo Real con Socket.io
# 01-Cómo hacer aplicaciones en tiempo real
  Una app en tiempo real es una que permite mantener a dos o más clientes conectados e informarles de cambios en las páginas sin necesidad de que estas deban recargarse.
  Tanto el cliente como el servidor pueden mandar info cuando sea necesario.
  En el modelo tradicional el cliente debe iniciar una solicitud para que el servidor pueda responder.
  ## Websockets
  Proporciona un canal de comunicación bidireccional y full-duplex que permite tener varios puntos finales (Sockets) conectados al mismo tiempo
# 02-Protocolos de comunicación: HTTP vs. WebSockets
  ## HTTP:
  - Primero el cliente hace la petición al server (GET, POST, PUTH/PATCH, DELETE)
  - El servidor procesa todo eso y devuelve una respuesta al cliente. El cliente sigue trabajando con los datos solicitados
  ### Comet:
  - Hace una petición larga que se mantiene abierta con el server
  - El server al momento de recibir una nueva info, la envía al cliente con el que tiene abierta la conexión y sigue con la conexión abierta (Es ineficiente).
  ## WebSockets: 
  - El server y el cliente se conectan por medio de un canal bidireccional

# 03-¿Qué es Socket.io?
  Es una librería escrita sobre JavaScript (hay implementaciones para otros lenguajes) que habilita comunicación bidireccional, de baja latencia y basada en eventos entre un cliente y un servidor.
  Esta librería está construida sobre el protocolo WebSockets, pero incluye algunas características extra (por ejemplo HTTP Long-Polling Fallback y reconexión automática), que en el caso de no usar esta librería, tendríamos que implementar manualmente.
  Socket io puede ser implementada en muchas plataformas, tanto el cliente como en el servidor. Tiene como ventaja que permite comunicar clientes web o desktop con servidores en tiempo real.
  Algo que debemos tener en cuenta, es que a pesar que esta librería usa el protocolo WebSockets, la misma no es una implementación de WebSockets. Esto debido a que la librería añade metadatos adicionales a este protocolo. Por lo cual, socket io está construido sobre este protocolo, pero no es tal cuál una implementación del mismo.

  Esta librería no debería ser usada en background de aplicaciones móviles, debido a que mantiene una comunicación TCP abierta, lo que puede provocar un alto consumo de la batería.
# 04-Socket.io vs. WebSockets
  La ventaja de usar la librería de Socket io, en lugar de implementar tu propio WebSocket es que en la librería ya tienes resueltos la mayoría de los problemas comunes al trabajar con WebSockets.
  ### Como se mencionó antes, socket io implementa algunas características extra, entre ellas tenemos:

  - HTTP Long-Polling Fallback → En el caso que la conexión no se pueda establecer por medio de WebSockets, esta se establecerá con una solicitud del tipo HTTP Long-Polling, para mantener una conexión en navegadores que aún no soportan esta tecnología.
  - Reconexión automática → Es común que por algunas razones la conexión entre el cliente y servidor se pierda. Es por ello, que socket io incluye un mecanismo que cada cierto tiempo revisa la conexión y trata de re-conectarla en caso de haberse perdido.
  - Packet buffering → Cuando la conexión de un socket se pierde, la librería almacenará cualquier evento que llegue mientras está desconectado y lo enviará cuando el socket se vuelva a conectar.

  Este comportamiento suele ser útil en algunos casos, pero puede ser que si el socket estuvo desconectado por mucho tiempo, al regresar, se puede tener una sobrecarga de eventos

  - Broadcasting → Desde el lado del servidor se tienen varias formas de enviar eventos a todos los clientes conectados, o incluso a un grupo reducido de estos.
  - Multiplexing → Permite dividir la lógica de nuestra aplicación y crear canales especiales para cierto grupos de usuarios privilegiados (por ejemplo, administradores).

  En conclusión, esta librería es muy fácil de usar, ya que su funcionamiento se basa en eventos que funcionan tanto desde el cliente como del servidor.
  Es importante tener en cuenta que hoy en día, el protocolo de WebSockets es soportado por más del 97% de los navegadores web de forma nativa. Lo que significa que tranquilamente podrías trabajar con WebSockets puros.
  Pero eventualmente, necesitarás resolver muchos de los problemas que esta librería ya tiene resueltos y altamente probados.

# 05-¿Cómo funciona Socket.io?
  Esta librería se divide en dos partes, Engine io y Socket io.
  ## Engine io
  Es el motor de la librería. Se encarga de establecer la conexión entre el cliente y el servidor. Maneja las formas de conectarse (Transports), el mecanismo de actualización y detección de des-conexiones.

  Cuando este inicia una conexión, el servidor manda cierta información (handshake) que será útil para algunos mecanismos de Engine io.

  - Transports → Socket io conoce a sus mecanismos de conexión mediante Transports y actualmente tiene 2 formas de conectarse, HTTP Long-Polling y WebSockets.
  - Mecanismos de actualización → En resumen, es la forma que tiene Engine io de cambiar de HTTP Long-Polling a WebSockets.

  Pero, ¿por qué cambiaría de HTTP Long-Polling a WebSockets? Esto se debe a que socket io primero usa HTTP Long-Polling para conectarse, incluso si WebSockets está disponible, debido a que no siempre es posible conectarse mediante estos últimos y la comunicación puede fallar porque algo lo está impidiendo (proxys, firewalls, antivirus, etc.).
  "El recuperarse de este tipo de fallos puede llegar a tomar hasta 10 segundos antes que la aplicación empiece a funcionar, esto perjudica la experiencia de usuario."
  Luego, Engine io hará ciertas validaciones para determinar si se pueden usar los WebSockets, en cuyo caso, terminará conectándose mediante estos.

  - Detección de des-conexiones → Se incluye un mecanismo para detectar cuando un cliente se desconecta.

  El cual consiste en revisar cada cierto tiempo (pingInterval) si la conexión todavía está funcionando. Esto lo logra enviando un paquete al cliente desde el servidor, y el cliente tiene cierto tiempo (pingTimeout) para responder ese paquete.
  En el caso que cliente no responda, se considera que este se ha desconectado. Pero si el cliente no recibe el paquete en cierto intervalo de tiempo (pingInterval + pingTimeout) se considera como que el servidor se ha desconectado.

  ### Una conexión se considera cerrada cuándo:

  - Una solicitud HTTP falla (por ejemplo, el servidor se apaga).
  - Una conexión por WebSocket se cierra (por ejemplo, se cierra la ventana).
  - Se llama al método socket.disconnect().

  Socket io
  Es la librería en sí. Por su parte, provee funcionalidades extra sobre Engine io, por ejemplo:
  - Reconexión automática
  - Packet buffering
  - Broadcasting
  - Multiplexing
  - Manejo de eventos

# 06-Ciclo de vida de Socket.io
  - El manager abre una conexión y conecta con el servidor
  - Engine.io manda el handshake
  - Luego verificar si se logra establecer una conexión 
  - Si no se logra se entra en un estado (Disconnected) y se devuelve un error al cliente (Se envía el estado connect_error)
  - Si se logra la conexión se entra en el estado Connected
  - Si después de conectarse se produce un error el manager es el encargado de intentar hacer la reconexión además se lanza el evento disconnect y se cierra la conexión con el manager
  - Se repite el flujo

# 07-Creando nuestra primera aplicación con Socket.io
  - Primero se crea un server con express y con create server
  - Luego se crea una instancia del server de socket.io con el servidor previamente creado (httpServer)
  - Luego se escucha el evento de connection (Validar si algún cliente se conectó)
  -Desde el lado del cliente se crea una conexión. Primero se importa io y en base a eso se crea una variable con el nombre de la ejecución de io(). Esto genera la conexión que abre el socket clente-servidor

# 08-Obteniendo información de conexiones del servidor
  ## Eventos del lado del cliente para el objeto socket.io
  - connect → Disparó sobre una conexión exitosa.
  - connect_error → Se disparó por un error de conexión.Parámetros:
    - Object objeto de error
  - connect_timeout → Se disparó en un tiempo de espera de conexión.
  - reconnect → Disparó a una reconexión exitosa.Parámetros:
    - Number número de intento de reconexión
  - reconnect_attempt → Disparó en un intento de re-conectar.
  - reconnecting → Disparó en un intento de re-conectar. Parámetros:
    - Number número de intento de reconexión
  - reconnect_error → Se disparó tras un error de intento de reconexión. Parámetros:
    - Object objeto de error
  - reconnect_failed → Se disparó cuando no se pudo volver a conectar dentro reconnectionAttempts
  ## Eventos del lado del cliente para el objeto socket
  - connect → Disparo al conectar.
  - error → Se dispara a un error de conexión. Parámetros:
    - Object datos de error
  - disconnect → Disparó tras una des-conexión.
  - reconnect → Disparó a una reconexión exitosa.Parámetros:
    - Number número de intento de reconexión
  - reconnect_attempt → Disparada a un intento de re-conectarse.
  - reconnecting → Disparó en un intento de re-conectar. Parámetros:
    - Number número de intento de reconexión
  - reconnect_error → Se disparó tras un error de intento de reconexión. Parámetros:
    - Object objeto de error
  - reconnect_failed → Se disparó cuando no se pudo volver a conectar dentro de reconnectionAttempts
  ## Eventos del Servidor
  - connection / connect → Disparó contra un relación. Parámetros:
    - Socket el socket entrante.

  En socket.conn se escucha cualquier evento lanzado por el motor

# 09-Emisión de eventos
  ## Eventos del servidor
  ``` javascript
  socket.emit(/* .. */) 
  ```
  - Emisión básica.
  ``` javascript
  socket.broadcast.emit(/* .. */)  
  ```
  - A todos los clientes del espacio de nombres actual, exceptuando al remitente.
  ``` javascript
  socket.to('room1').emit(/* .. */)  
  ```
  - A todos los clientes en room1, excepto al remitente.
  ``` javascript
  socket.to(['room1', 'room2']).emit(/* .. */)  
  ```
  - A todos los clientes en room1 y/o room2, excepto al remitente.
  ``` javascript
  socket.compress(false).emit(/* .. */)  
  ```
  - Sin compresión.
  ``` javascript
  socket.volatile.emit(/* .. */)  
  ```
  - ‎Un mensaje que podría eliminarse si el transporte de bajo nivel no se puede escribir‎.
  ``` javascript
  socket.emit("question", (answer) => {*...*});  
  ```
  - Con reconocimiento.
  Con timeout cuando el receptor no recibió el evento en el tiempo esperado.
  ``` javascript
  socket.timeout(5000).emit("my-event", (err) => {
    if (err) {
      // the other side did not acknowledge the event in the given delay
    }
  });
  ``` 
  ``` javascript
  io.in('room1').emit(/* .. */) 
  ```
  - A todos los clientes en room1.
  ``` javascript
  io.to(['room1', 'room2']).except('room3').emit(/* .. */) 
  ```
  - A todos los clientes en room1 y/o room2, excepto aquellos en room3.
  ``` javascript
  io.of('myNamespace').emit(/* .. */) 
  ```
  - A todos los clientes en el espacio de nombres “myNamespace”.
  ``` javascript
  io.of('myNamespace').to('room1').emit(/* .. */) 
  ```
  - A todos los clientes en room1 en el espacio de nombres “myNamespace”.
  ``` javascript
  io.to(socketId).emit(/* .. */) 
  ```
  - A un socket en particular por su ID (mensaje privado).
  ``` javascript
  io.local.emit(/* .. */) 
  ```
  - A todos los clientes en este nodo (cuando se tienen múltiples nodos).
  ``` javascript
  io.emit(/* .. */) 
  ```
  - A todos los clientes conectados.
  ## Eventos del cliente
  ``` javascript
  socket.emit(/* .. */) 
  ``` 
  - Emisión básica.
  ``` javascript
  socket.emit("question", (answer) => {*...*}); 
  ``` 
  - Con reconocimiento.
  ``` javascript
  socket.compress(false).emit(/* .. */) 
  ``` 
  - Sin compresión.
  ``` javascript
  socket.volatile.emit(/* .. */) 
  ``` 
  - ‎Un mensaje que podría eliminarse si el transporte de bajo nivel no se puede escribir‎.

  - Con timeout cuando el receptor no recibió el evento en el tiempo esperado.
