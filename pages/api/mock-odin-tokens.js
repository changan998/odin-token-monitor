export default function handler(req, res) {
  const tokens = Array.from({ length: 6 }).map((_, i) => {
    const price = (Math.random() * 10 + 1).toFixed(2);
    const change = (Math.random() * 100 - 50).toFixed(2); // -50% ~ +50%
    return {
      id: `token-${i}`,
      name: `Token ${String.fromCharCode(65 + i)}`,
      created_at: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
      price_sats: price,
      change_1h: change,
    };
  });

  res.status(200).json(tokens);
}
