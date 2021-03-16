import React, { Component } from 'react';
import Cookies from "js-cookie";
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
  Alert
} from 'reactstrap';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {useTranslation, withTranslation} from "react-i18next";


import Pagnations from '../Usable/Pagnations';

class Category_Client extends Component {

  constructor(props) {
    super(props);

    //State
    this.state = {
      primary_table: [], //Table des données 
      table_sliced: [], //Table Couper pour la pagination
      index_Of_Last_Item: 5, //Index de Pagination
      index_Of_First_Item: 0,//Index de Pagination
      number_Of_Item_Per_Page: 5, //Nombre d'item par page (Pagination)

      //add
      name: "",
      margin: 0,

      //Modal
      modalDetail: {
        title: "",
        body: "",
        footer: "",
        visible: false,
        width: 400,
        height: 300,
      },

      //AlertBox
      alertVisible: false,
      alertMessage: "",
           
    };

    /*
    *    BINDING
    */

    //Get
    this.getAllType = this.getAllType.bind(this);
    
    //Other Method
    this.paginate = this.paginate.bind(this);
    this.refresh_form = this.refresh_form.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delete_Category = this.delete_Category.bind(this);
    this.is_normal = this.is_normal.bind(this);
  }

  getAllType() {

    axios.get('http://localhost:4000/api/showTypeClient', {
      params : {
        token : Cookies.get("auth_Era_Auto_Admin")
      }
    },  
    { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        if (res.status = 200) {
          this.setState({
            primary_table: res.data,
            table_sliced: res.data.sort((a, b) => a.id_client < b.id_client ? 1 : -1).slice(this.state.index_Of_First_Item, this.state.number_Of_Item_Per_Page)
          });
        }
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Erreur veuillez reessayer");
        console.log(this.state);
      })
  }  

  refresh_form() {
    this.getAllType();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  } 
  
  closeModal() {
    this.setState({
      modalDetail: {
        visible: false,
      },
      alertVisible: false,

    })
  }
  
  //Change la Page 
  paginate(number) {
    var newStart = (number - 1) * this.state.number_Of_Item_Per_Page;
    var newEnd = this.state.number_Of_Item_Per_Page + newStart;

    this.setState({
      index_Of_First_Item: newStart,
      index_Of_Last_Item: newEnd,
      table_sliced: this.state.primary_table.slice(newStart, newEnd),
    })

  }

  componentDidMount() {
    this.getAllType();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addCategory(){

    const { t } = this.props;


    console.log("data : "+this.state.name +" "+ this.state.margin)
    if(this.state.name == "" || this.state.margin == "") {
      this.setState({
        alertVisible:true,
        alertMessage:t("Cathegory_Client.msg_alertbox")
      })
    }
    else {
      axios.post('http://localhost:4000/api/addCathegoryClient', 
    {        
        name : this.state.name,
        margin : this.state.margin,
        token : Cookies.get("auth_Era_Auto_Admin")
      },      
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {
        if (res.status = 200) {
          this.setState({
            modalDetail : {
              visible : true,
              title: "Success!",
              body: "Category Had been added!"
            },
            name: "",
            margin: "",
          })
          this.getAllType();
        }
        console.log(this.state);
      })
      .catch(error => {
        this.setState({
          modalDetail : {
            visible : true,
            title: "Error!",
            body: error.message
          }
        })
        console.log(this.state);
      })

    }



    
  }

  delete_Category(id) {

    console.log("oulah")

    axios.post("http://localhost:4000/api/deleteCathegoryClient", {
      token: Cookies.get("auth_Era_Auto_Admin"),
      id: id,
    },
      { headers: { 'Content-Type': 'application/json' } })
      .then(res => {

        console.log(res);
        if (res.status = 200) {
          this.setState({
            modalDetail : {
              visible : true,
              title: "Success!",
              body: "Category DELETED!"
            } });
          this.getAllType()

        }
      })
      .catch(error => {
        this.setState({
          modalDetail : {
            visible : true,
            title: "Error!",
            body: error.message
          } });
        console.log(this.state);
      })

  }

  is_normal(id){
    const { t } = this.props;

    if(id == 0){
      return <Badge>{t("Cathegory_Client.msg_default")} </Badge>
    }
    else {
      return <Button color='danger' onClick={() => this.delete_Category(id)} >{t("Cathegory_Client.delete")}</Button>
    }
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
                  <i className="fa fa-align-justify"> {t("Cathegory_Client.type_client_list")} </i>
                </Col>
                <Col sm={{ size: 'auto'}}>
                  <Button color='primary' onClick={this.refresh_form} > {t("utils.refresh_table")}</Button>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>{t("Cathegory_Client.type_client")}</th>
                      <th>{t("Cathegory_Client.margin")}</th>
                      <th>{t("tables_info.action")}</th>                   
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.table_sliced.map((value, index) => {
                      return <tr key={index}>
                        <td>{value.nom_type}</td>
                        <td>{value.marge}</td>
                        <td>{this.is_normal(value.idType)}</td>                     
                      </tr>
                    })}
                  </tbody>
                </Table>
                <Pagnations number_Per_Page={this.state.number_Of_Item_Per_Page} total_Data={this.state.table_sliced.length} paginate={this.paginate} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <Row>                
                <Col>
                  <i className="fa fa-align-justify"> {t("Cathegory_Client.add_category")} </i>
                </Col>                
                </Row>
              </CardHeader>
              <CardBody>
              <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">                  
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("Cathegory_Client.name")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" id="text-input" name="name"  value={this.state.name} placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("Cathegory_Client.margin")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" id="text-input" name="margin"  value={this.state.margin}  placeholder="" onChange={this.handleChange}/>
                    </Col>
                  </FormGroup>
                  <Button color='success' onClick={this.addCategory} >{t("Cathegory_Client.add_category_confirm")}</Button>
                  <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.closeModal}>
                  {this.state.alertMessage}
                </Alert>
                </Form>
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

const Category_Client_Translated = withTranslation('common')(Category_Client)


export default Category_Client_Translated;
