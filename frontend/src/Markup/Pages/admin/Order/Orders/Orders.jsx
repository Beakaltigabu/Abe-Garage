import React from "react";
import SideBar from "../../SideBar/SideBar";
import OrderList from "../../../../Components/Admin/OrderList/OrderList";
import { Container, Row, Col } from "react-bootstrap";

function Orders() {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <SideBar />
        </Col>
        <Col md={9}>
          <OrderList />
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
