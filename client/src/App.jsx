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
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              openPage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Home
          </a>

          {user && (
            <a
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                openPage("dashboard");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Dashboard
            </a>
          )}

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              openPage("home");

              window.setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 150);
            }}
          >
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
            {user.role === "admin" ? (
              <>
                <article className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h3>Management Reports</h3>
                  <p>
                    View farmer, buyer and agricultural product reports.
                  </p>
                  <button
                    className="btn"
                    onClick={() => openPage("admin-reports")}
                  >
                    View Reports
                  </button>
                </article>
              </>
            ) : user.role === "farmer" ? (
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

                <article className="feature-card">
                  <div className="feature-icon">📋</div>
                  <h3>Buyer Requirements</h3>
                  <p>View products and quantities requested by buyers.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("farmer-requirements")}
                  >
                    View Requirements
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

                <article className="feature-card">
                  <div className="feature-icon">📋</div>
                  <h3>Post a Requirement</h3>
                  <p>Tell farmers which agricultural products you need.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("buyer-requirements")}
                  >
                    Post Requirement
                  </button>
                </article>

                <article className="feature-card">
                  <div className="feature-icon">📝</div>
                  <h3>My Requirements</h3>
                  <p>View and track the requirements you have posted.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("my-requirements")}
                  >
                    View My Requirements
                  </button>
                </article>

                <article className="feature-card">
                  <div className="feature-icon">📩</div>
                  <h3>Received Offers</h3>
                  <p>Review offers submitted by farmers for your requirements.</p>
                  <button
                    className="btn"
                    onClick={() => openPage("buyer-offers")}
                  >
                    View Received Offers
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

      {page === "buyer-requirements" && user?.role === "buyer" && (
        <BuyerRequirementForm
          onBack={() => openPage("dashboard")}
        />
      )}

      {page === "my-requirements" && user?.role === "buyer" && (
        <MyRequirementsPage
          onBack={() => openPage("dashboard")}
        />
      )}

      {page === "buyer-offers" && user?.role === "buyer" && (
        <BuyerOffersPage
          onBack={() => openPage("dashboard")}
        />
      )}

      {page === "farmer-requirements" && user?.role === "farmer" && (
        <FarmerRequirementsPage
          onBack={() => openPage("dashboard")}
        />
      )}

      {page === "admin-reports" && user?.role === "admin" && (
        <AdminReportsPage
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

function FarmerRequirementsPage({ onBack }) {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadRequirements() {
    setLoading(true);

    try {
      const response = await fetch(`${API}/farmer/requirements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load buyer requirements."
        );
      }

      setRequirements(data.requirements || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequirements();
  }, []);

  return (
    <main className="dashboard products-page">
      <h1>Buyer Requirements</h1>
      <p>Explore products that buyers are looking to purchase.</p>

      {message && (
        <div className="notice" role="status">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading buyer requirements...</p>
      ) : requirements.length === 0 ? (
        <p>No open buyer requirements available right now.</p>
      ) : (
        <div className="feature-grid farmer-requirements-grid">
          {requirements.map((requirement) => (
            <article className="feature-card" key={requirement._id}>
              <h3>{requirement.productName}</h3>

              <p>
                <strong>Category:</strong>{" "}
                {requirement.category || "Not specified"}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {requirement.quantity} {requirement.unit}
              </p>

              <p>
                <strong>Target Price:</strong>{" "}
                {requirement.targetPrice != null
                  ? `₹${requirement.targetPrice} per ${requirement.unit}`
                  : "Not specified"}
              </p>

              <p>
                <strong>Buyer:</strong>{" "}
                {requirement.buyerId?.name || "Buyer"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {[requirement.city, requirement.district, requirement.state]
                  .filter(Boolean)
                  .join(", ") || "Not specified"}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {requirement.description || "No description provided."}
              </p>

               <p>
                <strong>Status:</strong> {requirement.status}
              </p>

              {requirement.farmerOffer ? (
                <div className="farmer-offer-status">
                  <h4>Your Submitted Offer</h4>

                  <p>
                    <strong>Offered Quantity:</strong>{" "}
                    {requirement.farmerOffer.offeredQuantity} {requirement.unit}
                  </p>

                  <p>
                    <strong>Offered Price:</strong>{" "}
                    ₹{requirement.farmerOffer.offeredPrice} per {requirement.unit}
                  </p>

                  <p>
                    <strong>Your Message:</strong>{" "}
                    {requirement.farmerOffer.message || "No message provided."}
                  </p>

                  <p>
                    <strong>Offer Status:</strong>{" "}
                    <span className={`offer-status ${requirement.farmerOffer.status}`}>
                      {requirement.farmerOffer.status}
                    </span>
                  </p>
                </div>
              ) : (
                <FarmerOfferForm requirement={requirement} />
              )}

            </article>
          ))}
        </div>
      )}

      <button className="btn btn-outline" onClick={onBack}>
        Back to Dashboard
      </button>
    </main>
  );
}


function BuyerOffersPage({ onBack }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadOffers() {
    setLoading(true);

    try {
      const response = await fetch(`${API}/buyer/offers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load received offers.");
      }

      setOffers(data.offers || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateOffer(offerId, status) {
    try {
      const response = await fetch(`${API}/buyer/offers/${offerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update offer.");
      }

      setMessage(data.message);
      await loadOffers();
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <main className="dashboard products-page buyer-list-page">
      <h1>Received Offers</h1>
      <p>Review offers submitted by farmers for your requirements.</p>

      {message && (
        <div className="notice" role="status">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading received offers...</p>
      ) : offers.length === 0 ? (
        <p>You have not received any offers yet.</p>
      ) : (
        <div className="feature-grid buyer-list-grid">
          {offers.map((offer) => (
            <article className="feature-card buyer-list-card" key={offer._id}>
              <h3>{offer.requirementId?.productName || "Product Offer"}</h3>

              <p>
                <strong>Farmer:</strong>{" "}
                {offer.farmerId?.name || "Farmer"}
              </p>

              <p>
                <strong>Required Quantity:</strong>{" "}
                {offer.requirementId?.quantity ?? "Not specified"}{" "}
                {offer.requirementId?.unit || ""}
              </p>

              <p>
                <strong>Offered Quantity:</strong>{" "}
                {offer.offeredQuantity}
              </p>

              <p>
                <strong>Offered Price:</strong> ₹{offer.offeredPrice}
              </p>

              <p>
                <strong>Farmer's Message:</strong>{" "}
                {offer.message || "No message provided."}
              </p>

              <p>
                <strong>Status:</strong> {offer.status}
              </p>

              {offer.status === "pending" && (
                <div className="hero-actions">
                  <button
                    className="btn"
                    onClick={() => updateOffer(offer._id, "accepted")}
                  >
                    Accept Offer
                  </button>

                  <button
                    className="btn btn-outline"
                    onClick={() => updateOffer(offer._id, "rejected")}
                  >
                    Reject Offer
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      <button className="btn btn-outline page-back-btn" onClick={onBack}>
        Back to Dashboard
      </button>
    </main>
  );
}


function BuyerRequirementForm({ onBack }) {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    quantity: "",
    unit: "kg",
    targetPrice: "",
    description: "",
    city: "",
    district: "",
    state: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (
      !formData.productName.trim() ||
      !formData.quantity ||
      Number(formData.quantity) <= 0
    ) {
      setMessage("Enter a product name and valid quantity.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        productName: formData.productName.trim(),
        quantity: Number(formData.quantity),
        targetPrice:
          formData.targetPrice === ""
            ? undefined
            : Number(formData.targetPrice),
      };

      if (
        payload.targetPrice !== undefined &&
        (!Number.isFinite(payload.targetPrice) || payload.targetPrice < 0)
      ) {
        throw new Error("Enter a valid target price.");
      }

      const response = await fetch(`${API}/buyer/requirements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not post requirement.");
      }

      setMessage("Requirement posted successfully!");

      setFormData({
        productName: "",
        category: "",
        quantity: "",
        unit: "kg",
        targetPrice: "",
        description: "",
        city: "",
        district: "",
        state: "",
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="dashboard products-page">
      <h1>Post a Requirement</h1>
      <p>Tell farmers which agricultural products you want to purchase.</p>

      {message && (
        <div className="notice" role="status">
          {message}
        </div>
      )}

      <form className="auth-card" onSubmit={handleSubmit}>
        <label>Product Name *</label>
        <input
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="e.g. Fresh Tomatoes"
          required
        />

        <label>Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Vegetables"
        />

        <label>Required Quantity *</label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          required
        />

        <label>Unit *</label>
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          required
        >
          <option value="kg">Kilogram (kg)</option>
          <option value="quintal">Quintal</option>
          <option value="tonne">Tonne</option>
          <option value="litre">Litre</option>
          <option value="piece">Piece</option>
        </select>

        <label>Target Price (₹ per unit)</label>
        <input
          type="number"
          name="targetPrice"
          min="0"
          value={formData.targetPrice}
          onChange={handleChange}
          placeholder="Your expected price"
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Additional product requirements..."
        />

        <label>City</label>
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />

        <label>District</label>
        <input
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="District"
        />

        <label>State</label>
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
        />

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Posting..." : "Submit Requirement"}
        </button>
      </form>

      <button className="btn btn-outline" onClick={onBack}>
        Back to Dashboard
      </button>
    </main>
  );
}

function MyRequirementsPage({ onBack }) {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadRequirements() {
    setLoading(true);

    try {
      const response = await fetch(`${API}/buyer/requirements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load your requirements."
        );
      }

      setRequirements(data.requirements || []);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRequirements();
  }, []);

  return (
    <main className="dashboard products-page buyer-list-page">
      <h1>My Requirements</h1>
      <p>View the agricultural products you have requested.</p>

      {message && (
        <div className="notice" role="status">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading your requirements...</p>
      ) : requirements.length === 0 ? (
        <p>You haven't posted any requirements yet.</p>
      ) : (
        <div className="feature-grid buyer-list-grid">
          {requirements.map((requirement) => (
            <article className="feature-card buyer-list-card" key={requirement._id}>
              <h3>{requirement.productName}</h3>

              <p>
                <strong>Category:</strong>{" "}
                {requirement.category || "Not specified"}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {requirement.quantity} {requirement.unit}
              </p>

              <p>
                <strong>Target Price:</strong>{" "}
                {requirement.targetPrice != null
                  ? `₹${requirement.targetPrice} per ${requirement.unit}`
                  : "Not specified"}
              </p>

              <p>
                <strong>Description:</strong>{" "}
                {requirement.description || "No description provided."}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {[requirement.city, requirement.district, requirement.state]
                  .filter(Boolean)
                  .join(", ") || "Not specified"}
              </p>

              <p>
                <strong>Status:</strong> {requirement.status}
              </p>
            </article>
          ))}
        </div>
      )}

      <button className="btn btn-outline page-back-btn" onClick={onBack}>
        Back to Dashboard
      </button>
    </main>
  );
}

function FarmerOfferForm({ requirement }) {
  const [offeredQuantity, setOfferedQuantity] = useState("");
  const [offeredPrice, setOfferedPrice] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (Number(offeredQuantity) <= 0 || Number(offeredPrice) < 0) {
      setNotice("Please enter a valid quantity and price.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${API}/farmer/requirements/${requirement._id}/offers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("navmitra_token")}`,
          },
          body: JSON.stringify({
            offeredQuantity: Number(offeredQuantity),
            offeredPrice: Number(offeredPrice),
            message: offerMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not submit offer.");
      }

      setNotice("Offer submitted successfully!");
      setOfferedQuantity("");
      setOfferedPrice("");
      setOfferMessage("");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="farmer-offer-form" onSubmit={handleSubmit}>
      <h4>Submit Your Offer</h4>

      <label>Offered Quantity ({requirement.unit})</label>
      <input
        type="number"
        min="1"
        required
        value={offeredQuantity}
        onChange={(event) => setOfferedQuantity(event.target.value)}
        placeholder="Enter quantity"
      />

      <label>Offered Price (₹ per {requirement.unit})</label>
      <input
        type="number"
        min="0"
        step="0.01"
        required
        value={offeredPrice}
        onChange={(event) => setOfferedPrice(event.target.value)}
        placeholder="Enter your price"
      />

      <label>Message (optional)</label>
      <textarea
        value={offerMessage}
        onChange={(event) => setOfferMessage(event.target.value)}
        placeholder="Write a message to the buyer"
      />

      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}

      <button className="btn" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Offer"}
      </button>
    </form>
  );
}


function AdminReportsPage({ onBack }) {
  const [reports, setReports] = useState({
    farmers: [],
    buyers: [],
    products: [],
  });

  const [activeReport, setActiveReport] = useState("farmers");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      const token = localStorage.getItem("navmitra_token");

      try {
        setLoading(true);
        setError("");

        const reportNames = ["farmers", "buyers", "products"];

        const results = await Promise.all(
          reportNames.map(async (name) => {
            const response = await fetch(`${API}/admin/${name}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || `Could not load ${name} report.`);
            }

            return [name, data[name]];
          })
        );

        setReports(Object.fromEntries(results));
      } catch (error) {
        setError(error.message || "Unable to load reports.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const currentRecords = reports[activeReport];

  function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN");
  }

  function renderTable() {
    if (activeReport === "farmers") {
      return (
        <table className="admin-report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Village</th>
              <th>District</th>
              <th>Farming Type</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((farmer) => (
              <tr key={farmer._id}>
                <td>{farmer.name}</td>
                <td>{farmer.email}</td>
                <td>{farmer.profile?.phone || "—"}</td>
                <td>{farmer.profile?.village || "—"}</td>
                <td>{farmer.profile?.district || "—"}</td>
                <td>{farmer.profile?.farmingType || "—"}</td>
                <td>{formatDate(farmer.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (activeReport === "buyers") {
      return (
        <table className="admin-report-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>District</th>
              <th>Buyer Type</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((buyer) => (
              <tr key={buyer._id}>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>{buyer.profile?.phone || "—"}</td>
                <td>{buyer.profile?.city || "—"}</td>
                <td>{buyer.profile?.district || "—"}</td>
                <td>{buyer.profile?.buyerType || "—"}</td>
                <td>{buyer.profile?.organizationName || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <table className="admin-report-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Farmer</th>
            <th>Quantity</th>
            <th>Price / Unit</th>
            <th>Status</th>
            <th>Listed Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.farmerId?.name || "—"}</td>
              <td>{product.quantity} {product.unit}</td>
              <td>₹{product.pricePerUnit}</td>
              <td>{product.status}</td>
              <td>{formatDate(product.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <main className="dashboard admin-reports">
      <div className="admin-reports-header">
        <div>
          <span className="eyebrow">NAVMITRA ADMIN PANEL</span>
          <h1>Management Reports</h1>
          <p>
            View and manage reports generated from NavMitra database records.
          </p>
        </div>
      </div>

      {loading ? (
        <p>Loading reports from database...</p>
      ) : error ? (
        <p className="notice" role="alert">{error}</p>
      ) : (
        <>
          <div className="feature-grid dashboard-grid">
            <article className="feature-card">
              <h3>Farmer Report</h3>
              <h2>{reports.farmers.length}</h2>
              <button
                className="btn"
                onClick={() => setActiveReport("farmers")}
              >
                View Farmers
              </button>
            </article>

            <article className="feature-card">
              <h3>Buyer Report</h3>
              <h2>{reports.buyers.length}</h2>
              <button
                className="btn"
                onClick={() => setActiveReport("buyers")}
              >
                View Buyers
              </button>
            </article>

            <article className="feature-card">
              <h3>Product Listing Report</h3>
              <h2>{reports.products.length}</h2>
              <button
                className="btn"
                onClick={() => setActiveReport("products")}
              >
                View Products
              </button>
            </article>
          </div>

          <section className="admin-report-section">
            <h2>
              {activeReport === "farmers"
                ? "Farmer Report"
                : activeReport === "buyers"
                ? "Buyer Report"
                : "Product Listing Report"}
            </h2>

            {currentRecords.length === 0 ? (
              <p>No records found.</p>
            ) : (
              <div className="admin-report-table-wrap">
                {renderTable()}
              </div>
            )}
          </section>
        </>
      )}

      <div className="admin-reports-footer">
        <button className="btn btn-outline" onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>
      
    </main>
  );
}

export default App;