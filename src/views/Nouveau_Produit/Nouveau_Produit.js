import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
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
} from 'reactstrap';
import {useTranslation, withTranslation} from "react-i18next";


class Nouveau_Produit extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      //Donnee formulaire
      name : "",
      provider: "",
      family : "",
      subfamily: "",
      price: "",
      stock: "",
      tiens_ordre: "",
      taux_vacance: "",
      code_barre: "",
      prix_detail_min: "",
      url: "",
      unite: "",
      is_new: false,

      //Modal
      modalDetail: {
        title: "",
        body: "",
        footer: "",
        visible: false,
        width: 400,
        height: 300,
      },
      //Liste 
      provider_list: [],

    };
    this.addClient = this.addClient.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getProviderList = this.getProviderList.bind(this);
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

    console.log(this.state.provider)
  }

  handleCheckboxChange(event) {

    let isChecked = event.target.checked;      

    this.setState({
      is_new: isChecked,
    });

  }

  addClient(event) {

    event.preventDefault();

    console.log(this.state);

    
      axios.post('http://localhost:4000/api/addProduit',
        {
            name : this.state.name,
            provider: this.state.provider,
            family : this.state.family,
            subfamily: this.state.subfamily,
            price: this.state.price,
            stock: this.state.stock,
            tiens_ordre: this.state.tiens_ordre,
            taux_vacance: this.state.taux_vacance,
            code_barre: this.state.code_barre,
            prix_detail_min: this.state.prix_detail_min,
            url : this.state.url,
            unite: this.state.unite,
            is_new: this.state.is_new,
            token : Cookies.get("auth_Era_Auto_Admin")

        },
        { headers: { 'Content-Type': 'application/json' } }
      )
        .then(res => {

          if (res.status = 200) {
            this.openModal("Success!", "Client Added!")        
          }
          console.log(res);
          console.log(this.state);
        })
        .catch(error => {
          window.confirm("Error");
          this.openModal("Error!", error)    
          console.log(this.state);
        })    

  }

  getProviderList(){
    axios.get('http://localhost:4000/api/showProvider',
    {
      params : {
        token : Cookies.get("auth_Era_Auto_Admin")

      }
    },
     { headers: { 'Content-Type': 'application/json' }})
    .then(res => {
      if(res.status = 200){
        console.log(res.data);

        this.setState({
          provider_list: res.data,
        })
        
      }
    })
    .catch(error => {
      window.confirm("Error");
      console.log(this.state);
    })
  }

  componentDidMount(){
    this.getProviderList();
  }

  /*
  *   MODALS METHODS
  */ 

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

  render() {
    //Translate
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
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>{t("Nouveau_Produit.data")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">                  
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("tables_info.product_name")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" className="form-control-warning" name="name" onChange={this.handleChange} required/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="input">{t("tables_info.price")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" pattern="[0-9]" required  name="price" onChange={this.handleChange} placeholder="00.00" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("tables_info.provider")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                        <Input type="select" name="provider" id="select" onChange={this.handleChange}>
                          <option>{t("Nouveau_Produit.msg_select_provider")}</option>
                        {this.state.provider_list.map((value, index) => {
                          return <option value={value.id_provider} key={index}> {value.name} </option>
                        })}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.cathegory_family")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="family" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.cathegory_sub")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="subfamily" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("tables_info.quantity")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="stock" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.keep_order")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="tiens_ordre" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup> 
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.vacancy_rate")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="taux_vacance" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup> 
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.bar_code")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="code_barre" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup> 
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.min_price")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="prix_detail_min" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup>    
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.img_url")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="url" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup> 
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("Nouveau_Produit.unity")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" required name="unite" onChange={this.handleChange} placeholder="" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("Nouveau_Produit.is_new")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                        <Input  type="checkbox" name="is_new" checked={this.state.is_new} onChange={this.handleCheckboxChange} />
                    </Col>
                  </FormGroup>                  
                </Form>
                <Button onClick={this.addClient} color="success"> {t("Nouveau_Produit.button")}</Button>

              </CardBody>
            </Card>
          </Col>
          </Row>
        </div>

    );
  }
}

const Nouveau_Produit_Translated = withTranslation('common')(Nouveau_Produit)


export default Nouveau_Produit_Translated;
