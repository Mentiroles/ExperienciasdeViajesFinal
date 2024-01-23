import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Profile() {

    const { user } = useContext(AuthContext);
    
return (
    <section>
    <Container className="container py-5">
        <Row className="justify-content-center align-items-center h-100">
        <Col lg="9" xl="7">
            <Card className="border-0 mb-4 p-4 w-100">
                <Card.Title className="d-flex align-items-center mx-auto">
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail rounded-circle d-flex justify-content-center"/>
                <Card.Text className="text-center mb-1 mt-md-4">  {user.nickName} </Card.Text>
                                <Button className='btn btn-rounded mt-md-4'>
                    Edit profile
                </Button>
                </div>
            </Card.Title>
            <div className="p-4 text-black mt-5">
                <div className="d-flex justify-content-center text-center py-1">
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


export default Profile