# Radar Vecinal - MVP Ciudadano 🛰️

Radar Vecinal es una plataforma PWA moderna para reportes ciudadanos, alertas urgentes, mapa de incidencias y memoria distrital. Diseñada para ofrecer una experiencia premium y tecnológica en la gestión de la seguridad comunitaria.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui + Framer Motion
- **Base de Datos:** PostgreSQL (Neon ready) con Prisma ORM
- **Autenticación:** Auth.js (NextAuth)
- **Mapas:** Mapbox GL JS
- **Imágenes:** Cloudinary
- **Notificaciones:** Firebase Cloud Messaging
- **Correos:** Resend
- **Despliegue:** Preparado para Render / Vercel

## 📦 Características Principales

1. **Autenticación Completa:** Login, Registro y Onboarding con selección de Distrito/Sector.
2. **Home Inteligente:** Mapa interactivo, botón de pánico y feed de actividad reciente.
3. **Botón de Pánico:** Alertas prioritarias con cuenta regresiva y notificaciones masivas.
4. **Mapa Interactivo:** Pines categorizados, filtros y vista de detalle rápida.
5. **Reportes:** Flujo paso a paso con carga de imágenes y ubicación precisa.
6. **Menor Perdido:** Módulo especializado para emergencias de máxima prioridad.
7. **Estadísticas:** KPIs y gráficos de tendencias de seguridad distrital.
8. **Panel Admin:** Gestión integral de reportes, usuarios y anuncios.
9. **PWA:** Instalable en dispositivos móviles para acceso rápido.

## 🛠️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <repo-url>
   cd radarvecinal2
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia `.env.example` a `.env` y completa los valores necesarios:
   ```bash
   cp .env.example .env
   ```

4. **Configurar Base de Datos:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Ejecutar en desarrollo (Modo Preview):**
   ```bash
   npm run dev
   ```
   Accede a `/preview` para ver el **Showcase de Componentes** interactivo, donde podrás alternar entre vistas móviles y desktop con hot-reload automático.

## 📺 Modo Preview

Radar Vecinal incluye un entorno de vista previa avanzado accesible en:
`http://localhost:3000/preview`

Este entorno permite:
- **Navegación Rápida:** Cambia entre todas las rutas del MVP (Home, Mapa, Reportar, Admin, etc.) sin recargar.
- **Simulación de Dispositivos:** Alterna entre vista de escritorio y móvil para validar el diseño responsive.
- **Hot-Reload:** Visualiza cambios en el código en tiempo real dentro del frame de previsualización.
- **Validación de UI:** Acceso directo a estados de componentes como el Botón de Pánico y Alertas Prioritarias.

## 🏗️ Arquitectura de Carpetas

- `src/app`: Rutas y layouts principales.
- `src/components/layout`: Estructura base (AppShell, Header, Sidebar).
- `src/components/map`: Lógica y componentes de Mapbox.
- `src/components/ui`: Componentes base de shadcn/ui.
- `src/components/shared`: Componentes reutilizables (PanicButton, cards, etc.).
- `src/lib`: Configuraciones de Prisma, Auth, Mapbox, etc.
- `prisma/`: Esquema de base de datos y seeds.

## 🚢 Despliegue en Render

Para desplegar en Render, sigue estos pasos:
1. Conecta tu repositorio.
2. Configura el comando de construcción: `npm run build`.
3. Configura el comando de inicio: `npm start`.
4. Agrega todas las variables de entorno definidas en `.env.example`.

---
Diseñado con pasión para una comunidad más segura. 🛡️
