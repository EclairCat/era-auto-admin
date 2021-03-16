import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Modal, ModalBody, ModalHeader, Row, Table, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import Pagnations from '../Usable/Pagnations';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";

class Admin_user extends Component {

    constructor(props) {
        super(props)

        this.state = {

            //New Admin Info
            email: "",
            password: "",
            password_confirm: "",
            username: "",

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



        }

        this.getAdminList = this.getAdminList.bind(this);
        this.addAdmin = this.addAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getAdminList() {

        axios.get("http://localhost:4000/api/showAdmin" , {
            params : {
              token : Cookies.get("auth_Era_Auto_Admin")
            }
          },  
          { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
              if (res.status = 200) {
                this.setState({
                  primary_table: res.data,
                  table_sliced: res.data.sort((a, b) => a.id_admin < b.id_admin ? 1 : -1).slice(this.state.index_Of_First_Item, this.state.number_Of_Item_Per_Page)
                });
              }
              console.log(this.state);
            })
            .catch(error => {
              window.confirm("Erreur veuillez reessayer");
              console.log(this.state);
            })

    }

    addAdmin() {

        if(this.state.password == this.state.password_confirm){
            axios.post("http://localhost:4000/api/addAdmin" , {            
              token : Cookies.get("auth_Era_Auto_Admin"),
              email : this.state.email,
              password : this.state.password,
              username: this.state.username            
          },  
          { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
              if (res.status = 200) {
                this.setState({
                  modalDetail : {
                      visible : true,
                      body : "Admin Added!",
                      title: "Success!"
                  }
                });
                this.getAdminList()

              }
            })
            .catch(error => {
              window.confirm("Erreur veuillez reessayer");
              console.log(this.state);
            })
        }
        else{
            this.setState({
                modalDetail : {
                    visible : true,
                    body : "Password Doesn't match",
                    title: "Error!"
                }
            })
        }

        

    }
    
    deleteAdmin(email){
        console.log("delete")
       
            axios.post("http://localhost:4000/api/deleteAdmin" , {            
              token : Cookies.get("auth_Era_Auto_Admin"),
              email : email,                        
          },  
          { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
              if (res.status = 200) {
                this.setState({
                  modalDetail : {
                      visible : true,
                      body : "Admin Deleted!",
                      title: "Success!"
                  }
                });
                this.getAdminList()

              }
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

      closeModal() {
        this.setState({
          modalDetail: {
            visible: false,
          }
        })
      }

      componentDidMount(){
          this.getAdminList()
      }

    render() {
        //Translate
    const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col>
                                        <i className="fa fa-align-justify"> {t("admin_user.add_admin")} </i>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="text-input">{t("tables_info.username")}</Label>
                                        </Col>
                                        <Col xs="12" md="8">
                                            <Input type="text" id="text-input" name="username" value={this.state.username} placeholder="" onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="text-input">{t("tables_info.email")}</Label>
                                        </Col>
                                        <Col xs="12" md="8">
                                            <Input type="text" id="text-input" name="email" value={this.state.email} placeholder="" onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="text-input">{t("admin_user.password")}</Label>
                                        </Col>
                                        <Col xs="12" md="8">
                                            <Input type="password" id="text-input" name="password" value={this.state.password} placeholder="" onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="text-input">{t("admin_user.confirm_password")}</Label>
                                        </Col>
                                        <Col xs="12" md="8">
                                            <Input type="password" id="text-input" name="password_confirm" value={this.state.password_confirm} placeholder="" onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
                                    <Button color='success' onClick={this.addAdmin} >{t("admin_user.button_add")}</Button>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col>
                                        <i className="fa fa-align-justify">{t("admin_user.title")} </i>
                                    </Col>
                                    <Col sm={{ size: 'auto' }}>
                                        <Button color='primary' onClick={this.getAdminList} >{t("admin_user.refresh_table")}</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>{t("tables_info.username")}</th>
                                            <th>{t("tables_info.email")}</th>
                                            <th>{t("tables_info.action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.table_sliced.map((value, index) => {
                                            return <tr key={index}>
                                                <td>{value.username}</td>
                                                <td>{value.email}</td>
                                                <td><Button onClick={() => this.deleteAdmin(value.email)} color="danger"> {t("admin_user.button_del")}</Button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </Table>
                                <Pagnations number_Per_Page={this.state.number_Of_Item_Per_Page} total_Data={this.state.table_sliced.length} paginate={this.paginate} />
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
            </div>)
    }

}

const Admin_user_Translated = withTranslation('common')(Admin_user)


export default Admin_user_Translated;