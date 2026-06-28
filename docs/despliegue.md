# Despliegue (Cloudflare Pages)

El sitio es 100% estático. Publicar = `git push`; Cloudflare hace `build` + deploy.
Esta guía es para la **configuración inicial** (se hace una sola vez).

## 1. Conectar el repo a Cloudflare Pages (una vez)

1. Crea cuenta en <https://dash.cloudflare.com> (gratis).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Autoriza GitHub y elige el repo **`gabrimdez/CartasBar`**.
4. Configuración de build:
   - **Production branch:** `main`
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - La versión de Node la toma del archivo **`.nvmrc`** del repo (Node 22). Si
     hiciera falta forzarla, añade una variable de entorno `NODE_VERSION = 22`.
5. **Save and Deploy**. Al terminar tendrás una URL `https://<proyecto>.pages.dev`.

A partir de aquí, **cada push a `main`** despliega solo. Las ramas distintas de
`main` generan "preview deployments" (útiles para revisar antes de integrar).

## 2. Fijar la URL real en el proyecto

El campo `site` de `astro.config.mjs` debe ser la URL pública definitiva (se usa
para las canónicas, Open Graph y la generación de QR):

```js
// astro.config.mjs
site: 'https://<proyecto>.pages.dev', // o tu dominio propio
```

Cámbialo, `git push`, y el deploy regenerará los QR con la URL correcta.
**Hazlo antes de imprimir/repartir QR** (si la URL cambia, los QR impresos dejan
de servir).

## 3. Dominio propio por bar (extra de PAGO)

Por defecto cada bar vive en `https://<proyecto>.pages.dev/<slug>`. Un bar puede
contratar su propio dominio como **servicio de pago**:

1. Compra el dominio en **Cloudflare Registrar** (a precio de coste).
2. Para apuntarlo al bar tienes dos opciones:
   - **Dominio dedicado al bar** → en el proyecto Pages, **Custom domains**, añade
     `barpaco.com`. Si quieres que la raíz muestre directamente su carta, crea una
     **Redirect Rule**: `barpaco.com/*` → `https://<proyecto>.pages.dev/bar-paco`.
   - **Subdominio** (`barpaco.tudominio.com`) con el mismo tipo de redirección.
3. Si ese bar usa su propio dominio, su **QR debe apuntar a ese dominio**. (Hoy el
   generador usa la `site` global; cuando haya bares con dominio propio añadimos un
   campo opcional de URL por bar y regeneramos su QR.)

> Esto no cambia el build ni el resto de bares: es solo enrutado de dominios.
