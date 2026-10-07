#!/bin/bash

# Script para generar archivos de audio de prueba
# Requiere ffmpeg instalado en el sistema

echo "🎵 Generador de Audio de Prueba para Invitaciones de Bautizo"
echo "=============================================================="

AUDIO_DIR="src/assets/audio"

# Verificar si ffmpeg está instalado
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg no está instalado."
    echo "💡 Para instalar ffmpeg en macOS: brew install ffmpeg"
    echo "💡 Para instalar ffmpeg en Ubuntu: sudo apt install ffmpeg"
    echo "💡 Para Windows: descargar desde https://ffmpeg.org/"
    exit 1
fi

echo "✅ ffmpeg encontrado"

# Crear directorio si no existe
mkdir -p "$AUDIO_DIR"

echo "📁 Creando archivos de audio de prueba..."

# Generar un tono suave de prueba (2 minutos, 440Hz + 523Hz para armonía)
ffmpeg -f lavfi -i "sine=frequency=440:duration=120,sine=frequency=523:duration=120" \
       -filter_complex "[0:0][1:0]amix=inputs=2:duration=longest" \
       -ar 44100 -ac 2 -b:a 128k \
       "$AUDIO_DIR/background-music.mp3" -y

# Convertir a OGG para compatibilidad
ffmpeg -i "$AUDIO_DIR/background-music.mp3" \
       -c:a libvorbis -q:a 4 \
       "$AUDIO_DIR/background-music.ogg" -y

if [ $? -eq 0 ]; then
    echo "✅ Archivos de audio de prueba creados exitosamente:"
    echo "   📄 $AUDIO_DIR/background-music.mp3"
    echo "   📄 $AUDIO_DIR/background-music.ogg"
    echo ""
    echo "🔔 Nota: Estos son archivos de prueba con tonos sintéticos."
    echo "   Reemplázalos con música real apropiada para bautizos."
    echo ""
    echo "🎵 Sugerencias de música apropiada:"
    echo "   • Ave María - versión instrumental"
    echo "   • Música clásica suave (Bach, Mozart)"
    echo "   • Himnos religiosos instrumentales"
    echo "   • Música ambient/new age relajante"
else
    echo "❌ Error al generar archivos de audio"
    exit 1
fi
