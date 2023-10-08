import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Crud";
import getSingleBook from "../API/GetSingleBook";
import BookPut from "../API/BookPut";

function EditDetails({ id }) {
    const [bookToUpdate, setBookToUpdate] = useState({});
    const { vs } = useContext(Context);
    const [viewState, setViewState] = vs;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (bookId) => {
            const bookData = await getSingleBook(bookId);
            setBookToUpdate(bookData.data.result);
            setLoading(false);
        };
        fetchData(id);
    }, [id]);

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        author: "",
        year: "",
        genre: "",
        description: "",
        isLoanAble: false,
    });

    useEffect(() => {
        setFormData({
            id: bookToUpdate.id || "", 
            title: bookToUpdate.title || "",
            author: bookToUpdate.author || "",
            year: bookToUpdate.year || "",
            genre: bookToUpdate.genre || "",
            description: bookToUpdate.description || "",
            isLoanAble: bookToUpdate.isLoanAble || false,
        });
    }, [bookToUpdate]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleCheckBox = () => {
        setFormData({ ...formData, isAvailable: !formData.isAvailable });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedBook = {
            id: formData.id,
            title: formData.title,
            author: formData.author,
            year: parseInt(formData.year),
            genre: formData.genre,
            description: formData.description,
            isAvailable: formData.isAvailable,
        };

        await BookPut(updatedBook);

        setViewState({ view: "list", id: 0 });
    };

    return (
        <div className="d-flex justify-content-center">
            {loading ? (
                <p className="h5">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="w-100 px-5">
                    <h3 className="mt-3">Update book</h3>
                    <div className="mt-2">
                        <label htmlFor="title" className="h5 form-label"> Title </label>
                        <input value={formData.title} id="title" name="title" type="text" className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="author" className="h5 form-label"> Author </label>
                        <input value={formData.author} id="author" name="author" type="text" className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="genre" className="h5 form-label"> Genre </label>
                        <input value={formData.genre} id="genre" name="genre" type="text" className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="description" className="h5 form-label"> Description </label>
                        <input value={formData.description} id="description" name="description" type="text" className="form-control" onChange={handleChange}/>
                    </div>
					<div className="mt-2">
                        <label htmlFor="year" className="h5 form-label"> Year </label>
                        <input value={formData.year} id="year" name="year" type="number" className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="mt-2">
                        <label className="h5 form-check-label">
                            Loanable{" "}
                            <input checked={formData.isAvailable} value={formData.isAvailable} name="isLoanAble" type="checkbox" className="form-check-input ms-1" onChange={handleCheckBox}/>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success mb-2"> 
						Submit 
					</button>
                    <button type="button" onClick={() => setViewState({ view: "list", id: 0 })} className="btn btn-warning mb-2 ms-2">
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditDetails;
