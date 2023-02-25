import BookCard from "./BookCard";
import "./Book.css";
import { Row, Col } from "react-bootstrap";

interface Book {
    img: string,
    title: string,
    description: string,
    link: string
}

const arrayChunk = (arr: Book[], num: number) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, num));
    return chunks;
};

function Book() {

    const bookInfo = [
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
        {img: "http://", title: "Book Title", description:"Some quick example text to build on the card title and make up the bulk of the card's content.", link: "http://"},
    ]

    const length = bookInfo.length;

    return ( 
        <>
        <div className="book_card_list">
            {arrayChunk(bookInfo, 5).map((row, i) => (
                <Row key={i}>
                    {row.map((colBook, index) => (
                        <BookCard img={colBook.img} description={colBook.description} title={colBook.title} link={colBook.link} index={index}/>
                    ))}
                </Row>
            ))}
        </div>
        </>
    );
}

export default Book;