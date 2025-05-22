interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem('token'); // ← importante

  const res = await fetch(`http://localhost:5000${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: 'include', // ← AGREGADO
  });

  if (!res.ok) throw new Error('Error fetching data');
  return res.json() as Promise<T>;
}
