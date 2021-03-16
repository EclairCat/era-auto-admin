import React, { Component } from 'react';
import { Alert, Label, Input, Form, FormGroup, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";



class Commande_Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      orders_filtered: [],
      orders_sliced: [],
      //Filtre
      id_bc_client:"", //<= Id Order Instead
      client_id: "", //<= Client Name Instead
      date: "",
      date_start: "",
      date_end: "",
      etat: "",
      //Pagination
      number_Of_Bc_Per_Page: 10,
      index_Of_the_First_Bc: 0,
      index_Of_the_Last_Bc: 10,
      //Modals Orders Detail
      visible: false,
      order_detail: [{}],
      //AlertBox
      alertVisible: false,
      alertMessage: "",
      alertColor: "",
      //Confirm Modal
      confirmVisible: false,
      id_bc_client_for_cancel: "",


    };

    this.getAllOrder = this.getAllOrder.bind(this);
    this.getOrderStatut = this.getOrderStatut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.tableFiltre = this.tableFiltre.bind(this);
    this.paginate = this.paginate.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getPrix = this.getPrix.bind(this);
    this.refresh_form= this.refresh_form.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.openModalCancelOrder = this.openModalCancelOrder.bind(this);
  }

  componentDidMount() {
    this.getAllOrder();
  }

  

  //WIP
  getPrix(id) {
    var order = this.state.orders_filtered.find(element => element.id_bc_client == id) //<= comment récupérer le prix ??
    return "Error"
  }

  /*
  *  GET METHODS
  */

  getAllOrder() {
    axios.get('http://localhost:4000/api/showBlClient',
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
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })

  }

  getOrderStatut(etat) {
    const { t } = this.props;

    switch (etat) {
      case 0:
        return <Badge color="success"> {t("tables_info.states.open")}</Badge>
      case 1:
        return  <Badge color="info">{t("tables_info.states.recieved")} </Badge>
      case 2:
        return  <Badge color="warning">{t("tables_info.states.in_progress")}</Badge>
      case 3:
        return <Badge color="danger">{t("tables_info.states.closed")}</Badge>
      case 4:
        return <Badge color="danger">{t("tables_info.states.rejected")}</Badge>
      default:
        return <p>{t("utils.error_msg")}</p>
    }
   
  }

  //EVENT METHODS

  closeModal() {
    this.setState({
      visible: false,
      alertVisible: false,
      confirmVisible : false,
    })
  }

  //Open Modal Order Detail from ID
  openModal(id) {

    axios.get('http://localhost:4000/api/showProduitFromBcClient', {
      params: {
        id_bc_client: id,
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

  handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
  

  }

  //Filtre le tableaux orders dans orders filtered en fonction (dans l'ordre) de l'id, l'etat, la date, la période
  tableFiltre() {
    const { t } = this.props
    var filtered = false;



    var newOrderFiltered = this.state.orders.sort((a, b) => a.id_bc_client < b.id_bc_client ? 1 : -1);

    var date = new Date(this.state.date);
    var start_date = new Date(this.state.date_start);
    var end_date = new Date(this.state.date_end)

    //ID
    if (this.state.id_bc_client != "" && this.state.id_bc_client != null && newOrderFiltered.length != 0) {
      console.log("je passe id")

      newOrderFiltered = newOrderFiltered.filter(e => e.id_bc_client == this.state.id_bc_client);
      filtered = true;



    }
    //Name
    if (this.state.client_id != "" && this.state.client_id != null && newOrderFiltered.length != 0) {
      console.log("je passe name")

      

      newOrderFiltered = newOrderFiltered.filter(e => (e.last_name + " " + e.first_name).toLowerCase().includes(this.state.client_id.toLowerCase()));
      filtered = true;


    }
    //ETAT
    if (this.state.etat != null && this.state.etat != "" && newOrderFiltered.length != 0) {
      console.log("je passe etat")

      newOrderFiltered = newOrderFiltered.filter(e => e.etat.data[0] == this.state.etat);
      filtered = true;

    }

    //DATE
    if (this.state.date != null && this.state.date != "" && newOrderFiltered.length != 0) {
      console.log("je passe date")

      newOrderFiltered = newOrderFiltered.filter(e =>  new Date(e.CreatedAt).getDate() == date.getDate() &&  new Date(e.CreatedAt).getMonth() == date.getMonth() && new Date(e.CreatedAt).getFullYear() == date.getFullYear());
      filtered = true;

    }
    //PERIODE
    if (this.state.date_start != null && this.state.date_start != "" && this.state.date_end != null && this.state.date_end != "" && newOrderFiltered.length != 0) {
      console.log("je passe periode")

      newOrderFiltered = newOrderFiltered.filter(e => new Date(e.CreatedAt).getTime() >= start_date.getTime() && new Date(e.CreatedAt).getTime() <= end_date.getTime());
      filtered = true;

    }

    if(newOrderFiltered.length == 0){
      this.setState({
        alertVisible: true,
        alertMessage: t("filters.no_result"),
        alertColor: "danger"
      })
    }

    if(!filtered)
    {
      this.setState({
        alertVisible: true,
        alertMessage: t("filters.insert_param"),
        alertColor: "danger"
      })
    }
    

    //Update du State
    this.setState({
      orders_filtered: newOrderFiltered,
      orders_sliced: newOrderFiltered.slice(this.state.index_Of_the_First_Bc, this.state.index_Of_the_Last_Bc),
    })



  }

  //PAGINATION
  paginate(number) {
    var newStart = (number - 1) * this.state.number_Of_Bc_Per_Page;
    var newEnd = this.state.number_Of_Bc_Per_Page + newStart;

    //Update du state
    this.setState({
      index_Of_the_First_Bc: newStart,
      index_Of_the_Last_Bc: newEnd,
      orders_sliced: this.state.orders_filtered.slice(newStart, newEnd),
    })

  }  

  refresh_form() {
    this.setState({
      id_bc_client: "",
      client_id: "",
      date: "",
      date_start: "",
      date_end: "",
      etat: "",
    })

    this.getAllOrder();
  }

  openModalCancelOrder(id){
    this.setState({
      confirmVisible: true,
      id_bc_client_for_cancel: id,
    })
  }

  cancelOrder(){
    this.setState({
      confirmVisible: false,
      alertColor: "success",
      alertMessage: "Order Canceled Success!",
      alertVisible: true,
    })
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
                <i className="fa fa-align-justify"> {t("Livraison_Client.delivery_list")} </i>
                </Col>
                <Col sm={{ size: 'auto'}}>
                  <Button color='primary' onClick={this.refresh_form} > {t("utils.refresh_table")}</Button>
                </Col>
                </Row>                
              </CardHeader>
              <CardBody>
              <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={() => this.closeModal()}>
                  {this.state.alertMessage}
                </Alert>
                <Form>
                  <FormGroup>
                    <Row>
                      
                      <Col xs="4">
                        <Label>
                        {t("tables_info.id_order")} :
                        </Label>
                        <Input type="text" pattern="[0-9]*" name="id_bc_client" onChange={this.handleChange} placeholder="ID" value={this.state.id_bc_client} />
                      </Col>

                      <Col xs="4">
                        <Label>
                        {t("tables_info.name")} :
                        </Label>
                        <Input type="text" pattern="[0-9]*" name="client_id" onChange={this.handleChange} placeholder="Client Name" value={this.state.client_id} />
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
                      <th>{t("tables_info.id_order")}</th>
                      <th>{t("tables_info.date_registration")}</th>
                      <th>{t("tables_info.client")}</th>
                      <th>{t("tables_info.total")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.orders_sliced.map((value, index) => {
                      return <tr key={index}>
                        <td>{value.IdOrder}</td>
                        <td>{new Date(value.CreatedAt).toLocaleDateString()}</td>
                        <td>{value.first_name + ' ' + value.last_name}</td>
                        <td>{value.Amount}</td>
                       
                        <td>
                          <Button color="primary" onClick={() => this.openModal(value.IdOrder)}> {t("tables_info.detail")} </Button>
                        </td>
                      </tr>
                    })}

                  </tbody>
                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_Bc_Per_Page} total_Data={this.state.orders_filtered.length} paginate={this.paginate} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Modal isOpen={this.state.confirmVisible} width="400" height="300" effect="fadeInUp" toggle={() => this.closeModal()}>
            <ModalHeader toggle={() => this.closeModal()}>
            {t("Commande_Client.confirm_cancel_order_msg")}
            </ModalHeader>
            <ModalBody>
              <Button color="success" onClick={() => this.cancelOrder()}> {t("Commande_Client.yes")}</Button>
              <Button color="danger" onClick={() => this.closeModal()}>  {t("Commande_Client.no")}</Button>
            </ModalBody>
          </Modal>
        </Row>
        <Row>
          <Modal isOpen={this.state.visible} width="400" height="300" effect="fadeInUp" toggle={() => this.closeModal()}>
            <ModalHeader toggle={() => this.closeModal()}>
            {t("tables_info.order")} <Badge color="warning">{this.state.order_detail[0].IdOrder} </Badge> | <Badge color="info">{this.state.order_detail[0].client_name}</Badge>
            </ModalHeader>
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>{t("tables_info.product_name")} Name</th>
                    <th>{t("tables_info.quantity")}</th>
                    <th>{t("tables_info.price")}</th>
                    <th>{t("tables_info.states.state")}</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.order_detail.map((value, index) => {
                    return <tr key={index}>
                      <td>{value.Product}</td>
                      <td>{value.Quantity}</td>
                      <td>{value.Price}</td>
                      <td>{this.getOrderStatut(value.State)}</td>
                    </tr>
                  })}
                </tbody>

                {t("tables_info.total_price")} : {this.state.order_detail[0].Amount}

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
