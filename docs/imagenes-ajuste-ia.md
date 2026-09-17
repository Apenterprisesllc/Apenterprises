# Imágenes de Instagram — estado y ajustes pendientes

Todas las fotos de los 13 servicios del sitio salen del material de Instagram de AP
Enterprises. Ya no queda ninguna imagen de stock de Pexels ni ninguno de los PNG generados
con IA que había en `landscape/sources/`.

El cliente aprobó usar con libertad todo lo que hay publicado en su Instagram, así que el
criterio de selección pasó a ser **si la imagen funciona en el sitio**, no de dónde salió.

Este documento recoge:

- **[A](#a--fotos-que-no-sobreviven-el-encuadre-horizontal)** — fotos buenas que, al
  recortarlas a horizontal, pierden lo que las hacía buenas. Cada una lleva un prompt listo
  para pegar en ChatGPT y que extienda la imagen. Ninguna es bloqueante.
- **[B](#b--publicaciones-que-quedaron-fuera)** — lo que no entró y por qué.
- **[C](#c--lo-único-que-falta-events-cleaning)** — el único servicio sin foto propia.

---

## Cómo están recortadas las imágenes

Cada servicio usa dos archivos, generados por `npm run media:instagram`:

| Archivo | Tamaño | Dónde aparece |
|---|---|---|
| `<servicio>-landscape.webp` | 1920×1080 (16:9) | Tarjetas del Home y de /services, y cabecera de la página del servicio |
| `<servicio>.webp` | 1200×1600 (3:4) | Póster del video en la barra lateral |

Más los 12 archivos del comparador antes/después, a 1600×1200.

El problema de fondo: **el material de Instagram es casi todo vertical** (4:5 y 3:4), y el
sitio necesita horizontal. Peor aún, la cabecera de cada servicio no muestra el 16:9
completo: en escritorio recorta a una banda de aproximadamente **3:1**, y las tarjetas a
**1,9:1 – 2,3:1**. De una foto vertical de 1800 px de alto sobreviven unos 810 px. Cuando
hay una persona de cuerpo entero, no cabe.

---

## Comparador antes/después — 6 trabajos

| Servicio | Comparación | Origen |
|---|---|---|
| Epoxy Floor Services | Sala con ventanas: concreto desnudo → epóxico | `Dby9MRFGnIp` |
| Epoxy Floor Services | Sala con puertas de vidrio | `Dby9MRFGnIp` |
| Epoxy Floor Services | Pasillo principal | `Dby9MRFGnIp` |
| Marble Polishing | Oficina: concreto mate → piso pulido a espejo | `DT83x22jbD4` |
| After-Hours Restaurant | Cocina industrial en servicio → impecable | `DcZxBxNDfiJ` |
| After-Hours Restaurant | Baldosa y fragua tras el fregado nocturno | `DXmSKWXjQX7` |

El del piso epóxico (sala con ventanas) es además el que se muestra en el Home.

En los seis pares, las dos tomas se recortan con **la misma caja**, así que el barrido
coincide al píxel. Los recortes eliminan además los sellos que traían algunas fotos: la
píldora "Swipe →", la marca de agua dorada de AP y las insignias BEFORE / AFTER incrustadas.

---

## A — Fotos extendidas con IA

**Hecho.** Las 9 fotos verticales se pasaron por ChatGPT con los prompts de abajo y
volvieron extendidas a 16:9 (1672×941). Los originales y los resultados están en
`media-src/para-extender-ia/`, cada uno con su `.txt`.

**6 de las 9 ya están en el sitio**, porque mejoraban de verdad el recorte que había:

| Extendida | Servicio | Qué ganó |
|---|---|---|
| 01 | Commercial Cleaning | El operario entra completo y se ve toda la nave de autos |
| 02 | Post-Construction | Se recupera la casa entera con el operario y la pértiga |
| 03 | Disinfecting | Operario completo y el comedor con las sillas sobre las mesas |
| 05 | Housekeeping | Ahora hay una persona de AP trabajando, antes era una cocina vacía |
| 06 | Deep Cleaning | La grasa calcinada se lee como una cocina, antes era una mancha negra |
| 09 | Marble Polishing | El operario con la Turbo Hybrid, que era justo lo que el recorte cortaba |

**3 quedaron de reserva**, no por calidad sino porque no aportaban sobre lo que ya había:

- **04** (cocina de roble, encimera) — habría duplicado la misma cocina que la 05 en dos
  tarjetas contiguas. Residential se queda con el dormitorio, que además encaja mejor.
- **07** (freidora) — After-Hours Restaurant funciona mejor con la máquina extractora en el
  comedor, que sitúa el trabajo.
- **08** (cristales de edificio) — buena, pero la 01 es más fuerte para Commercial Cleaning.

Están en la carpeta por si se quiere cambiar el encuadre de algún servicio más adelante.

Los prompts quedan documentados abajo por si hay que rehacer alguna. Para volver a conectar
una: apuntar el `src` del servicio en `scripts/build-instagram-assets.mjs` al nombre
`...-wide` (sin `crop`, porque ya vienen en 16:9) y correr `npm run media:instagram`.

> **Instrucción general de los prompts:** subir la foto original a ChatGPT junto con el
> texto. Pedirle siempre que **no invente personas, ni logos, ni texto**, que no recoloree la
> ropa y que mantenga el grano del original. Casi todo el equipo aparece con el uniforme
> negro de AP, pero **A8 lleva polo blanco**: ahí el prompt lo repite a propósito.

---

### A1 · `igexport-DGl6AeVxee9-8.jpg` — Marble Polishing
**✅ EN USO** — es la cabecera de Marble Polishing. El operario vuelve a entrar completo.


Operario de AP pasando la máquina Turbo Hybrid sobre el piso de piedra del restaurante
Alacrán, con el cubo amarillo y el extractor Clean Dynamix al fondo. Vertical 1440×1800.
La cabeza está arriba del todo y el piso abajo del todo: en una banda 16:9 no entran los dos.

**Ya no es urgente.** La versión horizontal de Marble Polishing pasó a ser la oficina con
piso pulido a espejo (`DT83x22jbD4`), y esta foto quedó como póster vertical, que es donde
funciona bien. La extensión sólo haría falta si se quiere volver a poner al operario en la
cabecera.

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Mantén intacta toda la imagen original y amplía únicamente hacia la izquierda y hacia la
derecha, continuando el interior del restaurante: el zócalo de listones de madera vertical,
las mesas de madera con bases negras y el piso de piedra clara húmedo con reflejos.

Conserva exactamente: la iluminación cálida ámbar del techo, la profundidad de campo, el
grano de la foto, el operario con uniforme negro y guantes azules, la máquina Turbo Hybrid
cromada, el cubo amarillo Rubbermaid y el extractor gris Clean Dynamix.

El resultado debe permitir ver al operario de cuerpo completo, de la cabeza a los pies,
dentro del cuadro horizontal.

No añadas personas, no añadas logos, no añadas texto, no cambies el encuadre de lo que ya
aparece y no aumentes la saturación.
```

---

### A2 · `igexport-DJKoE4URYL4-5.jpg` — Commercial Cleaning / Epoxy Floor Services
**✅ EN USO** — es la cabecera de Commercial Cleaning.


Operario trapeando el piso epóxico blanco del almacén de autos clásicos, entre un
Rolls-Royce blanco y un Porsche Carrera GT negro, con los elevadores BendPak al fondo.
Vertical 1440×1800. La persona ocupa unos 840 px de alto y en 16:9 sólo caben 810. Es
probablemente la mejor foto de todo el material, y no entra completa por 30 px.

*(Hoy el servicio usa la toma hermana `DJKoE4URYL4-3`, donde la persona está más lejos de la
cámara y sí cabe. Esta se usa como póster vertical.)*

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia arriba y hacia los lados continuando el almacén de autos: la estructura
metálica del techo con luminarias lineales, las columnas rojas, las filas de autos
deportivos y clásicos y el piso epóxico blanco de acabado espejo con sus reflejos.

Conserva exactamente: la luz fría y uniforme del almacén, el operario con polo negro
trapeando con mopa de mango de madera, el Rolls-Royce blanco, el Porsche Carrera GT negro y
los elevadores BendPak.

El operario debe quedar completo, de la cabeza a los pies, con aire por encima de él.

No añadas personas, no añadas marcas ni logotipos de fabricantes que no estén ya, no añadas
texto y no alteres los reflejos del piso.
```

---

### A3 · `igexport-DVUhNy7DWbl-3.jpg` — Post-Construction Cleaning
**✅ EN USO** — es la cabecera de Post-Construction Cleaning.


Operario lavando con pértiga roja telescópica una ventana del segundo piso de una casa
blanca recién entregada, con el balcón de vidrio enjabonado. Vertical 1440×1920.
**Aquí la altura es el tema**: la foto funciona porque se ve lo alto que llega la pértiga.
En horizontal eso desaparece por completo.

*(Se usa como póster vertical, donde funciona perfecto.)*

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia la izquierda y hacia la derecha continuando la fachada de la casa blanca
moderna: el revestimiento de tablillas blancas, las puertas correderas de aluminio negro,
el alero, el cielo azul despejado y el césped con losas de hormigón en el suelo.

Conserva exactamente: la luz de mediodía de Florida con sombras marcadas, el cielo azul
saturado natural, el operario con uniforme negro sosteniendo la pértiga roja telescópica, el
balcón de vidrio con agua jabonosa y la manguera roja enrollada en el suelo.

Mantén al operario y la pértiga completos y legibles dentro del cuadro.

No añadas personas, no añadas texto ni carteles, no añadas vehículos y no cambies la
arquitectura existente.
```

---

### A4 · `igexport-DUMareYjVZX.jpg` — Disinfecting Services
**✅ EN USO** — es la cabecera de Disinfecting Services. La marca de agua dorada desapareció.


Operario de espaldas rociando desinfectante sobre el piso de un restaurante, con las sillas
puestas sobre las mesas y la cocina abierta al fondo. Vertical 1080×1350. Probado: en 16:9
la cabeza queda fuera y se corta justo por debajo de los hombros, que es el peor sitio
posible. Además la marca de agua dorada de AP en la parte baja obliga a recortar todavía
más arriba.

*(El servicio usa hoy `DGl6AeVxee9-4`, donde el operario sí entra completo.)*

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia arriba y hacia los lados continuando el comedor del restaurante: la pared de
piedra, el revestimiento de azulejo verde azulado brillante, las lámparas colgantes de cobre
y las filas de mesas de madera con sillas puestas encima.

Conserva exactamente: la luz cálida de las lámparas de cobre, el tono dorado del piso de
microcemento, el operario de espaldas con uniforme negro y guantes azules, el pulverizador
blanco a presión y la varilla de rociado.

El operario debe quedar completo, de la cabeza a los pies.

Elimina la marca de agua dorada de AP Enterprises de la parte inferior.

No añadas personas, no añadas texto ni carteles y no cambies la distribución de las mesas.
```

---

### A5 · `igexport-DQkeS7NEX2h-2.jpg` y `igexport-DQkeS7NEX2h-4.jpg` — Housekeeping / Residential Cleaning
**✅ EN USO la del cajón** (Housekeeping). La de la encimera quedó de reserva para no
duplicar la misma cocina en dos tarjetas seguidas.


Personal de AP con polo de la marca limpiando un cajón y una encimera en la cocina de roble
de una residencia de lujo. Verticales 1440×1920. Son las únicas fotos del material donde se
ve el polo de AP en un entorno residencial premium, pero son planos cerrados en vertical:
al pasarlas a horizontal se convierten en un primer plano de encimera sin contexto.

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia la izquierda y hacia la derecha continuando la cocina de lujo: los frentes de
roble claro de veta lisa con tiradores largos de acero, la encimera de piedra blanca
veteada, el salpicadero de piedra y la iluminación cálida bajo los muebles altos.

Conserva exactamente: la luz cálida y suave, el tono dorado de la madera de roble, la
persona con polo negro de AP Enterprises y su postura y gesto.

La persona debe quedar completa y con aire alrededor, sin quedar pegada al borde del cuadro.

No añadas personas, no añadas electrodomésticos nuevos, no añadas texto y no cambies el
color de la madera.
```

---

### A6 · `igexport-DGl6AeVxee9-7.jpg` — After-Hours Restaurant Cleaning
**⏸ DE RESERVA** — el servicio funciona mejor con la máquina extractora en el comedor.


Mano con guante azul limpiando el interior de una freidora industrial. Vertical, plano de
detalle muy cerrado. En horizontal se pierde la referencia de qué es el objeto: queda una
mancha metálica.

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia los lados mostrando más de la cocina industrial alrededor de la freidora:
superficies de acero inoxidable, la plancha contigua, campana extractora y el piso de
baldosa de cocina.

Conserva exactamente: la iluminación de cocina industrial, el reflejo del acero, la mano con
guante azul de nitrilo y la freidora con su cesta.

El resultado debe dejar claro que se trata de una freidora dentro de una cocina de
restaurante.

No añadas personas completas, no añadas alimentos, no añadas texto ni marcas de
electrodomésticos.
```

---

### A7 · `igexport-DVCrWDEDbkW-3.jpg` — Deep Cleaning
**✅ EN USO** — es la cabecera de Deep Cleaning.


Rasqueta amarilla sobre una cocina de gas con grasa calcinada, mano con guante azul.
Vertical 1024×1365. Es la mejor foto de "suciedad real" del material y transmite muy bien el
servicio, pero en horizontal se queda en una superficie negra sin lectura.

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia los lados mostrando el resto de la cocina de gas y la encimera: los quemadores
restantes, el borde de la encimera de cuarzo claro moteado y la tabla de cortar blanca del
fondo.

Conserva exactamente: la luz lateral suave y algo fría, el aspecto real de la grasa
calcinada sobre el esmalte negro, la mano con guante azul de nitrilo y la rasqueta amarilla.

No limpies ni disimules la suciedad: es el objeto de la fotografía.

No añadas personas, no añadas utensilios nuevos, no añadas texto y no aumentes el brillo de
la superficie.
```

---

### A8 · `igexport-DZ3aJh2GiG1.jpg` — Commercial Cleaning (cristales)
**⏸ DE RESERVA** — buena, pero la del almacén de autos es más fuerte para este servicio.
El polo blanco se conservó correctamente.


Operario con **polo blanco** y pantalón negro limpiando con aplicador de microfibra azul la
puerta de vidrio de un edificio comercial, con el muro cortina espejado reflejando el cielo y
las palmeras. Vertical. Igual que A3: **la verticalidad es el contenido**. Recortada a
horizontal se convierte en un trozo de fachada anónima.

> Ojo: aquí el polo es **blanco**, no el uniforme negro habitual. El prompt se lo repite dos
> veces a la IA a propósito, porque si no tiende a recolorearlo.

```
Extiende esta fotografía a formato horizontal 16:9 (1920x1080) usando outpainting.

Amplía hacia la izquierda y hacia la derecha continuando la fachada del edificio comercial:
más módulos del muro cortina de vidrio espejado con su carpintería de aluminio gris claro, el
reflejo del cielo azul con nubes y de la vegetación, la jardinera con plantas bajas y la acera
de hormigón en la parte inferior.

Conserva exactamente: la luz natural de tarde de Florida, los reflejos del vidrio espejado, el
operario con POLO BLANCO y pantalón negro, su postura inclinada, el aplicador de microfibra
azul y la puerta doble de vidrio con tiradores de aluminio.

El polo del operario debe seguir siendo BLANCO. El operario debe quedar completo, de la cabeza
a los pies.

No añadas personas, no añadas rótulos comerciales ni texto en la fachada y no cambies la
geometría del edificio.
```

---

## B — Publicaciones que quedaron fuera

Con la aprobación del cliente para usar todo el material, lo único que sigue fuera son
publicaciones que **no se pueden meter en el sitio tal cual**, por un motivo de diseño: la
tipografía va incrustada en el píxel. Una tarjeta de servicio con las palabras "GLOSSY
FINISH" quemadas encima se ve rota, no se ve diseñada.

| Publicación | Qué es | Por qué no entra |
|---|---|---|
| `DbjOLSHGlpV` (6 img) | "Complete Estate Care", "Landscaping & Garden Care", "Private Chef", "Professional Housekeeping" | Tipografía incrustada. Además son servicios que el sitio no ofrece |
| `DXA24D7DfTI` (4 img) | "Glossy Finish", "Luxury Epoxy", "Heavy-Duty Floors", "Seamless Epoxy" | Tipografía incrustada ocupando media imagen |
| `DcWTdmTkadv` (5 img) | "Your floors work hard…" | Tipografía incrustada |
| `Da6mA4ADZKs` (3 img) | Gráficas de servicio con texto | Tipografía incrustada |
| `DaqotmCmvCG` (5 img) | Gráficas de servicio con texto | Tipografía incrustada |
| `DOO9mEqEeDw` (5 img) | Portada de "Kitchen Deep Cleaning" | Tipografía incrustada |
| `Db1vPbKDWPe` (8 img) | Carrusel "One company. Multiple solutions." | Barra dorada de texto sobre cada foto |
| `CmW11euLGPr`, `CmW18dzrWxK`, `CmW1t8AreYf` | Publicaciones de 2022 | 612×612 px: resolución inservible para web |

**Si el cliente quiere recuperar alguna de estas**, hay dos caminos: pasarnos el archivo
original sin la capa de texto, o pedirle a ChatGPT que borre el texto con inpainting. Varias
tienen una foto de fondo perfectamente aprovechable.

Un caso ya resuelto así: la imagen 2 de `Db1vPbKDWPe` (operario trapeando en el almacén de
autos) es una foto excelente que estaba tapada por la barra dorada; se recuperó desde el post
original `DJKoE4URYL4`, que la tiene sin la barra.

---

## C — Events Cleaning: la única imagen generada del sitio

En las 149 imágenes descargadas no hay ni una foto de un evento, un banquete o un salón. Es
el único servicio sin material propio.

Como solución provisional, la cabecera usa una **imagen generada con IA**: un salón de hotel
a primera hora de la mañana después de una boda, con una operaria retirando manteles, mesas
a medio desmontar, sillas apiladas y restos en la moqueta.

Es la **única imagen del sitio que no corresponde a un trabajo real**. Las otras seis
generadas por IA son extensiones de fotos reales del cliente; ésta es invención completa. Por
eso queda marcada explícitamente en `docs/service-image-attribution.json`:

```json
"serviceId": "events-cleaning",
"aiGenerated": true,
"sourcePost": null,
"note": "IMAGEN GENERADA con IA — reemplazar por foto real de evento"
```

Buscar `aiGenerated: true` en ese archivo devuelve exactamente lo que hay que sustituir.

El póster vertical del servicio sí es una foto real: la limpieza de una silla tapizada, que
encaja porque *seats and upholstery* es parte del servicio.

### Lo que hay que pedirle al cliente

Una foto de un salón o carpa después de un evento, con el equipo recogiendo. **Horizontal si
es posible**, y con la persona lo bastante lejos de la cámara para que quepa en una banda de
3:1 — ése es el recorte de la cabecera y es donde se rompen las fotos verticales.

## Resumen

1. **Listo:** las 26 imágenes de los 13 servicios. Seis de las horizontales son extensiones
   con IA de fotos reales del cliente, porque el original vertical no sobrevivía el recorte.
2. **Listo:** comparador antes/después con **6 trabajos reales** en el Home y en las páginas
   de Epoxy Floor, Marble Polishing y After-Hours Restaurant.
3. **Provisional:** Events Cleaning usa una imagen generada, marcada como tal en el
   manifiesto. Es la única del sitio que no corresponde a un trabajo real.
4. **Lo que falta pedirle al cliente:** una foto de evento. Es lo último.
