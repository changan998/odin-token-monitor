# odin-token-monitor
ODIN.FUN 代币监控原型网站
odin-token-monitor/
├── pages/
│   ├── api/
│   │   └── mock-odin-tokens.js   ← 模拟 API
│   └── index.js                  ← 主页 UI
├── public/
├── styles/
│   └── globals.css              ← Tailwind 样式
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                  ← Vercel 配置
├── package.json
└── README.md
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
import { useEffect, useState } from "react";

export default function Home() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/mock-odin-tokens");
        const data = await res.json();
        setTokens(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };

    fetchTokens();
    const timer = setInterval(fetchTokens, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🔍 ODIN.FUN 代币监控平台</h1>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <div key={token.id} className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold">{token.name}</h2>
              <p className="text-sm text-gray-500">上线时间：{token.created_at}</p>
              <p className="text-sm">当前价格：<strong>{token.price_sats}</strong> 聪</p>
              <p className={`text-sm ${token.change_1h > 0 ? "text-green-600" : "text-red-600"}`}>
                1小时涨跌：{token.change_1h}%
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
@tailwind base;
@tailwind components;
@tailwind utilities;
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
{
  "name": "odin-token-monitor",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "13.4.12",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.2.7"
  }
}
