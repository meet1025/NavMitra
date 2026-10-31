import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("navmitra_token");

    if (!token) return;

    fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Session expired.");
        }

        return data;
      })
      .then((data) => {
        setUser(data.user);
        setPage("dashboard");
      })
      .catch(() => {
        localStorage.removeItem("navmitra_token");
      });
  }, []);

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    const details = {
      name: form.get("name").trim(),
      email: form.get("email").trim(),
      password: form.get("password"),
      role: form.get("role"),
    };

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("Account created successfully! Please log in.");
      setPage("login");
    } catch (error) {
      setMessage(
        `${error.message}. Check that the backend is running.`
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    const credentials = {
      email: form.get("email").trim(),
      password: form.get("password"),
    };

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("navmitra_token", data.token);
      setUser(data.user);
      setPage("dashboard");
      setMessage("");
    } catch (error) {
      setMessage(
        `${error.message}. Check your credentials and backend.`
      );
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("navmitra_token");
    setUser(null);
    setMessage("You have been logged out.");
    setPage("home");
  }

  function openPage(nextPage) {
    setMessage("");
    setPage(nextPage);
  }

  return (
    <div className="app">
      <header className="navbar">
        <a
          className="logo"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            openPage("home");
          }}
        >
          🌾 NavMitra
        </a>

        <nav>
          <a href="#home" onClick={(e) => {
            e.preventDefault();
            openPage("home");
          }}>
            Home
          </a>

          <a href="#about" onClick={(e) => {
            e.preventDefault();
            openPage("home");
          }}>
            About
          </a>
        </nav>

        <div className="nav-actions">
          {user ? (
            <button className="btn btn-small" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <button
                className="login-link"
                onClick={() => openPage("login")}
              >
                Login
              </button>

              <button
                className="btn btn-small"
                onClick={() => openPage("register")}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </header>

      {page === "home" && (
        <main>
          <section className="hero" id="home">
            <div className="hero-content">
              <span className="eyebrow">
                🌱 A SMARTER WAY TO CONNECT AGRICULTURE
              </span>

              <h1>
                From Our Farms
                <br />
                <span>To Your Future.</span>
              </h1>

              <p>
                NavMitra connects farmers with buyers,
                helping farmers showcase agricultural products
                and buyers discover available produce.
              </p>

              <div className="hero-actions">
                <button
                  className="btn"
                  onClick={() => openPage("register")}
                >
                  Join NavMitra →
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => openPage("login")}
                >
                  Login to Account
                </button>
              </div>

              <div className="hero-note">
                🌿 Supporting farmers. Connecting buyers. Growing together.
              </div>
            </div>

            <div className="hero-art">
              <div className="sun"></div>
              <div className="field field-one"></div>
              <div className="field field-two"></div>
              <div className="field field-three"></div>
              <div className="crop">🌾</div>

              <div className="art-label">
                <span>🌱</span>
                <div>
                  <strong>Growing Together</strong>
                  <small>A better agricultural connection</small>
                </div>
              </div>
            </div>
          </section>

          <section className="features" id="about">
            <div className="section-heading">
              <span className="eyebrow">ONE PLATFORM, TWO COMMUNITIES</span>
              <h2>Made for Farmers and Buyers</h2>
              <p>
                A platform designed to bring agricultural products
                and the people who need them closer together.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">👨‍🌾</div>
                <h3>For Farmers</h3>
                <p>
                  Create a profile and manage agricultural product listings.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🛒</div>
                <h3>For Buyers</h3>
                <p>
                  Build a buyer profile and discover agricultural produce.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Reports & Insights</h3>
                <p>
                  Organize farmer, buyer, and product listing information.
                </p>
              </article>
            </div>
          </section>
        </main>
      )}

      {page === "register" && (
        <main className="auth-section">
          <form className="auth-card" onSubmit={handleRegister}>
            <div className="feature-icon">🌱</div>
            <h2>Create Your Account</h2>
            <p>Join NavMitra as a farmer or a buyer.</p>

            {message && (
              <div className="notice" role="status">{message}</div>
            )}

            <label htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />

            <label htmlFor="reg-email">Email Address</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <label htmlFor="reg-role">Register As</label>
            <select id="reg-role" name="role" defaultValue="farmer" required>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>

            <button className="btn auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="auth-switch">
              Already registered?{" "}
              <button type="button" onClick={() => openPage("login")}>
                Login
              </button>
            </p>
          </form>
        </main>
      )}

      {page === "login" && (
        <main className="auth-section">
          <form className="auth-card" onSubmit={handleLogin}>
            <div className="feature-icon">🔐</div>
            <h2>Welcome Back</h2>
            <p>Log in to your NavMitra account.</p>

            {message && (
              <div className="notice" role="status">{message}</div>
            )}

            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button className="btn auth-submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="auth-switch">
              Don't have an account?{" "}
              <button type="button" onClick={() => openPage("register")}>
                Register
              </button>
            </p>
          </form>
        </main>
      )}

      {page === "dashboard" && user && (
        <main className="dashboard">
          <span className="eyebrow">NAVMITRA USER PORTAL</span>
          <h1>Welcome, {user.name}!</h1>
          <p>
            You are logged in as a{" "}
            <strong>{user.role}</strong>.
          </p>

          <div className="feature-grid dashboard-grid">
            {user.role === "farmer" ? (
              <>
                <article className="feature-card">
                  <div className="feature-icon">👨‍🌾</div>
                  <h3>Farmer Profile</h3>
                  <p>Set up your farming and contact information.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("profile")}
                  >
                    Set Up Profile
                  </button>
                </article>

                <article className="feature-card">
                  <div className="feature-icon">🌾</div>
                  <h3>My Products</h3>
                  <p>Manage your agricultural product listings.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("products")}
                  >
                    Manage Products
                  </button>
                </article>
              </>
            ) : (
              <>
                <article className="feature-card">
                  <div className="feature-icon">🛒</div>
                  <h3>Buyer Profile</h3>
                  <p>Set up your buyer information to get started.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("profile")}
                  >
                    Set Up Profile
                  </button>
                </article>

                <article className="feature-card">
                  <div className="feature-icon">🌾</div>
                  <h3>Browse Products</h3>
                  <p>Explore agricultural products listed by farmers.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("buyer-products")}
                  >
                    Browse Products
                  </button>
                </article>
              </>
            )}
          </div>

          <button className="btn btn-outline" onClick={logout}>
            Logout
          </button>
        </main>
      )}

      {page === "profile" && user && (
        <ProfileForm
          user={user}
          onBack={() => openPage("dashboard")}
        />
      )}

      {page === "products" && user?.role === "farmer" && (
        <ProductsPage onBack={() => openPage("dashboard")} />
      )}

      {page === "buyer-products" && user?.role === "buyer" && (
        <BuyerProductsPage
          onBack={() => openPage("dashboard")}
        />
      )}

      <footer>
        <a className="logo" href="#home">🌾 NavMitra</a>
        <p>Connecting Farmers with the Right Buyers.</p>
        <small>© 2026 NavMitra · MCA Mini Project</small>
      </footer>
    </div>
  );
}


function ProfileForm({ user, onBack }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [details, setDetails] = useState({});

  const endpoint = user.role === "farmer" ? "farmer" : "buyer";

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("navmitra_token");

      try {
        const response = await fetch(`${API}/${endpoint}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const profile = data.profile || data;
          setDetails(profile);
          setProfileExists(true);
        } else if (response.status !== 404) {
          setMessage(data.message || "Could not load profile.");
        }
      } catch {
        setMessage("Could not connect to the server.");
      }
    }

    loadProfile();
  }, [endpoint]);

  async function submitProfile(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const formDetails = Object.fromEntries(form.entries());
    const token = localStorage.getItem("navmitra_token");

    try {
      const response = await fetch(`${API}/${endpoint}/profile`, {
        method: profileExists ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save profile.");
      }

      setDetails(formDetails);
      setProfileExists(true);
      setMessage(
        profileExists
          ? "Profile updated successfully!"
          : "Profile saved successfully!"
      );
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function field(name, label, required = true, placeholder = "") {
    return (
      <>
        <label>{label}</label>
        <input
          name={name}
          defaultValue={details[name] || ""}
          placeholder={placeholder}
          required={required}
        />
      </>
    );
  }

  return (
    <main className="auth-section">
      <form className="auth-card" onSubmit={submitProfile}>
        <h2>{user.role === "farmer" ? "Farmer Profile" : "Buyer Profile"}</h2>
        <p>
          {profileExists
            ? "Your profile information is loaded. You can update it below."
            : "Complete your profile information."}
        </p>

        {message && <div className="notice" role="status">{message}</div>}

        {field("phone", "Phone Number")}
        {field("address", "Address")}

        {user.role === "farmer" ? (
          <>
            {field("village", "Village")}
            {field("district", "District")}
            {field("state", "State")}
            {field("farmingType", "Farming Type", true, "e.g. Organic, Conventional")}
          </>
        ) : (
          <>
            {field("city", "City")}
            {field("district", "District")}
            {field("state", "State")}

            <label>Buyer Type</label>
            <select
              name="buyerType"
              value={details.buyerType || "individual"}
              onChange={(event) =>
                setDetails((previous) => ({
                  ...previous,
                  buyerType: event.target.value,
                }))
              }
              required
            >
              <option value="individual">Individual</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>

            {field("organizationName", "Organization Name", false)}
          </>
        )}

        <button className="btn auth-submit" disabled={loading}>
          {loading
            ? "Saving..."
            : profileExists
              ? "Update Profile"
              : "Save Profile"}
        </button>

        <button
          type="button"
          className="btn btn-outline auth-submit"
          onClick={onBack}
        >
          Back to Dashboard
        </button>
      </form>
    </main>
  );
}

function ProductsPage({ onBack }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  async function loadProducts() {
    setLoading(true);

    try {
      const response = await fetch(`${API}/farmer/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load products.");
      }

      setProducts(Array.isArray(data) ? data : data.products || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);


  async function addProduct(event) {
    event.preventDefault();
    setMessage("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const details = Object.fromEntries(form.entries());

    details.quantity = Number(details.quantity);
    details.pricePerUnit = Number(details.pricePerUnit);

    try {
      const response = await fetch(`${API}/farmer/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add product.");
      }

      formElement.reset();
      setMessage("Product added successfully.");
      await loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  }


  async function deleteProduct(id) {
    if (!window.confirm("Delete this product listing?")) return;

    try {
      const response = await fetch(`${API}/farmer/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete product.");
      }

      setMessage("Product deleted.");
      await loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  }


  async function updateProduct(event) {
    event.preventDefault();
    setMessage("");

    const details = {
      ...editForm,
      quantity: Number(editForm.quantity),
      pricePerUnit: Number(editForm.pricePerUnit),
    };

    try {
      const response = await fetch(
        `${API}/farmer/products/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
          },
          body: JSON.stringify(details),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update product.");
      }

      setMessage("Product updated successfully.");
      setEditingId(null);
      setEditForm({});
      await loadProducts();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function startEditing(product) {
    setEditingId(product._id);
    setEditForm({
      name: product.name || "",
      category: product.category || "",
      quantity: product.quantity ?? "",
      unit: product.unit || "kg",
      pricePerUnit: product.pricePerUnit ?? "",
      description: product.description || "",
      status: product.status || "available",
    });
  }

  return (
    <main className="dashboard products-page">
      <h1>My Agricultural Products</h1>
      <p>Add and manage your agricultural product listings.</p>

      {message && <div className="notice" role="status">{message}</div>}

      <form className="auth-card product-form" onSubmit={addProduct}>
        <h2>Add a Product</h2>

        <label>Product Name</label>
        <input name="name" required />

        <label>Category</label>
        <input name="category" placeholder="e.g. Vegetables, Grains" required />

        <label>Quantity</label>
        <input name="quantity" type="number" min="0.01" step="any" required />

        <label>Unit</label>
        <select name="unit" defaultValue="kg" required>
          <option value="kg">Kilograms (kg)</option>
          <option value="quintal">Quintal</option>
          <option value="ton">Ton</option>
          <option value="piece">Piece</option>
          <option value="dozen">Dozen</option>
          <option value="bag">Bag</option>
        </select>

        <label>Price per Unit (₹)</label>
        <input name="pricePerUnit" type="number" min="0" step="any" required />

        <label>Description (optional)</label>
        <textarea name="description" rows="3" />

        <button className="btn auth-submit">Add Product</button>
      </form>

      {editingId && (
        <form className="auth-card product-form" onSubmit={updateProduct}>
          <h2>Edit Product Listing</h2>

          <label>Product Name</label>
          <input
            required
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
          />

          <label>Category</label>
          <input
            required
            value={editForm.category}
            onChange={(e) =>
              setEditForm({ ...editForm, category: e.target.value })
            }
          />

          <label>Quantity</label>
          <input
            required
            type="number"
            min="0.01"
            step="any"
            value={editForm.quantity}
            onChange={(e) =>
              setEditForm({ ...editForm, quantity: e.target.value })
            }
          />

          <label>Unit</label>
          <select
            value={editForm.unit}
            onChange={(e) =>
              setEditForm({ ...editForm, unit: e.target.value })
            }
            required
          >
            <option value="kg">Kilograms (kg)</option>
            <option value="quintal">Quintal</option>
            <option value="ton">Ton</option>
            <option value="piece">Piece</option>
            <option value="dozen">Dozen</option>
            <option value="bag">Bag</option>
          </select>

          <label>Price per Unit (₹)</label>
          <input
            required
            type="number"
            min="0"
            step="any"
            value={editForm.pricePerUnit}
            onChange={(e) =>
              setEditForm({ ...editForm, pricePerUnit: e.target.value })
            }
          />

          <label>Description (optional)</label>
          <textarea
            rows="3"
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
          />

          <label>Status</label>
          <select
            value={editForm.status}
            onChange={(e) =>
              setEditForm({ ...editForm, status: e.target.value })
            }
            required
          >
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="inactive">Inactive</option>
          </select>

          <button className="btn auth-submit">Save Changes</button>

          <button
            type="button"
            className="btn btn-outline auth-submit"
            onClick={() => {
              setEditingId(null);
              setEditForm({});
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <h2>Your Listings</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No product listings yet.</p>
      ) : (
        <div className="feature-grid">
          {products.map((product) => (
            <article className="feature-card" key={product._id}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Quantity: {product.quantity} {product.unit}</p>
              <p>Price: ₹{product.pricePerUnit} per {product.unit}</p>
              <p>Description: {product.description || "No description provided."}</p>
              <p>Status: {product.status}</p>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => startEditing(product)}
              >
                Edit Listing
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => deleteProduct(product._id)}
              >
                Delete Listing
              </button>
            </article>
          ))}
        </div>
      )}

      <button
        type="button"
        className="btn btn-outline"
        onClick={onBack}
      >
        Back to Dashboard
      </button>
    </main>
  );
}


function BuyerProductsPage({ onBack }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  async function loadProducts() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/buyer/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error("Server returned an unexpected response. Please check the API.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load products.");
      }

      setProducts(data.products || []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="dashboard products-page buyer-products-page">
      <span className="eyebrow">NAVMITRA MARKETPLACE</span>

      <h1>Browse Agricultural Products</h1>

      <p>
        Discover fresh agricultural products directly listed by farmers.
      </p>

      <input
        type="text"
        className="buyer-search"
        placeholder="Search products by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {message && (
        <div className="notice" role="alert">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading agricultural products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>
          {products.length === 0
            ? "No agricultural products are available right now."
            : "No products match your search."}
        </p>
      ) : (
        <div className="feature-grid">
          {filteredProducts.map((product) => (
            <article className="feature-card" key={product._id}>
              <h3>{product.name}</h3>

              <p>
                Category: {product.category}
              </p>

              <p>
                Quantity: {product.quantity} {product.unit}
              </p>

              <p>
                Price: ₹{product.pricePerUnit} per {product.unit}
              </p>

              <p>
                Farmer: {product.farmerId?.name || "Farmer"}
              </p>

              <p>
                Description:{" "}
                {product.description || "No description provided."}
              </p>

              <span className="product-available">
                Available
              </span>
            </article>
          ))}
        </div>
      )}

      <button
        type="button"
        className="btn btn-outline"
        onClick={onBack}
      >
        Back to Dashboard
      </button>
    </main>
  );
}

export default App;