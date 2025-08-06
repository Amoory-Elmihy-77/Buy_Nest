import { NavLink } from "react-router-dom";
import { HeaderBasket, HeaderWishlist } from "../../ecommerce";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { useEffect } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";

const { headerContainer, headerLogo, headerLeftBar } = styles;

export default function Header() {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    if (accessToken) dispatch(actGetWishlist("productsIds"));
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Buy</span> <Badge bg="info">Nest</Badge>
        </h1>
        <div className={headerLeftBar}>
          <HeaderWishlist />
          <HeaderBasket />
        </div>
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            <Nav>
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={NavLink} to="profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="profile/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/"
                    onClick={() => dispatch(authLogout())}
                    className="bg-black"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
