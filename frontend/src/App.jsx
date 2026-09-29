import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [visitors, setVisitors] = useState([]);
  useEffect(() => {
  fetch("https://employee-visitor-registration-system.onrender.com/api/visitors")
    .then((response) => response.json())
    .then((data) => {
      const formattedVisitors = data.map((visitor) => ({
        ...visitor,
        id: visitor._id,
        dateTime: new Date(visitor.dateTime).toLocaleString(),
      }));

      setVisitors(formattedVisitors);
    })
    .catch((error) => {
      console.error("Error fetching visitors:", error);
    });
}, []);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    organization: "",
    personToMeet: "",
    purpose: "",
    status: "Checked In",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (editingId) {
    try {
      const response = await fetch(
        `https://employee-visitor-registration-system.onrender.com/api/visitors/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const updatedVisitor = await response.json();

      if (!response.ok) {
        alert("Failed to update visitor");
        return;
      }

      setVisitors(
        visitors.map((visitor) =>
          visitor.id === editingId
            ? {
                ...updatedVisitor,
                id: updatedVisitor._id,
                dateTime: new Date(
                  updatedVisitor.dateTime
                ).toLocaleString(),
              }
            : visitor
        )
      );

      setEditingId(null);
      alert("Visitor updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  } else {
    try {
      const response = await fetch(
        "https://employee-visitor-registration-system.onrender.com/api/visitors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const savedVisitor = await response.json();

      if (!response.ok) {
        alert("Failed to add visitor");
        return;
      }

      const newVisitor = {
        id: savedVisitor._id,
        ...savedVisitor,
        dateTime: new Date(
          savedVisitor.dateTime
        ).toLocaleString(),
      };

      setVisitors([...visitors, newVisitor]);

      alert("Visitor added successfully!");
    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend");
    }
  }

  setFormData({
    name: "",
    mobile: "",
    email: "",
    organization: "",
    personToMeet: "",
    purpose: "",
    status: "Checked In",
  });
};
  const filteredVisitors = visitors.filter((visitor) => {
  return (
    visitor.name.toLowerCase().includes(search.toLowerCase()) ||
    visitor.mobile.includes(search)
  );
});
const editVisitor = (visitor) => {
  setFormData({
    name: visitor.name,
    mobile: visitor.mobile,
    email: visitor.email,
    organization: visitor.organization,
    personToMeet: visitor.personToMeet,
    purpose: visitor.purpose,
    status: visitor.status,
  });

  setEditingId(visitor.id);
};
 const deleteVisitor = async (id) => {
  try {
    const response = await fetch(
      `https://employee-visitor-registration-system.onrender.com/api/visitors/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Failed to delete visitor");
      return;
    }

    setVisitors(
      visitors.filter((visitor) => visitor.id !== id)
    );

    alert("Visitor deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Cannot connect to backend");
  }
};

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
  <div className="header-content">

    <div className="header-icon">
      👤
    </div>

    <div className="header-text">
      <h1>
        Employee <span>Visitor</span> Management System
      </h1>

      <p>Digital Visitor Registration System</p>

      <div className="header-line">
        <span></span>
        <b>•</b>
        <span></span>
      </div>
    </div>

    <div className="header-info">
      <div>📅 <span>Visitor Portal</span></div>
      <div>🕐 <span>Registration System</span></div>
    </div>

  </div>
</header>

      <main className="container">

        {/* Dashboard */}
        <section className="dashboard">
          <div className="dashboard-card">
            <h3>Today's Visitors</h3>
            <p>{visitors.length}</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Records</h3>
            <p>{visitors.length}</p>
          </div>
        </section>

        {/* Add Visitor */}
        <section className="card">
          <h2>Register New Visitor</h2>

          <form onSubmit={handleSubmit} className="visitor-form">

            <div className="form-group">
              <label>Visitor Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter visitor name"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label>Organization / College</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Enter organization or college"
              />
            </div>

            <div className="form-group">
              <label>Person to Meet</label>
              <input
                type="text"
                name="personToMeet"
                value={formData.personToMeet}
                onChange={handleChange}
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="form-group">
              <label>Purpose of Visit</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Enter purpose"
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>

            <div className="form-button">
              <button type="submit">
  {editingId ? "Update Visitor" : "Add Visitor"}
</button>
            </div>

          </form>
        </section>

        {/* Visitor Records */}
        <section className="card">

          <div className="records-header">
            <h2>Visitor Records</h2>

            <input
  type="text"
  placeholder="Search by name or mobile..."
  className="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Organization</th>
                  <th>Person to Meet</th>
                  <th>Purpose</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredVisitors.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No visitor records available
                    </td>
                  </tr>
                ) : (
                  filteredVisitors.map((visitor) => (
                    <tr key={visitor.id}>

                      <td>{visitor.name}</td>

                      <td>{visitor.mobile}</td>

                      <td>{visitor.organization || "-"}</td>

                      <td>{visitor.personToMeet}</td>

                      <td>{visitor.purpose}</td>

                      <td>{visitor.dateTime}</td>

                      <td>
                        <span
                          className={
                            visitor.status === "Checked In"
                              ? "status checked-in"
                              : "status checked-out"
                          }
                        >
                          {visitor.status}
                        </span>
                      </td>

                      <td>
                        <td>
  <button onClick={() => editVisitor(visitor)}>
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteVisitor(visitor.id)}
  >
    Delete
  </button>
</td>
                         
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;