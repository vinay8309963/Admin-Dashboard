import React, { useState, useEffect } from 'react';
import './admin.css'; // Import the CSS file

const AdminDashboard = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Vinay', email: 'vinay@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 2, name: 'Sumanth', email: 'sumanth@example.com', role: 'User', selected: false, isEditing: false },
    { id: 3, name: 'Murali', email: 'murali@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 4, name: 'Yeshwanth', email: 'yesh@example.com', role: 'User', selected: false, isEditing: false },
    { id: 5, name: 'Saketh', email: 'saketh@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 6, name: 'Sriram', email: 'sriram@example.com', role: 'User', selected: false, isEditing: false },
    { id: 7, name: 'Mahesh', email: 'mahesh@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 8, name: 'Revanth', email: 'revanth@example.com', role: 'User', selected: false, isEditing: false },
    { id: 9, name: 'Bilvesh', email: 'bilvesh@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 10, name: 'Madhu', email: 'madhu@example.com', role: 'User', selected: false, isEditing: false },
    { id: 11, name: 'Praveen', email: 'praveen@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 12, name: 'Paka rohith', email: 'paka@example.com', role: 'User', selected: false, isEditing: false },
    { id: 13, name: 'Abhishek', email: 'abhi@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 14, name: 'Manikanth', email: 'mani@example.com', role: 'User', selected: false, isEditing: false },
    { id: 15, name: 'Akhil', email: 'akhil@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 16, name: 'Rohan', email: 'rohan@example.com', role: 'User', selected: false, isEditing: false },
    { id: 17, name: 'Vishal', email: 'vishal@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 18, name: 'Durga', email: 'durga@example.com', role: 'User', selected: false, isEditing: false },
    { id: 19, name: 'Saikiran', email: 'saikiran@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 20, name: 'Uday', email: 'uday@example.com', role: 'User', selected: false, isEditing: false },
    { id: 21, name: 'Sathwik', email: 'sathwik@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 22, name: 'Jayendhra', email: 'jay@example.com', role: 'User', selected: false, isEditing: false },
    { id: 23, name: 'Jayant', email: 'jayant@example.com', role: 'Admin', selected: false, isEditing: false },
    { id: 24, name: 'Arif', email: 'arif@example.com', role: 'User', selected: false, isEditing: false },
    { id: 25, name: 'Rahul', email: 'rahul@example.com', role: 'Admin', selected: false, isEditing: false },
    // Add more sample data as needed
    // ...
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSelectAll = () => {
    const updatedData = currentItems.map(item => {
      return { ...item, selected: !selectAll };
    });
    setData(prevData => {
      const newData = [...prevData];
      newData.splice(indexOfFirstItem, itemsPerPage, ...updatedData);
      return newData;
    });
    setSelectAll(!selectAll);
  };

  const toggleSelect = itemId => {
    const updatedData = currentItems.map(item => {
      if (item.id === itemId) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setData(prevData => {
      const newData = [...prevData];
      newData.splice(indexOfFirstItem, itemsPerPage, ...updatedData);
      return newData;
    });
    setSelectAll(false);
  };

  const deleteSelected = () => {
    const updatedData = data.filter(item => !item.selected);
    setData(updatedData);
    setSelectAll(false);
  };

  const editItem = (itemId) => {
    const updatedData = data.map(item => {
      if (item.id === itemId) {
        return { ...item, isEditing: true };
      }
      return { ...item, isEditing: false };
    });
    setData(updatedData);
  };

  const saveItem = (itemId, newName, newEmail, newRole) => {
    const updatedData = data.map(item => {
      if (item.id === itemId) {
        return { ...item, name: newName, email: newEmail, role: newRole, isEditing: false };
      }
      return item;
    });
    setData(updatedData);
  };

  const countSelectedRows = () => {
    const selectedRows = data.filter(item => item.selected);
    return selectedRows.length;
  };

  const handleAddUser = (newUserData) => {
    const newId = data.length + 1; // Generate a new unique ID
    const newData = [
      ...data,
      { id: newId, ...newUserData, selected: false, isEditing: false }
    ];
    setData(newData);
  };

  return (
    <div>
      <div className="add-user">
        <h2>Add User</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const newUserData = {
              name: formData.get('name'),
              email: formData.get('email'),
              role: formData.get('role')
            };
            handleAddUser(newUserData);
            form.reset();
          }}
          className="add-user-form"
        >
          <input type="text" name="name" placeholder="Name" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="text" name="role" placeholder="Role" required />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-icon" onClick={() => setSearchTerm(searchTerm)}>Search</button>
      </div>
      <div className="selected-count">
        {countSelectedRows()} {countSelectedRows() === 1 ? 'row' : 'rows'} selected
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={toggleSelectAll} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item.id} className={item.selected ? 'selected' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelect(item.id)}
                />
              </td>
              <td contentEditable={item.isEditing} suppressContentEditableWarning onBlur={(e) => saveItem(item.id, e.target.textContent, item.email, item.role)}>
                {item.name}
              </td>
              <td contentEditable={item.isEditing} suppressContentEditableWarning onBlur={(e) => saveItem(item.id, item.name, e.target.textContent, item.role)}>
                {item.email}
              </td>
              <td contentEditable={item.isEditing} suppressContentEditableWarning onBlur={(e) => saveItem(item.id, item.name, item.email, e.target.textContent)}>
                {item.role}
              </td>
              <td>
                {!item.isEditing ? (
                  <button className="edit" onClick={() => editItem(item.id)}>Edit</button>
                ) : (
                  <button className="save" onClick={() => saveItem(item.id, item.name, item.email, item.role)}>Save</button>
                )}
                <button className="delete" onClick={() => deleteSelected()}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="first-page" onClick={() => handlePageClick(1)} disabled={currentPage === 1}>First</button>
        <button className="previous-page" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="next-page" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        <button className="last-page" onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>Last</button>
      </div>
      <button onClick={deleteSelected} className="delete-selected">Delete Selected</button>
    </div>
  );
};

export default AdminDashboard;
