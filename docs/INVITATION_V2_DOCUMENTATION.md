# 📧 Invitación de Bautizo v2 - Diseño con Sobre Interactivo

## 🎨 Descripción del Diseño

Esta segunda versión de la invitación de bautizo presenta un diseño elegante y moderno con una secuencia interactiva que incluye:

### 📱 Secuencia de Pantallas:

1. **📮 Pantalla de Sobre**: 
   - Sobre elegante con decoraciones de diamantes
   - Texto "Desliza para abrir" con animación
   - Botón interactivo para abrir la invitación
   - Transición suave al contenido principal

2. **👶 Foto Principal con Countdown**:
   - Foto destacada del bebé (Sofía)
   - Información del bautizo superpuesta
   - Contador regresivo en tiempo real
   - Fecha y hora del evento

3. **💭 Sección de Citas de Padres**:
   - Mensaje emotivo de la mamá
   - Mensaje complementario del papá
   - Diseño con tarjetas elegantes

4. **👑 Menciones Especiales**:
   - Información de padrinos
   - Fotos circulares con bordes dorados
   - Datos: Pedri González (Padrino) y Martha Torres (Madrina)

5. **📍 Ubicación y Ceremonia**:
   - Mapa integrado de la ubicación
   - Parroquia San Juan Bosco, León, Guanajuato
   - Botón para abrir en Google Maps
   - Fecha: 14 de marzo 2026, 04:43 hrs

6. **📸 Galería de Fotos**:
   - Estilo polaroid con rotaciones
   - Efectos hover interactivos
   - Múltiples fotos del bebé

7. **🔗 Botones de Compartir**:
   - WhatsApp con mensaje pre-formateado
   - Facebook para compartir enlace
   - Copiar enlace al portapapeles

## 🔧 Datos Configurables

### Información del Bebé:
```typescript
childName = 'Sofía';
baptismDate = new Date('2026-03-14T16:43:00-05:00');
ceremonyTime = '16:43 hrs';
receptionTime = '18:00 hrs';
```

### Ubicación de la Ceremonia:
```typescript
ceremonyLocation = 'León, Guanajuato, México';
ceremonyVenue = 'Parroquia San Juan Bosco';
ceremonyAddress = '4867+2J3 León de los Aldama, Guanajuato';
ceremonyMapLink = 'https://maps.google.com/?q=Z%C3%B3calo+CDMX';
```

### Padrinos:
```typescript
godparents = [
  {
    name: 'Pedri González',
    role: 'PADRINO',
    photo: 'assets/images/padrino.jpg'
  },
  {
    name: 'Martha Torres',
    role: 'MADRINA',
    photo: 'assets/images/madrina.jpg'
  }
];
```

### Mensajes de los Padres:
```typescript
motherQuote = '"Con amor y fe, celebramos el primer paso espiritual de nuestro pequeña Sofía..."';
fatherQuote = '"Con orgullo y alegría, invitamos a nuestros seres queridos..."';
```

## 🎵 Funcionalidades Incluidas

### ✅ Características Implementadas:
- **🎵 Música de Fondo**: Reproductor automático con controles
- **⏰ Contador Regresivo**: Tiempo real hasta el evento
- **📱 Responsive**: Adaptable a móviles y tablets
- **✉️ Confirmación RSVP**: Sistema de confirmación de asistencia
- **🗺️ Integración Google Maps**: Enlace directo a la ubicación
- **🎨 Animaciones**: Transiciones suaves y efectos visuales
- **📧 Sobre Interactivo**: Experiencia de "abrir" invitación
- **🔗 Compartir Redes**: Botones para WhatsApp, Facebook y copiar enlace
- **📸 Galería Polaroid**: Efectos interactivos en fotos
- **💎 Decoraciones Animadas**: Diamantes flotantes en el sobre

## 🖼️ Imágenes Requeridas

### Archivos que deben reemplazarse:
- `assets/images/bebe-bautizo.jpg` - Foto principal del bebé
- `assets/images/padrino.jpg` - Foto del padrino
- `assets/images/madrina.jpg` - Foto de la madrina
- `assets/images/bebe-foto1.jpg` - Galería foto 1
- `assets/images/bebe-foto2.jpg` - Galería foto 2
- `assets/images/bebe-foto3.jpg` - Galería foto 3

### Especificaciones de Imágenes:
- **Foto principal**: 450x550px, alta calidad
- **Fotos padrinos**: 300x300px, formato circular
- **Galería**: 220x220px, estilo casual

## 🎨 Paleta de Colores

### Colores Principales:
- **Dorado**: #d4af37 (elementos destacados)
- **Dorado Claro**: #f4d03f (gradientes)
- **Texto**: #4a4a4a (texto principal)
- **Fondo**: Gradientes crema y beige
- **Blanco**: rgba(255, 255, 255, 0.9) (tarjetas)

## 📱 Responsive Design

### Breakpoints:
- **Desktop**: > 768px
- **Tablet**: 481px - 768px  
- **Mobile**: ≤ 480px

### Adaptaciones Móviles:
- Tamaños de fuente reducidos
- Espaciado optimizado
- Imágenes redimensionadas
- Botones táctiles más grandes

## 🔄 Animaciones y Efectos

### Efectos Implementados:
- **Diamantes flotantes**: Animación continua en el sobre
- **Bounce**: Flecha indicadora
- **Hover**: Efectos en tarjetas y botones
- **Transiciones**: Suaves entre secciones
- **Pulse**: Indicador de música activa
- **Polaroid**: Rotación y escalado en hover

## 📋 Funcionalidad RSVP

### Sistema de Confirmación:
- Carga de invitados desde API
- Formulario dinámico por invitado
- Opciones: "Sí asistiré" / "No podré asistir"
- Mensaje de agradecimiento
- Persistencia de datos

## 🛠️ Personalización Rápida

### Para cambiar datos básicos:
1. Editar variables en el constructor del componente
2. Reemplazar imágenes en la carpeta assets
3. Ajustar colores en el archivo SCSS
4. Actualizar enlaces de Google Maps

### Para cambiar estilos:
- Modificar variables de color en SCSS
- Ajustar tamaños de fuente
- Cambiar efectos de animación
- Personalizar espaciado

La implementación está completa y lista para uso en producción, manteniendo toda la funcionalidad de confirmación RSVP de la primera versión.
