const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`);
    return response.json();
  },
  post: async (endpoint: string, data: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

export default api;