#!/bin/bash

# Download service images for TORQ Cymru website
# Creates assets/services/ folder and downloads 7 service images

mkdir -p /Users/shanestokes/Desktop/my-business-site/assets/services

cd /Users/shanestokes/Desktop/my-business-site/assets/services

echo "Downloading service images..."

# Brakes & Pads
curl -L "https://unsplash.com/photos/yqsgL2wKEHA/download?force=true&w=1200" -o brake-service.jpg
echo "✓ Brake service"

# Servicing
curl -L "https://unsplash.com/photos/V37iTrYZz2E/download?force=true&w=1200" -o servicing.jpg
echo "✓ Servicing"

# Diagnostics
curl -L "https://unsplash.com/photos/6J7NqSAuYEI/download?force=true&w=1200" -o diagnostics.jpg
echo "✓ Diagnostics"

# Repairs
curl -L "https://unsplash.com/photos/l0CQZX-eiAU/download?force=true&w=1200" -o repairs.jpg
echo "✓ Repairs"

# Battery
curl -L "https://images.unsplash.com/photo-1633356713697-e3e6bec00f6e?w=1200&q=80" -o battery.jpg
echo "✓ Battery"

# MOT/Inspection
curl -L "https://unsplash.com/photos/j5ckBhJ6zqE/download?force=true&w=1200" -o mot-inspection.jpg
echo "✓ MOT Inspection"

# Fleet
curl -L "https://unsplash.com/photos/cYyD2YcUl-8/download?force=true&w=1200" -o fleet.jpg
echo "✓ Fleet"

echo ""
echo "✅ All images downloaded to assets/services/"
echo ""
ls -lh /Users/shanestokes/Desktop/my-business-site/assets/services/
