import React from 'react'
import { Table } from 'reactstrap'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import ButtonUI from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import swal from 'sweetalert'

class AdminDashboard extends React.Component {
    state = {
        productList: [],
        createForm: {
            productName: "",
            price: 0,
            category: "",
            image: "",
            desc: "",
        },
        editForm: {
            id: 0,
            productName: "",
            price: 0,
            category: "",
            image: "",
            desc: "",
        }
    }

    inputHandler = (e, field, form) => {
        const {value} = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            }
        })
    }

    createProductHandler = () => {
        Axios.post(`${API_URL}/products`, this.state.createForm)
        .then((res) => {
            swal("Succes")
            this.getProductList();
        })
        .catch((err) => {
            swal("error")
        })
    }

    editBtnHandler = (idx) => {
        this.setState({
            editForm: {
                ...this.state.productList[idx],
            }
        })
    }

    editProductHandler = () => {
        Axios.put(`${API_URL}/products/${this.state.editForm.id}`,
        this.state.editForm)
        .then((res) => {
            swal("success")
            this.getProductList();
        })
        .catch((err) => {
            swal("error")
            console.log(err)
        })
    }

    getProductList = () => {
        Axios.get(`${API_URL}/products`)
            .then((res) => {
                this.setState({productList: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderProductList = () => {
        return this.state.productList.map(val => {
            const {id, productName, price, category, image, desc} = val
            return (
                <tr>
                    <td>{id}</td>
                    <td>{productName}</td>
                    <td>{price}</td>
                    <td>{category}</td>
                    <td>
                        {" "}
                            <img
                                src={image}
                                alt=""
                                style={{ height: "100px", objectFit: "contain" }}
                        />{" "}
                    </td>
                    <td> {desc} </td>
                    <td>
                        <ButtonUI onClick={this.editBtnHandler} type="contained">Edit</ButtonUI>
                    </td>
                    <td>
                        <ButtonUI type="contained">Delete</ButtonUI>
                    </td>
                </tr>
            )
        })
    }

    componentDidMount() {
        this.getProductList();
    }

    render() {
        return (
            <div className="container py-4">
                <Table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Image</td>
                            <td>Name</td>
                            <td>price</td>
                            <td>categori</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProductList()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                <TextField
                                    placeholder="Name"
                                    value={this.state.createForm.productName}
                                    onChange={e => this.inputHandler(e, "productName", "createForm")}/>
                            </td>
                            <td>
                                <TextField
                                    placeholder="Price"
                                    value={this.state.createForm.price}
                                    onChange={e => this.inputHandler(e, "price", "createForm")}
                                    />
                            </td>
                            <td colSpan={2}>
                                <select className="form-control" onChange={e => this.inputHandler(e, "category", "createForm")}>
                                    <option value="Phone">Phone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="Tab">Tab</option>
                                    <option value="Desktop">Desktop</option>
                                </select>
                            </td>
                            <td>
                                <TextField
                                    placeholder="Image"
                                    value={this.state.createForm.image}
                                    onChange={e => this.inputHandler(e, "image", "createForm")}/>
                            </td>
                            <td colSpan={2}>
                                <TextField
                                    placeholder="Deskripsi"
                                    value={this.state.createForm.desc}
                                    onChange={e => this.inputHandler(e, "desc", "createForm")}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={7}></td>
                            <td colSpan={1}>
                                <ButtonUI onClick={this.createProductHandler} type="contained">create</ButtonUI>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <TextField
                                    placeholder="Name"
                                    value={this.state.editForm.productName}
                                    onChange={e => this.inputHandler(e, "productName", "editForm")}/>
                            </td>
                            <td>
                                <TextField
                                    placeholder="Price"
                                    value={this.state.editForm.price}
                                    onChange={e => this.inputHandler(e, "price", "editForm")}
                                    />
                            </td>
                            <td colSpan={2}>
                                <select className="form-control" onChange={e => this.inputHandler(e, "category", "editForm")}>
                                    <option value="Phone">Phone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="Tab">Tab</option>
                                    <option value="Desktop">Desktop</option>
                                </select>
                            </td>
                            <td>
                                <TextField
                                    placeholder="Image"
                                    value={this.state.editForm.image}
                                    onChange={e => this.inputHandler(e, "image", "editForm")}/>
                            </td>
                            <td colSpan={2}>
                                <TextField
                                    placeholder="Deskripsi"
                                    value={this.state.editForm.desc}
                                    onChange={e => this.inputHandler(e, "desc", "editForm")}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={7}></td>
                            <td colSpan={1}>
                                <ButtonUI onClick={this.editProductHandler} type="contained">Save</ButtonUI>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}

export default AdminDashboard;