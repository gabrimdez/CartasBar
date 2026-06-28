# Alta de un bar (en minutos)

Dar de alta o actualizar un bar = editar **un archivo JSON** y hacer `git push`.
Cloudflare reconstruye y publica solo. No hay panel, ni base de datos, ni servidor.

## 1. Crear el JSON del bar

Copia la plantilla [`docs/plantilla-bar.json`](./plantilla-bar.json) a:

```
src/data/bars/<slug>.json
```

- El **nombre del archivo es el slug** y será la URL: `src/data/bars/bar-paco.json` → `/bar-paco`.
- Usa minúsculas, sin acentos ni espacios (guiones): `casa-manolo`, `o-bocoi`…

Rellena los campos:

| Campo | Obligatorio | Notas |
| --- | --- | --- |
| `nombre` | sí | Nombre visible del bar. |
| `tema.primario` / `tema.fondo` / `tema.texto` | sí | Colores (hex). Cambian el aspecto sin tocar código. |
| `contacto.telefono` / `direccion` / `horario` | no | Lo que tenga el bar. |
| `categorias[].nombre` | sí | Ej.: "Para picar", "Postres". |
| `categorias[].platos[].nombre` | sí | |
| `...platos[].precio` | sí | Número en euros (`9.5`). |
| `...platos[].descripcion` | no | |
| `...platos[].alergenos` | no | Lista de ids válidos (abajo). |

### Alérgenos válidos (Reglamento UE 1169/2011)

```
gluten · crustaceos · huevos · pescado · cacahuetes · soja · lacteos
frutos-cascara · apio · mostaza · sesamo · sulfitos · altramuces · moluscos
```

Si pones un id que no esté en la lista, **el build falla** (es a propósito: evita
publicar alérgenos mal escritos).

## 2. Fotos de los platos (opcional, por plato)

Las fotos son opcionales y van **por convención de nombre**, sin tocar el JSON:

1. Pide al `slug` exacto de cada plato:
   ```sh
   npm run fotos <slug-del-bar>      # ej.: npm run fotos bar-paco
   ```
   Te lista cada plato con el nombre de archivo que debe tener su foto y avisa de
   fotos que no casan con ningún plato.
2. Deja la foto (jpg/png/webp/avif) en:
   ```
   src/assets/platos/<slug-del-bar>/<slug-del-plato>.jpg
   ```
   Ej.: `src/assets/platos/bar-paco/croquetas-caseras-de-jamon.jpg`.
3. Listo: aparece debajo del plato y se **optimiza sola** en el build (WebP/AVIF,
   tamaños responsive, carga lazy). Da igual que la foto original pese varios MB.

## 3. Publicar

```sh
git add -A
git commit -m "Alta/actualización de <bar>"
git push
```

Cloudflare detecta el push, ejecuta `npm run build` (que regenera los QR) y publica.
En ~1 minuto está online. Actualizar precios o platos es exactamente lo mismo.

## 4. El QR

Tras el despliegue, el QR del bar está en `https://<tu-dominio>/qr/<slug>.svg`
(vectorial, para imprimir) y `.png`. Se regenera solo en cada deploy.

> El QR codifica la **URL** del bar. Mientras la URL no cambie, **no hay que
> reimprimirlo nunca** aunque cambies precios o platos. Ver el primer despliegue y
> los dominios por bar en [`docs/despliegue.md`](./despliegue.md).
