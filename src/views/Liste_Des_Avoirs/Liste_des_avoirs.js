import React, { Component } from 'react';
import { Alert, Label, Input, Modal, ModalHeader, ModalBody, Form, FormGroup, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import { cloneDeep } from 'lodash';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";



class Liste_des_avoirs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      table_product_from_client: [],  
      new_table_products: [], 
      regrouped_bc_provider: [], 
      client_list: [], 
      
      //Pagination
      number_of_item_per_page: 5,
      id_client: 0,

      //CheckboxTable
      itemChecked: {},

      //Modal and Alert Box
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
    this.getListClient = this.getListClient.bind(this);
    this.getProductByClientId = this.getProductByClientId.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.addProductAvoirs = this.addProductAvoirs.bind(this);
    this.createNewBcProvider = this.createNewBcProvider.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  /*
  *  GET METHODS
  */

  //Récupère la liste des Provider pour le comboBox
  getListClient() {
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
            client_list: res.data,
          })
          console.log(this.state);
        }

      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(error);
      })
  }

  //Récupère les Bc_Client en fonction du provider ID
  getProductByClientId(id) {

    console.log("id : " + id);

    axios.get('http://localhost:4000/api/showProduitFromIdClient', {
      params: {
        id_client: this.state.id_client,
        token : Cookies.get("auth_Era_Auto_Admin")
      }
    },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        console.log(res);
        if (res.status = 200) {
          this.setState({
            table_product_from_client: res.data,
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
  addProductAvoirs() {

    var clone_bc_client_by_provider = cloneDeep(this.state.table_product_from_client);
    var new2_bc_Provider = [];


    clone_bc_client_by_provider.map(element => {

      if (this.state.itemChecked[element.IdLine]) {
        new2_bc_Provider.push(element);
      }
    });

    this.setState({
      new_table_products: new2_bc_Provider
    })
  }

  /*
  *  CREATE METHODS
  */

  //Retourne le Produit et l'ajoute à la liste dans la BDD
  createNewBcProvider() {

    if (this.state.new_table_products.length != 0) {
      axios.post('http://localhost:4000/api/returnProducrs', {
        table_products: this.state.new_table_products,
        token : Cookies.get("auth_Era_Auto_Admin")     
      },
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then(res => {
          if (res.status = 200) {

            this.openModal("Success!", "New Order Provider Added! a mail was sent to them")

            this.setState({
              table_product_from_client: [],  //Tout les Bc Client par rapport à l'id du Provider
              new_table_products: [], //Nouveau BC Provider
              id_client: 0,
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

    if (this.state.new_table_products.length != 0) {
      /*var regrouped_Bc_Frs = []

      var new_table_products = cloneDeep(this.state.new_table_products);
      new_table_products.map(element => {

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
    this.getListClient();

  }

  componentDidUpdate(prevprops, prevstate) {

    if (this.state.id_client !== prevstate.id_client) {
      this.getProductByClientId(this.state.id_client);

    }

    if (this.state.itemChecked !== prevstate.itemChecked) {
      this.addProductAvoirs();
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
                <i className="fa fa-align-justify"></i> {t("Liste_des_avoirs.title")}
              </CardHeader>
              <CardBody>
                <Alert color="danger" toggle={this.onDismiss} isOpen={this.state.alertBoxVisible}>
                {t("Liste_des_avoirs.alert_msg")}
                </Alert>
                <Row>
                  <Label sm="2">
                  {t("tables_info.client")} :
                  </Label>
                  <Col xs="4">
                    <Input type="select" name="id_client" onChange={this.handleChange} id="select">
                      <option value="none">
                      {t("Liste_des_avoirs.choose_client")}
                      </option>
                      {this.state.client_list.map((value, index) => {
                        return <option value={value.id_client} key={index}>
                          {value.first_name + ' ' + value.last_name}
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
                        <th>{t("Liste_des_avoirs.id_line")}</th>
                        <th>{t("tables_info.id_order")}</th>
                        <th>{t("Liste_des_avoirs.order_date")}</th>
                        <th>{t("tables_info.id_product")}</th>
                        <th>{t("tables_info.product_name")}</th>
                        <th>{t("tables_info.quantity")}</th>
                        <th>{t("tables_info.price")}</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.table_product_from_client.map((value, index) => {
                        return <tr key={index}>
                          <td><input type="checkbox" checked={this.state.itemChecked[value.IdLine]} onChange={(e) => this.handleCheckboxChange(value, e)}></input></td>
                          <td>{value.IdLine}</td>                          
                          <td>{value.IdOrder}</td>
                          <td>{new Date(value.CreatedAt).toLocaleDateString()}</td>
                          <td>{value.IdProduct}</td>
                          <td>{value.Product}</td>
                          <td>{value.Quantity}</td>
                          <td>{value.Price}</td>
                        </tr>
                      })}

                    </tbody>
                  </Table>
                  <Pagnations number_Per_Page={this.state.number_of_item_per_page} total_Data={this.state.table_product_from_client.length} paginate={this.paginate} />


                </Row>
                <Row>
                  <h2> {t("Liste_des_avoirs.product_to_return")} : </h2>
                  <Table responsive striped>
                    <thead>
                      <tr>
                        <th>{t("Liste_des_avoirs.id_line")}</th>
                        <th>{t("tables_info.id_order")}</th>
                        <th>{t("tables_info.id_product")}</th>
                        <th>{t("tables_info.product_name")}</th>
                        <th>{t("tables_info.quantity")}</th>
                        <th>{t("tables_info.price")}</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.new_table_products.map((value, index) => {
                        return <tr key={index}>
                          <td>{value.IdLine}</td>
                          <td>{value.IdOrder}</td>
                          <td>{value.IdProduct}</td>
                          <td>{value.Product}</td>
                          <td>{value.Quantity}</td>
                          <td>{value.Price}</td>
                        </tr>
                      })}

                    </tbody>
                  </Table>
                  <Pagnations number_Per_Page={this.state.number_of_item_per_page} total_Data={this.state.new_table_products.length} paginate={this.paginate} />
                </Row>
                <Button color="success" onClick={this.createNewBcProvider}>{t("Liste_des_avoirs.button")} </Button>
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

const Liste_des_avoirs_Translated = withTranslation('common')(Liste_des_avoirs)


export default Liste_des_avoirs_Translated;
