import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader, Row, Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";


class Facture extends Component {


  constructor(props) {
    super(props);

    //State
    this.state = {
      clients: [], //Table des données de tout les clients
      client_sliced: [], //Table Couper pour la pagination
      client_filtered: [], //Table Filtrer pour le Filtre
      index_Of_Last_Client: 5, //Index de Pagination
      index_Of_First_Client: 0,//Index de Pagination
      number_Of_Client_Per_Page: 5, //Nombre de client par page (Pagination)
      //Filtre
      client_id: "",
      nom: "",
      prenom: "",
      date: "",
      date_start: "",
      date_end: "",
      //AlertBox
      alertVisible: false,
      alertMessage: "",
      alertColor: "danger",
      //Modal
      modalVisible: false,
      modalVisibleRespond: {
        visible: false,
        title: "",
        body: "",
      },
      modal_selected_client: [],
      modal_data_category: "",
      modal_data_content:"",
      notification_categorie_list: [],
    };

    /*
    *    BINDING
    */

    //Get
    this.getAllClient = this.getAllClient.bind(this);
    this.getListCategorieNotif = this.getListCategorieNotif.bind(this);

    //POST
    this.postNotification = this.postNotification.bind(this);

    //Other Method
    this.paginate = this.paginate.bind(this);
    this.tableFiltre = this.tableFiltre.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refresh_form = this.refresh_form.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.openModal = this.openModal.bind(this);
    this.getBillsStatut = this.getBillsStatut.bind(this);
    this.confirmPaiement = this.confirmPaiement.bind(this);
  }

  getAllClient() {

    axios.get('http://localhost:4000/api/showBills',
    { 
      params :{
        token : Cookies.get("auth_Era_Auto_Admin")
      }    
    },
    { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        if (res.status = 200) {
          this.setState({
            clients: res.data,
            client_filtered: res.data.sort((a, b) => a.id_client > b.id_client ? 1 : -1),
            client_sliced: res.data.sort((a, b) => a.id_client < b.id_client ? 1 : -1).slice(this.state.index_Of_First_Client, this.state.number_Of_Client_Per_Page)
          });
        }
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })
  }

  getListCategorieNotif(){

    axios.get('http://localhost:4000/api/showCategorieNotif',
    { 
      params :{
        token : Cookies.get("auth_Era_Auto_Admin")
      }    
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        if (res.status = 200) {
          this.setState({
            notification_categorie_list: res.data,            
          });
        }
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })

    
  }

  // POST Methods

  postNotification(event){

    event.preventDefault();
    
    //A finir
    axios.post('http://localhost:4000/api/addNotification', {
      data: {
        category: this.state.modal_data_category,
        content: this.state.modal_data_content,
        id_client: this.state.modal_selected_client.id_client,
        token : Cookies.get("auth_Era_Auto_Admin")

      }
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {        
        this.setState({
          modalVisibleRespond: {
            visible: true,
            title: "Success!",
            body: "Notification sent!"
          },
        })
      })
      .catch(error => {
        this.setState({
          modalVisibleRespond: {
            visible: true,
            title: "Error!",
            body: "There's an Error in the Server, please retry later!"
          },
        })
        console.log(this.state);
      })
      

  }

  refresh_form() {
    this.setState({
      client_id: "",
      nom: "",
      prenom: "",
      date: "",
      date_start: "",
      date_end: "",      
    })

    

    this.getAllClient();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //Filtre le tableaux orders dans orders filtered en fonction (dans l'ordre) de l'id, l'etat, la date, la période
  tableFiltre() {
    const { t} = this.props

    var newClientFiltered = this.state.clients.sort((a, b) => a.IdBill < b.IdBill ? 1 : -1);

    var filtered = false;

    var date = new Date(this.state.date);
    var start_date = new Date(this.state.date_start);
    var end_date = new Date(this.state.date_end)

    console.log(this.state)

    //ID
    if (this.state.client_id != "" && this.state.client_id != null) {    
      console.log("je passe id")

      newClientFiltered = newClientFiltered.filter(e => e.IdOrder == this.state.client_id);
      filtered = true;

    }
    //Nom
    if (this.state.nom != "" && this.state.nom != null) {
      console.log("je passe nom")

      newClientFiltered = newClientFiltered.filter(e => e.Name_client.toLowerCase().includes(this.state.nom.toLowerCase()));
      filtered = true;

    }    
    //DATE
    if (this.state.date != null && this.state.date != "") {
      console.log("je passe date")

      newClientFiltered = newClientFiltered.filter(e => new Date(e.date_bill).getDate() == date.getDate() &&  new Date(e.date_bill).getMonth() == date.getMonth() && new Date(e.date_bill).getFullYear() == date.getFullYear());
      filtered = true;

    }
    //PERIODE
    if (this.state.date_start != null && this.state.date_start != "" && this.state.date_end != null && this.state.date_end != "") {
      console.log("je passe periode")

      newClientFiltered = newClientFiltered.filter(e => new Date(e.date_bill).getTime() >= start_date.getTime() && new Date(e.date_bill).getTime() <= end_date.getTime());
      filtered = true;

    }

    if(!filtered)
    {
      this.setState({
        alertVisible: true,
        alertMessage: t("filters.insert_param"),        
      })
    }     

    if (newClientFiltered.length == 0) {
      this.setState({
        alertVisible: true,
        alertMessage: t("filters.no_result")
      })
    }

    //Update du State
    this.setState({
      client_filtered: newClientFiltered,
      client_sliced: newClientFiltered.slice(this.state.index_Of_First_Client, this.state.index_Of_Last_Client),
    })

  }

  onDismiss() {
    this.setState({
      alertVisible: false,
      modalVisible: false,
      modalVisibleRespond: {
        visible: false,
      },
    })
  }

  openModal(selected_client) {

    this.getListCategorieNotif();


    console.log("Hey")
    this.setState({
      modal_selected_client: selected_client,
      modalVisible: true,
    })
  }




  //Change la Page 
  paginate(number) {
    var newStart = (number - 1) * this.state.number_Of_Client_Per_Page;
    var newEnd = this.state.number_Of_Client_Per_Page + newStart;

    this.setState({
      index_Of_First_Client: newStart,
      index_Of_Last_Client: newEnd,
      client_sliced: this.state.clients.slice(newStart, newEnd),
    })

  }

  componentDidMount() {
    this.getAllClient();
  }

  getBillsStatut(etat) {

    //Translate
    const { t } = this.props;

    switch (etat) {
      case 0:
        return <Badge color="success">{t("tables_info.paid")} </Badge>
      case 1:
        return  <Badge color="danger">{t("tables_info.not_paid")} </Badge>      
      default:
        return <p>Error</p>
    }
   
  }

  getButtons(idBill, is_paid){
    switch (is_paid){
      case 1:
        return <Button color="success" onClick={() => this.confirmPaiement(idBill)}>Confirm Paiement</Button>
    }
  }

  confirmPaiement(idBill){

    axios.get('http://localhost:4000/api/billIsPaid', {
      params: {
        IdBill : idBill,
        token : Cookies.get("auth_Era_Auto_Admin")
      }
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {        
        this.setState({
          modalVisibleRespond: {
            visible: true,
            title: "Success!",
            body: "Paiement is set to Paid!"
          },
        })

        this.getAllClient();
      })
      .catch(error => {
        this.setState({
          modalVisibleRespond: {
            visible: true,
            title: "Error!",
            body: "There's an Error in the Server, please retry later!"
          },
        })
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
                  <i className="fa fa-align-justify"> {t("Facture.title")} </i>
                </Col>
                <Col sm={{ size: 'auto'}}>
                  <Button color='primary' onClick={this.refresh_form} > {t("utils.refresh_table")} </Button>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Form>
                <Alert color={this.state.alertColor} isOpen={this.state.alertVisible} toggle={() => this.onDismiss()}>
                  {this.state.alertMessage}
                </Alert>
                  <FormGroup>
                    <Row>
                      
                      <Col xs="4">
                        <Label>
                        {t("tables_info.id_order")} :
                        </Label>
                        <Input type="text" pattern="[0-9]*" name="client_id" onChange={this.handleChange} placeholder="ID" value={this.state.client_id} />
                      </Col>
                      
                      <Col xs="4">
                        <Label>
                        {t("tables_info.name")} :
                        </Label>
                        <Input type="text" name="nom" onChange={this.handleChange} placeholder={t("tables_info.name")} value={this.state.nom} />
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
                    <th>{t("tables_info.bill_number")}</th>
                    <th>{t("tables_info.date_bill")}</th>
                    <th>{t("tables_info.id_order")}</th>
                    <th>{t("tables_info.client")}</th>
                    <th>{t("tables_info.type_paiement")}</th>
                    <th>{t("tables_info.total")}</th>    
                    <th>{t("tables_info.is_paid")}</th>
                    <th>{t("tables_info.action")}</th>               
                  </tr>
                  </thead>
                  <tbody>                  
                    {this.state.client_sliced.map((value, index) => {
                      return <tr key={index}>
                        <td>{value.IdBill}</td>
                        <td>{new Date(value.date_bill).toLocaleDateString()}</td>                        
                        <td>{value.IdOrder}</td>
                        <td>{value.Name_client}</td>
                        <td>{value.Type}</td>
                        <th>{value.Total}</th>       
                        <th>{this.getBillsStatut(value.is_paid)}</th>  
                        <th>{this.getButtons(value.IdBill, value.is_paid)}</th>                                       
                      </tr>
                    })}

                  </tbody>
                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_Client_Per_Page} total_Data={this.state.client_filtered.length} paginate={this.paginate} />

              </CardBody>
            </Card>
          </Col>
        </Row>        

        <Modal isOpen={this.state.modalVisibleRespond.visible} width="300" height="400" effect="fadeInUp" toggle={() => this.onDismiss()}>
              <ModalHeader toggle={() => this.onDismiss()}>
                {this.state.modalVisibleRespond.title}
              </ModalHeader>
              <ModalBody>
              {this.state.modalVisibleRespond.body}
              </ModalBody>
            </Modal>
      </div>

    );
  }
}
const Facture_Translated = withTranslation('common')(Facture)


export default Facture_Translated;
