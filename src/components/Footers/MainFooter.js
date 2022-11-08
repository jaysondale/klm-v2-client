/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class MainFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h3 className="text-primary font-weight-light">Thank you for visiting!</h3>
                <h5 className="font-weight-light">Get the latest updates by <b>following us on social media!</b></h5>
              </Col>
              <Col className="text-lg-center btn-wrapper d-flex justify-content-md-end" lg="6">
                <Button
                  className="btn-icon-only rounded-circle"
                  color="instagram"
                  href="https://instagram.com/kennisislakemarina"
                  id="tooltip475038074"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-instagram" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip475038074">
                  Follow us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="facebook"
                  href="https://www.facebook.com/kennsislakemarina"
                  id="tooltip837440414"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-facebook-square" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip837440414">
                  Like us
                </UncontrolledTooltip>
                <Button
                  className="btn-icon-only rounded-circle ml-1"
                  color="github"
                  href="tel:7057542352"
                  id="tooltip495507257"
                  target="_blank"
                >
                  <span className="btn-inner--icon">
                    <i className="fa fa-phone" />
                  </span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip495507257">
                  Call us
                </UncontrolledTooltip>
              </Col>
            </Row>
            <hr />
            <Row className="align-items-center justify-content-end">
              <div className="col-md-9">
              <Nav className="nav-footer">
                  <NavItem>
                    <NavLink
                      href="/rentals"
                    >
                      Rentals
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/service"
                      target="_blank"
                    >
                      Service
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/events"
                      target="_blank"
                    >
                      Events
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/apparel"
                      target="_blank"
                    >
                      Apparel
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/food-drink"
                      target="_blank"
                    >
                      Food &amp; Drink
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/kennisis-courts"
                      target="_blank"
                    >
                      Kennisis Courts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/about"
                      target="_blank"
                    >
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="/contact"
                      target="_blank"
                    >
                      Contact
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <div class="col-md-3 d-flex justify-content-md-end">
                <div className=" copyright">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href="https://www.linkedin.com/in/jaysondale"
                    target="_blank"
                  >
                    Jayson Dale
                  </a>
                </div>
              </div>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default MainFooter;
