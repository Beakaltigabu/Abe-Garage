import React from "react";
import SideBar from "../SideBar/SideBar";
import EditVehicle from "../../../Components/Admin/EditVehicle/EditVehicle";
import { Container, Row, Col } from "react-bootstrap";

function VehicleEdit() {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <EditVehicle />
        </Col>
      </Row>
    </Container>
  );
}

export default VehicleEdit;
