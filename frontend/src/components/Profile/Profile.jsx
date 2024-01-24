import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';




function Profile() {

    const { user } = useContext(AuthContext);

    const photo = `http://localhost:3000/photos/${user.id}/${user.photo}`


return (
    <section>
    <Container className="container py-5">
        <Row className="justify-content-center align-items-center h-100">
        <Col lg="9" xl="7">
            <Card className="border-0 mb-4 p-4 w-100">
                <Card.Title className="d-flex align-items-center mx-auto">
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <Image src={photo} alt="Profile photo" className="img-thumbnail rounded-circle " style={{ width: '150px', height: '150px', objectFit: 'cover', objectPosition: 'center'   }}/>
                <Card.Text className="text-center mb-1 mt-md-4 fw-bold text-black">  {user.nickName} </Card.Text>
                <Button className='btn btn-primary w-100 mt-3'> Edit profile </Button>
                    </div>
            </Card.Title>
            <div className="p-4 text-black">
                <div className="d-flex justify-content-center text-center mb-3 ">
                <div className="px-3">
                    <Card.Text className="mb-1 h5">1026</Card.Text>
                    <Card.Text className="small text-muted mb-0">Posts</Card.Text>
                </div>
                <div>
                    <Card.Text className="mb-1 h5">478</Card.Text>
                    <Card.Text className="small text-muted mb-0">Likes</Card.Text>
                </div>
                </div>
            </div>
            <Card.Body className="text-black p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Text className="lead fw-normal mb-0">Recent recommendations</Card.Text>
                </div>
                
                <Row>
                <Col className="mb-2">
                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                    alt="image 1" className="w-100 rounded-3" />
                </Col>
                <Col className="mb-2">
                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                    alt="image 1" className="w-100 rounded-3" />
                </Col>
                </Row>
                <Row className="g-2">
                <Col className="mb-2">
                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                    alt="image 1" className="w-100 rounded-3" />
                </Col>
                <Col className="mb-2">
                    <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                    alt="image 1" className="w-100 rounded-3" />
                </Col>
                </Row>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    </section>
    )
}


export default Profile;