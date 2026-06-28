CLAUDE.md

Contexto del proyecto para Claude Code. Léelo al inicio de cada sesión.

Qué es esto

Sistema multi-tenant para crear cartas online (digitales) de bares, cafeterías y
restaurantes de mi pueblo (zona de Vigo, España). El objetivo es un servicio que yo
vendo local por local durante el verano.

La clave del proyecto: NO es una web a medida por cada bar. Es un único sistema
reutilizable donde cada local es básicamente un conjunto de datos (nombre, categorías,
platos, precios, alérgenos, foto, colores). La plantilla se monta una vez; dar de alta
un bar nuevo debe costar minutos, no días.


Cada local tiene su propia URL, tipo /bar-paco, y su propio QR.
El cliente (el dueño del bar) no toca nada: yo doy de alta y actualizo a mano.
No hay panel de administración para el cliente (de momento). Se descartó a propósito
para no construir un admin que consumiría semanas. Reevaluar solo si el negocio despega.


Modelo de negocio (decidido)


50 € de alta (pago único, por adelantado o a la entrega — nunca a 30 días).
10 €/mes por "carta siempre actualizada".
Cambios de contenido (precios, añadir/quitar un plato, plato del día, erratas):
gratis, incluidos en la cuota.
Cambios de estructura o diseño (sección nueva entera, rediseño, fotos a todos los
platos, funcionalidad nueva): de pago.
Regla mental que define la frontera: editar contenido es gratis, cambiar la estructura
se cobra.
El primer local se hace gratis o casi gratis: es la demo/escaparate para vender a los demás.


Argumento de venta clave

Los 14 alérgenos obligatorios por el Reglamento (UE) 1169/2011. La mayoría de bares
lo hace mal o no lo hace. La carta online lo debe resolver limpio: cada plato con sus
alérgenos marcados de forma clara. Convierte un capricho en algo que les quita un
problema legal de encima.

Flujo de trabajo para dar de alta una carta


Foto(s) de la carta física del bar.
Un LLM extrae categorías, platos, precios y alérgenos a JSON (estructurado).
Yo reviso y corrijo el JSON a mano (es el paso donde está el valor y la calidad).
El JSON alimenta la plantilla y genera la carta del local.


El cuello de botella real es teclear las cartas; por eso la extracción automática a JSON
es parte central del sistema, no un extra.

Fases


Fase 1 (ahora): cartas online + QR para bares y restaurantes.
Fase 2 (opcional, si el cliente lo pide y paga más): web completa del local y,
para restaurantes, sistema de reservas integrado.


Mi perfil técnico (para que sepas con qué me manejo)

Graduado en DAM. Experiencia práctica principal: NutrIA (app móvil de nutrición/fitness).
Stack que conozco:


Frontend: React Native, Expo, TypeScript.
Backend: FastAPI, PostgreSQL, SQLAlchemy async, JWT, OAuth.
LLMs: Groq API y modelos locales.
Herramientas: VS Code + Claude Code.


Decisiones técnicas pendientes (hablarlas antes de programar)


Stack de la web aún sin decidir. Es una web de contenido (mayormente estática por
local, con datos que cambian poco). Hay que elegir entre algo tipo SSG/Next.js, Astro,
o un enfoque simple con datos en JSON/DB. No asumir; proponer opciones y decidir juntos.
Dónde viven los datos de cada local (archivos JSON en el repo vs base de datos).
Cómo se generan y sirven las URLs por local y los QR.
Modelo de datos de la carta (categorías → platos → precio + alérgenos + descripción).


Reglas de trabajo


Mantener todo lo más reutilizable posible: el coste marginal de añadir un bar debe
tender a cero.
Priorizar que dar de alta y actualizar cartas sea rápido para mí.
Antes de meter una dependencia o un stack pesado, comprobar que el problema lo justifica.