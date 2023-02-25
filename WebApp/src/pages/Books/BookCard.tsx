import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface Book {
    img: string,
    title: string,
    description: string,
    link: string,
    index: number
}

function BookCard( {img, title, description, link, index} :Book ) {
    console.log(index)
  return (
    <Card style={{ width: '18rem' }} key={index}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {description}
        </Card.Text>
        <Button variant="primary" >Go details</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;