# Imagery — Fotos y Videos

Toda la fotografía del sitio vive en `public/media/`. Es la **biblioteca visual oficial**
de la marca y se puede reusar tal cual en cualquier sitio nuevo de AP Enterprises.

## Procedencia

**Todas las fotos de servicio salen del material propio de AP Enterprises**, tomado de su
cuenta de Instagram y aprobado por el cliente. No queda stock de bancos de imágenes.

Los originales viven en `media-src/instagram/` (ver su README para la tabla de sesiones), y
los archivos que sirve la web se generan desde ahí:

```bash
npm run media:instagram      # regenera los 26 assets de servicio + los 12 del comparador
```

Una sola imagen del sitio es **generada con IA de cero**: la cabecera de Events Cleaning,
porque no existe ninguna foto de evento en el material. Está marcada con `aiGenerated: true`
en `docs/service-image-attribution.json` y hay que reemplazarla en cuanto el cliente mande
una foto real.

Seis de las horizontales son **versiones extendidas con IA** de esas mismas fotos: el
original vertical no sobrevivía el recorte 16:9, así que se amplió por outpainting
conservando la foto real en el centro. Viven en `media-src/para-extender-ia/` y se
reconocen por el sufijo `-wide` en el `src` de la spec.

El recorte de cada imagen está escrito a mano en `scripts/build-instagram-assets.mjs`.
**Nunca usar `position: "entropy"` de sharp**: persigue el detalle y corta cabezas, y casi
todas estas fotos tienen gente. La procedencia de cada archivo queda registrada en
`docs/service-image-attribution.json`.

## Estructura

```
media-src/instagram/                               ← originales de Instagram (fuente)
public/media/
├── photos/
│   ├── hero.webp                                  ← Hero principal
│   ├── <servicio>.webp                            ← póster vertical 1200×1600 (3:4)
│   ├── landscape/
│   │   └── <servicio>-landscape.webp              ← horizontal 1920×1080 (16:9)
│   └── before-after/
│       └── <trabajo>-{before,after}.webp          ← comparador 1600×1200 (4:3)
└── videos/
    ├── <servicio>.mp4                             ← 1080p
    └── <servicio>-720.mp4                         ← versión optimizada
```

Los landscape se generan a **1920×1080, no 2400×1350**: los originales no pasan de 1440 px
de ancho, así que un 2400 sólo guardaría píxeles ampliados y el doble de peso.

## Servicios documentados

Los 13 servicios tienen **foto vertical + foto landscape**; casi todos además video 720p y
1080p:

1. Post-Construction Cleaning
2. Commercial Cleaning
3. After-Hours Office Cleaning
4. After-Hours Restaurant Cleaning
5. Epoxy Floor Services
6. Marble Polishing (sin video)
7. Residential Cleaning
8. Deep Cleaning
9. Disinfecting Services
10. Events Cleaning
11. Housekeeping
12. Real Estate Cleaning
13. Staffing (sin video)

## Reglas de uso

### Hero principal
- Imagen: `hero.webp` con **parallax sutil** (motion.img + `useScroll` → `y: 0%→30%`)
- Doble overlay obligatorio:
  ```css
  background: linear-gradient(to right, #0A0A0A/95, #0A0A0A/80, #0A0A0A/40);
  background: linear-gradient(to top, #0A0A0A, transparent, transparent);
  ```
- Escala: `scale-110` para evitar bordes en parallax
- Performance: `loading="eager"`, `fetchPriority="high"`, preload en `<head>`

### Cards de servicio
- Usar versión **landscape** (`<servicio>-landscape.webp`)
- Overlay desde abajo: `bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent`
- En hover: `scale-105` con `duration-700`

> **Ojo con el recorte real.** Aunque el archivo es 16:9, ninguna vista lo muestra entero:
> la banda de la card en Home (`h-44`) recorta a ~**2,3:1**, la de /services (`h-52`) a
> ~**1,9:1**, y la cabecera de la página de servicio (`h-[50vh] md:h-[65vh]`) llega a ~**3:1**
> en escritorio. El sujeto tiene que caer en la franja central del 16:9, y hay que dejar
> libres las esquinas donde van el badge dorado y el título.

### Comparador antes/después
- Componente: `src/app/components/BeforeAfterSlider.tsx`
- Datos: campo `beforeAfter` en `src/app/data/services.ts`
- Las dos fotos del par **se recortan con la misma caja** o el barrido no coincide
- Barrido automático suave 36 %→64 % cada ~5 s; se detiene en cuanto el usuario arrastra, y
  no arranca fuera de viewport ni con `prefers-reduced-motion: reduce`
- Manija dorada `#C4973E`, etiquetas Before / After en las esquinas superiores

### Sección "fondo oscuro con foto difuminada"
- Imagen de fondo a `opacity: 0.05`
- Encima va el halo dorado

### Videos en service detail
- Servir 720p como primera fuente y 1080p como fallback (siempre)
- Poster: la imagen vertical del mismo servicio
- Sin controles visibles por defecto (autoplay + muted + loop)

## Direction para fotos NUEVAS

Si se necesitan imágenes adicionales (otra ciudad, otro servicio, otro angle):

| Atributo | Indicación |
|---|---|
| **Iluminación** | Natural, cálida, con un toque ámbar. Nunca azul frío. |
| **Color grading** | Tonos cálidos, sombras profundas pero no negras puras. Permite mucho contraste con overlays oscuros. |
| **Composición** | Espacios limpios y ordenados. Mucho aire. Sin clutter ni gente apretada. |
| **Personas** | Profesionales en uniforme limpio, en acción concreta (no posando a cámara). |
| **Ratio** | `3:4` vertical (pósters) y `16:9` landscape (cards / hero / detail). |
| **Tema** | Espacios lujosos: cocinas modernas, oficinas premium, hoteles, casas grandes de Florida. |
| **NO** | Stock genérico, sonrisas falsas, productos de limpieza con logos, fondos saturados, filtros HDR, **tipografía incrustada en la foto** (rompe las tarjetas). |

**Pedir siempre una toma horizontal.** El material de Instagram es casi todo vertical y ese
es el cuello de botella real del sitio: una persona de cuerpo entero en una foto 4:5 no cabe
en la banda 16:9 que necesita la web. Si sólo hay vertical, que la persona esté lo bastante
lejos de la cámara para caber en el tercio central. Las fotos que hoy no sobreviven el
recorte están listadas, con prompts de extensión por IA, en `docs/imagenes-ajuste-ia.md`.

## Iconografía

Toda la iconografía proviene de **[Lucide Icons](https://lucide.dev/)**.
Tamaño típico: 12–24px, color contextual (dorado, blanco u oscuro).

Iconos más usados:
- `Sparkles`, `Star`, `Award` → eyebrows / badges premium
- `Phone`, `Mail`, `MapPin` → contacto
- `Home`, `Building2`, `Hotel`, `Hammer`, `UtensilsCrossed` → industrias
- `HardHat`, `Gem`, `Layers`, `Moon`, `KeyRound`, `CalendarCheck` → servicios
- `Leaf`, `Users`, `Clock`, `ShieldCheck` → "why us" / valores
- `ArrowRight`, `ChevronRight`, `ChevronDown` → navegación

### Tamaños estandarizados
- Inline con texto: `w-3.5 h-3.5` (14px)
- Botones CTA: `w-4 h-4`
- Iconos en badge dorado pequeño: `w-3 h-3 fill-[#C4973E]`
- Iconos en card de feature: `w-[18px] h-[18px]` dentro de container 40×40
- Iconos de industria: `w-5 h-5` dentro de container 48×48

## Logo

- Archivo: `src/assets/logo.webp`
- Variante única (no hay versión clara/oscura separada — funciona sobre `#0A0A0A`).
- Tamaños:
  - Navbar: `h-10 sm:h-12` (40–48px)
  - Footer: `h-16` (64px)
- **Nunca redimensionar manualmente con ancho fijo** — usar `w-auto`.
