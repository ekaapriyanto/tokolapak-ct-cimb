import React from "react"
import Axios from "axios"
import { API_URL } from "../../../constants/API"
import { Table } from "reactstrap"
import { connect } from "react-redux"

class Member extends React.Component {
    state = {
        memberData: [],
    }

    getMemberData = () => {
        Axios.get(`${API_URL}/users`)
        .then((res) => {
            this.setState({ memberData: res.data })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getMemberData();
    }
    
    renderMemberData = () => {
        return this.state.memberData.map((val) => {
            const { id, username, fullName, email, password, role} = val;
            return(
                <>
                <tr>
                    <td>{id}</td>
                    <td>{username}</td>
                    <td>{fullName}</td>
                    <td>{email}</td>
                    <td>{password}</td>
                    <td>{role}</td>
                </tr>
                </>
            )
        })
    }
    render() {
        return (
            <div className="container py-4 text-center">
                <h3>Members</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderMemberData()}</tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps) (Member);