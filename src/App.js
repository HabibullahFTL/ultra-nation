import './App.css';
import { useEffect, useState } from 'react';
import { CardColumns, Card, Button, Modal, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      })
  }, []);
  const [favCountryList, setFavCountries] = useState([]);
  const favCountryHandler = (favCountry) => {
    const favouritCountries = [...favCountryList, favCountry];
    setFavCountries(favouritCountries);
  }
  return (
    <div className="container">
      <h4 className="text-center my-2">Total Country: {countries.length} <Example favCountryList={favCountryList}></Example></h4>
      <CardColumns>
        {countries.map(country => {
          const { name, flag, alpha3Code, currencies, capital, languages, population } = country;
          return (<Card key={alpha3Code} >
            <Card.Body>
              <Card.Img variant="top" src={flag} className="w-50 d-block m-auto img-thumbnail" />
              <Card.Title>{name}</Card.Title>
              <p><b>Capital:</b> {capital}</p>
              <p><b>Capital:</b> {population}</p>
              <p><b>Currencies:</b>
                {currencies.map(currency => " " + currency.name + " (" + currency.symbol + "), ")}
              </p>
              <p><b>Languages:</b>
                {languages.map(language => " " + language.name + ", ")}
              </p>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button onClick={() => favCountryHandler(country)}> <i className="fas fa-plus"></i> Add this country on favourit</Button>
            </Card.Footer>
          </Card>)
        })}
      </CardColumns>
    </div>
  );
}

function Example(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const {name, flag, alpha3Code, currencies, capital, languages, population} = country;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Show your favourit countries
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Favourit Country List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Country Flag</th>
                <th>Country Name</th>
              </tr>
            </thead>
            <tbody>
              {props.favCountryList.map(fav => {
                return <tr>
                <td><img src={fav.flag} style={{width:"80px"}}/></td>
                <td>{fav.name}</td>
              </tr>
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
