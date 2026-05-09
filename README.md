# Portfolio IT estático

Web estática profesional para publicar en GitHub Pages. El diseño vive en `index.html` y `styles.css`, pero el contenido editable está separado en `content.json`.

## Qué editar normalmente

Edita solo estos elementos:

- `content.json`: textos, experiencia, proyectos, certificaciones, formación, contacto y enlaces.
- `assets/photos/`: fotos de perfil, proyectos o infraestructura.
- `assets/cv/cv.pdf`: archivo PDF del CV.

Evita tocar `index.html`, `styles.css` y `script.js` salvo que quieras cambiar el diseño o la lógica.

## Cómo cambiar datos personales

En `content.json`, modifica el bloque `perfil`:

```json
"perfil": {
  "nombre": "Tu Nombre Real",
  "iniciales": "TN",
  "cargoCorto": "Coordinador de Redes",
  "heroTitulo": "Tu titular profesional",
  "heroTexto": "Resumen breve de tu perfil.",
  "heroImagen": "assets/photos/perfil.jpg"
}
```

Para usar una foto, súbela a `assets/photos/` y escribe su ruta en `heroImagen`.

## Cómo cambiar skills

La sección `skills` está pensada para mostrar capacidades técnicas por categorías:

```json
"skills": [
  {
    "categoria": "Redes corporativas",
    "items": ["Routing", "Switching", "VLAN", "Wi-Fi"]
  }
]
```

Puedes crear tantas categorías como necesites, pero visualmente funcionan mejor entre 3 y 6.

## Cómo añadir un proyecto

Los proyectos están en:

```json
"proyectos": {
  "items": []
}
```

Copia este bloque dentro de `items`:

```json
{
  "titulo": "Nombre del proyecto",
  "periodo": "2026",
  "estado": "En curso",
  "descripcion": "Explica el problema, la solución aplicada y el resultado conseguido.",
  "tecnologias": ["Switching", "Firewall", "Monitorización"],
  "imagen": "assets/photos/nombre-foto.jpg"
}
```

Si no tienes imagen todavía, deja:

```json
"imagen": ""
```

Consejo: para proyectos, queda profesional explicar siempre tres cosas: contexto, acción y resultado.

Las imágenes de proyectos se muestran en formato showcase. Usa imágenes horizontales cuando puedas, por ejemplo:

```text
assets/photos/proyecto-monitorizacion.jpg
assets/photos/proyecto-firewall.jpg
assets/photos/proyecto-wifi.jpg
```

## Cómo añadir una certificación

Las certificaciones están en:

```json
"certificaciones": {
  "items": []
}
```

Copia este bloque dentro de `items`:

```json
{
  "nombre": "Nombre de la certificación",
  "entidad": "Entidad emisora",
  "anio": "2026",
  "estado": "En vigor",
  "url": ""
}
```

Si tienes una URL pública de verificación, ponla en `url`. Si no, déjala vacía.

## Cómo cambiar el CV

1. Sube tu PDF a `assets/cv/`.
2. Si el archivo se llama `cv.pdf`, no tienes que cambiar nada.
3. Si tiene otro nombre, cambia en `content.json`:

```json
"cv": {
  "archivo": "assets/cv/mi-cv.pdf"
}
```

## Cómo cambiar contacto

Modifica el bloque `contacto`:

```json
"contacto": {
  "email": "tu.email@dominio.com",
  "telefono": "+34 000 000 000",
  "linkedin": "https://www.linkedin.com/in/tu-perfil",
  "github": "https://github.com/tu-usuario"
}
```

## Reglas importantes del JSON

- Cada texto va entre comillas dobles.
- Cada bloque dentro de una lista se separa con coma, excepto el último.
- No pongas comentarios dentro de `content.json`.
- Si la web deja de cargar contenido después de editar, casi siempre falta una coma o sobra una coma final.

## Probar en local

Desde esta carpeta:

```bash
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

No abras `index.html` directamente con doble clic para revisar cambios, porque algunos navegadores bloquean la carga de `content.json` cuando se usa `file://`.

## Publicar en GitHub Pages

1. Sube todos los archivos al repositorio.
2. En GitHub, entra en `Settings`.
3. Ve a `Pages`.
4. En `Build and deployment`, selecciona la rama principal y la carpeta raíz.
5. GitHub publicará la web en una URL tipo `https://usuario.github.io/repositorio/`.
