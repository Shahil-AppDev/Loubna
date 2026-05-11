'use client';

import { useEffect, useState } from 'react';

type Item = Record<string, any>;

const blockedTerms = ['conseil juridique', 'Maître', 'défense', 'représentation'];

export default function AdminCmsPage() {
  const [pages, setPages] = useState<Item[]>([]);
  const [blog, setBlog] = useState<Item[]>([]);
  const [faq, setFaq] = useState<Item[]>([]);
  const [testimonials, setTestimonials] = useState<Item[]>([]);
  const [seo, setSeo] = useState<Item | null>(null);
  const [warning, setWarning] = useState('');
  const [notice, setNotice] = useState('');

  async function loadAll() {
    const [p, b, f, t, s] = await Promise.all([
      fetch('/api/admin/cms/pages').then((r) => r.json()),
      fetch('/api/admin/cms/blog').then((r) => r.json()),
      fetch('/api/admin/cms/faq').then((r) => r.json()),
      fetch('/api/admin/cms/testimonials').then((r) => r.json()),
      fetch('/api/admin/cms/seo').then((r) => r.json()),
    ]);
    setPages(p.items || []);
    setBlog(b.items || []);
    setFaq(f.items || []);
    setTestimonials(t.items || []);
    setSeo(s.item || null);
  }

  useEffect(() => {
    loadAll();
  }, []);

  function checkEditorial(value: string) {
    const found = blockedTerms.find((t) => value.toLowerCase().includes(t.toLowerCase()));
    setWarning(found ? `Terme a eviter detecte: "${found}". Preferer prevention/accompagnement.` : '');
  }

  async function createFaq(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const question = String(form.get('question') || '');
    const answer = String(form.get('answer') || '');
    checkEditorial(`${question} ${answer}`);
    await fetch('/api/admin/cms/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: form.get('category'),
        question,
        answer,
        sort_order: Number(form.get('sort_order') || 0),
      }),
    });
    e.currentTarget.reset();
    loadAll();
  }

  async function createBlog(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get('title') || '');
    const excerpt = String(form.get('excerpt') || '');
    checkEditorial(`${title} ${excerpt}`);
    await fetch('/api/admin/cms/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: form.get('slug'),
        title,
        excerpt,
        category: form.get('category'),
        status: form.get('status'),
      }),
    });
    e.currentTarget.reset();
    loadAll();
  }

  async function saveSeo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await fetch('/api/admin/cms/seo', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site_title: form.get('site_title'),
        site_description: form.get('site_description'),
        og_image: form.get('og_image'),
        schema_json: form.get('schema_json'),
      }),
    });
    setNotice('SEO sauvegarde avec succes.');
    loadAll();
  }

  async function createPage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const title = String(form.get('title') || '');
    const content = String(form.get('content') || '');
    checkEditorial(`${title} ${content}`);
    await fetch('/api/admin/cms/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: form.get('slug'),
        title,
        content,
        status: form.get('status') || 'draft',
      }),
    });
    e.currentTarget.reset();
    loadAll();
  }

  async function createTestimonial(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const content = String(form.get('content') || '');
    checkEditorial(content);
    await fetch('/api/admin/cms/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: form.get('client_name'),
        content,
        is_visible: true,
      }),
    });
    e.currentTarget.reset();
    loadAll();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-encre-900">CMS & SEO</h1>
        <p className="text-encre-600 mt-2">Gestion contenus, FAQ, blog, temoignages et SEO.</p>
      </div>
      {warning && <div className="p-3 bg-amber-100 border border-amber-300 text-amber-900 rounded">{warning}</div>}
      {notice && <div className="p-3 bg-green-100 border border-green-300 text-green-900 rounded">{notice}</div>}

      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Creer une page editable</h2>
        <form onSubmit={createPage} className="grid md:grid-cols-4 gap-3">
          <input name="slug" placeholder="Slug (accueil, services, faq...)" className="border p-2 rounded" />
          <input name="title" placeholder="Titre" className="border p-2 rounded md:col-span-2" />
          <select name="status" aria-label="Statut de la page" className="border p-2 rounded">
            <option value="draft">Brouillon</option>
            <option value="published">Publie</option>
          </select>
          <textarea name="content" placeholder="Contenu administrable" className="border p-2 rounded md:col-span-3" />
          <button className="bg-encre-900 text-white rounded px-4 py-2">Ajouter page</button>
        </form>
      </section>

      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Creer une FAQ</h2>
        <form onSubmit={createFaq} className="grid md:grid-cols-4 gap-3">
          <input name="category" placeholder="Categorie (salarie/employeur/general)" className="border p-2 rounded" />
          <input name="question" placeholder="Question" className="border p-2 rounded md:col-span-2" />
          <input name="sort_order" type="number" placeholder="Ordre" className="border p-2 rounded" />
          <textarea name="answer" placeholder="Reponse" className="border p-2 rounded md:col-span-3" />
          <button className="bg-encre-900 text-white rounded px-4 py-2">Ajouter</button>
        </form>
        <div className="mt-4 text-sm text-encre-600">Total FAQ: {faq.length}</div>
      </section>

      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Creer un article blog</h2>
        <form onSubmit={createBlog} className="grid md:grid-cols-4 gap-3">
          <input name="slug" placeholder="Slug SEO" className="border p-2 rounded" />
          <input name="title" placeholder="Titre" className="border p-2 rounded md:col-span-2" />
          <input name="category" placeholder="Categorie" className="border p-2 rounded" />
          <textarea name="excerpt" placeholder="Extrait" className="border p-2 rounded md:col-span-3" />
          <select name="status" aria-label="Statut de l'article" className="border p-2 rounded">
            <option value="draft">Brouillon</option>
            <option value="published">Publie</option>
          </select>
          <button className="bg-encre-900 text-white rounded px-4 py-2">Ajouter</button>
        </form>
        <div className="mt-4 text-sm text-encre-600">Total Articles: {blog.length}</div>
      </section>

      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Ajouter un temoignage</h2>
        <form onSubmit={createTestimonial} className="grid md:grid-cols-4 gap-3">
          <input name="client_name" placeholder="Nom" className="border p-2 rounded" />
          <textarea name="content" placeholder="Contenu du temoignage" className="border p-2 rounded md:col-span-2" />
          <button className="bg-encre-900 text-white rounded px-4 py-2">Ajouter temoignage</button>
        </form>
      </section>

      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">SEO global</h2>
        <form onSubmit={saveSeo} className="grid md:grid-cols-2 gap-3">
          <input name="site_title" defaultValue={seo?.site_title || ''} placeholder="Title" className="border p-2 rounded" />
          <input name="og_image" defaultValue={seo?.og_image || ''} placeholder="OG image URL" className="border p-2 rounded" />
          <textarea name="site_description" defaultValue={seo?.site_description || ''} placeholder="Description" className="border p-2 rounded md:col-span-2" />
          <textarea name="schema_json" defaultValue={seo?.schema_json || ''} placeholder="Schema JSON" className="border p-2 rounded md:col-span-2" />
          <button className="bg-encre-900 text-white rounded px-4 py-2 md:w-fit">Sauvegarder SEO</button>
        </form>
        <div className="mt-4 rounded border bg-encre-50 p-3">
          <p className="text-xs text-encre-500 uppercase tracking-wide">Apercu SEO</p>
          <p className="font-medium text-encre-900 mt-1">{seo?.site_title || 'Titre non defini'}</p>
          <p className="text-sm text-encre-700 mt-1">{seo?.site_description || 'Description non definie'}</p>
        </div>
      </section>

      <section className="bg-white border rounded-lg p-5">
        <h2 className="font-semibold mb-3">Pages, temoignages et modules</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 rounded bg-encre-50">Pages CMS: {pages.length}</div>
          <div className="p-3 rounded bg-encre-50">Temoignages: {testimonials.length}</div>
          <div className="p-3 rounded bg-encre-50">FAQ publiees: {faq.filter((i) => i.is_published).length}</div>
        </div>
      </section>
    </div>
  );
}

