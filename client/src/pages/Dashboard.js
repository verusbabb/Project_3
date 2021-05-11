import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AddBtn from "../components/AddBtn";
import Card from "../components/Card";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import { useUserContext } from "../utils/userContext";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [state] = useUserContext();

  useEffect(() => {
    loadTrips();
  }, []);

  function loadTrips() {
    API.getTrips()
      .then((res) => {
        setTrips(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function removeTrip(id) {
    API.removeTrip(id)
      .then((res) => loadTrips())
      .catch((err) => console.log(err));
  }
  console.log(state);
  return (
    <>
      <Container>
        <Card>
          <Jumbotron>
            <h1>
              Welcome {state[0]?.firstName} {state[0]?.lastName}!
            </h1>
          </Jumbotron>
        </Card>
        <Card>
          <Row>
            <Col size="m12">
              <h2>My Trips</h2>
              <Link to="/createtrip">+ Add a trip</Link>
              {trips.length ? (
                <List>
                  {trips.map((trip) => (
                    <ListItem key={trip._id}>
                      <Link to={"/trips/" + trip._id}>
                        <strong>{trip.tripName}</strong>
                      </Link>
                      <DeleteBtn onClick={() => removeTrip(trip._id)} />
                      <p>
                        Dates: {trip.startDate} to {trip.endDate}
                      </p>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <h2>My Friends</h2>
            <p>Coming soon!</p>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default Dashboard;
