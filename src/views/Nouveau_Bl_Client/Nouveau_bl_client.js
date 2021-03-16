import React, { Component } from 'react';
import { Alert, Label, Input, Modal, ModalHeader, ModalBody, Form, FormGroup, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import { array, element } from 'prop-types';
import lodash, { cloneDeep } from 'lodash';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";



class Nouveau_Bl_Client extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bc_client_by_Id_Provider: [],  //Tout les Bc Client par rapport à l'id du Provider
      new_bc_Provider: [], //Nouveau BC Provider
      regrouped_bc_provider: [], //Nouveau BC Proivder en format Grouper
      provider_list: [], //Liste des Provider
      number_of_item_per_page: 5,
      id_provider: 0,
      itemChecked: {},
      alertBoxVisible: false,
      modalDetail: {
        title: "",
        body: "",
        footer: "",
        visible: false,
        width: 400,
        height: 300,
      },


    };

    this.handleChange = this.handleChange.bind(this);
    this.paginate = this.paginate.bind(this);
    this.getListProvider = this.getListProvider.bind(this);
    this.getOrderByProviderId = this.getOrderByProviderId.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.updateNewBcProvider = this.updateNewBcProvider.bind(this);
    this.createNewBcProvider = this.createNewBcProvider.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  /*
  *  GET METHODS
  */

  //Récupère la liste des Provider pour le comboBox
  getListProvider() {
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
            provider_list: res.data,
          })
        }

      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(error);
      })
  }

  //Récupère les Bc_Client en fonction du provider ID
  getOrderByProviderId(id) {

    console.log("id : " + id);

    axios.get('http://localhost:4000/api/showBcClientByIdClient', {
      params: {
        id_client: this.state.id_provider,
        token : Cookies.get("auth_Era_Auto_Admin")

      }
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        console.log(res);
        if (res.status = 200) {
          this.setState({
            bc_client_by_Id_Provider: res.data,
          })
        }

      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(error);
      })
  }

  /*
  *  HANDLE METHODS
  */

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCheckboxChange(child, event) {
    var new_ItemChecked = cloneDeep(this.state.itemChecked);

    let isChecked = event.target.checked;
    let id = child.IdLine;

    new_ItemChecked[child.IdLine] = isChecked;

    this.setState({
      itemChecked: new_ItemChecked,
    });
    console.log(this.state);

  }

  /*
  * UPDATE METHODS
  */

  //Update la table du new Bc Fournisseur
  updateNewBcProvider() {

    var clone_bc_client_by_provider = cloneDeep(this.state.bc_client_by_Id_Provider);
    var new2_bc_Provider = [];



    clone_bc_client_by_provider.map(element => {

      if (this.state.itemChecked[element.IdLine]) {
        new2_bc_Provider.push(element);
      }
    });

    this.setState({
      new_bc_Provider: new2_bc_Provider
    })
  }

  /*
  *  CREATE METHODS
  */

  //Créer un nouveau Bc_Frs dans la BDD
  createNewBcProvider() {

    if (this.state.new_bc_Provider.length != 0) {
      axios.post('http://localhost:4000/api/addBlClient', {
        bc_client: this.state.new_bc_Provider,
        id_client: this.state.id_provider,
        token : Cookies.get("auth_Era_Auto_Admin")

      },
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then(res => {
          if (res.status = 200) {

            this.openModal("Success!", "The Chosen Products had been set to Closed!")

            this.setState({
              bc_client_by_Id_Provider: [],  //Tout les Bc Client par rapport à l'id du Provider
              new_bc_Provider: [], //Nouveau BC Provider
              id_provider: 0,
              itemChecked: {},

            })

          }
          console.log(res);
          console.log(this.state);
        })
        .catch(error => {
          this.openModal("Error!", error.message)
          console.log(error);
        })
    }
    else {
      this.setState({
        alertBoxVisible: true
      })
    }


  }

  /*
  *  OTHER METHODS
  */

  onDismiss() {
    this.setState({
      alertBoxVisible: false
    })
  }

  //Change la Page 
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

  //Work in Progress
  regroup_New_Bc() {

    if (this.state.new_bc_Provider.length != 0) {
      /*var regrouped_Bc_Frs = []

      var new_bc_Provider = cloneDeep(this.state.new_bc_Provider);
      new_bc_Provider.map(element => {

        //if(regrouped_Bc_Frs.find(element => ))

        regrouped_Bc_Frs.map(element2 => {
          if (element2.id_produit == element.id_produit) {
            element2.quantite = element2.quantite + element.quantite;
          }
          else {

          }
        })
      })*/
    }
    else {
      this.setState({
        alertBoxVisible: true
      })
    }

  }


  /*
  *  COMPONENT METHODS
  */

  componentDidMount() {
    this.getListProvider();

  }

  componentDidUpdate(prevprops, prevstate) {

    if (this.state.id_provider !== prevstate.id_provider) {
      this.getOrderByProviderId(this.state.id_provider);

    }

    if (this.state.itemChecked !== prevstate.itemChecked) {
      this.updateNewBcProvider();
    }

  }

  /*
  *   MODALS METHODS
  */

  openModal(title, body, footer) {
    this.setState({
      modalDetail: {
        visible: true,
        title: title,
        body: body,
      },
    })
  }

  closeModal() {
    this.setState({
      modalDetail: {
        visible: false
      }
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
                <i className="fa fa-align-justify"></i> {t("Nouveau_bl_client.title")} 
              </CardHeader>
              <CardBody> 
                <Alert color="info" >
                  <Row>
                    <h2>{t("Nouveau_bl_client.info.title")}   :</h2>
                  </Row>
                  <Row>
                  {t("Nouveau_bl_client.info.msg")} 
                  </Row>
                </Alert>               
                <Alert color="danger" toggle={this.onDismiss} isOpen={this.state.alertBoxVisible}>
                  {t("Nouveau_bl_client.select_client_order")} 
                </Alert>
                <Row>
                  <Label sm="2">
                  {t("tables_info.client")} :
                  </Label>
                  <Col xs="4">
                    <Input type="select" name="id_provider" onChange={this.handleChange} value={this.state.id_provider} id="select">
                      <option value="none">
                      {t("Nouveau_bl_client.select_client")}
                      </option>
                      {this.state.provider_list.map((value, index) => {
                        return <option value={value.id_client} key={index}>
                          {value.last_name + ' ' + value.first_name}
                        </option>
                      })}
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <h2>{t("tables_info.result")} : </h2>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th></th>
                        <th>{t("tables_info.id_order")}</th>
                        <th>{t("tables_info.product_name")}</th>
                        <th>{t("tables_info.quantity")}</th>                        
                        <th>{t("tables_info.price")}</th> 
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.bc_client_by_Id_Provider.map((value, index) => {
                        return <tr key={index}>
                          <td><input type="checkbox" checked={this.state.itemChecked[value.IdLine]} onChange={(e) => this.handleCheckboxChange(value, e)}></input></td>
                          <td>{value.IdOrder}</td>
                          <td>{value.Product}</td>
                          <td>{value.Quantity}</td>                          
                          <td>{value.Price}</td>                         
                        </tr>
                      })}

                    </tbody>
                  </Table>
                  <Pagnations number_Per_Page={this.state.number_of_item_per_page} total_Data={this.state.bc_client_by_Id_Provider.length} paginate={this.paginate} />


                </Row>
                <Row>
                  <h2> {t("Nouveau_bl_client.new_table_title")} : </h2>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>{t("tables_info.id_order")}</th>
                        <th>{t("tables_info.product_name")}</th>
                        <th>{t("tables_info.quantity")}</th>                        
                        <th>{t("tables_info.price")}</th> 
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.new_bc_Provider.map((value, index) => {
                        return <tr key={index}>                          
                          <td>{value.IdOrder}</td>
                          <td>{value.Product}</td>
                          <td>{value.Quantity}</td>                          
                          <td>{value.Price}</td>
                        </tr>
                      })}

                    </tbody>
                  </Table>
                  <Pagnations number_Per_Page={this.state.number_of_item_per_page} total_Data={this.state.new_bc_Provider.length} paginate={this.paginate} />
                </Row>
                <Button color="success" onClick={this.createNewBcProvider}> {t("Nouveau_bl_client.button")} </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modalDetail.visible} width={this.state.modalDetail.width} height={this.state.modalDetail.height} toggle={() => this.closeModal()}>
          <ModalHeader toggle={() => this.closeModal()}>
            {this.state.modalDetail.title}
          </ModalHeader>
          <ModalBody>
            {this.state.modalDetail.body}
          </ModalBody>
        </Modal>
      </div>

    );
  }
}

const Nouveau_Bl_Client_Translated = withTranslation('common')(Nouveau_Bl_Client)


export default Nouveau_Bl_Client_Translated;
