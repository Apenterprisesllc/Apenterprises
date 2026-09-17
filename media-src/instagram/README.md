# Originales de Instagram

Fotografía propia de AP Enterprises, descargada de su cuenta de Instagram. Es la **fuente**
de todas las imágenes de servicio del sitio: los archivos de `public/media/photos/` se
generan desde aquí con `npm run media:instagram`.

No editar estos archivos. Si un encuadre no convence, se ajusta la caja `crop` en
`scripts/build-instagram-assets.mjs` y se vuelve a generar.

El nombre `igexport-<shortcode>[-N].jpg` conserva el código de la publicación de origen, así
que cualquier archivo se puede rastrear hasta su post: `instagram.com/p/<shortcode>/`.

## Sesiones

| Shortcode | Sesión | Servicios que alimenta |
|---|---|---|
| `C-sUzTMpzMQ` | Equipo AP completo — **la única foto horizontal nativa** (1440×1080) | Staffing |
| `DG3YQcoRTzK`, `Da_HIauGuir` | Oficinas de American Screen Solutions, personal con polo AP | After-Hours Office Cleaning |
| `DGl6AeVxee9` | Restaurante Alacrán: montaje de mesas, Turbo Hybrid, extractor, freidora, desinfección | After-Hours Restaurant, Marble Polishing, Events, Disinfecting |
| `DJKoE4URYL4`, `DUzU_qlDbSe` | Classic Car Capital: piso epóxico blanco entre Porsches y Ferraris | Commercial Cleaning |
| `Dby9MRFGnIp` | **Antes/después de piso epóxico** — 3 pares, mismo trípode | Epoxy Floor Services + comparador |
| `DXmSKWXjQX7` | **Antes/después de piso de restaurante** — 1 par | After-Hours Restaurant + comparador |
| `DcZxBxNDfiJ` | **Antes/después de cocina industrial** — 1 par, **horizontal nativo** (1086×815) | After-Hours Restaurant + comparador |
| `DT83x22jbD4` | **Antes/después de piso de oficina pulido** — 1 par | Marble Polishing + comparador |
| `DQkeS7NEX2h` | Residencia de lujo: dormitorio, cocina de roble con personal AP | Residential Cleaning, Housekeeping |
| `DVUhNy7DWbl` | Lavado de cristales y fachada en casa recién entregada | Post-Construction Cleaning |
| `DaLk0swGqLT` | Residencia blanca con piscina, lista para entrega | Real Estate Cleaning |
| `DVCrWDEDbkW` | Horno y cocina de gas con grasa calcinada | Deep Cleaning |
| `DUMareYjVZX` | Desinfección y limpieza de barra en restaurante | Disinfecting Services (póster) |
| `DZTkTZrDSND` | Flota rotulada: Tesla y furgonetas Ford Transit | Staffing (póster) |
| `DZ3aJh2GiG1` | Cristales, arte mural, detalles de oficina | Alternativas |

Los archivos que no aparecen referenciados en `scripts/build-instagram-assets.mjs` se
conservan como **alternativas**: sirven para cambiar el encuadre de un servicio sin volver a
pedirle material al cliente.

## Lo que quedó fuera

El cliente aprobó usar todo lo publicado en su Instagram. Lo que no se copió aquí son las
publicaciones que llevan **tipografía incrustada en el píxel** y por eso no se pueden meter
tal cual en una tarjeta del sitio. El listado completo, con el motivo de cada descarte, está
en
[`docs/imagenes-ajuste-ia.md`](../../docs/imagenes-ajuste-ia.md).
