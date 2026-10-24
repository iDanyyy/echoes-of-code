import { useGameStore } from '../store/gameStore';
import { TrendingUp, Landmark, CreditCard } from 'lucide-react';

export default function FinancialCenter() {
  const { player, stocks, buyStock, sellStock, loans, takeLoan, repayLoan } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Landmark className="w-5 h-5 text-cyan-400" /> Banking Hub & Loans
        </h2>
        <p className="text-xs text-slate-400">Accesează credite comerciale pentru lichiditate sau achiziționează acțiuni pe piața de capital.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-sm flex items-center gap-2"><CreditCard className="w-4 h-4" /> Credit Comercial</h3>
            <p className="text-xs text-slate-400">Împrumut $5,000 (Dobândă 5% lunară).</p>
            <button
              onClick={() => takeLoan(5000, 0.05)}
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white py-2 rounded text-xs font-bold transition"
            >
              Ia Împrumut ($5000)
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm">Credite Active ({loans.length})</h3>
            {loans.length === 0 ? (
              <p className="text-xs text-slate-500 italic">Niciun credit activ în prezent.</p>
            ) : (
              loans.map(loan => (
                <div key={loan.id} className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded">
                  <span>Valoare: ${loan.amount}</span>
                  <button
                    disabled={player.money < loan.amount}
                    onClick={() => repayLoan(loan.id)}
                    className="bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 text-white px-3 py-1 rounded font-bold transition"
                  >
                    Achită
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" /> Stock Exchange & Investments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stocks.map(stock => (
            <div key={stock.id} className="p-4 bg-slate-950 rounded border border-slate-800 flex flex-col justify-between space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-white text-sm">{stock.symbol} ({stock.name})</h3>
                  <p className="text-xs text-slate-400 mt-1">Dividend: ${stock.dividend}/lună per acțiune</p>
                </div>
                <span className="text-emerald-400 font-bold">${stock.price}</span>
              </div>

              <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-900">
                <span className="text-slate-300">Deținute: <strong className="text-cyan-400">{stock.owned}</strong></span>
                <div className="flex gap-2">
                  <button
                    disabled={player.money < stock.price}
                    onClick={() => buyStock(stock.id)}
                    className="bg-cyan-700 hover:bg-cyan-600 disabled:opacity-40 text-white px-3 py-1.5 rounded font-bold transition"
                  >
                    Cumpără
                  </button>
                  <button
                    disabled={stock.owned <= 0}
                    onClick={() => sellStock(stock.id)}
                    className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-cyan-300 px-3 py-1.5 rounded font-bold transition"
                  >
                    Vinde
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
