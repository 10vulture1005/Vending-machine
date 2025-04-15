
import React, { useState, useEffect } from 'react';

// Product Data
const productData = [
  {
    id: 1,
    name: "Sparkling Water",
    price: 1.50,
    category: "drinks",
    color: "hsl(200, 70%, 80%)",
    code: "A1"
  },
  {
    id: 2,
    name: "Cola",
    price: 2.00,
    category: "drinks",
    color: "hsl(15, 70%, 80%)",
    code: "A2"
  },
  {
    id: 3,
    name: "Energy Drink",
    price: 2.50,
    category: "drinks",
    color: "hsl(120, 70%, 80%)",
    code: "A3"
  },
  {
    id: 4,
    name: "Orange Juice",
    price: 1.75,
    category: "drinks",
    color: "hsl(30, 70%, 80%)",
    code: "A4"
  },
  {
    id: 5,
    name: "Potato Chips",
    price: 1.25,
    category: "snacks",
    color: "hsl(45, 70%, 80%)",
    code: "B1"
  },
  {
    id: 6,
    name: "Chocolate Bar",
    price: 1.00,
    category: "snacks",
    color: "hsl(25, 70%, 80%)",
    code: "B2"
  },
  {
    id: 7,
    name: "Trail Mix",
    price: 2.25,
    category: "snacks",
    color: "hsl(35, 70%, 80%)",
    code: "B3"
  },
  {
    id: 8,
    name: "Granola Bar",
    price: 1.50,
    category: "snacks",
    color: "hsl(40, 70%, 80%)",
    code: "B4"
  },
  {
    id: 9,
    name: "Sandwich",
    price: 3.75,
    category: "food",
    color: "hsl(60, 70%, 80%)",
    code: "C1"
  },
  {
    id: 10,
    name: "Salad Bowl",
    price: 4.50,
    category: "food",
    color: "hsl(90, 70%, 80%)",
    code: "C2"
  },
  {
    id: 11,
    name: "Pizza Slice",
    price: 3.00,
    category: "food",
    color: "hsl(10, 70%, 80%)",
    code: "C3"
  },
  {
    id: 12,
    name: "Instant Noodles",
    price: 2.50,
    category: "food",
    color: "hsl(40, 70%, 80%)",
    code: "C4"
  }
];

// Product Slot Component
const ProductSlot = ({ product, addToCart }) => {
  return (
    <div className="flex flex-col border-2 border-gray-300 rounded overflow-hidden transition-all bg-white relative h-40">
      <div className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded font-mono">
        {product.code}
      </div>
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: product.color }}>
        <div className="text-4xl">
          {product.category === "drinks" && "🥤"}
          {product.category === "snacks" && "🍫"}
          {product.category === "food" && "🍔"}
        </div>
      </div>
      <div className="p-2 bg-gray-100 text-center border-t border-gray-300">
        <h3 className="text-sm font-bold truncate">{product.name}</h3>
        <p className="text-xs mb-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Number Pad Button Component
const NumberPadButton = ({ value, onClick, className = "" }) => {
  return (
    <button 
      className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-xl ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

// User Input Display
const Display = ({ value }) => {
  return (
    <div className="bg-black text-green-500 font-mono text-xl p-3 rounded-md mb-3 h-12 flex items-center justify-end font-bold">
      {value || ""}
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            className="text-2xl text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Cart Modal Component
const CartModal = ({ isOpen, onClose, cart, removeFromCart, checkout }) => {
  if (!isOpen) return null;
  
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button 
            className="text-2xl text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 py-6">Your cart is empty</p>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <p>{item.name} <span className="text-xs text-gray-500">({item.code})</span></p>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-4">${item.price.toFixed(2)}</p>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(index)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <p>Total:</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <button 
              className="w-full bg-green-600 text-white p-2 rounded font-medium hover:bg-green-700 transition-colors"
              onClick={checkout}
            >
              Dispense Items
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, isVisible }) => {
  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'} transition-all duration-300 bg-gray-800 text-white px-6 py-3 rounded-md z-50`}>
      {message}
    </div>
  );
};

// Main App Component
const VendingMachineApp = () => {
  // State
  const [products, setProducts] = useState(productData);
  const [cart, setCart] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [formErrors, setFormErrors] = useState({ login: '', signup: '' });
  const [toast, setToast] = useState({ message: '', visible: false });
  const [currentInput, setCurrentInput] = useState("");
  const [insertedMoney, setInsertedMoney] = useState(0);

  // Filter products based on category
  const filteredProducts = currentCategory === 'all'
    ? products
    : products.filter(product => product.category === currentCategory);

  // Show toast message
  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 3000);
  };

  // Handle number pad input
  const handleNumberPadInput = (value) => {
    if (value === "C") {
      setCurrentInput("");
    } else if (value === "←") {
      setCurrentInput(currentInput.slice(0, -1));
    } else {
      setCurrentInput(currentInput + value);
    }
  };

  // Handle product selection
  const handleProductSelection = () => {
    const selectedProduct = products.find(product => product.code === currentInput);
    
    if (!selectedProduct) {
      showToast("Invalid product code");
      return;
    }
    
    if (insertedMoney < selectedProduct.price) {
      showToast("Not enough money inserted");
      return;
    }
    
    setCart([...cart, selectedProduct]);
    setInsertedMoney(parseFloat((insertedMoney - selectedProduct.price).toFixed(2)));
    setCurrentInput("");
    showToast(`${selectedProduct.name} added to cart!`);
  };

  // Handle money insertion
  const handleInsertMoney = (amount) => {
    setInsertedMoney(parseFloat((insertedMoney + amount).toFixed(2)));
    showToast(`$${amount.toFixed(2)} inserted`);
  };

  // Handle remove from cart
  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    const removedItem = newCart.splice(index, 1)[0];
    setCart(newCart);
    setInsertedMoney(parseFloat((insertedMoney + removedItem.price).toFixed(2)));
    showToast(`${removedItem.name} returned`);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }

    const total = cart.reduce((sum, product) => sum + product.price, 0);
    showToast(`Items dispensed! Enjoy!`);
    setCart([]);
    setCartModalOpen(false);
  };

  // Handle coin return
  const handleCoinReturn = () => {
    if (insertedMoney > 0) {
      showToast(`$${insertedMoney.toFixed(2)} returned`);
      setInsertedMoney(0);
    }
  };

  // Handle login form changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Handle signup form changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm({ ...signupForm, [name]: value });
  };

  // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      setFormErrors({ ...formErrors, login: 'All fields are required' });
      return;
    }

    if (loginForm.password.length < 6) {
      setFormErrors({ ...formErrors, login: 'Password must be at least 6 characters' });
      return;
    }

    // Extract name from email for display
    const name = loginForm.email.split('@')[0];
    
    setUser({ name, email: loginForm.email });
    setIsLoggedIn(true);
    setLoginModalOpen(false);
    showToast('Successfully logged in!');
    setFormErrors({ ...formErrors, login: '' });
  };

  // Handle signup submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      setFormErrors({ ...formErrors, signup: 'All fields are required' });
      return;
    }

    if (signupForm.password.length < 6) {
      setFormErrors({ ...formErrors, signup: 'Password must be at least 6 characters' });
      return;
    }

    if (signupForm.password !== signupForm.confirm) {
      setFormErrors({ ...formErrors, signup: 'Passwords do not match' });
      return;
    }

    setUser({ name: signupForm.name, email: signupForm.email });
    setIsLoggedIn(true);
    setSignupModalOpen(false);
    showToast('Account created successfully!');
    setFormErrors({ ...formErrors, signup: '' });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden relative">
        {/* Machine Header */}
        <div className="bg-red-600 text-white p-4 text-center shadow-md">
          <h1 className="text-3xl font-bold">SnackServe</h1>
          <p className="text-sm">Digital Vending Machine</p>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Product Display Section */}
          <div className="flex-1 bg-gray-700 p-4">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {filteredProducts.map(product => (
                <ProductSlot 
                  key={product.id} 
                  product={product}
                  addToCart={() => {}} 
                />
              ))}
            </div>
            
            {/* Category Navigation */}
            <div className="flex justify-center gap-2 mb-4">
              <button 
                className={`px-2 py-1 rounded text-xs ${currentCategory === 'all' ? 'bg-red-600 text-white' : 'bg-gray-500 text-white hover:bg-gray-400'}`}
                onClick={() => setCurrentCategory('all')}
              >
                All
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs ${currentCategory === 'drinks' ? 'bg-red-600 text-white' : 'bg-gray-500 text-white hover:bg-gray-400'}`}
                onClick={() => setCurrentCategory('drinks')}
              >
                Drinks
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs ${currentCategory === 'snacks' ? 'bg-red-600 text-white' : 'bg-gray-500 text-white hover:bg-gray-400'}`}
                onClick={() => setCurrentCategory('snacks')}
              >
                Snacks
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs ${currentCategory === 'food' ? 'bg-red-600 text-white' : 'bg-gray-500 text-white hover:bg-gray-400'}`}
                onClick={() => setCurrentCategory('food')}
              >
                Food
              </button>
            </div>
          </div>
          
          {/* Control Panel Section */}
          <div className="w-full md:w-64 bg-gray-600 p-4">
            <div className="mb-4 text-center">
              <p className="text-xs mb-1">CREDIT</p>
              <div className="bg-black text-green-500 font-mono text-xl p-2 rounded-md mb-3">
                ${insertedMoney.toFixed(2)}
              </div>
            </div>
            
            <Display value={currentInput} />
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <NumberPadButton value="1" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="2" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="3" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="4" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="5" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="6" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="7" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="8" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="9" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="A" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="B" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
              <NumberPadButton value="C" onClick={handleNumberPadInput} className="bg-gray-300 hover:bg-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                onClick={() => setCurrentInput("")}
              >
                Clear
              </button>
              <button 
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                onClick={handleProductSelection}
              >
                Select
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setCartModalOpen(true)}
              >
                View Cart ({cart.length})
              </button>
              <button 
                className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition-colors"
                onClick={handleCoinReturn}
              >
                Coin Return
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm mb-2 text-center">Insert Money</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="bg-gray-300 text-gray-800 py-1 rounded hover:bg-gray-400 transition-colors text-sm"
                  onClick={() => handleInsertMoney(1.00)}
                >
                  $1.00
                </button>
                <button 
                  className="bg-gray-300 text-gray-800 py-1 rounded hover:bg-gray-400 transition-colors text-sm"
                  onClick={() => handleInsertMoney(5.00)}
                >
                  $5.00
                </button>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-400">
              <div className="flex justify-between items-center">
                {!isLoggedIn ? (
                  <button 
                    className="text-sm text-white hover:text-white p-2 bg-blue-700 rounded-full px-6"
                    onClick={() => setLoginModalOpen(true)}
                  >
                    Login
                  </button>
                ) : (
                  <div className="flex items-center text-sm">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs mr-1">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </div>
                )}
                
                {!isLoggedIn && (
                  <button 
                    className="text-sm text-white hover:text-white p-2 bg-blue-700 rounded-full px-6 "
                    onClick={() => setSignupModalOpen(true)}
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dispensing Area */}
        <div className="bg-gray-900 h-16 mx-6 mb-4 rounded-b-lg border-t-4 border-l-4 border-r-4 border-gray-600 flex items-center justify-center">
          <p className="text-gray-400 font-mono text-xs">Product Dispensing Area</p>
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="Login"
      >
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              required
            />
            {formErrors.login && (
              <p className="text-red-500 text-xs mt-1">{formErrors.login}</p>
            )}
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        title="Sign Up"
      >
        <form onSubmit={handleSignupSubmit}>
          <div className="mb-3">
            <label className="block mb-1 font-medium text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={handleSignupChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={signupForm.confirm}
              onChange={handleSignupChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-200"
              required
            />
            {formErrors.signup && (
              <p className="text-red-500 text-xs mt-1">{formErrors.signup}</p>
            )}
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        </form>
      </Modal>

      {/* Cart Modal */}
      <CartModal 
        isOpen={cartModalOpen} 
        onClose={() => setCartModalOpen(false)} 
        cart={cart}
        removeFromCart={handleRemoveFromCart}
        checkout={handleCheckout}
      />

      {/* Toast Notification */}
      <Toast message={toast.message} isVisible={toast.visible} />
    </div>
  );
};

export default VendingMachineApp;