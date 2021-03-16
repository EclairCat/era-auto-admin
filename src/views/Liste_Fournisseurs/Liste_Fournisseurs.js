import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader, Row, Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";


class Liste_Fournisseurs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      provider: [], //Table des données de tout les clients
      provider_sliced: [], //Table Couper pour la pagination
      provider_filtered: [], //Table Filtrer pour le Filtre

      //Pagination
      index_Of_Last_provider: 10, //Index de Pagination
      index_Of_First_provider: 0,//Index de Pagination
      number_Of_provider_Per_Page: 10, //Nombre de client par page (Pagination)
      //Filtre
      provider_id: "",
      name: "",
      date: "",
      date_start: "",
      date_end: "",
      //AlertBox
      alertVisible: false,
      alertMessage: "",
    };

    this.getAllProvider = this.getAllProvider.bind(this);
    this.paginate = this.paginate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refresh_form = this.refresh_form.bind(this);
    this.tableFiltre = this.tableFiltre.bind(this);
  }

  getAllProvider() {

    axios.get('http://localhost:4000/api/showProvider',
    {
      params : {
        token : Cookies.get("auth_Era_Auto_Admin")
      }
    },
    { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        if (res.status = 200) {
          this.setState({
            provider: res.data,
            provider_filtered: res.data.sort((a, b) => a.id_provider > b.id_provider ? 1 : -1),
            provider_sliced: res.data.sort((a, b) => a > b ? 1 : -1).slice(this.state.index_Of_First_provider, this.state.number_Of_provider_Per_Page),
          });
        }

      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(error);
      })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Change la Page 
  paginate(number) {
    var newStart = (number - 1) * this.state.number_Of_provider_Per_Page;
    var newEnd = this.state.number_Of_provider_Per_Page + newStart;

    this.setState({
      index_Of_First_provider: newStart,
      index_Of_Last_provider: newEnd,
      provider_sliced: this.state.provider_filtered.slice(newStart, newEnd),
    })

  }

  refresh_form() {
    this.setState({
      provider_id: "",
      name: "",
      date: "",
      date_start: "",
      date_end: "",
    })
    this.getAllProvider()
  }

  //Filtre le tableaux orders dans orders filtered en fonction (dans l'ordre) de l'id, le nom, la date, la période
  tableFiltre() {

    const {t}= this.props
    var filtered = false


    var newProviderFiltered = this.state.provider.sort((a, b) => a.id_provider < b.id_provider ? 1 : -1);

    var date = new Date(this.state.date);
    var start_date = new Date(this.state.date_start);
    var end_date = new Date(this.state.date_end);

    console.log(this.state)

    //ID
    if (this.state.provider_id != "" && this.state.provider_id != null) {

      console.log("je passe id")

      newProviderFiltered = newProviderFiltered.filter(e => e.id_provider == this.state.provider_id);
      filtered = true
    }
    //Name
    if (this.state.name != "" && this.state.name != null) {
      console.log("je passe nom")

      newProviderFiltered = newProviderFiltered.filter(e => e.name.toLowerCase().includes(this.state.name.toLowerCase()));
      filtered = true

    }

    //DATE
    if (this.state.date != null && this.state.date != "") {
      console.log("je passe date")

      newProviderFiltered = newProviderFiltered.filter(e => new Date(e.date_register).getDate() == date.getDate() &&  new Date(e.date_register).getMonth() == date.getMonth() && new Date(e.date_register).getFullYear() == date.getFullYear());
      filtered = true

    }
    //PERIODE
    if (this.state.date_start != null && this.state.date_start != "" && this.state.date_end != null && this.state.date_end != "") {
      console.log("je passe periode")

      newProviderFiltered = newProviderFiltered.filter(e => new Date(e.date_register).getTime() >= start_date.getTime() && new Date(e.date_register).getTime() <= end_date.getTime());
      filtered = true

    }


   if(!filtered)
    {
      this.setState({
        alertVisible: true,
        alertMessage: t("filters.insert_param")        
      })
    }

    if (newProviderFiltered.length == 0) {
      this.setState({
        alertVisible: true,
        alertMessage: t("filters.no_result")   
      })
    }

    //Update du State
    this.setState({
      provider_filtered: newProviderFiltered,
      provider_sliced: newProviderFiltered.slice(this.state.index_Of_First_provider, this.state.index_Of_Last_provider),
    })

  }



  componentDidMount() {
    this.getAllProvider();
  }

  render() {
    //Translate
    const { t } = this.props;
    return (
      <div className="animated fadeIn">

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <i className="fa fa-align-justify"> {t("Liste_Fournisseurs.title")} </i>
                  </Col>
                  <Col sm={{ size: 'auto' }}>
                    <Button color='primary' onClick={this.refresh_form} > {t("utils.refresh_table")}</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                  {this.state.alertMessage}
                </Alert>
                <Form>
                  <FormGroup>
                    <Row>

                      <Col xs="4">
                        <Label>
                        {t("tables_info.id_client")} :
                        </Label>
                        <Input type="text" name="provider_id" onChange={this.handleChange} placeholder="ID" value={this.state.provider_id} />
                      </Col>

                      <Col xs="4">
                        <Label>
                        {t("tables_info.name")} :
                        </Label>
                        <Input type="text" name="name" onChange={this.handleChange} placeholder="Provider's name" value={this.state.name} />
                      </Col>


                    </Row>
                    <Row>
                      <Col xs="4">
                        <Label>
                        {t("filters.date")} :
                        </Label>
                        <Input type="date" id="date-input" name="date" onChange={this.handleChange} placeholder="date" value={this.state.date} />
                      </Col>
                      <Col xs="8">
                        <Row>
                          <Label >
                          {t("filters.period")} :
                        </Label>
                        </Row>
                        <Row>
                          <Col xs="6">
                            <Label >
                            {t("filters.start_period")} :
                          </Label>
                            <Input type="date" id="date-input" name="date_start" onChange={this.handleChange} placeholder="date" value={this.state.date_start} />
                          </Col>
                          <Col xs="6">
                            <Label >
                            {t("filters.end_period")} :
                          </Label>
                            <Input type="date" id="date-input" name="date_end" onChange={this.handleChange} placeholder="date" value={this.state.date_end} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="11">
                      </Col>
                      <Col xs="1">
                        <Button color="success" onClick={this.tableFiltre}> {t("filters.search")}</Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>

                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>{t("tables_info.id")}</th>
                      <th>{t("tables_info.provider")}</th>
                      <th>{t("tables_info.phone")}</th>
                      <th>{t("tables_info.date_registration")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.provider_sliced.map((value, index) => {
                      return <tr key={index}>
                        <td>{value.id_provider}</td>
                        <td>{value.name}</td>
                        <td>{value.telephone}</td>
                        <td>{new Date(value.date_register).toLocaleDateString()}</td>
                      </tr>
                    })}
                  </tbody>

                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_provider_Per_Page} total_Data={this.state.provider_filtered.length} paginate={this.paginate} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

const Liste_Fournisseurs_Translated = withTranslation('common')(Liste_Fournisseurs)


export default Liste_Fournisseurs_Translated;
