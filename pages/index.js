import { useEffect, useState } from "react";
import "../styles/globals.css";

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
