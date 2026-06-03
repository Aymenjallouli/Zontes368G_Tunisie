#!/bin/bash
# Usage: bash create-admin.sh <email> <password>
# Example: bash create-admin.sh admin@zontes.tn MyPassword123
set -euo pipefail

EMAIL="${1:-}"
PASSWORD="${2:-}"

if [ -z "$EMAIL" ] || [ -z "$PASSWORD" ]; then
  echo "Usage: bash create-admin.sh <email> <password>"
  exit 1
fi

source /opt/zontes368g/.env

docker compose -f /opt/zontes368g/docker-compose.prod.yml exec api node -e "
const b = require('bcryptjs');
const { Pool } = require('pg');
const p = new Pool({ connectionString: process.env.DATABASE_URL });
const hash = b.hashSync('${PASSWORD}', 12);
p.query(
  'INSERT INTO admin_users(email, password_hash) VALUES(\$1, \$2) ON CONFLICT(email) DO UPDATE SET password_hash=\$2',
  ['${EMAIL}', hash]
).then(() => { console.log('✓ Admin créé : ${EMAIL}'); p.end(); })
 .catch(e => { console.error(e.message); p.end(); process.exit(1); });
"
