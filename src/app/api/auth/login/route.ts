import { createSession } from '@/lib/auth/session';
import { query } from '@/lib/db/postgres';
import { checkRateLimit } from '@/lib/security/rate-limit';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const rate = checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Reessayez plus tard.' },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur admin
    let result = await query(
      'SELECT * FROM admin_users WHERE email = $1',
      [normalizedEmail]
    );

    if (result.rows.length === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const envEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
      if (normalizedEmail === envEmail) {
        const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
        await query(
          `INSERT INTO admin_users (email, password_hash, full_name, role, active)
           VALUES ($1, $2, 'Administrateur principal', 'super_admin', true)
           ON CONFLICT (email) DO NOTHING`,
          [envEmail, hashed]
        );
        result = await query('SELECT * FROM admin_users WHERE email = $1', [envEmail]);
      }
    }

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Créer la session
    await createSession(user.id, user.email, user.role);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
