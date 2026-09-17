# Fotos extendidas con IA

Estas 9 fotos eran **verticales** y el sitio las necesitaba horizontales. Al recortarlas a
16:9 se perdía justo lo que las hacía buenas: la persona quedaba cortada, o desaparecía el
contexto que explicaba el trabajo.

No se generó ninguna foto nueva: ChatGPT **extendió las que ya existían** hacia los lados
(outpainting), conservando intacto el original en el centro.

**Ya están hechas.** Cada `NN-nombre.jpg` es el original vertical y cada `NN-nombre-wide.png`
es el resultado en 16:9 (1672×941).

- **6 están en el sitio:** 01, 02, 03, 05, 06 y 09.
- **3 son de reserva:** 04, 07 y 08 — buenas, pero no mejoraban lo que ya había en esos
  servicios. Sirven para cambiar el encuadre más adelante sin volver a pedir material.

Los `.txt` conservan el prompt de cada una por si hay que rehacerla.

## Cómo conectar una de reserva

En `scripts/build-instagram-assets.mjs`, apuntar el `src` del servicio al nombre sin
extensión (por ejemplo `08-commercial-cristales-edificio-wide`) y **quitarle el `crop`**,
porque estas ya vienen en 16:9. Después:

```bash
npm run media:instagram
```

## Qué hay

| # | Archivo | Servicio | Estado |
|---|---|---|---|
| 01 | `01-commercial-cleaning-almacen-autos` | Commercial Cleaning | ✅ en el sitio |
| 02 | `02-post-construction-pertiga` | Post-Construction Cleaning | ✅ en el sitio |
| 03 | `03-disinfecting-rociado-restaurante` | Disinfecting Services | ✅ en el sitio |
| 04 | `04-residential-cocina-roble` | Residential Cleaning | ⏸ reserva |
| 05 | `05-housekeeping-cajon-cocina` | Housekeeping | ✅ en el sitio |
| 06 | `06-deep-cleaning-cocina-grasa` | Deep Cleaning | ✅ en el sitio |
| 07 | `07-restaurant-freidora` | After-Hours Restaurant | ⏸ reserva |
| 08 | `08-commercial-cristales-edificio` | Commercial Cleaning (cristales) | ⏸ reserva |
| 09 | `09-marble-polishing-operario-OPCIONAL` | Marble Polishing | ✅ en el sitio |

**Por qué las tres de reserva no entraron:**

- **04** habría puesto la misma cocina de roble que la 05 en dos tarjetas contiguas.
  Residential se queda con el dormitorio, que además encaja mejor con ese servicio.
- **07** (freidora) es un plano de detalle; After-Hours Restaurant comunica mejor con la
  máquina extractora en el comedor, que sitúa el trabajo.
- **08** (cristales) es buena, pero la 01 es más fuerte para Commercial Cleaning.

## Qué salió bien y qué vigilar

Las nueve volvieron en 16:9 exacto y respetaron lo pedido. Dos aciertos que valía la pena
comprobar:

- **La 08 conservó el polo blanco.** Era el riesgo principal: el resto del equipo va de negro
  y la IA tiende a uniformar.
- **La 03 perdió la marca de agua dorada de AP**, como se le pidió.

Lo único a tener en cuenta: en la **04** y la **05** el logo bordado del polo queda como una
mancha dorada, porque la IA no puede reproducirlo. Al tamaño al que se renderiza en el sitio
(tarjetas de ~200 px de alto) no se nota, pero no conviene usar esas dos ampliadas al 100 %.

## Si hay que rehacer alguna

Suele ser más rápido corregir con una segunda instrucción corta que reescribir el prompt:

- *"Se ve demasiado nítido y limpio en los bordes nuevos. Igualá el grano y el desenfoque del
  original."*
- *"Cambiaste el tono de la ropa. Devolvela al color exacto del original."*
- *"Inventaste una persona en el fondo. Quitala."*
- *"El resultado no es 16:9. Devolvelo a 1920x1080 exactos."*
