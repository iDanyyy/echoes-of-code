import { useGameStore, FREELANCE_CONTRACTS, SHOP_ITEMS } from '../store/gameStore';

export default function FreelanceExchange() {
  const { player, activeFreelance, acceptFreelance, inventory, buyShopItem } = useGameStore();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-400">Freelance Exchange & Hardware Shop</h2>

      {activeFreelance && (
        <div className="bg-slate-900 p-4 rounded border border-cyan-700">
          <h3 className="text-cyan-300 font-bold">Active Contract: {activeFreelance.name}</h3>
          <p className="text-sm text-slate-300">Remaining Days: {activeFreelance.remainingDays} | Reward: ${activeFreelance.pay}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-4 rounded border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Available Contracts</h3>
          {FREELANCE_CONTRACTS.map((contract) => {
            const canTake = player.skills[contract.requiredSkill] >= contract.minLevel && !activeFreelance;
            return (
              <div key={contract.id} className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-cyan-400 text-sm">{contract.name}</h4>
                  <p className="text-xs text-slate-400">Pay: ${contract.pay} | Duration: {contract.duration}d</p>
                  <p className="text-xs text-slate-500">Req: {contract.requiredSkill} Lv.{contract.minLevel}</p>
                </div>
                <button
                  onClick={() => acceptFreelance(contract)}
                  disabled={!canTake}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs font-bold"
                >
                  Accept
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-900 p-4 rounded border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Equipment & Upgrade Shop</h3>
          {SHOP_ITEMS.map((item) => {
            const owned = inventory.some((i) => i.id === item.id);
            const canBuy = player.money >= item.cost && !owned;
            return (
              <div key={item.id} className="p-3 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-emerald-400 text-sm">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.bonus}</p>
                  <p className="text-xs text-slate-500">Cost: ${item.cost}</p>
                </div>
                <button
                  onClick={() => buyShopItem(item)}
                  disabled={!canBuy || owned}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs font-bold"
                >
                  {owned ? 'Owned' : 'Buy'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
