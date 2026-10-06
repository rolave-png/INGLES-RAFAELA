# English Quest

App web para que una niña de 11 años aprenda inglés por etapas. Sin build ni dependencias.

## Probar
```bash
cd ingles-app && python3 -m http.server 8080   # abrir http://localhost:8080
```
En celular/tablet se puede "Agregar a pantalla de inicio" (PWA, funciona sin conexión tras la primera carga).
Para el micrófono y la voz conviene usar Chrome o Safari.

## Cómo funciona
- **Unidades por etapa** (`content.js`): tarjetas de aprendizaje con audio → práctica de ~18 ejercicios mixtos.
- **Ejercicios**: elegir imagen/palabra/significado, escuchar, escribir, armar frases, completar gramática, pronunciar.
- **Feedback inmediato**: explicación en español; lo fallado vuelve a aparecer en la misma lección.
- **Repaso espaciado** (cajas de Leitner, 1-2-4-8-16 días) con el "Repaso del día".
- **Progreso**: estrellas (70/85/100%), puntos, racha; la siguiente unidad se desbloquea con 1 estrella.
- **Panel para adultos**: palabras vistas/aprendidas, actividad semanal, palabras difíciles, respaldo del progreso.

## Ampliar contenido
Agregar un objeto a `units` en `content.js` (ver formato en el comentario inicial). Nuevas etapas: agregar a `stages`.
