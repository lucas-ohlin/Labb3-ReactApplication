import axios from "axios";

const getSingleBook = (id) => {
  	return new Promise((resolve, reject) => {
		axios.get(`https://localhost:7255/api/books/${id}`).then((res) => {
			console.log(res);
			resolve(res);
		})
		.catch((err) => {
			console.log(err);
			reject(err);
		});
  	});
};

export default getSingleBook;