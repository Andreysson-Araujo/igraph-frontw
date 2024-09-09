// pages/api/login.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Aqui você deve verificar as credenciais no banco de dados

    if (nickname === 'user' && password === 'password') {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

