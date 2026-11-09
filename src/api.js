const API = import.meta.env.VITE_API_URL;

export async function request(path, options = {}) {
  const token = localStorage.getItem('accessToken');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;

  const res = await fetch(API + path, { ...options, headers });

  if (res.status === 204) return null;
  const data = await res.json();

  if (res.status === 401 && token) {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
  if (!res.ok) throw new Error(data.message || 'Error');
  return data;
}
