import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation, withTranslation } from "react-i18next";
import i18next from '../../../i18next';


import language_icon from '../../../assets/flag_langage/language.png';
import en_flag from '../../../assets/flag_langage/en.png';
import fr_flag from '../../../assets/flag_langage/fr.png';
import ru_flag from '../../../assets/flag_langage/ru.png';



class Login extends Component {

  constructor(props) {
    super(props);


    this.state = {
      email: "",
      password: "",
      redirection: false,
      dropdownOpen: false,
      lg: i18next.languages[0]
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getlangage = this.getlangage.bind(this);
    this.get_render_langage = this.get_render_langage.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  toggle() {
    let open;

    if (this.state.dropdownOpen) {
      open = false
    }
    else {
      open = true;
    }

    this.setState({
      dropdownOpen: open
    })
  }


  login() {

    axios.post("http://localhost:4000/api/loginAdmin",
      {
        email: this.state.email,
        password: this.state.password
      },
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {

        console.log(res.data)

        if (res.status == 200) {
          Cookies.set('auth_Era_Auto_Admin', res.data);
          this.setState({
            redirection: true,
          })
        }

      })
      .catch(error => {
        window.confirm("Email or Password Incorrect");
      })

  }

  getlangage(lg) {
    i18next.changeLanguage(lg)
    this.setState({
      lg: lg
    })
  }

  get_render_langage(lg) {
    const { t } = this.props

    switch (lg) {
      case 'en':
        return <DropdownToggle caret>{t("translate.en")}  <img width="25" src={en_flag} /></DropdownToggle>
        break;

      case 'fr':
        return <DropdownToggle caret>{t("translate.fr")}  <img width="25" src={fr_flag} /></DropdownToggle>
        break;

      case 'ru':
        return <DropdownToggle caret>{t("translate.ru")}  <img width="25" src={ru_flag} /></DropdownToggle>
        break;

      default:
        return <DropdownToggle caret> {t("translate.title")} <img width="20" src={language_icon} /></DropdownToggle>
        break;
    }
  }


  render() {

    if (this.state.redirection) {
      return <Redirect to='/' />
    }

    const { t } = this.props;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>{t("login.title")}</h1>
                      <h1>{t("login.login")}</h1>
                      <p className="text-muted">{t("login.sign_in")}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="email" placeholder={t("tables_info.email")} autoComplete="email" value={this.state.email} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder={t("login.password")} autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="success" className="px-4" onClick={this.login}>{t("login.login")}</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">{t("login.forgot")}</Button>
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            {this.get_render_langage(this.state.lg)}
                            <DropdownMenu>
                              <DropdownItem header>{t("translate.msg")}</DropdownItem>
                              <DropdownItem onClick={() => this.getlangage('en')}>{t("translate.en")} <img width="25" src={en_flag} /> </DropdownItem>
                              <DropdownItem onClick={() => this.getlangage('fr')}>{t("translate.fr")} <img width="25" src={fr_flag} /></DropdownItem>
                              <DropdownItem onClick={() => this.getlangage('ru')}>{t("translate.ru")} <img width="25" src={ru_flag} /></DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const Login_Translated = withTranslation('common')(Login)


export default Login_Translated;
