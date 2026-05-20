/**
 * Script pour créer un compte administrateur
 * Usage: node scripts/create-admin.js email@example.com password123
 */

const bcrypt = require('bcrypt');
const { Pool } = require('pg');

async function createAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node scripts/create-admin.js <email> <password>');
    process.exit(1);
  }

  const [email, password] = args;
  const role = args[2] || 'super_admin'; // Par défaut super_admin

  // Connexion PostgreSQL
  const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    database: process.env.POSTGRES_DATABASE || 'loubna_db',
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    // Hasher le mot de passe
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insérer l'admin dans la base
    const query = `
      INSERT INTO admin_users (email, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, email, role, created_at
    `;
    
    const result = await pool.query(query, [email, passwordHash, role]);
    
    console.log('✅ Compte administrateur créé avec succès !');
    console.log('-----------------------------------');
    console.log('ID:', result.rows[0].id);
    console.log('Email:', result.rows[0].email);
    console.log('Rôle:', result.rows[0].role);
    console.log('Créé le:', result.rows[0].created_at);
    console.log('-----------------------------------');
    console.log('Vous pouvez maintenant vous connecter sur /admin/login');
    
  } catch (error) {
    if (error.code === '23505') {
      console.error('❌ Erreur: Cet email existe déjà');
    } else {
      console.error('❌ Erreur lors de la création:', error.message);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdmin();
