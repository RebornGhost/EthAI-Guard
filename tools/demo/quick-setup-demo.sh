#!/bin/bash

###############################################################################
# EthixAI Demo Quick Setup Script
#
# This script automates the complete demo environment setup:
# 1. Checks prerequisites
# 2. Installs dependencies
# 3. Seeds demo data
# 4. Validates setup
# 5. Prints access credentials
#
# Usage: ./quick-setup-demo.sh
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
MONGO_URL="${MONGO_URL:-mongodb://localhost:27018/ethixai}"
BACKEND_URL="${BACKEND_URL:-http://localhost:5000}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:3000}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}║        🚀 EthixAI Demo Quick Setup Script 🚀          ║${NC}"
echo -e "${BLUE}║                                                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Step 1: Check Prerequisites
echo -e "${YELLOW}[Step 1/5]${NC} Checking prerequisites..."

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗${NC} Docker not found. Please install Docker first."
    exit 1
fi
echo -e "${GREEN}✓${NC} Docker installed"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗${NC} Docker Compose not found. Please install Docker Compose first."
    exit 1
fi
echo -e "${GREEN}✓${NC} Docker Compose installed"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 20+ first."
    exit 1
fi
echo -e "${GREEN}✓${NC} Node.js installed ($(node --version))"

# Step 2: Start Docker Services
echo ""
echo -e "${YELLOW}[Step 2/5]${NC} Starting Docker services..."

cd "$PROJECT_ROOT"

# Check if services are already running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓${NC} Services already running"
else
    echo "Starting services (this may take 1-2 minutes)..."
    docker-compose up -d
    
    echo "Waiting for services to be healthy..."
    sleep 30
    echo -e "${GREEN}✓${NC} Services started"
fi

# Verify services are healthy
echo "Verifying service health..."

# Check Backend
if curl -sf "$BACKEND_URL/health" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend healthy ($BACKEND_URL)"
else
    echo -e "${YELLOW}⚠${NC}  Backend not responding yet (may need more time)"
fi

# Check MongoDB
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    if timeout 5 mongo "$MONGO_URL" --eval "db.adminCommand('ping')" &> /dev/null || \
       timeout 5 mongosh "$MONGO_URL" --eval "db.adminCommand('ping')" &> /dev/null; then
        echo -e "${GREEN}✓${NC} MongoDB connected"
    else
        echo -e "${YELLOW}⚠${NC}  MongoDB connection timeout (may need more time)"
    fi
else
    echo -e "${YELLOW}⚠${NC}  mongo/mongosh CLI not installed (optional)"
fi

# Step 3: Install Seeding Dependencies
echo ""
echo -e "${YELLOW}[Step 3/5]${NC} Installing seeding dependencies..."

cd "$SCRIPT_DIR"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Dependencies already installed"
else
    echo "Installing mongodb and firebase-admin..."
    npm install --no-save mongodb firebase-admin
    echo -e "${GREEN}✓${NC} Dependencies installed"
fi

# Step 4: Seed Demo Data
echo ""
echo -e "${YELLOW}[Step 4/5]${NC} Seeding demo data..."

# Set environment variable for MongoDB URL
export MONGO_URL="$MONGO_URL"

# Check if Firebase service account exists
if [ -f "$PROJECT_ROOT/serviceAccountKey.json" ]; then
    echo -e "${GREEN}✓${NC} Firebase service account found"
    node seed-demo-data.js
else
    echo -e "${YELLOW}⚠${NC}  Firebase service account not found (skipping Firebase user)"
    echo "   Place serviceAccountKey.json in project root to enable Firebase auth"
    node seed-demo-data.js
fi

# Step 5: Validation & Summary
echo ""
echo -e "${YELLOW}[Step 5/5]${NC} Validating setup..."

# Test MongoDB connection with seeded data
echo "Checking seeded data..."
if command -v mongosh &> /dev/null; then
    USER_COUNT=$(mongosh "$MONGO_URL" --quiet --eval "db.users.countDocuments({email: 'demo@ethixai.com'})")
    ANALYSIS_COUNT=$(mongosh "$MONGO_URL" --quiet --eval "db.analyses.countDocuments({})")
elif command -v mongo &> /dev/null; then
    USER_COUNT=$(mongo "$MONGO_URL" --quiet --eval "db.users.countDocuments({email: 'demo@ethixai.com'})")
    ANALYSIS_COUNT=$(mongo "$MONGO_URL" --quiet --eval "db.analyses.countDocuments({})")
else
    USER_COUNT="?"
    ANALYSIS_COUNT="?"
fi

if [ "$USER_COUNT" != "?" ] && [ "$USER_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Demo user exists in database"
else
    echo -e "${YELLOW}⚠${NC}  Could not verify demo user (may still be valid)"
fi

if [ "$ANALYSIS_COUNT" != "?" ] && [ "$ANALYSIS_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Analysis data exists ($ANALYSIS_COUNT records)"
else
    echo -e "${YELLOW}⚠${NC}  Could not verify analysis data"
fi

# Print Summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║             ✨ DEMO SETUP COMPLETE! ✨                ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📝 Demo Credentials:${NC}"
echo "   Email:    demo@ethixai.com"
echo "   Password: SecureDemo2024!"
echo ""
echo -e "${BLUE}🌐 Access URLs:${NC}"
echo "   Frontend:   $FRONTEND_URL"
echo "   Backend:    $BACKEND_URL"
echo "   Prometheus: http://localhost:9090"
echo "   Grafana:    http://localhost:3001"
echo ""
echo -e "${BLUE}🎬 Quick Demo Commands:${NC}"
echo "   Full demo:        ./full_demo_sequence.sh"
echo "   Performance test: ./performance_test.sh"
echo "   View logs:        docker-compose logs -f"
echo ""
echo -e "${BLUE}📖 Documentation:${NC}"
echo "   Setup guide: $SCRIPT_DIR/README.md"
echo "   User manual: $PROJECT_ROOT/docs/USER_MANUAL.md"
echo ""
echo -e "${GREEN}Ready for your investor presentation! 🚀${NC}"
echo ""

# Optional: Open frontend in browser
if command -v open &> /dev/null; then
    # macOS
    read -p "Open frontend in browser? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open "$FRONTEND_URL"
    fi
elif command -v xdg-open &> /dev/null; then
    # Linux
    read -p "Open frontend in browser? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open "$FRONTEND_URL"
    fi
fi
