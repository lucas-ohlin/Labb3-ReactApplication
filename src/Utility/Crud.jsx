import React, { useState } from "react";
import BookIndex from "./Views/BookIndex";
import "./Body.css";
import GetDetails from "./Views/GetDetails";
import AddBook from "./Views/AddBook";
import EditBook from "./Views/EditBook";
import DeleteBook from "./Views/DeleteBook";

export const Context = React.createContext();

function Body() {

    const [filter, setFilter] = useState({ type: "", text: "" });
    const [viewState, setViewState] = useState({ view: "list", id: 0 });
    const [showForm, setShowForm] = useState(false); 
    const [listRender, setListRender] = useState(true); 
    const [input, setInput] = useState("");


    const handleFilter = (data) => {
        setFilter({ type: data.type, text: data.text });
    };

    const addBookHandle = (data) => {
        setShowForm(data);
    };

    const listRenderer = () => {
        setListRender(!listRender);
    };

    const handleSearch = ({ target }) => {
        setInput(target.value);
    };

    const handleClear = () => {
        handleFilter({ text: "", type: "" });
        setInput("");
        document.getElementById("searchField").value = "";
    };

    return (
        <Context.Provider value={{ vs: [viewState, setViewState], lr: [listRender, setListRender] }}>
            <div className="container">
                {viewState.view === "list" && (
                    <div>
                        <div className="input-group mb-3">
                            <input onChange={handleSearch} type="text" id="searchField" className="form-control" placeholder="Search"></input>
                        </div>
                        <div className="row mb-3">
                            <div>
                                <div className="row mb-3 justify-content-center">
                                    <button id="idSearch" className="btn btn-primary me-2" type="button" onClick={() => handleFilter({ text: input, type: "id" })}>
                                        Search by Id
                                    </button>
                                    <button id="titleSearch" className="btn btn-primary me-2" type="button" onClick={() => handleFilter({ text: input, type: "title" })}>
                                        Search by Title
                                    </button>
                                    <button id="clearSearch" className="btn btn-primary me-2" type="button" onClick={() => { handleClear(); }}>
                                        Clear search result
                                    </button>
                                    <button onClick={() => addBookHandle(true)} id="addBook" className="btn btn-outline-primary" type="button">
                                        <i className="bi bi-journal-plus"></i> Add Book
                                    </button>
                                    {showForm && <AddBook addBookHandle={addBookHandle} listRenderer={listRenderer} />}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="card p-1">
                    {viewState.view === "list" && <BookIndex filter={filter} />}
                    {viewState.view === "details" && <GetDetails id={viewState.id} />}
                    {viewState.view === "edit" && <EditBook id={viewState.id} />}
                    {viewState.view === "delete" && <DeleteBook id={viewState.id} />}
                </div>
            </div>
        </Context.Provider>
    );
}

export default Body;
