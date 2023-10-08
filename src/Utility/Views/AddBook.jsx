import React, { useState } from "react";
import BookPost from "../API/BookPost";

function AddBook({ addBookHandle, listRenderer }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
		year: 0,
        isLoanAble: false,
    });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleCheckBox = () => {
        if (formData.isLoanAble) {
            formData.isLoanAble = false;
        } 
		else {
            formData.isLoanAble = true;
        }
    };

    const handleSubmit = async (event) => {
		event.preventDefault();
	  
		addBookHandle(false);
		const formattedYear = new Date(formData.year).toISOString();
	  
		const bookToCreate = {
			title: formData.title,
			author: formData.author,
			genre: formData.genre,
			description: formData.description,
			year: formattedYear,
			isLoanAble: formData.isLoanAble === "true",
		};
	  
		try {
			await BookPost(bookToCreate);
			listRenderer();
		} catch (error) {
		  	console.error("Error posting book:", error);
		}
	};

	return (
        <div className="d-flex justify-content-center">
			<form onSubmit={handleSubmit} className="w-200 px-5">
				<h3 className="mt-3">Add book</h3>
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
						Is Loanable
                       	<input value={formData.isLoanAble} name="isLoanAble" type="checkbox" className="form-check-input ms-1" onChange={handleCheckBox}/>
					</label>
                </div>
				<button type="submit" className="btn btn-success mt-2"> Submit </button>
                <button type="button" onClick={() => addBookHandle(false)} className="btn btn-warning mt-2 ms-2"> Cancel </button>
			</form>
        </div>
    );
}

export default AddBook;
