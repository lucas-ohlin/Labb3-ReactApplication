import axios from 'axios';

const BookDelete = (id) => {
    return new Promise ((resolve, reject) => {
        axios.delete(`https://localhost:7255/api/books/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert(`Book deleted successfully.`);
            }
            resolve();
        })
        .catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

export default BookDelete;