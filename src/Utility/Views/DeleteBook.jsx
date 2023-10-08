import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Crud";
import getSingleBook from "../API/GetSingleBook";
import BookDelete from "../API/BookDelete";

function DeleteBook({ id }) {
    const [bookToDelete, setBookToDelete] = useState({});
    const { vs } = useContext(Context);
    const [viewState, setViewState] = vs;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (bookId) => {
            const bookData = await getSingleBook(bookId);
            setBookToDelete(bookData.data.result);
            setLoading(false);
        };
        fetchData(id);
    }, []);

    const deleteHandler = async (bookId) => {
        await BookDelete(bookId);
        setViewState({ view: "list", id: 0 });
    };

    return (
        <div>
            {loading ? (
                <p className="h5">Loading...</p>
            ) : (
                <div>
                    <ul className="list-group">
                        {Object.entries(bookToDelete).map((item, key) => {
                            if (typeof item[1] !== "boolean") {
                                return (
                                    <li key={key} className="list-group-item ps-5 pt-2">
                                        <strong>{item[0]} :</strong> {item[1]}
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                    <p className="h4">Continue with deleting?</p>
                </div>
            )}
            <button onClick={() => deleteHandler(bookToDelete.id)} className="btn btn-success mb-2 ms-5">
                Delete
            </button>
            <button type="button" onClick={() => setViewState({ view: "list", id: 0 })} className="btn btn-warning mb-2 ms-2">
                Cancel
            </button>
        </div>
    );
}

export default DeleteBook;
