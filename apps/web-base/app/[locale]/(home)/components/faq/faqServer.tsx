// Este componente podría obtener las FAQs desde una API o servicio
import type { Dictionary } from '@repo/internationalization';
import { FaqClient } from './faqClient';


type FaqServerProps = {
    dictionary: Dictionary;
};

export async function FaqServer({ dictionary }: FaqServerProps) {
    // En un escenario real, aquí podríamos obtener las FAQs desde una base de datos
    // Por ahora, simularemos que tenemos datos dinámicos

    // Datos de usabilidad
    const usabilityFaqs = [
        {
            id: 'commercial-conditions',
            question: 'Condiciones comerciales de suscripción',
            answer: `CONDICIONES GENERALES DE PRESTACIÓN DE SERVICIOS.

1-. Individualización de las partes.

2-. Servicios.
El término "Servicio(s)" alude, conjuntamente, a los Servicios Principales elegidos por el Suscriptor en la presente suscripción y/o solicitados posteriormente por éste, y que NetFullFibra le suministre, siempre y cuando, NetFullFibra cuente con la factibilidad técnica para ello. Los servicios provistos por NetFullFibra al suscriptor deberán ser utilizados exclusivamente con fines residenciales y NO comerciales, ni lucrativos.

3-. Vigencia, Duración y Término.
Respecto de cada Servicio solicitado, esta suscripción entrará en vigencia desde la fecha en que NetFullFibra efectúe la instalación, conexión y/o habilitación del Servicio en el "Domicilio Suscriptor". El Suscriptor recibirá copia digital como acreditación de la entrada en vigencia de la presente Suscripción. El plazo de la suscripción de los Servicios es de carácter indefinido, en el caso que el Suscriptor manifieste su voluntad de ponerle término, puede realizarlo en cualquier momento por medio de un aviso enviado a NetFullFibra, por cualquiera de las vías escritas, telefónicas o electrónicas habilitadas para este fin. En tal caso, previa comprobación de la identidad del Suscriptor, NetFullFibra pondrá término al suministro del(los) Servicio(s) dentro de los plazos establecidos por la Ley a la fecha de recepción del aviso, todo ello sin perjuicio de mantenerse vigentes las obligaciones pendientes de pago para con NetFullFibra a la fecha de la terminación.
NetFullFibra podrá unilateralmente suspender los servicios temporal o indefinidamente, en caso de retardo en el pago de la (s) cuenta (s) del o los servicios contratados. El término del Servicio obliga al Suscriptor: a) restituir los equipos o pagar el valor de 5UF en caso de no devolverlos al final de la suscripción, b) pagar a NetFullFibra la renta mensual correspondiente al(los) Servicio(s), vigente(s) al momento de la terminación, y calculada hasta el último día en que NetFullFibra le preste efectivamente el(los) Servicio(s) respectivo(s).

4-. Servicio de Fast Ethernet o Ethernet de alta velocidad.
El "Servicio de Fast Ethernet o Ethernet de alta velocidad." consiste en el suministro del medio de acceso (inalámbrico, vía cable LAN o por medio de red de Fibra óptica si existiese factibilidad técnica), enrutamiento y transporte de datos desde el Domicilio hasta un punto de intercambio de tráfico conectado a Internet. NetFullFibra podrá aplicar políticas de administración de su red y del tráfico cursado por los usuarios, así como ejecutar modificaciones o mejoras tecnológicas en el Servicio Internet siempre que ello no involucre costos adicionales para el Suscriptor, ni degrade la calidad del servicio comprometido de acuerdo al Plan comercial pactado. La velocidad máxima de conexión o acceso será la individualizada en contrato digital, sin embargo, NetFullFibra no asegura que ésta pueda obtenerse en todo momento. Una variedad de situaciones pueden afectar la velocidad de acceso como problemas de hardware, software, virus informáticos que puedan afectar al PC del Suscriptor, velocidad de acceso del servidor de destino y otros. La empresa entregará el servicio con una medición de la velocidad de acceso del plan contratado, efectuada en un servidor conectado a la red NetFullFibra.

5-. Uso de los Servicios.
El servicio descrito en los puntos 4 es de carácter residencial, por lo que su reventa o uso compartido con terceros queda expresamente prohibido. El incumplimiento de esta cláusula faculta a la empresa a proceder con la suspensión inmediata del servicio, retiro de equipos y la exigencia del pago de los saldos de cuenta a la fecha adeudados y a cobrar una multa de 10UTM.

6-. Facturación, Pago y Recaudación de los servicios.
El Suscriptor deberá pagar, al momento de la ejecución de la instalación de los servicios contratados e individualizados en ítem detalle Servicios Principales, el valor fijado por NetFullFibra como concepto "Valor de instalación", el cual no constituye abonamiento por la provisión de éstos y no es reembolsable en caso de término del contrato. El servicio será facturado a través de boleta o factura electrónica, según solicitud de Suscriptor, y ésta será enviada a su domicilio o en su defecto, vía correo electrónico a la casilla individualizada por el Suscriptor en el anverso del presente documento, la que se obliga a recibir, revisar y cancelar dentro de la fecha de vencimiento de cada documento tributario electrónico. El envío de documentos electrónicos en su E-mail reemplaza a los documentos recibidos en su domicilio. Los servicios facturados podrán ser pagados través de algún otro medio o lugar que la empresa así lo indique.

7-. Valores de Servicio y Tarifas.
Las tarifas de los servicios prestados por NetFullFibra son de carácter indefinido y se encuentran individualizados en el ítem Servicios Principales, las que se consideran incorporadas a esta Suscripción y aceptadas por el Cliente Suscriptor. Estas podrán ser reajustadas por la empresa dando aviso al Suscriptor con 30 días de anticipación

8-. Interés por Mora y Cobranza.
El simple retardo o mora en el pago de las tarifas consignadas en cualquier cuenta emitida por NetFullFibra devengará el interés máximo convencional hasta el pago efectivo. Además, devengará, cuando corresponda, el cargo por concepto de gastos de cobranza según la tarifa vigente de NetFullFibra a la fecha en que debió pagarse la cuenta. Estos cobros se consignarán y cargarán en la cuenta inmediatamente siguiente a aquella que motivó su aplicación, el costo de corte y reposición se fija en $2.000. Las actividades relativas a la cobranza de estas deudas podrán efectuarse directamente por NetFullFibra o por terceros contratados para tal efecto.

9-. Corte y Reposición del Servicio.
El no pago oportuno de la Cuenta dentro del plazo señalado en la misma, facultará a NetFullFibra para cortar el suministro del Servicio sin necesidad de declaración alguna, a partir del día siguiente al día del vencimiento de la facturación respectiva.
En caso que, el Suscriptor haya sufrido el corte o suspensión del Servicio, para obtener su reposición deberá pagar la tarifa de corte y reposición, junto con los valores adeudados, debidamente reajustados por el período durante el cual se mantuvo la mora, así como los intereses y cargos por cobranza contemplados en la cláusula 8 del presente documento, si NetFullFibra decidiera aplicarlos.

10-. Servicio de Reparaciones.
Los equipos son de bajo consumo eléctrico y deben mantenerse siempre energizados. El Suscriptor deberá dar facilidades de acceso NetFullFibra para efectuar las reparaciones del servicio que haya solicitado. La empresa se reserva el derecho de hacer un cargo por el servicio de reparación cuando se trate de problemas originados en los equipos del Suscriptor conectados a la red de NetFullFibra. La empresa efectuará el mantenimiento y las reparaciones de los equipos que ésta entregare, para proveer el correspondiente servicio. El servicio de mantenimiento a los equipos entregados en comodato por la compañía, excluye todo desperfecto atribuible a intervenciones no autorizadas, accidentes, negligencias, y en general por cualquier causa no imputable a la empresa. El Suscriptor deberá pagar a la empresa el valor íntegro del servicio de reparación, restitución de partes o piezas, instalación de equipos que se deban realizar con motivo de la ocurrencia de alguno de los hechos señalados en el párrafo precedente. Para este efecto, la empresa queda autorizada por el Suscriptor para incluir dicho valor en la cuenta del mes siguiente.
El cliente deberá mantener sus equipos computacionales en buen estado ya sea en Software y Hardware, NetFullFibra no entrega servicio técnico computacional y no instala programas en los computadores del cliente, si esto fuera necesario el Cliente deberá hacerlo o buscar quien lo haga por él.

11-. Responsabilidad del Suscriptor.
El servicio internet se suministrará restringidamente al domicilio del Suscriptor, única y exclusivamente para su uso personal. En el uso de este servicio, el Suscriptor será exclusivamente responsable de cualquier daño, directo o indirecto, que cause a NetFullFibra y/o terceros; así como de las eventuales infracciones legales en que incurra, eximiendo a NetFullFibra de cualquier responsabilidad a este respecto. El Suscriptor estará especialmente obligado a:
Utilizar el servicio internet en conformidad con las leyes, el orden público y las buenas costumbres y las Condiciones de Uso del Servicio de Internet, contenidas en el sitio web de NetFullFibra, absteniéndose de infringir la normativa sobre propiedad intelectual o industrial y/o afectar la privacidad de terceros.
Abstenerse de interferir, interceptar o interrumpir las comunicaciones sobre Internet que realicen otros usuarios.
Abstenerse de realizar acciones que puedan dañar, entorpecer, sobrecargar, deteriorar o impedir el servicio ofrecido y/o la normal utilización de dicho servicio por parte de los demás Suscriptores.
Abstenerse de realizar acciones que involucren una transmisión de datos excesiva en forma continuada a terceros.
El cliente podrá solicitar una suspensión transitoria del servicio, esta solicitud debe ser notificada a lo menos 15 días antes de su inicio y debe ser por un plazo no mayor a 1 mes. La activación de la suspensión tendrá un costo de $2.500 los que deben ser cancelados por el cliente al momento de reactivar.
El traslado de servicio, solo será posible si NetFullFibra tiene factibilidad técnica en la nueva dirección del Cliente y si el servicio no presenta deudas. El traslado no tendrá costo asociado siempre que la conexión a la red sea de la misma tecnología, si es distinta el costo se acordará en su momento con el cliente, dependiendo de la factibilidad técnica de la nueva dirección.
El cliente podrá solicitar cambio de datos personales o cambio de suscriptor del servicio, por cualquier canal de contacto, entregando toda la información solicitada por NetFullFibra para validar su identidad.
La destrucción parcial o total por responsabilidad del Cliente, del equipamiento constituyente del Sistema de Comunicaciones al interior del recinto del Cliente, será única responsabilidad de éste. Por consiguiente, su reparación o reposición será efectuada por NetFullFibra con cargo al Cliente, para lo cual NetFullFibra facturará a este el valor de la reparación o reposición de los elementos del Sistema de Comunicaciones, según sea el caso. Los equipos o cables dañados por causas no imputables al cliente, serán cambiados por NetFullFibra sin costo alguno para el Cliente.
El Cliente reconoce que los equipos que estuvieren instalados en el recinto del usuario, como parte del Sistema de Comunicaciones contratado, son de propiedad exclusiva de NetFullFibra, y se compromete a dar todas las facilidades que NetFullFibra requiera, para el retiro de los mismos al término del presente contrato. Asimismo, el cliente se responsabiliza de que, al término del presente contrato, los equipos estén en perfecto estado de funcionamiento, habida consideración del desgaste propio del correcto uso, aceptando desde ya que de no ser así NetFullFibra facture al Cliente el valor de la reparación o reposición de los equipos según sea el caso.
La red wifi, integrada en su sistema de transmisión de datos, está normado por la subsecretaría de telecomunicaciones de Chile (SUBTEL), la que permite el uso de espacio radio eléctrico en bandas 2.4 y 5 ghz.

12-. Responsabilidad de NetFullFibra.
NetFullFibra se compromete a mantener una disponibilidad de servicio del 96% del tiempo mensual. Las interrupciones de los Servicios de Internet, debido a casos fortuitos, No podrán ser sujeto de descuentos en la renta mensual del servicio, esto excluye según los siguientes casos: Corresponde aplicar un descuento por fallas de servicios, cuando estos servicios tienen una falla que excede las 6 horas en un día o 12 horas continuas o discontinuas en un mismo mes calendario, por causa no imputable al cliente. En estos casos, se aplicará un descuento proporcional a la renta mensual del servicio afectado, en un monto equivalente a un día de renta por cada 24 horas o fracción superior a 6 horas de falla.
Corresponde aplicar indemnización adicional al descuento por fallas de servicios, cuando estos servicios tienen una falla que excede las 48 horas continuas o discontinuas en un mismo mes calendario y esta falla no obedezca a fuerza mayor o hecho fortuito. En estos casos, se aplicará a modo de indemnización, un descuento proporcional a la renta mensual del servicio afectado, en un monto equivalente al triple del valor de renta diaria por cada día de falla. El descuento será automático y el Cliente lo podrá ver reflejado en su Panel personal en el sitio web https://www.NetFullFibra.net al momento de generar el pago. Las interrupciones de servicio por fallas, errores de terceros o de proveedores externos, no será sujeta a descuento bajo ningún caso, por no tratarse de una responsabilidad directa de NetFullFibra.
La tecnología inalámbrica Wi-fi utiliza 2 bandas de frecuencia, correspondientes a 2.4 GHz y 5.0 GHz, siendo esta última no tan popular como la de 2.4 GHz. Hoy en día la banda de 2.4 GHz es la más utilizada, debido a que la mayoría de los dispositivos operan por defecto, bajo esta frecuencia, lo que conlleva a una mayor saturación del espectro. Estas interferencias llegan al punto de afectar la velocidad de internet.

12.1-. Limitaciones de 2.4 GHz.
Debido al gran número usuarios que utilizan esta banda, es que comienzan a aparecer las limitaciones de la 2.4GHz. En áreas con densidad de población elevada, con cada vez más antenas wifi, los conflictos e interferencias entre ellas empiezan a ser un problema.
Otro problema con las redes 2.4GHz es que la frecuencia también es usada por los teléfonos inalámbricos y otros dispositivos, lo que puede causar interferencias.
Bajo esta premisa, los test de velocidades realizadas mediante el sistema WIFI no son legalmente validados a causa de las interferencias, es por esto que la velocidad es garantizada única y exclusivamente bajo el sistema de cableado de red mediante dispositivos gigabyte.

12.2 -. Limitaciones 5.0 GHz. 
Mientras más alta es la frecuencia de una señal wifi, menor es la cobertura. Las redes de 2.4 GHz tienen una mayor cobertura que las 5GHz.
Las redes de 5 GHz no traspasan objetos sólidos tan bien como las 2.4GHz. Esto puede limitar el rendimiento de estas redes en el interior de casas u oficinas, donde la señal tenga que atravesar varias paredes.

12.3-. NetFullFibra Se obliga a efectuar la mantención del Sistema de Planta externa de Comunicaciones de datos sin costo alguno para sus clientes.

12.4-. NetFullFibra enviara 10 días antes el documento de cobro de forma electrónica al email que indicó el cliente, luego de procesado el pago del servicio, se enviará la correspondiente factura o boleta electrónica a la misma dirección de email del cliente. El cliente además podrá entrar a su cuenta de cliente en el sitio web https://www.NetFullFibra.net  botón (SUCURSAL VIRTUAL) donde podrá ver los cobros pendientes y pagos realizados, como también pagar su servicio de forma Online. Si no posee clave puede solicitarla al Whastappp +569 94833938.

12.5-. NetFullFibra no se hace responsable en ningún caso de la pérdida de información provocada por manejos realizados por el Cliente en la administración y mantención de los programas y aplicaciones de su propiedad, así como daños o perjuicios que pudieren resultar de la utilización inadecuada de la red, o daños que pudieren ocurrir respecto de los datos del Cliente por parte de otros usuarios de Internet.

12.6-. Los equipos entregados son para uso doméstico, el cliente da por enterado del uso de la energía eléctrica y que sus instalaciones eléctricas domiciliarias se encuentran normadas por entidades reguladoras nacionales, Superintendencia de Electricidad y Combustible (SEC) Dirección de Obras Municipales, (D.O.M.), o cualquier entidad validadora nacional, excluyendo a NetFullFibra de cualquier desperfecto eléctrico, sin perjuicio de lo anterior, si los equipos de comunicaciones se vieren afectados por fallas eléctricas, originadas por el cliente, este último será responsable íntegramente por la reposición de los equipos si son dañados, y todo el daño colateral que de ello emane. NetFullFibra no se hace responsable bajo ningún caso de daños colaterales provocados a causa de sistemas instalados.

13-. Servicio de Reparaciones.
Los equipos son de bajo consumo eléctrico y deben mantenerse siempre energizados. El Suscriptor deberá dar facilidades de acceso al personal de NetfullFibra para efectuar las reparaciones del servicio que haya solicitado. La compañía se reserva el derecho de hacer un cargo por el servicio de reparación cuando se trate de problemas originados en los equipos del Suscriptor conectados a la red de NetfullFibra. La compañía efectuará el mantenimiento y las reparaciones de los equipos que ésta entregare, para proveer el correspondiente servicio. El servicio de mantenimiento a los equipos entregados en comodato por la compañía, excluye todo desperfecto atribuible a intervenciones no autorizadas, accidentes, negligencias, y en general por cualquier causa no imputable a la compañía. El Suscriptor deberá pagar a la compañía el valor íntegro del servicio de reparación, restitución de partes o piezas, instalación de equipos que se deban realizar con motivo de la ocurrencia de alguno de los hechos señalados en el párrafo precedente. Para este efecto, la compañía queda autorizada por el Suscriptor para incluir dicho valor en la cuenta del mes siguiente.
El cliente deberá mantener sus equipos computacionales en buen estado ya sea en Software y Hardware, NetFullFibra no entrega servicio técnico computacional y no instala programas en los computadores del cliente, si esto fuera necesario el Cliente deberá hacerlo o buscar quien lo haga por él.

14-. Duración de contrato.
El presente Contrato, tendrá una duración de 12 meses, a contar de la fecha de su suscripción. El contrato se entenderá automáticamente renovado por períodos iguales y sucesivos de 12 meses cada uno, mientras ninguna de las partes exprese su voluntad de ponerle termino.
El cliente, podrá poner término a este contrato en cualquier momento, solicitando la baja del servicio por cualquiera de los canales de contacto, con el número de este contrato, identificándose como el titular del servicio e indicando una fecha en la que se podrá retirar los equipos entregados en comodato. NetFullFibra, podrá poner término al contrato y a la renovación automática cuando el cliente viole algunas de las cláusulas de uso o de aviso al Cliente del término de este a lo menos 30 días antes del vencimiento del actual contrato, indicando las razones para el término.

15-. El periodo de facturación mensual corresponde a 30 días. Los cierres para este proceso serán calculados al día 30 de cada mes o al día 15 según el requerimiento del CLIENTE.`
        },
        {
            id: 'router-password',
            question: '¿Por qué es recomendable mantener la clave que trae mi router?',
            answer: 'Los routers Netfull Fibra vienen pre configurados con una clave de cifrado WPA2, sistema que entrega seguridad a tu red y mejora su rendimiento. Es por eso que te recomendamos no cambiarla.'
        },
        {
            id: 'new-wifi-password',
            question: '¿Cómo puedo obtener una nueva clave de WiFi?',
            answer: 'Si quieres modificar la clave de tu red WiFi, puedes pedirlo en el momento de la instalación, o llamando al +569-9-4833938. También puedes contactarnos a este número si olvidaste tu clave y necesitas una nueva.'
        }
    ];

    // Datos de red
    const networkFaqs = [
        {
            id: 'network-considerations',
            question: 'Consideraciones de red 2.4 y 5G',
            answer: `Debido al gran número usuarios que utilizan esta banda, es que comienzan a aparecer las limitaciones de la 2.4GHz. En áreas con densidad de población elevada, con cada vez más antenas wifi, los conflictos e interferencias entre ellas empiezan a ser un problema.
Otro problema con las redes 2.4GHz es que la frecuencia también es usada por los teléfonos inalámbricos y otros dispositivos, lo que puede causar interferencias.
Bajo esta premisa, los test de velocidades realizadas mediante el sistema WIFI no son legalmente validados a causa de las interferencias, es por esto que la velocidad es garantizada única y exclusivamente bajo el sistema de cableado de red mediante dispositivos gigabyte.
12.2 -. Limitaciones 5.0 GHz. 
Mientras más alta es la frecuencia de una señal wifi, menor es la cobertura. Las redes de 2.4 GHz tienen una mayor cobertura que las 5GHz.
Las redes de 5 GHz no traspasan objetos sólidos tan bien como las 2.4GHz. Esto puede limitar el rendimiento de estas redes en el interior de casas u oficinas, donde la señal tenga que atravesar varias paredes.`
        },
        {
            id: 'ip-type',
            question: '¿Qué tipo de IP tiene la red Netfull Fibra?',
            answer: 'Nuestra red entrega direccionamiento IPv4 privado y direccionamiento IPv6 público.'
        },
        {
            id: 'nat-service',
            question: '¿Qué NAT entrega el servicio Netfull Fibra?',
            answer: 'Para servicios con IPv4 se realiza ‘doble NAT’, es decir, se asigna una IPv4 privada al router, que luego asigna otro direccionamiento IPv4 privado al dispositivo con el que estás navegando. Por lo tanto, cuando navegas con IPv4 el router realiza el primer NAT, y luego antes de la salida a internet, se realiza el segundo NAT de IPv4 privado a IPv4 público. Para servicios IPv6 no se realiza NAT ya que se asigna una IP pública IPv6 a cada dispositivo que soporte IPv6.'
        },
        {
            id: 'ont-ports',
            question: '¿Puedo configurar los puertos de mi ONT?',
            answer: 'No, actualmente no puedes realizar este tipo de configuración de manera directa pero si necesitas realizar estos ajustes lo podemos hacer sin problemas, para ello debes contactarnos vía telefónica directamente al +569-9-4833938'
        }
    ];

    // En el futuro, podrías agregar aquí llamadas a un servicio API para obtener FAQs dinámicas

    return <FaqClient
        dictionary={dictionary}
        usabilityFaqs={usabilityFaqs}
        networkFaqs={networkFaqs}
    />;
} 