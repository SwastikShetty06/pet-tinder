'use client';
import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { createPet } from '@/lib/pet';

function PetsContent() {
  const [form, setForm] = useState({ name: '', species: '', breed: '', age: 0, bio: '' });
  const [images, setImages] = useState<File[]>([]);
  const [msg, setMsg] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v as string));
    images.forEach(img => fd.append('images', img));
    try { await createPet(fd); setMsg('Pet uploaded!'); }
    catch { setMsg('Upload failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleUpload} className="glass max-w-lg w-full p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 gradient-text">Add / Update Pet</h2>
        <div className="space-y-4">
          <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} className="w-full border p-3 rounded-lg"/>
          <input placeholder="Species" onChange={e => setForm({...form, species: e.target.value})} className="w-full border p-3 rounded-lg"/>
          <input placeholder="Breed" onChange={e => setForm({...form, breed: e.target.value})} className="w-full border p-3 rounded-lg"/>
          <input type="number" placeholder="Age" onChange={e => setForm({...form, age: +e.target.value})} className="w-full border p-3 rounded-lg"/>
          <textarea placeholder="Bio" onChange={e => setForm({...form, bio: e.target.value})} className="w-full border p-3 rounded-lg"></textarea>
          <input type="file" multiple accept="image/*" onChange={e=>setImages([...e.target.files!])} className="w-full border p-3 rounded-lg"/>
        </div>
        <button type="submit" className="btn-primary w-full mt-6">Upload Pet</button>
        {msg && <div className="mt-3 text-center text-white font-semibold">{msg}</div>}
      </form>
    </div>
  );
}

export default function PetsPage() {
  return (
    <AuthGuard>
      <PetsContent />
    </AuthGuard>
  );
}
