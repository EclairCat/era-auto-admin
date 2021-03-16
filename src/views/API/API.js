import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { useTranslation, withTranslation } from "react-i18next";
import Pagnations from '../Usable/Pagnations';
import axios from 'axios';
import Cookies from 'js-cookie';



class API extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getApiList = this.getApiList.bind(this);
    this.add_api = this.add_api.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.reset_form = this.reset_form.bind(this);
    this.delete_api = this.delete_api.bind(this);



    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

      //API Form Data
      ip_prov: "",
      api_link: "",
      key1: "",
      key2: "",
      key3: "",
      key4: "",


      //Pagination and Tables
      primary_table: [], //Table des données 
      table_sliced: [], //Table Couper pour la pagination
      index_Of_Last_Item: 5, //Index de Pagination
      index_Of_First_Item: 0,//Index de Pagination
      number_Of_Item_Per_Page: 5, //Nombre d'item par page (Pagination)

      //Modal
      modalDetail: {
        title: "",
        body: "",
        footer: "",
        visible: false,
        width: 400,
        height: 300,
      },
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  add_api(event) {

    event.preventDefault();

    console.log(this.state);


    axios.post('http://localhost:4000/api/addAPI',
      {
        ip: this.state.ip_prov,
        link: this.state.api_link,
        key1: this.state.key1,
        key2: this.state.key2,
        key3: this.state.key3,
        key4: this.state.key4,
        token: Cookies.get("auth_Era_Auto_Admin")

      },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {

        if (res.status = 200) {
          this.openModal("Success!", "API Added!");
          this.getApiList();
        }
        console.log(res);
        console.log(this.state);
      })
      .catch(error => {
        this.openModal("Error!", "Please try again")
        console.log(this.state);
      })

  }

  delete_api(ip) {

    axios.post("http://localhost:4000/api/deleteAPI", {
      token: Cookies.get("auth_Era_Auto_Admin"),
      ip: ip,
    },
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {

        console.log(res);
        if (res.status = 200) {
          console.log("SUC!")
          this.openModal("Success!", "API DELETED!");
          this.getApiList()

        }
      })
      .catch(error => {
        this.openModal("Error!", "please retry");
        console.log(this.state);
      })

  }

  getApiList() {

    axios.get("http://localhost:4000/api/getAPI", {
      params: {
        token: Cookies.get("auth_Era_Auto_Admin")
      }
    },
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        if (res.status = 200) {
          this.setState({
            primary_table: res.data,
            table_sliced: res.data.sort((a, b) => a.Id < b.Id ? 1 : -1).slice(this.state.index_Of_First_Item, this.state.number_Of_Item_Per_Page)
          });
        }
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })
  }

  closeModal() {
    this.setState({
      modalDetail: {
        visible: false,
      }
    })
  }

  openModal(title, body) {
    this.setState({
      modalDetail: {
        visible: true,
        title: title,
        body: body,
      },
    })
  }

  reset_form() {
    this.setState({
      ip_prov: "",
      api_link: "",
      key1: "",
      key2: "",
      key3: "",
      key4: "",
    })
  }

  componentDidMount() {
    this.getApiList()
  }

  render() {
    const { t } = this.props;
    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modalDetail.visible} width={this.state.modalDetail.width} height={this.state.modalDetail.height} toggle={() => this.closeModal()}>
          <ModalHeader toggle={() => this.closeModal()}>
            {this.state.modalDetail.title}
          </ModalHeader>
          <ModalBody>
            {this.state.modalDetail.body}
          </ModalBody>
        </Modal>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>{t("api.add")}</strong> {t("api.API")}
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label > {t("api.ip_provider")} </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.ip_prov} onChange={this.handleChange} name="ip_prov" />
                      <FormText color="muted">{t("api.msg_ip")} </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label> {t("api.api_l")} </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.api_link} onChange={this.handleChange} name="api_link" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>{t("api.key")} 1</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.key1} onChange={this.handleChange} name="key1" />
                      <FormText className="help-block"> {t("api.api_enter_key")}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>{t("api.key")} 2</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.key2} onChange={this.handleChange} name="key2" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>{t("api.key")} 3</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.key3} onChange={this.handleChange} name="key3" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>{t("api.key")} 4</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" value={this.state.key4} onChange={this.handleChange} name="key4" />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button onClick={this.add_api} color="success"> {t("api.button.confirm")}</Button>
                <Button onClick={this.reset_form} color="danger"> {t("api.button.reset")}</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <i className="fa fa-align-justify">{t("api.table_title")} </i>
                  </Col>
                  <Col sm={{ size: 'auto' }}>
                    <Button color='primary' onClick={this.getApiList} >{t("admin_user.refresh_table")}</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>{t("tables_info.id")}</th>
                      <th>{t("tables_info.ip_p")}</th>
                      <th>{t("tables_info.api_link")}</th>
                      <th>{t("tables_info.key")} 1</th>
                      <th>{t("tables_info.key")} 2</th>
                      <th>{t("tables_info.key")} 3</th>
                      <th>{t("tables_info.key")} 4</th>
                      <th>{t("tables_info.action")} </th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.table_sliced.map((value, index) => {
                      return <tr key={index}>
                        <td>{value.Id}</td>
                        <td>{value.Ip_Frs}</td>
                        <td>{value.LinkAPI}</td>
                        <td>{value.Key1}</td>
                        <td>{value.Key2}</td>
                        <td>{value.Key3}</td>
                        <td>{value.Key4}</td>
                        <td><Button onClick={() => this.delete_api(value.Ip_Frs)} color="danger"> {t("admin_user.button_del")}</Button></td>
                      </tr>
                    })}
                  </tbody>
                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_Item_Per_Page} total_Data={this.state.table_sliced.length} paginate={this.paginate} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
const API_Translated = withTranslation('common')(API)

export default API_Translated;
