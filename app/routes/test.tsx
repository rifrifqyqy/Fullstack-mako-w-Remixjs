import { useState } from "react";

interface Product {
  id: string;
  name: string;
  stock: number; // Jumlah stok dalam satuan terkecil
  unitConversions: {
    type: string; // Contoh: "dus", "satuan"
    multiplier: number; // Jumlah satuan terkecil per unit
    price: number; // Harga per unit
  }[];
}
const sembako: Product = {
  id: "1",
  name: "Indomie Goreng",
  stock: 200,
  unitConversions: [
    { type: "dus", multiplier: 40, price: 103000 },
    { type: "satuan", multiplier: 1, price: 2700 },
  ],
};
export default function TestPage() {
  const [quantity, setQuantity] = useState(0);
  const [unitType, setUnitType] = useState("satuan");
  const [checkoutSummary, setCheckoutSummary] = useState<{
    totalCost: number;
    stockAfterCheckout: number;
  } | null>(null);

  const handleCheckout = () => {
    const unit = sembako.unitConversions.find((u) => u.type === unitType);
    if (!unit) {
      alert("Invalid unit type selected.");
      return;
    }

    // Konversi quantity ke satuan terkecil
    const totalUnits = quantity * unit.multiplier;

    if (totalUnits > sembako.stock) {
      alert("Stock is insufficient for the requested quantity.");
      return;
    }

    const totalCost = quantity * unit.price;
    const stockAfterCheckout = sembako.stock - totalUnits;

    setCheckoutSummary({
      totalCost,
      stockAfterCheckout,
    });
  };

  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Data Barang</h1>
      <div className="mb-6">
        <h2 className="text-xl">{sembako.name}</h2>
        <p>Stok: {sembako.stock}</p>
        <ul className="list-disc pl-6">
          {sembako.unitConversions.map((unit) => (
            <li key={unit.type}>
              {unit.type}: {unit.multiplier} satuan, Harga:{" "}
              {unit.price.toLocaleString()} IDR
            </li>
          ))}
        </ul>
      </div>

      <section className="checkout mb-6">
        <h2 className="mb-4 text-xl font-semibold">Checkout</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label htmlFor="quantity" className="mb-2 block">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded border px-2 py-1"
              min="1"
            />
          </div>

          <div>
            <label htmlFor="unitType" className="mb-2 block">
              Unit Type:
            </label>
            <select
              id="unitType"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="w-full rounded border px-2 py-1"
            >
              {sembako.unitConversions.map((unit) => (
                <option key={unit.type} value={unit.type}>
                  {unit.type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Checkout
          </button>
        </form>
      </section>

      {checkoutSummary && (
        <div className="checkout-summary rounded border p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold">Checkout Summary</h3>
          <p>
            Total Cost:{" "}
            <strong>{checkoutSummary.totalCost.toLocaleString()} IDR</strong>
          </p>
          <p>
            Remaining Stock:{" "}
            <strong>{checkoutSummary.stockAfterCheckout}</strong>
          </p>
        </div>
      )}
    </main>
  );
}
