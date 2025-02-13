import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
    const [admins, setAdmins] = useState([]);
    const [editAdmin, setEditAdmin] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: null
    });

    useEffect(() => {
        axios.get('http://localhost:3010/viewAdmin')
            .then(response => {
                setAdmins(response.data.data);
            })
            .catch(error => {
                console.error('There was an error fetching the admins!', error);
            });
    }, []);

    const deleteAdmin = (id) => {
        axios.delete(`http://localhost:3010/deleteAdmin?id=${id}`)
            .then(response => {
                setAdmins(admins.filter(admin => admin._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the admin!', error);
            });
    };

    const handleEdit = (admin) => {
        setEditAdmin(admin);
        setFormData({
            name: admin.name,
            email: admin.email,
            password: admin.password,
            image: null
        });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (formData.image) {
            data.append('image', formData.image);
        }

        if (editAdmin) {
            axios.put(`http://localhost:3010/updateAdmin?id=${editAdmin._id}`, data)
                .then(response => {
                    setAdmins(admins.map(admin => admin._id === editAdmin._id ? response.data.data : admin));
                    setEditAdmin(null);
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        image: null
                    });
                })
                .catch(error => {
                    console.error('There was an error updating the admin!', error);
                });
        } else {
            axios.post('http://localhost:3010/addAdmin', data)
                .then(response => {
                    setAdmins([...admins, response.data.data]);
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                        image: null
                    });
                })
                .catch(error => {
                    console.error('There was an error adding the admin!', error);
                });
        }
    };

    return (
        <div className="container">
            <div className="header">
                Admin Panel
            </div>
            <div className="add-admin-container">
                <form onSubmit={handleSubmit} className="edit-form">
                    <h2>{editAdmin ? 'Edit Admin' : 'Add Admin'}</h2>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <label>
                        Image:
                        <input type="file" name="image" onChange={handleChange} />
                    </label>
                    <button type="submit">{editAdmin ? 'Update' : 'Add'}</button>
                    {editAdmin && <button type="button" onClick={() => setEditAdmin(null)}>Cancel</button>}
                </form>
            </div>

            <div className="admin-list-container">
                <h1>Admin List</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(admin => (
                            <tr key={admin._id}>
                                <td>{admin.name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.password}</td>
                                <td><img src={`http://localhost:3010/${admin.image}`} alt={admin.name} width="100" /></td>
                                <td>
                                    <button onClick={() => handleEdit(admin)}>Edit</button>
                                    <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
