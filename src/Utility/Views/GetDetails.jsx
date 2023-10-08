import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Crud";
import getSingleBook from "../API/GetSingleBook";

function GetDetails({id}) {

    const [book, setBook] = useState({});
    const { vs } = useContext(Context);
    const [viewState, setViewState] = vs;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (bookId) => {
            const bookData = await getSingleBook(bookId);
            setBook(bookData.data.result);
            setLoading(false);
        };
        fetchData(id);
    }, []);

    return (
        <div>
			<h4>Details</h4>
            <ul className="list-group">
                {loading ? (
                    <p className="h5">Loading...</p>
                ) : (
                    Object.entries(book).map((item, key) => {
                        if (typeof item[1] != "boolean") {
                            return (
                                <li key={key} className="list-group-item ps-5 pt-2">
                                    <strong>{item[0]} :</strong> {item[1]}
                                </li>
                            );
                        }
                    })
                )}
            </ul>
            <button onClick={() => setViewState({ view: "list", id: 0 })} className="btn btn-primary ms-5 mt-2 mb-2"> Return to list </button>
        </div>
    );
}

export default GetDetails;
