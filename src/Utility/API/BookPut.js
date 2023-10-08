import axios from 'axios';

const BookPut = (bookToUpdate) => {
    return new Promise((resolve, reject) => {
        axios.put("https://localhost:7255/api/books/", JSON.stringify(bookToUpdate), {
            headers: {
                "Content-Type": "application/json",
            },
        })
		.then((res) => {
			console.log(res);
			if (res.status === 200) {
				alert(`${res.data['result']['title']} updated`);
			}
			resolve();
		})
		.catch((err) => {
			console.log(err);
			reject(err);
		});
    });
}

export default BookPut;
