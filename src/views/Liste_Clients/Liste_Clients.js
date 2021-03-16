import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader, Row, Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import Nouveau_Client from '../Nouveau_Client/Nouveau_Client';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";

class Liste_Clients extends Component {

  constructor(props) {
    super(props);

    //State
    this.state = {
      clients: [], //Table des données de tout les clients
      client_sliced: [], //Table Couper pour la pagination
      client_filtered: [], //Table Filtrer pour le Filtre
      index_Of_Last_Client: 10, //Index de Pagination
      index_Of_First_Client: 0,//Index de Pagination
      number_Of_Client_Per_Page: 10, //Nombre de client par page (Pagination)
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
      //Modal Edit
      modalEditClient: {
        visible : false,
        id_client: 0,
      },
      //Other
      notification_categorie_list: [],
      type_client_list: [],
      type_client: "",
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
    this.getTypeClient= this.getTypeClient.bind(this);
    this.handleChangeTypeClient = this.handleChangeTypeClient.bind(this);
    this.editClient= this.editClient.bind(this);
  }

  getAllClient() {

    axios.get('http://localhost:4000/api/showClient',
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
      params : {
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

  getTypeClient(){

    axios.get('http://localhost:4000/api/showTypeClient',
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
            type_client_list: res.data,            
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
        
      },
      token : Cookies.get("auth_Era_Auto_Admin")
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        
        if(res.status = 200) {
          this.setState({
            modalVisibleRespond: {
              visible: true,
              title: "Success!",
              body: "Notification sent!"
            },
          })
        }
        
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

  handleChangeTypeClient(id_client, event) {

    axios.post('http://localhost:4000/api/changeTypeClient', {
      data: {       
        id_client: id_client,
        id_type: event.target.value,        
      },
      token : Cookies.get("auth_Era_Auto_Admin")
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {        
        this.setState({
          modalVisibleRespond: {
            visible: true,
            title: "Success!",
            body: "Type Client Had Been Changed!"
          },
        })

        this.refresh_form()
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

  //Filtre le tableaux orders dans orders filtered en fonction (dans l'ordre) de l'id, l'etat, la date, la période
  tableFiltre() {

    const { t } = this.props
    var newClientFiltered = this.state.clients.sort((a, b) => a.id_client < b.id_client ? 1 : -1);

    var filtered = false;

    var date = new Date(this.state.date);
    var start_date = new Date(this.state.date_start);
    var end_date = new Date(this.state.date_end)

    console.log(this.state)

    //ID
    if (this.state.client_id != "" && this.state.client_id != null) {

      if(this.state.client_id)

      console.log("je passe id")

      newClientFiltered = newClientFiltered.filter(e => e.id_client == this.state.client_id);
      filtered = true;
    }
    //Nom
    if (this.state.nom != "" && this.state.nom != null) {
      console.log("je passe nom")
      console.log(this.state.nom)

      newClientFiltered = newClientFiltered.filter(e => e.last_name.toLowerCase().includes(this.state.nom.toLowerCase()));
      filtered = true;

    }
    //Prenom
    if (this.state.prenom != "" && this.state.prenom != null) {
      console.log("je passe Prenom")

      newClientFiltered = newClientFiltered.filter(e => e.first_name.toLowerCase().includes(this.state.prenom.toLowerCase()));
      filtered = true;

    }
    //DATE
    if (this.state.date != null && this.state.date != "") {
      console.log("je passe date")

      newClientFiltered = newClientFiltered.filter(e => new Date(e.date_registration).getDate() == date.getDate() &&  new Date(e.date_registration).getMonth() == date.getMonth() && new Date(e.date_registration).getFullYear() == date.getFullYear());
      filtered = true;

    }
    //PERIODE
    if (this.state.date_start != null && this.state.date_start != "" && this.state.date_end != null && this.state.date_end != "") {
      console.log("je passe periode")

      newClientFiltered = newClientFiltered.filter(e => new Date(e.date_registration).getTime() >= start_date.getTime() && new Date(e.date_registration).getTime() <= end_date.getTime());
      filtered = true;

    }

    if(!filtered)
    {
      this.setState({
        alertVisible: true,
        alertMessage: "Please insert a parameter first"
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
      modalEditClient: {
        visible: false,
      }
    })

    //this.getAllClient()
  }

  openModal(selected_client) {

    this.getListCategorieNotif();


    console.log("Hey")
    this.setState({
      modal_selected_client: selected_client,
      modalVisible: true,
    })
  }

  editClient(selected_client){

    console.log(selected_client)
    this.setState({
      modalEditClient: {
        visible: true,
        id_client: selected_client
      },
    })
  }

  //Change la Page 
  paginate(number) {
    var newStart = (number - 1) * this.state.number_Of_Client_Per_Page;
    var newEnd = this.state.number_Of_Client_Per_Page + newStart;

    this.setState({
      index_Of_First_Client: newStart,
      index_Of_Last_Client: newEnd,
      client_sliced: this.state.client_filtered.slice(newStart, newEnd),
    })

  }

  componentDidMount() {
    this.getAllClient();
    this.getTypeClient();
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
                  <i className="fa fa-align-justify"> {t("Liste_Client.client_list")} </i>
                </Col>
                <Col sm={{ size: 'auto'}}>
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
                        <Input type="text" pattern="[0-9]*" name="client_id" onChange={this.handleChange} placeholder="ID" value={this.state.client_id} />
                      </Col>
                      
                      <Col xs="4">
                        <Label>
                        {t("tables_info.last_name")} :
                        </Label>
                        <Input type="text" name="nom" onChange={this.handleChange} placeholder="Last name" value={this.state.nom} />
                      </Col>
                      
                      <Col xs="4">
                        <Label>
                        {t("tables_info.first_name")} :
                        </Label>
                        <Input type="text" name="prenom" onChange={this.handleChange} placeholder="First name" value={this.state.prenom} />
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
                      <th>{t("tables_info.username")}</th>
                      <th>{t("tables_info.email")}</th>
                      <th>{t("tables_info.date_registration")}</th>
                      <th>{t("tables_info.role")}</th>
                      <th>{t("tables_info.phone")}</th>
                      <th>{t("tables_info.status")}</th>
                      <th>{t("tables_info.action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.client_sliced.map((client, index) => {
                      return <tr key={index}>
                        <td>{client.id_client}</td>
                        <td>{client.last_name + " " + client.first_name}</td>
                        <td>{client.email}</td>
                        <td>{new Date(client.date_registration).toLocaleDateString()}</td>
                        <td><Input type="select" name="type_client" onChange={(event) => this.handleChangeTypeClient(client.id_client, event)} value={client.idType}>
                        {this.state.type_client_list.map((value, index) => {
                        return <option value={value.idType} key={index}>
                          {value.nom_type}
                        </option> })}</Input>
                        </td>
                        <th>{client.telephone}</th>
                        <td>
                          <Badge color="success">{t("tables_info.status_active")}</Badge>
                        </td>
                        <td>
                          <Button color="primary" onClick={() => this.openModal(client)}> {t("Liste_Client.send_notif")} </Button>
                          <Button color="secondary" onClick={() => this.editClient(client)} > {t("tables_info.detail")} </Button>

                        </td>
                      </tr>
                    })}
                  </tbody>
                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_Client_Per_Page} total_Data={this.state.client_filtered.length} paginate={this.paginate} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modalVisible} width="1200" height="1000" effect="fadeInUp" toggle={() => this.onDismiss()}>
          <ModalHeader toggle={() => this.onDismiss()}>
          {t("Liste_Client.send_notif_message")} <b style={{color: 'green'}}> {this.state.modal_selected_client.first_name} {this.state.modal_selected_client.last_name} </b>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Row>
                      <Label>{t("Liste_Client.category")} :</Label>
                    </Row>
                    <Row>
                      <Input type="select"  name="modal_data_category" onChange={this.handleChange}>
                        <option value="0">{t("Liste_Client.select_category")}</option>
                        {this.state.notification_categorie_list.map((value, key)=> {
                          return <option key={key} value={value.category_id}> {value.category} </option>
                        })}
                      </Input>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Label>{t("Liste_Client.content")} :</Label>
                    </Row>
                    <Row>
                      <Input type="textarea" name="modal_data_content"  onChange={this.handleChange} placeholder={t("Liste_Client.placeholder_msg")} rows={5} />
                    </Row>
                  </FormGroup>
                  <Button color="success" onClick={this.postNotification}> {t("Liste_Client.send")}</Button>
                </Form>
              </Col>
            </Row>            
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalVisibleRespond.visible} width="300" height="400" effect="fadeInUp" toggle={() => this.onDismiss()}>
              <ModalHeader toggle={() => this.onDismiss()}>
                {this.state.modalVisibleRespond.title}
              </ModalHeader>
              <ModalBody>
              {this.state.modalVisibleRespond.body}
              </ModalBody>
            </Modal>

            <Modal isOpen={this.state.modalEditClient.visible} size="xl" effect="fadeInUp">
              <ModalHeader toggle={() => this.onDismiss()}>
              {t("Liste_Client.edit_client")}
              </ModalHeader>
              <ModalBody>
                      <Nouveau_Client  client={this.state.modalEditClient.id_client} closeEdit={this.onDismiss} editmode={true}/>
              </ModalBody>
            </Modal>
      </div>

    );
  }
}

const Liste_Clients_Translated = withTranslation('common')(Liste_Clients)


export default Liste_Clients_Translated;
