/**
 * Páginas pilar (una intención de búsqueda por página, sin canibalizar):
 * contenido en español de Colombia, basado solo en funciones reales del
 * producto (ver src/config/pricing.ts). Los textos marcados con
 * `// [REVISAR]` requieren validación comercial antes de darlos por finales.
 */
export type SeccionSolucion = { titulo: string; parrafos: string[]; puntos?: string[] };

export type Solucion = {
  slug: string;
  /** Keyword principal (una por página). */
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  secciones: SeccionSolucion[];
  faqs: { q: string; a: string }[];
  relacionadas: string[];
  cta: string;
  actualizado: string;
};

const ACTUALIZADO = "2026-09-25";

export const SOLUCIONES: Solucion[] = [
  {
    slug: "sistema-pos-restaurantes",
    keyword: "sistema POS para restaurantes",
    title: "Sistema POS para Restaurantes en Colombia | TAVI Orders",
    description:
      "Sistema POS para restaurantes: caja con arqueo, pago mixto, cuentas separadas, mapa de mesas, cocina KDS e impresión térmica. Sin comisiones por pedido.",
    h1: "Sistema POS para restaurantes",
    intro: [
      "Un sistema POS para restaurantes tiene que resolver lo que pasa en un turno real: mesas que piden por partes, cuentas que se dividen, pagos en efectivo y transferencia al mismo tiempo, y una cocina que necesita la comanda sin errores.",
      "TAVI Orders reúne la caja, la sala, la cocina y los pedidos por QR en un solo sistema en la nube, que funciona en computador, tablet o celular y se conecta con tu impresora térmica.",
    ],
    secciones: [
      {
        titulo: "Caja y cobro sin enredos",
        parrafos: [
          "Cobra desde cualquier dispositivo y cierra el día con el arqueo hecho. Cada cierre queda guardado en el historial para revisar diferencias.",
        ],
        puntos: [
          "Pago mixto: parte en efectivo y parte en transferencia o tarjeta",
          "Cuentas separadas por persona o por productos",
          "Arqueo de caja e historial de cierres",
          "Impresión térmica automática de comandas y recibos",
        ],
      },
      {
        titulo: "Sala con mapa de mesas",
        parrafos: [
          "Ve qué mesas están ocupadas, qué pidieron y cuánto llevan. Los meseros toman pedidos desde el celular y el pedido llega directo a cocina.",
        ],
      },
      {
        titulo: "Cocina KDS: la comanda llega sola",
        parrafos: [
          "Los pedidos de mesa, mostrador, QR y domicilio llegan a la pantalla de cocina organizados por estación, con semáforo de tiempo y aviso por voz. Se acaban las comandas perdidas o ilegibles.",
        ],
      },
      {
        titulo: "Reportes para decidir",
        parrafos: [
          "Dashboard de ventas por día, producto y medio de pago, con exportación a Excel para tu contador.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito comprar equipos especiales para usar el POS?",
        a: "No. TAVI Orders funciona en el navegador de un computador, tablet o celular. Si ya tienes una impresora térmica, puedes conectarla para imprimir comandas y recibos.",
      },
      {
        q: "¿El POS cobra comisión por venta o por pedido?",
        a: "No. Pagas una suscripción mensual o anual fija y los pedidos son ilimitados en todos los planes.",
      },
      {
        q: "¿Puedo emitir factura electrónica desde el POS?",
        a: "Sí. TAVI Orders incluye facturación electrónica DIAN: los planes Pro Fidelidad y VIP traen 30 facturas al mes y puedes comprar bolsas adicionales.",
      },
    ],
    relacionadas: [
      "menu-digital-qr",
      "facturacion-electronica-restaurantes",
      "inventario-restaurantes",
    ],
    cta: "Prueba el POS de TAVI en tu restaurante",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "menu-digital-qr",
    keyword: "menú digital QR para restaurantes",
    title: "Menú Digital QR para Restaurantes con Pedidos | TAVI",
    description:
      "Crea tu menú digital con código QR: tus clientes ven la carta con fotos y precios, piden desde la mesa o a domicilio y el pedido llega directo a cocina.",
    h1: "Menú digital con código QR para restaurantes",
    intro: [
      "Con el menú digital de TAVI Orders tus clientes escanean el código QR de la mesa con la cámara del celular, ven tu carta con fotos y precios, y hacen el pedido sin descargar ninguna app.",
      "No es un PDF: es una carta interactiva conectada a tu cocina y a tu caja, que puedes actualizar en segundos cuando cambia un precio o se agota un plato.",
    ],
    secciones: [
      {
        titulo: "Pedidos por QR desde la mesa",
        parrafos: [
          "Cada mesa tiene su QR. El cliente pide, el pedido llega a la pantalla de cocina y el mesero ve en qué va. Menos filas, menos errores de comanda y más rotación de mesas.",
        ],
        puntos: [
          "Pedido en mesa, para recoger o a domicilio con mapa",
          "Seguimiento del pedido en vivo para el cliente",
          "Reserva de mesa",
          "Varias cartas (desayuno, almuerzo, noche) y días disponibles",
        ],
      },
      {
        titulo: "Tu link propio",
        parrafos: [
          "Cada restaurante tiene su enlace, como tu-restaurante.taviorders.com, para ponerlo en Instagram, WhatsApp Business y Google. El mismo menú sirve para pedidos en mesa y a domicilio.",
        ],
      },
      {
        titulo: "Personalizado con tu marca",
        parrafos: [
          "Colores, logo, banner y diseño de la carta. Con el plan Pro Fidelidad también puedes mostrar anuncios y promociones dentro del menú.",
        ],
      },
      {
        titulo: "Menú digital vs carta en PDF",
        parrafos: [
          "Un PDF solo muestra; un menú digital conectado toma el pedido, lo envía a cocina, actualiza precios al instante y te deja saber qué se vende más. Además, tu carta queda publicada en texto y Google la puede leer.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Mis clientes tienen que descargar una aplicación?",
        a: "No. Escanean el QR con la cámara del celular y el menú abre en el navegador.",
      },
      {
        q: "¿Puedo cambiar precios o agotar un plato en cualquier momento?",
        a: "Sí. Los cambios se ven al instante en el menú, sin reimprimir cartas ni códigos QR.",
      },
      {
        q: "¿Cobran comisión por cada pedido del menú QR?",
        a: "No. Los pedidos son ilimitados y sin comisión en todos los planes.",
      },
    ],
    relacionadas: [
      "sistema-pos-restaurantes",
      "fidelizacion-restaurantes",
      "software-para-comidas-rapidas",
    ],
    cta: "Crea tu menú digital con QR",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "facturacion-electronica-restaurantes",
    keyword: "facturación electrónica para restaurantes",
    title: "Facturación Electrónica DIAN para Restaurantes | TAVI",
    description:
      "Factura electrónica DIAN desde el POS de tu restaurante. Planes con 30 facturas al mes incluidas y bolsas adicionales desde $20.000.",
    h1: "Facturación electrónica DIAN para restaurantes",
    intro: [
      "Emite la factura electrónica desde la misma caja donde cobras, sin pasar los datos a otro programa. TAVI Orders integra la facturación electrónica DIAN a través de un proveedor tecnológico autorizado.", // [REVISAR] nombre del proveedor / modalidad exacta
      "Así cumples con la DIAN sin frenar el servicio: el cliente pide su factura y la recibe en el correo.",
    ],
    secciones: [
      {
        titulo: "Facturas incluidas en tu plan",
        parrafos: [
          "Los planes Pro Fidelidad y VIP Ilimitado incluyen 30 facturas electrónicas al mes. Si necesitas más, compras bolsas de 200, 500, 1.000 o 3.000 facturas.",
        ],
        puntos: [
          "Bolsas adicionales desde $20.000",
          "Habilitación DIAN gratis en planes anuales Pro y en VIP", // [REVISAR] condiciones de habilitación
          "Factura desde la caja, al momento de cobrar",
        ],
      },
      {
        titulo: "Todo en el mismo sistema",
        parrafos: [
          "Pedidos, caja, inventario y facturación comparten la misma información: no hay que volver a digitar productos ni valores, y los reportes cuadran con lo facturado.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué pasa si se acaban las facturas del mes?",
        a: "Puedes comprar una bolsa adicional en cualquier momento; las bolsas no vencen durante 6 meses.",
      },
      {
        q: "¿El plan Esencial tiene facturación electrónica?",
        a: "Sí, comprando bolsas de facturas. Los planes Pro Fidelidad y VIP ya incluyen 30 facturas al mes.",
      },
    ],
    relacionadas: ["sistema-pos-restaurantes", "inventario-restaurantes"],
    cta: "Activa la facturación electrónica en tu restaurante",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "inventario-restaurantes",
    keyword: "control de inventario para restaurantes",
    title: "Inventario y Recetas para Restaurantes | TAVI Orders",
    description:
      "Control de inventario para restaurantes: cada venta descuenta los ingredientes de la receta, alertas de stock bajo y costo real por plato.",
    h1: "Control de inventario y recetas para restaurantes",
    intro: [
      "El inventario de un restaurante no se cuenta en productos vendidos sino en ingredientes. Con TAVI Orders cada plato tiene su receta, y cada venta descuenta automáticamente los insumos que usa.",
      "Sabes qué te queda, qué tienes que comprar y cuánto te cuesta realmente cada plato frente a su precio de venta.",
    ],
    secciones: [
      {
        titulo: "Recetas que descuentan solas",
        parrafos: [
          "Define la receta de cada plato una vez. Cuando se vende, el sistema descuenta harina, queso, carne o bebida según las cantidades de la receta.",
        ],
        puntos: [
          "Stock en tiempo real",
          "Alertas de stock bajo",
          "Productos marcados como agotados cuando faltan insumos",
        ],
      },
      {
        titulo: "Costo real por plato",
        parrafos: [
          "Compara el costo de los ingredientes con el precio de venta para ver el margen de cada plato y ajustar la carta con datos, no a ojo.",
        ],
      },
      {
        titulo: "Incluido en VIP, add-on en los demás planes",
        parrafos: [
          "Inventario y recetas viene incluido en el plan VIP Ilimitado y se puede agregar a Esencial o Pro Fidelidad por $29.900 al mes.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo se calcula el costo de un plato?",
        a: "Sumando el costo de cada ingrediente según la cantidad que usa la receta. TAVI Orders lo calcula con tus costos de compra y lo compara con el precio de venta.",
      },
      {
        q: "¿El inventario se actualiza con los pedidos del menú QR?",
        a: "Sí. Cualquier venta, sea en caja, mesa, QR o domicilio, descuenta los ingredientes de la receta.",
      },
    ],
    relacionadas: ["sistema-pos-restaurantes", "software-para-pizzerias"],
    cta: "Controla tu inventario con TAVI",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "fidelizacion-restaurantes",
    keyword: "tarjeta de fidelización para restaurantes",
    title: "Tarjeta de Fidelización Digital para Restaurantes | TAVI",
    description:
      "Programa de lealtad para restaurantes con tarjetas digitales en Google Wallet y Apple Wallet: sellos por visita, premios y referidos.",
    h1: "Tarjeta de fidelización digital para restaurantes",
    intro: [
      "Conseguir un cliente nuevo cuesta más que hacer volver a uno que ya te conoce. Con TAVI Orders tus clientes guardan una tarjeta de fidelización digital en Google Wallet o Apple Wallet y acumulan sellos con cada visita.",
      "Sin tarjetas de cartón que se pierden y sin descargar apps: la tarjeta vive en el celular del cliente.",
    ],
    secciones: [
      {
        titulo: "Cómo funciona",
        parrafos: [
          "El cliente agrega la tarjeta al Wallet de su celular, la presenta al pagar y el sistema registra la visita. Al completar los sellos, recibe el premio que definiste.",
        ],
        puntos: [
          "Tarjetas en Google Wallet y Apple Wallet",
          "Sellos por visita y premios configurables",
          "Referidos con control antifraude (Pro Fidelidad y VIP)",
        ],
      },
      {
        titulo: "Tarjetas por plan",
        parrafos: [
          "Esencial incluye 1 tarjeta de fidelidad, Pro Fidelidad 5 y VIP Ilimitado tarjetas ilimitadas.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿El cliente necesita instalar una aplicación?",
        a: "No. La tarjeta se guarda en Google Wallet o Apple Wallet, que ya vienen en el celular.",
      },
      {
        q: "¿Puedo premiar a quien traiga amigos?",
        a: "Sí, los planes Pro Fidelidad y VIP incluyen referidos con control antifraude.",
      },
    ],
    relacionadas: ["menu-digital-qr", "software-para-cafeterias"],
    cta: "Crea tu programa de fidelización",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "alternativa-olaclick",
    keyword: "alternativa a OlaClick",
    title: "Alternativa a OlaClick para Restaurantes | TAVI Orders",
    description:
      "¿Buscas una alternativa a OlaClick? Compara qué incluye TAVI Orders: menú QR, POS, cocina KDS, inventario, fidelización y facturación DIAN en uno.",
    h1: "Una alternativa a OlaClick para tu restaurante",
    intro: [
      "Si hoy usas OlaClick o lo estás evaluando, esta página te ayuda a comparar con criterios concretos. Las condiciones de cada plataforma cambian, así que te recomendamos verificar los planes vigentes de OlaClick directamente en su sitio antes de decidir.", // [REVISAR] mantener comparativa sin afirmaciones sobre el competidor
      "Aquí te contamos qué incluye TAVI Orders, para que compares punto por punto.",
    ],
    secciones: [
      {
        titulo: "Qué comparar antes de elegir",
        parrafos: [
          "Estas preguntas marcan la diferencia en la operación diaria de un restaurante:",
        ],
        puntos: [
          "¿Cobra comisión por pedido o solo una suscripción fija?",
          "¿Incluye caja con arqueo, pago mixto y cuentas separadas, o solo el menú?",
          "¿Tiene pantalla de cocina (KDS) e impresión térmica automática?",
          "¿Descuenta inventario por receta en cada venta?",
          "¿Emite factura electrónica DIAN desde la misma caja?",
          "¿Tiene programa de fidelización propio?",
          "¿El soporte es local, en español y por WhatsApp?",
        ],
      },
      {
        titulo: "Lo que incluye TAVI Orders",
        parrafos: [
          "Pedidos ilimitados sin comisión en todos los planes, menú QR con pedidos en mesa, recoger y domicilio, POS con caja y arqueo, cocina KDS con semáforo y voz, inventario con recetas, tarjetas de fidelidad en Google y Apple Wallet, y facturación electrónica DIAN.",
          "El soporte es por WhatsApp desde Cúcuta, y la migración es gratuita al adquirir un plan anual.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo pasar mi carta a TAVI Orders sin empezar de cero?",
        a: "Sí. Con el plan anual la migración es gratuita: nuestro equipo configura tu carta y deja el sistema listo en 24 a 48 horas hábiles.",
      },
      {
        q: "¿Cuánto cuesta TAVI Orders?",
        a: "Desde $55.000 al mes con IVA incluido en el plan Esencial. Pro Fidelidad cuesta $99.900 y VIP Ilimitado $199.900 al mes.",
      },
    ],
    relacionadas: ["menu-digital-qr", "sistema-pos-restaurantes"],
    cta: "Habla con nosotros y compara",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "software-para-pizzerias",
    keyword: "software para pizzerías",
    title: "Software para Pizzerías: Pedidos, POS e Inventario | TAVI",
    description:
      "Software para pizzerías: pizzas por mitades, pedidos a domicilio con mapa, menú QR, cocina KDS e inventario de insumos por receta.",
    h1: "Software para pizzerías",
    intro: [
      "Una pizzería vive de los domicilios y de la velocidad del horno. TAVI Orders recibe los pedidos de mesa, mostrador, QR y domicilio en un solo lugar y los manda a la cocina en orden.",
    ],
    secciones: [
      {
        titulo: "Pizzas por mitades y adiciones",
        parrafos: [
          "Configura tamaños, mitades y adicionales en la carta para que el cliente arme su pizza sin llamadas ni confusiones.", // [REVISAR] confirmar nombre de la función de fracciones
        ],
      },
      {
        titulo: "Domicilios bajo control",
        parrafos: [
          "Pedidos a domicilio con mapa, gestión de domiciliarios y comisiones, y seguimiento en vivo para el cliente.",
        ],
      },
      {
        titulo: "Inventario de insumos",
        parrafos: [
          "Con recetas por pizza, cada venta descuenta masa, queso y demás ingredientes, y te avisa cuando el stock está bajo.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo manejar varios domiciliarios?",
        a: "Sí. Asignas pedidos a cada domiciliario y el sistema lleva sus comisiones.",
      },
    ],
    relacionadas: ["menu-digital-qr", "inventario-restaurantes", "software-para-comidas-rapidas"],
    cta: "Lleva tu pizzería a TAVI",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "software-para-cafeterias",
    keyword: "software para cafeterías",
    title: "Software para Cafeterías: POS, Menú QR y Fidelización | TAVI",
    description:
      "Software para cafeterías: cobro rápido en mostrador, menú QR, pedidos para recoger y tarjeta de fidelización digital para que tus clientes vuelvan.",
    h1: "Software para cafeterías",
    intro: [
      "En una cafetería el cliente frecuente es el negocio. TAVI Orders combina un POS rápido para el mostrador con tarjetas de fidelización digital para premiar cada visita.",
    ],
    secciones: [
      {
        titulo: "Cobro rápido en mostrador",
        parrafos: [
          "Toma pedidos para llevar o para mesa en segundos, con pago mixto y cierre de caja con arqueo.",
        ],
      },
      {
        titulo: "Fidelización en el Wallet",
        parrafos: [
          "Tus clientes acumulan sellos en una tarjeta de Google Wallet o Apple Wallet: por ejemplo, el décimo café gratis.",
        ],
      },
      {
        titulo: "Pedidos para recoger",
        parrafos: [
          "Con el menú digital, el cliente pide desde el celular y pasa a recoger cuando está listo.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Sirve para una cafetería pequeña con un solo punto de venta?",
        a: "Sí. El plan Esencial está pensado para negocios de un local, desde $55.000 al mes.",
      },
    ],
    relacionadas: ["fidelizacion-restaurantes", "sistema-pos-restaurantes"],
    cta: "Prueba TAVI en tu cafetería",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "software-para-comidas-rapidas",
    keyword: "software para comidas rápidas",
    title: "Software para Comidas Rápidas y Domicilios | TAVI Orders",
    description:
      "Software para negocios de comidas rápidas: menú QR, pedidos a domicilio sin comisión, cocina KDS con semáforo y caja con arqueo.",
    h1: "Software para negocios de comidas rápidas",
    intro: [
      "Hamburguesas, perros, salchipapas: en comidas rápidas el volumen manda. TAVI Orders ordena los pedidos de mostrador, QR y domicilio para que la cocina no se atrase en la hora pico.",
    ],
    secciones: [
      {
        titulo: "Domicilios sin comisión",
        parrafos: [
          "Recibe pedidos a domicilio desde tu propio link, sin pagar comisión por pedido. El cliente ve el mapa y el estado de su pedido en vivo.",
        ],
      },
      {
        titulo: "Cocina con semáforo",
        parrafos: [
          "La pantalla KDS muestra cuánto lleva cada pedido con semáforo de colores y aviso por voz, para despachar en orden.",
        ],
      },
      {
        titulo: "Combos y adicionales",
        parrafos: [
          "Arma combos y adicionales (queso extra, papas agrandadas) que suman al precio automáticamente.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo usar mi propio link de pedidos en Instagram?",
        a: "Sí. Tienes un link propio, como tu-negocio.taviorders.com, para compartir en redes y WhatsApp.",
      },
    ],
    relacionadas: ["menu-digital-qr", "software-para-pizzerias", "sistema-pos-restaurantes"],
    cta: "Organiza tus pedidos con TAVI",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "software-para-bares",
    keyword: "software para bares",
    title: "Software para Bares: POS, Cuentas por Mesa y QR | TAVI",
    description:
      "Software para bares: cuentas abiertas por mesa, cuentas separadas, pedidos por QR a la barra, pantalla para TV y control de inventario de licores.",
    h1: "Software para bares",
    intro: [
      "En un bar las cuentas se abren temprano y se cierran tarde. TAVI Orders lleva la cuenta de cada mesa, la divide cuando llega la hora de pagar y manda los pedidos a la barra.",
    ],
    secciones: [
      {
        titulo: "Cuentas por mesa y separadas",
        parrafos: [
          "Cada mesa acumula su consumo durante la noche. Al pagar, divide la cuenta por persona o por productos, con pago mixto.",
        ],
      },
      {
        titulo: "Pedidos a la barra por QR",
        parrafos: [
          "Los clientes piden desde la mesa escaneando el QR y el pedido llega a la estación de barra.",
        ],
      },
      {
        titulo: "Pantalla para TV",
        parrafos: [
          "Con el plan VIP, muestra en la TV del bar un carrusel de promociones y deja que los clientes pidan música.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo controlar el inventario de botellas?",
        a: "Sí. Con el módulo de inventario y recetas, cada coctel o trago descuenta lo que usa.",
      },
    ],
    relacionadas: ["sistema-pos-restaurantes", "inventario-restaurantes"],
    cta: "Lleva tu bar a TAVI",
    actualizado: ACTUALIZADO,
  },
  {
    slug: "software-restaurantes-cucuta",
    keyword: "software para restaurantes en Cúcuta",
    title: "Software para Restaurantes en Cúcuta | TAVI Orders",
    description:
      "Software para restaurantes en Cúcuta con soporte local por WhatsApp: POS, menú digital QR, cocina KDS, inventario, fidelización y facturación DIAN.",
    h1: "Software para restaurantes en Cúcuta",
    intro: [
      "TAVI Orders nació en Cúcuta y trabaja con restaurantes, pizzerías y negocios de comidas rápidas de la ciudad. Conocemos cómo se mueve un negocio gastronómico aquí: domicilios, pagos por transferencia y clientes que piden por WhatsApp.",
    ],
    secciones: [
      {
        titulo: "Soporte local",
        parrafos: [
          "Te atendemos por WhatsApp y te ayudamos a configurar la carta, las mesas con QR y la impresora térmica.", // [REVISAR] ¿visitas presenciales en Cúcuta?
        ],
      },
      {
        titulo: "Restaurantes de Cúcuta que ya usan TAVI",
        parrafos: ["Mira los menús de restaurantes de la ciudad en el directorio de TAVI Orders."],
      },
    ],
    faqs: [
      {
        q: "¿Tienen clientes en otras ciudades de Colombia?",
        a: "Sí. TAVI Orders funciona en la nube, así que puedes usarlo desde cualquier ciudad del país.",
      },
    ],
    relacionadas: ["sistema-pos-restaurantes", "menu-digital-qr"],
    cta: "Habla con el equipo de TAVI en Cúcuta",
    actualizado: ACTUALIZADO,
  },
];

export function solucionPorSlug(slug: string) {
  const s = SOLUCIONES.find((x) => x.slug === slug);
  if (!s) throw new Error(`Solución ${slug} no existe`);
  return s;
}
