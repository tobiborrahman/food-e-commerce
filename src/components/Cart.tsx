import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFromCart, setQuantity, clearCart } from '@/store/cartSlice';

export default function Cart({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="p-6 w-full max-w-full max-h-[400px] overflow-scroll text-gray-900">
      {/* Header */}
      <h2 className="text-2xl font-semibold mb-5 text-center sm:text-left text-gray-900">
        Your Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Each Item */}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm w-full"
            >
              {/* Left */}
              <div className="flex items-center gap-4 w-full sm:w-[70%]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain rounded-md bg-white"
                />
                <div className="flex flex-col w-full">
                  <span className="font-medium text-gray-900 line-clamp-1">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-700">
                    ${item.price.toFixed(2)}
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        setQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="mt-2 w-20 border border-gray-300 rounded px-2 py-1 text-sm text-center focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Right */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="mt-3 sm:mt-0 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Bottom */}
          <div className="pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-semibold text-lg text-gray-900">
              Total: ${total.toFixed(2)}
            </div>
            <div className="flex justify-center sm:justify-end gap-3 w-full sm:w-auto">
              <button
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition w-full sm:w-auto"
                onClick={() => dispatch(clearCart())}
              >
                Clear
              </button>
              <button
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition w-full sm:w-auto"
                onClick={() => {
                  alert('Proceed to checkout (simulated)');
                  onClose();
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
