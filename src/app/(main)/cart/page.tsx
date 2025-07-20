'use client';

import { useCartContext } from '@/app/CartProvider';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCartContext();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="mt-8">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-8">
            {cart.map((item) => (
              <div
                key={item.sId}
                className="flex items-center justify-between py-4 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]?.url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="mt-2 text-lg font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.sId, parseInt(e.target.value))
                    }
                    className="w-16 px-3 py-2 border rounded-md"
                  />
                  <button
                    onClick={() => removeFromCart(item.sId)}
                    className="ml-4 px-4 py-2 font-bold text-white bg-red-500 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button className="mt-4 px-8 py-2 font-bold text-white bg-blue-500 rounded-md">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;