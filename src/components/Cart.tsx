import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, setQuantity, clearCart } from '@/store/cartSlice';

export default function Cart({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.cart.items);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={item.image} className="h-12 w-12 object-contain" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">${item.price}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" value={item.quantity} min={1} onChange={(e) => dispatch(setQuantity({ id: item.id, quantity: Number(e.target.value) }))} className="w-16 border p-1 rounded" />
                <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            </div>
          ))}

          <div className="pt-3 border-t flex items-center justify-between">
            <div className="font-semibold">Total: ${total.toFixed(2)}</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded" onClick={() => dispatch(clearCart())}>Clear</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => { alert('Proceed to checkout (simulated)'); onClose(); }}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
