import React, { Component } from 'react';
import { Label, Input, Form, FormGroup, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, ModalBody, Modal, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";



class Commande_Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders: [], //Table de toute les donnée
      orders_filtered: [],  //Table Filtrer
      orders_sliced: [],  //La table qui sera afficher Filtrer et Couper
      //Filtre
      id_bc_provider: "",
      id_provider: "", //<== Provider Name Instead
      date: "",
      date_start: "",
      date_end:"",
      etat: "",
      //Pagination
      number_Of_Bc_Per_Page: 10,
      index_Of_the_First_Bc: 0,
      index_Of_the_Last_Bc: 10,
      //Modals Orders Detail
      visible: false,
      order_detail: [{}],

    };

    this.getAllOrder = this.getAllOrder.bind(this);
    this.getOrderStatut = this.getOrderStatut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tableFiltre = this.tableFiltre.bind(this);
    this.paginate = this.paginate.bind(this);
    this.refresh_form = this.refresh_form.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount(){
    this.getAllOrder();
  }

  

  getAllOrder() {

    /* Decommenter ça pour mettre les exemples
    this.setState({
      orders_filtered: this.state.orders,
    })*/
    

    axios.get('http://localhost:4000/api/showBcFrs',
    {
      params : {
        token : Cookies.get("auth_Era_Auto_Admin")

      }
    },
    { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        console.log(res);
        if (res.status = 200) {
          this.setState({
            orders: res.data,
            orders_filtered: res.data,
            orders_sliced: res.data.sort((a, b) => a.id_bc_client < b.id_bc_client ? 1 : -1).slice(0, this.state.number_Of_Bc_Per_Page),
          })
        }
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })

  }

  handleChange(event) {
    
      this.setState({
        [event.target.name]: event.target.value
      });
    
   
  }

  //Filtre le tableaux orders dans orders filtered en fonction (dans l'ordre) de l'id, l'etat, la date, la période
  tableFiltre(){      
    
    const {t}= this.props
    var filtered = false

    var newOrderFiltered = this.state.orders.sort((a, b) => a.id_bc_client > b.id_bc_client ? 1 : -1); 

    var date = new Date(this.state.date);
    var start_date = new Date(this.state.date_start);
    var end_date = new Date(this.state.date_end);

    
    //ID
    if (this.state.id_bc_provider != "" && this.state.id_bc_provider != null) {
      console.log("je passe id")

      newOrderFiltered = newOrderFiltered.filter( e => e.id_Bc_Frs == this.state.id_bc_provider);
      filtered = true

      
    }
    //Name
    if (this.state.id_provider != "" && this.state.id_provider != null) {
      console.log("je passe nom")

      newOrderFiltered = newOrderFiltered.filter(e => e.name.toLowerCase().includes(this.state.id_provider.toLowerCase()));
      filtered = true

    }
    //DATE
    if (this.state.date != null && this.state.date != ""){
      console.log("je passe date")

      newOrderFiltered = newOrderFiltered.filter( e => new Date(e.date_Bc_Frs).getDate() == date.getDate() &&  new Date(e.date_Bc_Frs).getMonth() == date.getMonth() && new Date(e.date_Bc_Frs).getFullYear() == date.getFullYear());
      filtered = true

    }
    //PERIODE
    else if (this.state.date_start != null && this.state.date_start != "" && this.state.date_end != null && this.state.date_end != "" ){
      console.log("je passe periode")
      

      newOrderFiltered = newOrderFiltered.filter( e => new Date(e.date_Bc_Frs).getTime() >= start_date.getTime() && new Date(e.date_Bc_Frs).getTime() <= end_date.getTime());
      filtered = true

    }
    
    //Update du State
    this.setState({
      orders_filtered: newOrderFiltered,
      orders_sliced: newOrderFiltered.slice(this.state.index_Of_the_First_Bc, this.state.index_Of_the_Last_Bc),
      
    })   

  }

  //Change la Page 
  paginate(number){    
    var newStart = (number - 1) * this.state.number_Of_Bc_Per_Page;
    var newEnd = this.state.number_Of_Bc_Per_Page + newStart;

    //Update du state
    this.setState({
      index_Of_the_First_Bc : newStart,
      index_Of_the_Last_Bc: newEnd,
      orders_sliced: this.state.orders_filtered.slice(newStart, newEnd),
    }) 

  }

  //Open Modal Order Detail from ID
  openModal(id) {

    axios.get('http://localhost:4000/api/showProduitFromBcProvider', {
      params: {
        id_bc_frs: id,
        token : Cookies.get("auth_Era_Auto_Admin")
      }
    }, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res.data);
        this.setState({
          order_detail: res.data,
          visible: true
        })
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })

  }

  closeModal() {
    this.setState({
      visible: false,
      alertVisible: false,
    })
  }
  

  getOrderStatut(etat) {
    //Translate
    const { t } = this.props;

    switch (etat) {
      case 0:
        return <Badge color="warning">{t("tables_info.states.in_progress")} </Badge>
      case 1:
        return <Badge color="info">{t("tables_info.states.recieved")} </Badge>
      default:
        return <p>Error</p>
    }
    return <Badge color="success">{t("tables_info.states.open")}</Badge>
  }

  refresh_form() {
    this.setState({
      id_provider: "",
      id_bc_provider: "",
      date: "",
      date_start: "",
      date_end:"",
      etat: "",
    })

    this.getAllOrder();
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
                <i className="fa fa-align-justify"> {t("Commande_Fournisseur.title")} </i>
                </Col>
                <Col sm={{ size: 'auto'}}>
                  <Button color='primary' onClick={this.refresh_form} > {t("utils.refresh_table")}</Button>
                </Col>
                </Row>         
              </CardHeader>
              <CardBody>
              <Form>
                  <FormGroup>
                    <Row>                      
                      <Col xs="4">
                        <Label>
                        {t("tables_info.id_order")} :
                        </Label>
                        <Input type="text" name="id_bc_provider"  onChange={this.handleChange} placeholder="ID" value={this.state.id_bc_provider} /> 
                      </Col>
                      <Col xs="4">
                        <Label>
                        {t("tables_info.provider")} :
                        </Label>
                        <Input type="text" name="id_provider"  onChange={this.handleChange} placeholder="Provider Name" value={this.state.id_provider} /> 
                      </Col>
                    </Row>
                    <Row>                      
                      <Col xs="4">
                        <Label>
                        {t("filters.date")} :
                        </Label>
                        <Input type="date"  name="date" onChange={this.handleChange} placeholder="date" value={this.state.date} />
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
                          <Input type="date"  name="date_start" onChange={this.handleChange} placeholder="date" value={this.state.date_start} />
                        </Col>                      
                        <Col xs="6">
                          <Label >
                          {t("filters.end_period")} :
                          </Label>
                          <Input type="date"  name="date_end" onChange={this.handleChange} placeholder="date" value={this.state.date_end} />
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
                      <th>{t("tables_info.order")}</th>
                      <th>{t("filters.date")}</th>
                      <th>{t("tables_info.provider")}</th> 
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.orders_sliced.map((value, index) => {
                      return <tr key={index}>
                        <td>{value.id_Bc_Frs}</td>
                        <td>{new Date(value.date_Bc_Frs).toLocaleDateString()}</td>
                        <td>{value.name}</td> 
                        <td>
                          <Button color="primary" onClick={() => this.openModal(value.id_Bc_Frs)}> {t("tables_info.detail")} </Button>
                        </td>
                      </tr>
                    })}                   
                   
                  </tbody>
                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_Bc_Per_Page} total_Data={this.state.orders_filtered.length} paginate={this.paginate}/>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Modal isOpen={this.state.visible} width="400" height="300" effect="fadeInUp" toggle={() => this.closeModal()}>
            <ModalHeader toggle={() => this.closeModal()}>
            {t("tables_info.order")} <Badge color="primary">{this.state.order_detail[0].id_bc_frs} </Badge> 
            </ModalHeader>
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>{t("tables_info.product_name")}</th>
                    <th>{t("tables_info.client_order_id")}</th>
                    <th>{t("tables_info.quantity")}</th>
                    <th>{t("tables_info.price")}</th>
                    <th>{t("tables_info.states.state")}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.order_detail.map((value, index) => {
                    return <tr key={index}>
                      <td>{value.product}</td>
                      <td>{value.id_client_order}</td>
                      <td>{value.quantite}</td>
                      <td>{value.price}</td>
                      <td>{this.getOrderStatut(value.received)}</td>
                    </tr>
                  })}
                </tbody>                  

              </Table>
            </ModalBody>
          </Modal>
        </Row>
      </div>

    );
  }
}

const Commande_Client_Translated = withTranslation('common')(Commande_Client)


export default Commande_Client_Translated;
