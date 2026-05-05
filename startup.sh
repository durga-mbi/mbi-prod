#!/bin/bash

# Single command startup script for MindBrain and MindBotics

echo "🚀 Starting all services..."

# Build and start the containers
docker compose up -d --build

echo "✅ All services are starting up!"
echo "🌐 Domains configured:"
echo "   - https://mindbrain.co.in"
echo "   - https://api.mindbrain.co.in"
echo "   - https://mindbotics.in"
echo "   - https://api.mindbotics.in"
echo ""
echo "📊 Use 'docker compose ps' to check status."
echo "📜 Use 'docker compose logs -f' to view logs."
