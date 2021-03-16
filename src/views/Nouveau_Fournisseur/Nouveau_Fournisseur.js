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


class Forms extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,

      new_provider: {
        data: {
          email: "",
          telephone: "",          
          password: "",
          password_comfirm: "",
          use_primary_messaging: false,
        },
        contact_person: {
          last_name: "",
          first_name: "",
          second_last_name: "",
          active_account: false,
          refuse_profile_modif: false,
          display_oem: false,
        },
        primary_data: {
          type_of_ownership: "",
          company_name: "",
          tax_number: "",
          reason_code: "",
          bank_name: "",
          bank_id_code: "",
          psrn: "",
          okpo: "",
          corresponding_account: "",
          payment_account: "",
          with_vat: false,
        },
        additional_contact: {
          skype: "",
          phone: "",
          icq: "",
          website: "",
        },
        legal_adress: {
          index: "",
          region: "",
          city: "",
          street: "",
          house: "",
          appartement: "",
        },
        real_adress: {
          index: "",
          region: "",
          city: "",
          street: "",
          house: "",
          appartement: "",
        },
        provider_information: {
          discount_group: "",
          reply_format: "",
          reply: "",
          credit_limit: "",
          day_of_deffered_payment: "",
          type_of_client: "",
          max_nb_visit_hours: "",
          max_nb_visit_24hours: "",
          exclude_mark_from_blocking: "",
          snapping_visibility: "",
          disable_default_visibility: false,
          region: "",
          director: "",
          delivery_itinary: "",
          view_detail_warehouse_info: false,
          automatic_invoice: false,
          send_sms: false,
          send_email: false,
          lastest_news: false,
          direct_mail: false,
          second_name_price_list: false,
          warehouse_info: false,
          prohib_automatic_remittance: false,
          disable_access_web_service: false,
          max_nb_laximo_per_dar: "",
          percentage_package: "",
          reason: "",
        },
        color_info: {
          active_color: false,
          color_code: "",
          comment: "",
        },
        delivery_type: "",
        comment: ""
      },

      modal: {
        visible: false,
        title: "",
        body: "",
      }


    };
    this.addProvider = this.addProvider.bind(this);
    this.handleChange_new_provider = this.handleChange_new_provider.bind(this);
    this.handleChange_new_provider_color_info = this.handleChange_new_provider_color_info.bind(this);
    this.handleChange_new_provider_provider_information = this.handleChange_new_provider_provider_information.bind(this);
    this.handleChange_new_provider_real_adress = this.handleChange_new_provider_real_adress.bind(this);
    this.handleChange_new_provider_legal_adress= this.handleChange_new_provider_legal_adress.bind(this);
    this.handleChange_new_provider_additional_contact = this.handleChange_new_provider_additional_contact.bind(this);
    this.handleChange_new_provider_primary_data = this.handleChange_new_provider_primary_data.bind(this);
    this.handleChange_new_provider_contact_person = this.handleChange_new_provider_contact_person.bind(this);
    this.handleChange_new_provider_data = this.handleChange_new_provider_data.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleChange_new_provider(event) {

    var name = event.target.name;
    var value = event.target.value; 

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        [name]: value
      }
    }));
  }

  handleChange_new_provider_color_info(event){

    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        color_info : {
          ...prevState.new_provider.color_info,
          [name]: value,
        }
       
      }
    }));

  }

  handleChange_new_provider_provider_information(event){

    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        provider_information : {
          ...prevState.new_provider.provider_information,
          [name]: value,
        }
       
      }
    }));

  }

  handleChange_new_provider_real_adress(event){

    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        real_adress : {
          ...prevState.new_provider.real_adress,
          [name]: value,
        }
       
      }
    }));

  }

  handleChange_new_provider_legal_adress(event){

    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        legal_adress : {
          ...prevState.new_provider.legal_adress,
          [name]: value,
        }
       
      }
    }));

  }

  handleChange_new_provider_additional_contact(event) {
    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        additional_contact : {
          ...prevState.new_provider.additional_contact,
          [name]: value,
        }
       
      }
    }));
  }

  handleChange_new_provider_primary_data(event) {
    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        primary_data : {
          ...prevState.new_provider.primary_data,
          [name]: value,
        }
       
      }
    }));
  }

  handleChange_new_provider_contact_person(event) {
    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        contact_person : {
          ...prevState.new_provider.contact_person,
          [name]: value,
        }
       
      }
    }));
  }

  handleChange_new_provider_data(event) {
    var name = event.target.name;
    var value = event.target.value; 

    if(event.target.type == "checkbox")
    {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_provider: {
        ...prevState.new_provider,
        data : {
          ...prevState.new_provider.data,
          [name]: value,
        }
       
      }
    }));
  }

  closeModal() {
    this.setState({
      modal : {
        visible : false
      }
    })
  }

  addProvider(event) {
    event.preventDefault();

    if(this.state.new_provider.data.password_comfirm != this.state.new_provider.data.password)
    {
      this.setState({
        modal: {
          visible: true,
          title: "Error!",
          body: "password aren't the same"
        }
      })
    }
    else {
      axios.post('http://localhost:4000/api/addProvider',
      {
        new_provider : this.state.new_provider,
        token : Cookies.get("auth_Era_Auto_Admin")

      },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {

        if (res.status = 200) {
          window.confirm("Provider Added!")
        }
        console.log(res);
        console.log(this.state);
      })
      .catch(error => {
        window.confirm("Error");
        console.log(this.state);
      })

    }
  }

  

  render() {
    //Translate
    const { t } = this.props;

    return (
      <div className="animated fadeIn">
        <Modal color="success" isOpen={this.state.modal.visible} width="400" height="300" effect="fadeInUp" toggle={() => this.closeModal()}>
          <ModalHeader toggle={() => this.closeModal()}>
            {this.state.modal.title}
          </ModalHeader>
          <ModalBody>
            {this.state.modal.body}
          </ModalBody>
        </Modal>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>{t("form_info.data")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("form_info.email")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="email" onChange={this.handleChange_new_provider_data} value={this.state.new_provider.data.email} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="input">{t("form_info.phone")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" maxLength={10} name="telephone" onChange={this.handleChange_new_provider_data} value={this.state.new_provider.data.telephone}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("form_info.password")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="password" name="password" onChange={this.handleChange_new_provider_data} value={this.state.new_provider.data.password}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("form_info.password_confirm")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="password" name="password_comfirm" onChange={this.handleChange_new_provider_data} value={this.state.new_provider.data.password_comfirm} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" name="use_primary_messaging" onChange={this.handleChange_new_provider_data} value={this.state.new_provider.data.use_primary_messaging}/>
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.not_use_primary_message")}</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>{t("form_info.contact_person")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">{t("form_info.last_name")}*</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="last_name" onChange={this.handleChange_new_provider_contact_person} value={this.state.new_provider.contact_person.last_name}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">{t("form_info.first_name")}*</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="first_name" onChange={this.handleChange_new_provider_contact_person} value={this.state.new_provider.contact_person.first_name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">{t("form_info.second_name")}</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="second_last_name" onChange={this.handleChange_new_provider_contact_person} value={this.state.new_provider.contact_person.second_last_name}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row check className="checkbox">
                    <Col>
                      <Input className="form-check-input" type="checkbox" name="active_account" onChange={this.handleChange_new_provider_contact_person} value={this.state.new_provider.contact_person.active_account} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.active")}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row check className="checkbox">
                    <Col>
                      <Input className="form-check-input" type="checkbox" name="refuse_profile_modif" onChange={this.handleChange_new_provider_contact_person} value={this.state.new_provider.contact_person.refuse_profile_modif} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.refuse_profile_modif")}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row check className="checkbox">
                    <Col>
                      <Input className="form-check-input" type="checkbox" name="display_oem" onChange={this.handleChange_new_provider_contact_person} value={this.state.new_provider.contact_person.display_oem} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.display_OEM")}</Label>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
                <strong>{t("form_info.primary_data")}</strong> {t("form_info.of_provider")}
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.type_ownership")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="type_of_ownership" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.type_of_ownership} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.name_company")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="company_name" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.company_name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.tax_nb")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="tax_number" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.tax_number} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.registration_code")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="reason_code" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.reason_code} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.bank_name")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="bank_name" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.bank_name}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label>{t("form_info.bank_id")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="bank_id_code" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.bank_id_code} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.primary_state_regist_nb")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="psrn" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.psrn}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.okpo")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="okpo" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.okpo}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.c_account")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="corresponding_account" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.corresponding_account} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label >{t("form_info.p_account")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="payment_account" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.payment_account} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input type="checkbox" name="with_vat" onChange={this.handleChange_new_provider_primary_data} value={this.state.new_provider.primary_data.with_vat} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.with_VAT")}</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
              {t("form_info.additional")} <strong> {t("form_info.contact")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("form_info.skype")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="skype" onChange={this.handleChange_new_provider_additional_contact} value={this.state.new_provider.additional_contact.skype} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.phone")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" maxLength={10} name="phone" onChange={this.handleChange_new_provider_additional_contact} value={this.state.new_provider.additional_contact.phone}  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.icq")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text"  name="icq" onChange={this.handleChange_new_provider_additional_contact} value={this.state.new_provider.additional_contact.icq}  />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.website")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="website" onChange={this.handleChange_new_provider_additional_contact} value={this.state.new_provider.additional_contact.website} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
              <strong>{t("form_info.legal")} </strong> {t("form_info.adress")}
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("form_info.index")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="index" onChange={this.handleChange_new_provider_legal_adress} value={this.state.new_provider.legal_adress.index}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.region")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="region" onChange={this.handleChange_new_provider_legal_adress} value={this.state.new_provider.legal_adress.region}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.city")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="city" onChange={this.handleChange_new_provider_legal_adress} value={this.state.new_provider.legal_adress.city} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.street")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="street" onChange={this.handleChange_new_provider_legal_adress} value={this.state.new_provider.legal_adress.street} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.house")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="house" onChange={this.handleChange_new_provider_legal_adress} value={this.state.new_provider.legal_adress.house} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.appartement")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="appartement" onChange={this.handleChange_new_provider_legal_adress} value={this.state.new_provider.legal_adress.appartement} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardHeader>
              <strong>{t("form_info.delivery")} </strong> {t("form_info.adress")}
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("form_info.index")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="index" onChange={this.handleChange_new_provider_real_adress} value={this.state.new_provider.real_adress.index} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.region")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="region" onChange={this.handleChange_new_provider_real_adress} value={this.state.new_provider.real_adress.region}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.city")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="city" onChange={this.handleChange_new_provider_real_adress} value={this.state.new_provider.real_adress.city} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.street")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="street" onChange={this.handleChange_new_provider_real_adress} value={this.state.new_provider.real_adress.street} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.house")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="house" onChange={this.handleChange_new_provider_real_adress} value={this.state.new_provider.real_adress.house} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.appartement")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="appartement" onChange={this.handleChange_new_provider_real_adress} value={this.state.new_provider.real_adress.appartement} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
              {t("form_info.client")} <strong>{t("form_info.information")} </strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <FormGroup >

                      <Label>{t("form_info.discount_group")}  </Label>
                      <Input type="select" name="discount_group" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.discount_group}>
                        <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>

                      <Label>{t("form_info.reply_format")} </Label>
                      <Input type="select" name="reply_format" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.reply_format}>
                        <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>

                      <Label>{t("form_info.reply")} </Label>
                      <Input type="select" name="reply" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.reply}>
                      <option value="Ne pas envoyer">{t("form_info.dont_send")}</option>
                        <option value="Envoyer après traitement">{t("form_info.send_after")}</option>
                        <option value="Envoyer après la réponse et paramétrer le statut «Refus»">{t("form_info.send_after_param_status")}</option>
                      </Input>


                      <Label>{t("form_info.discount_group")} </Label>
                      <Input type="text" name="credit_limit" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.credit_limit} />

                      <Label>{t("form_info.day_deferred_paiement")} </Label>
                      <Input type="text" name="day_of_deffered_payment" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.day_of_deffered_payment}/>


                      <Label>{t("form_info.type_client")}</Label>
                      <Input type="text" name="type_of_client" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.type_of_client} />

                      <Label>{t("form_info.max_nb_visit_24h")}</Label>
                      <Input type="text" name="max_nb_visit_24hours" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.max_nb_visit_24hours} />
                      <FormText className="help-block">{t("form_info.notif_sent_msg")}</FormText>

                      <Label>{t("form_info.max_nb_visit_hour")}</Label>
                      <Input type="text" name="max_nb_visit_hours" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.max_nb_visit_hours} />
                      <FormText className="help-block">{t("form_info.notif_sent_msg")}</FormText>

                      <Label>{t("form_info.exclude_mark")} </Label>
                      <Input type="textarea" name="exclude_mark_from_blocking" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.exclude_mark_from_blocking}/>
                      <FormText className="help-block">{t("form_info.exclude_mark_notif")}</FormText>

                      <Label>{t("form_info.snapping_visibility.msg")}</Label>
                      <Input type="select" name="snapping_visibility" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.snapping_visibility}>
                      <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>

                      <Col xm="6">
                        <Input className="form-check-input" type="checkbox" name="disable_default_visibility" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.disable_default_visibility} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.disable_default_visibility")}</Label>
                      </Col>

                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup >
                      <Label>{t("form_info.region")}</Label>
                      <Input type="select" name="region" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.region}>
                      <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>
                      <Label>{t("form_info.director")} </Label>
                      <Input type="select" name="director" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.director}>
                      <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>
                      <Label>{t("form_info.delivery_itinary.msg")} </Label>
                      <Input type="select" name="delivery_itinary" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.delivery_itinary}>
                      <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>

                      <Col xm="6">
                        <Input className="form-check-input" type="checkbox" name="view_detail_warehouse_info" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.view_detail_warehouse_info} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.view_detail_warehouse_info")}</Label>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="automatic_invoice" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.automatic_invoice} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.invoice_auto")}</Label>
                    </FormGroup>

                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="send_sms" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.send_sms} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.send_sms")}</Label>
                    </FormGroup>

                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="send_email" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.send_email} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.send_email")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="lastest_news" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.lastest_news} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.receive_last_news")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="direct_mail" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.direct_mail} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.dont_send_direct_mail")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input className="form-check-input" type="checkbox"  name="second_name_price_list" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.second_name_price_list} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.second_name_in_price_list")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input className="form-check-input" type="checkbox"  name="warehouse_info" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.warehouse_info} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.view_warehouse_info")}</Label>
                    </FormGroup>
                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="prohib_automatic_remittance" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.prohib_automatic_remittance} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.prohib_auto_remittance")}</Label>
                    </FormGroup>

                    <FormGroup>
                      <Input className="form-check-input" type="checkbox" name="disable_access_web_service" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.disable_access_web_service}/>
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.disable_access_web")}</Label>
                    </FormGroup>

                    <Label>{t("form_info.max_nb_request_pday")}</Label>
                    <Input type="text" id="text-input" name="max_nb_laximo_per_dar" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.max_nb_laximo_per_dar} />

                    <Label>{t("form_info.percentage_package")}</Label>
                    <Input type="text" id="text-input" name="percentage_package" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.percentage_package} />

                    <Label>{t("form_info.reason")}</Label>
                    <Input type="text" id="text-input" name="reason" onChange={this.handleChange_new_provider_provider_information} value={this.state.new_provider.provider_information.reason} />

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>{t("form_info.color.color_representation")}</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <FormGroup check >
                    <Input className="form-check-input" type="checkbox" name="active_color" onChange={this.handleChange_new_provider_color_info} value={this.state.new_provider.color_info.active_color}  />
                    <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.color.active")}</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="2" md="2">
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.color.code")}</Label>
                      <Input type="text" id="color_info" name="color_code" onChange={this.handleChange_new_provider_color_info} value={this.state.new_provider.color_info.color_code} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col xs="12" md="12">
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.color.comment")}</Label>
                      <Input type="text" id="color_info" name="comment" onChange={this.handleChange_new_provider_color_info} value={this.state.new_provider.color_info.comment} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>{t("form_info.delivery_types")}  </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" md="12">
                      <Input type="text" name="delivery_type" onChange={this.handleChange_new_provider} value={this.state.new_provider.delivery_type} />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>{t("form_info.comment")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col xs="12" >
                      <Input type="textarea" name="comment" onChange={this.handleChange_new_provider} value={this.state.new_provider.comment} />
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Button onClick={this.addProvider} color="success"> {t("form_info.button.add")}</Button>
      </div>
    );
  }
}

const Forms_Translated = withTranslation('common')(Forms)


export default Forms_Translated;
