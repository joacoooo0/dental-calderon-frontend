interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const token = localStorage.getItem('token');
  console.log('Token enviado en fetchData:', token); // Para depuración

  try {
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error ${res.status}: ${errorText || res.statusText}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error('Error en fetchData:', error); // Para depuración
    throw error instanceof Error ? error : new Error('Error fetching data');
  }
}