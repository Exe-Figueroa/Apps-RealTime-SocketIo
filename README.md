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