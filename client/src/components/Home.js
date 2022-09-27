import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import Swal from "sweetalert2";

function Home() {
  const [users, setUsers] = useState([]);
  const [addUser, setAddUser] = useState({
    Name: "",
    Email: "",
    Address: "",
    Phone: "",
  });
  const [inputVal, setInputVal] = useState({
    Name: "",
    Email: "",
    Address: "",
    Phone: "",
  });
  const [errors, setErrors] = useState({});
  const [idUsersDelete, setIdUsersDelete] = useState([]);

  // *Get All users
  const getAllUsers = async () => {
    await axios.get("/api/users").then((res) => {
      setUsers(res.data);
    });
  };
  // *Edit Users
  const editUser = (id) => {
    users.map((us) => {
      if (us._id === id) setInputVal(us);
    });
  };
  // *Edit Submit
  const editUserSubmit = async (e, id) => {
    e.preventDefault();
    await axios
      .put(`/api/users/${id}`, inputVal)
      .then((res) => {
        document.querySelector(".closeContEdit").click();
        Swal.fire("Updated!", res.data.message, "success");
        getAllUsers();
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  //*Input text*Edit form
  const onChangeHandlerEdit = (e) => {
    const { name, value } = e.target;

    setInputVal((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // *Add submit
  const addUserSubmit = async (e) => {
    e.preventDefault();
    document
      .querySelector(".closeControl")
      .addEventListener("click", function () {
        resetInputAdd();
      });
    document
      .querySelector(".closeControlC")
      .addEventListener("click", function () {
        resetInputAdd();
      });
    await axios
      .post("/api/users", addUser)
      .then((res) => {
        document.querySelector(".close").click();
        getAllUsers();
        resetInputAdd();
        Swal.fire("", res.data.message, "success");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  //*Input text*ADD
  const onChangeHandlerAdd = (e) => {
    const { name, value } = e.target;
    setAddUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  //*Get ID from checkbox
  const onClickHandler = (e) => {
    const { id } = e.target;
    if (document.getElementById(`${id}`).checked) {
      setIdUsersDelete((oldArray) => [...oldArray, id]);
    } else {
      setIdUsersDelete(idUsersDelete.filter((u) => u !== id));
    }
  };

  // *delete User
  const deleteUser = (e, id, Name) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`/api/users/${Name}/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.message, "success");
            getAllUsers();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // *Delete Many Users
  const deleteManyUsers = (e) => {
    e.preventDefault();
    
    if(idUsersDelete.length !== 0){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it All!",
    }).then((result) => {
      if (result.isConfirmed) {
        Promise.all(idUsersDelete
          .map((idD) => {
            axios.delete(`/api/users/${idD}`);
          }))
          .then(() => {
            Swal.fire("Deleted!", "all", "success");
            getAllUsers();
            setIdUsersDelete([]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Choose Employees !! ',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

// *delete All Users
const deleteAllUsers =(e)=>{
  e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete All Employees!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`/api/users/`)
          .then(() => {
            Swal.fire("Deleted!", "All Employees deleted", "success");
            getAllUsers();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  // !Reset input text
  const resetInputAdd = () => {
    setAddUser({});
    document.getElementById("formAdd").reset();
    setErrors({});
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <div>
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>
                      Manage <b>Employees</b>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <a
                      href="#addEmployeeModal"
                      className="btn btn-success"
                      data-toggle="modal"
                    >
                      <i className="material-icons"></i>{" "}
                      <span>Add New Employee</span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-danger"
                      data-toggle="modal"
                      onClick={deleteManyUsers}
                    >
                      <i className="material-icons"></i> <span>Delete</span>
                    </a>
                    <a
                      href="#"
                      className="btn btn-danger"
                      data-toggle="modal"
                      onClick={deleteAllUsers}
                    >
                     <i className="material-icons">delete_sweep</i><span>Delete All ({users.length})</span>
                    </a>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>
                      <span className="custom-checkbox">
                        <input type="checkbox" id="selectAll" />
                        {/* <label htmlFor="selectAll" /> */}
                      </span>
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.map((userAff, index) => (
                      <tr key={userAff._id}>
                        <td>
                          <span className="custom-checkbox">
                            <input
                              type="checkbox"
                              id={userAff._id}
                              name={index}
                              defaultValue={1}
                              onClick={onClickHandler}
                            />
                            <label htmlFor="checkbox1" />
                          </span>
                        </td>
                        <td>{userAff.Name}</td>
                        <td>{userAff.Email}</td>
                        <td>{userAff.Address}</td>
                        <td>{userAff.Phone}</td>
                        <td>
                          <a
                            href="#editEmployeeModal"
                            className="edit"
                            data-toggle="modal"
                            onClick={() => editUser(userAff._id)}
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Edit"
                            >
                              
                            </i>
                          </a>
                          <a
                            href=""
                            className="delete"
                            onClick={(e) =>
                              deleteUser(e, userAff._id, userAff.Name)
                            }
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Delete"
                            >
                              
                            </i>
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="clearfix">
                <div className="hint-text">
                  Showing <b>5</b> out of <b>25</b> entries
                </div>
                <ul className="pagination">
                  <li className="page-item disabled">
                    <a href="#">Previous</a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      2
                    </a>
                  </li>
                  <li className="page-item active">
                    <a href="#" className="page-link">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      5
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* ADD Modal HTML */}
        <div
          id="addEmployeeModal"
          className="modal fade"
          data-backdrop="static"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form id="formAdd">
                <div className="modal-header">
                  <h4 className="modal-title">Add Employee</h4>
                  <button
                    type="button"
                    className="close closeControl"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors,
                      })}
                      onChange={onChangeHandlerAdd}
                      id="Name"
                      name="Name"
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.Name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className={classnames("form-control", {
                        "is-invalid": errors,
                      })}
                      onChange={onChangeHandlerAdd}
                      id="Email"
                      name="Email"
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.Email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors,
                      })}
                      onChange={onChangeHandlerAdd}
                      id="Address"
                      name="Address"
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.Address}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors,
                      })}
                      onChange={onChangeHandlerAdd}
                      id="Phone"
                      name="Phone"
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.Phone}</div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default closeControlC"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-success"
                    defaultValue="Add"
                    onClick={(e) => {
                      addUserSubmit(e);
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Edit Modal HTML */}
        <div id="editEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={(e) => editUserSubmit(e, inputVal._id)}>
                <div className="modal-header">
                  <h4 className="modal-title">Edit Employee</h4>
                  <button
                    type="button"
                    className="close closeContEdit"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={inputVal.Name}
                      onChange={onChangeHandlerEdit}
                      id="Name"
                      name="Name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={inputVal.Email}
                      onChange={onChangeHandlerEdit}
                      id="Email"
                      name="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={inputVal.Address}
                      onChange={onChangeHandlerEdit}
                      id="Address"
                      name="Address"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value={inputVal.Phone}
                      onChange={onChangeHandlerEdit}
                      id="Phone"
                      name="Phone"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-info"
                    defaultValue="Save"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
