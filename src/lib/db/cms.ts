import { query } from '@/lib/db/postgres';

let initialized = false;

export const EDITORIAL_BLOCKLIST = [
  'conseil juridique',
  'maitre',
  'défense',
  'defense',
  'représentation',
  'representation',
];

export function containsRiskyWording(value: string) {
  const lower = value.toLowerCase();
  return EDITORIAL_BLOCKLIST.some((term) => lower.includes(term));
}

export function editorialHint() {
  return 'Utiliser un wording prevention, analyse, accompagnement, information et securisation.';
}

export async function ensureCmsTables() {
  if (initialized) return;

  await query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

  await query(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug VARCHAR(120) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      meta_title VARCHAR(255),
      meta_description TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'draft',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug VARCHAR(150) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL DEFAULT '',
      category VARCHAR(100) DEFAULT 'general',
      cover_image TEXT,
      meta_title VARCHAR(255),
      meta_description TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'draft',
      published_at TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS faq_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category VARCHAR(40) NOT NULL DEFAULT 'general',
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_published BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      client_name VARCHAR(150) NOT NULL,
      content TEXT NOT NULL,
      is_visible BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS seo_settings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      site_title VARCHAR(255) DEFAULT '',
      site_description TEXT DEFAULT '',
      og_image TEXT,
      schema_json TEXT,
      sitemap_enabled BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name VARCHAR(120) NOT NULL,
      last_name VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(60),
      demand_type VARCHAR(120),
      status VARCHAR(40) NOT NULL DEFAULT 'new',
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      admin_notes TEXT DEFAULT '',
      source VARCHAR(120) DEFAULT 'contact_form',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query(`
    INSERT INTO seo_settings (site_title, site_description)
    SELECT 'Loubna Abouz Manta - Juriste en prevention', 'Accompagnement en droit du travail'
    WHERE NOT EXISTS (SELECT 1 FROM seo_settings);
  `);

  initialized = true;
}

