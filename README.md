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