import axios from 'axios';

const BookPost = (bookToCreate) => {
    return new Promise((resolve, reject) => {
        axios.post("https://localhost:7255/api/books", JSON.stringify(bookToCreate), {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert(`Book added to library`);
            }
            resolve(); 
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 400) {
                alert( "Error: " + err);
            }
            reject(err);
        });
    });
}

export default BookPost;
