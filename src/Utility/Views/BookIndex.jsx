import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../Crud";

function BookIndex({ filter }) {
    const [books, setBooks] = useState([{}]);
    const { lr } = useContext(Context);
    const [listRender, setListRender] = lr;

    const { vs } = useContext(Context);
  	const [viewState, setViewState] = vs;

    const bookFilter = (data) => {

		if (filter.type === "id") 
            return data.filter((x) => x.id.toLowerCase().includes(filter.text.toLowerCase()));

        if (filter.type === "title") 
            return data.filter((x) => x.title.toLowerCase().includes(filter.text.toLowerCase()));

		//Return the information type based on the input
        return data;
    };

    useEffect(() => {
        axios.get("https://localhost:7255/api/books").then((res) => {
            setBooks(res.data.result);
        });
    }, [listRender]);

    return (
        <table className="table">
            <thead>
                <tr>
                    {/* <th>Id</th> */}
                    <th>Title</th>
                    <th>Author</th>
					<th>Genre</th>
                    <th>Description</th>
                    <th>Year</th>
                    <th>Loanable</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookFilter(books).map((data) => (
                    <tr key={data.id}>
                        {/* <td>{data.id}</td> */}
                        <td>{data.title}</td>
                        <td>{data.author}</td>
                        <td>{data.genre}</td>
                        <td>{data.description}</td>
                        <td>{data.year}</td>
                        <td>{data.isLoanAble ? "Yes" : "No"}</td>
                        <td>
                            <div className="d-flex">
                                <button onClick={() => setViewState({ view: "details", id: data.id })} className="btn btn-success"> Details </button>
                                <button onClick={() => setViewState({ view: "edit", id: data.id })} className="btn btn-warning ms-2"> Edit </button>
                                <button onClick={() => setViewState({ view: "delete", id: data.id })} className="btn btn-danger ms-2"> Delete </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BookIndex;
