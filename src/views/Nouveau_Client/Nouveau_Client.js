import React, { Component } from 'react';
import axios from 'axios';
import {
  Badge,
  Button,
  Card,  CardBody,  CardFooter,  CardHeader,
  Col,
  Form, FormGroup, FormText,
  Input,
  Label,
  Row,
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
import Cookies from 'js-cookie';
import {useTranslation, withTranslation} from "react-i18next";


class Nouveau_Client extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {   

      new_client: {
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
          type_of_client: "",
          reply_format: "",
          reply: "",
          discount_group: "",
          allow_client_to_assign_discount_group: "",
          credit_limit: "",
          day_of_deffered_payment: "",
          discount_card_number: "",
          promotional_code: "",
          basis: "",
          id_1c: "",
          invoice_auto: false,          
          send_sms: false,
          send_email: false,
          lastest_news: false,
          direct_mail: false,
          second_name_price_list: false,
          warehouse_info: false,
          prohib_automatic_remittance: false,
          allow_print_basket: false,
          disable_access_web_service: false,
          prohibit_creation_invoices: false,
          do_not_send_document_after_invoice: false,
          change_name_of_the_product: false,
          max_nb_laximo_per_dar: "",
          percentage_package: "",
          max_nb_visit_24hours: "",
          max_nb_visit_hours: "",
          exclude_mark_from_blocking: "",
          director: "",
          region: "",
          action_when_ordering: "",
          approved_payment_method: "",
          snapping_visibility: "",
          disable_default_visibility: false,
          delivery_itinary: "",
          view_detail_warehouse_info: false,
          storage_location: "",
        },
        color_info: {
          active_color: false,
          color_code: "",
          comment: "",
        },
        delivery_type: "",
        comment: ""
      },

      edit_client : "",

      //Modal
      modalDetail: {
        title: "",
        body: "",
        footer: "",
        visible: false,
        width: 400,
        height: 300,
      },
      modalDetailedit: {
        title: "",
        body: "",
        footer: "",
        visible: false,
        width: 400,
        height: 300,
      },
      //Liste Cathegory
      client_cathegory: [],

    };
    this.addClient = this.addClient.bind(this);
    this.handleChange_new_client = this.handleChange_new_client.bind(this);
    this.handleChange_new_client_color_info = this.handleChange_new_client_color_info.bind(this);
    this.handleChange_new_client_provider_information = this.handleChange_new_client_provider_information.bind(this);
    this.handleChange_new_client_real_adress = this.handleChange_new_client_real_adress.bind(this);
    this.handleChange_new_client_legal_adress = this.handleChange_new_client_legal_adress.bind(this);
    this.handleChange_new_client_additional_contact = this.handleChange_new_client_additional_contact.bind(this);
    this.handleChange_new_client_contact_person = this.handleChange_new_client_contact_person.bind(this);
    this.handleChange_new_client_data = this.handleChange_new_client_data.bind(this); 
    
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getTypeClient = this.getTypeClient.bind(this);
    this.editClient = this.editClient.bind(this);
    this.openModaledit = this.openModaledit.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  handleChange_new_client(event) {

    var name = event.target.name;
    var value = event.target.value;

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        [name]: value
      }
    }));
  }

  handleChange_new_client_color_info(event) {

    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        color_info: {
          ...prevState.new_client.color_info,
          [name]: value,
        }

      }
    }));

  }

  handleChange_new_client_provider_information(event) {

    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        provider_information: {
          ...prevState.new_client.provider_information,
          [name]: value,
        }

      }
    }));

  }

  handleChange_new_client_real_adress(event) {

    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        real_adress: {
          ...prevState.new_client.real_adress,
          [name]: value,
        }

      }
    }));

  }

  handleChange_new_client_legal_adress(event) {

    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        legal_adress: {
          ...prevState.new_client.legal_adress,
          [name]: value,
        }

      }
    }));

  }

  handleChange_new_client_additional_contact(event) {
    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        additional_contact: {
          ...prevState.new_client.additional_contact,
          [name]: value,
        }

      }
    }));
  }

  handleChange_new_client_contact_person(event) {
    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        contact_person: {
          ...prevState.new_client.contact_person,
          [name]: value,
        }

      }
    }));
  }

  handleChange_new_client_data(event) {
    var name = event.target.name;
    var value = event.target.value;

    if (event.target.type == "checkbox") {
      value = event.target.checked;
    }

    this.setState(prevState => ({
      new_client: {
        ...prevState.new_client,
        data: {
          ...prevState.new_client.data,
          [name]: value,
        }

      }
    }));
  }

  addClient(event) {


    event.preventDefault();

    console.log(this.state);

    if (this.state.mdp == this.state.confirm_mdp) {
      axios.post('http://localhost:4000/api/addClient',
        {
          new_client: this.state.new_client,
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
          console.log(this.state);
        })
    }
    else {
      window.confirm("Password doesn't Match")
    }

  }

  editClient(event) {


    event.preventDefault();

    console.log(this.state);
    axios.post('http://localhost:4000/api/updateClient',
      {
        new_client: this.state.new_client,
        token : Cookies.get("auth_Era_Auto_Admin")

      },
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(res => {

        if (res.status = 200) {
          this.openModaledit("Success!", "Client Edited!")
        }       
        
        

      })
      .catch(error => {
        window.confirm("Error");
        console.log(this.state);
      })


  }

  getTypeClient() {
    axios.get('http://localhost:4000/api/showTypeClient',
    {
      params: {
        token : Cookies.get("auth_Era_Auto_Admin")

      }
    },
    { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        if (res.status = 200) {
          this.setState({
            client_cathegory: res.data,
          })

        }
      })
      .catch(error => {
        window.confirm("Error");
      })
  }

  componentDidMount() {
    this.getTypeClient();

    if (this.props.editmode) {
      this.setClient(this.props.client)
    }
  }

  /*
  *   MODALS METHODS
  */

  closeModal(editmode) {
    this.setState({
      modalDetail: {
        visible: false,
      }
    })

    if(editmode)
    {
      this.props.closeEdit()
    }
    
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
  
  openModaledit(title, body) {
    this.setState({
      modalDetailedit: {
        visible: true,
        title: title,
        body: body,
      },
    })    
  }

  setClient(client) {

    axios.get('http://localhost:4000/api/getClientById', { 
      params : {
          id_client : client.id_client,
          token : Cookies.get("auth_Era_Auto_Admin"),

      }
    },
    { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
      if (res.status = 200) {
        console.log(res.data)

        var data = res.data[0];

        this.setState({
          new_client: {
            data: {
              email: data.email,
              telephone: data.phone,             
              use_primary_messaging: data.use_primary_messaging,
            },
            contact_person: {
              last_name: data.last_name,
              first_name: data.first_name,
              second_last_name: data.second_last_name,
              active_account: data.active_account ,
              refuse_profile_modif: data.refuse_profile_modif,
              display_oem: data.display_oem,
            },
            additional_contact: {
              skype: data.skype,
              phone: data.other_phone,
              icq: data.icq,
              website: data.website,
            },
            legal_adress: {
              index:data.legal_index,
              region: data.legal_region,
              city: data.legal_city,
              street: data.legal_street,
              house: data.legal_house,
              appartement: data.legal_appartement,
            },
            real_adress: {
              index: data.delivery_index,
              region: data.delivery_region,
              city: data.delivery_city,
              street: data.delivery_street,
              house: data.delivery_house,
              appartement: data.delivery_appartement,
            },
            provider_information: {
              type_of_client: data.id_type_client,
              reply_format: data.reply_format,
              reply: data.reply,
              discount_group: data.discount_group,
              allow_client_to_assign_discount_group: data.allow_client_to_assign_discount_group,
              credit_limit: data.credit_limit,
              day_of_deffered_payment: data.day_of_deffered_payment,
              discount_card_number: data.discount_card_number,
              promotional_code: data.promotional_code,
              basis: data.basis,
              id_1c: data.id_1c,
              invoice_auto: data.invoice_auto,          
              send_sms: data.send_sms,
              send_email: data.send_email,
              lastest_news: data.lastest_news,
              direct_mail: data.direct_mail,
              second_name_price_list: data.second_name_price_list,
              warehouse_info: data.warehouse_info,
              prohib_automatic_remittance: data.prohib_automatic_remittance,
              allow_print_basket: data.allow_print_basket,
              disable_access_web_service: data.disable_access_web_service,
              prohibit_creation_invoices: data.prohibit_creation_invoices,
              do_not_send_document_after_invoice: data.do_not_send_document_after_invoice,
              change_name_of_the_product: data.change_name_of_the_product,
              max_nb_laximo_per_dar: data.max_nb_laximo_per_dar,
              percentage_package: data.percentage_package,
              max_nb_visit_24hours: data.max_nb_visit_24hours,
              max_nb_visit_hours: data.max_nb_visit_hours,
              exclude_mark_from_blocking: data.exclude_mark_from_blocking,
              director: data.director,
              region: data.region,
              action_when_ordering: data.action_when_ordering,
              approved_payment_method: data.approved_payment_method,
              snapping_visibility: data.snapping_visibility,
              disable_default_visibility: data.disable_default_visibility,
              delivery_itinary: data.delivery_itinary,
              view_detail_warehouse_info: data.view_detail_warehouse_info,
              storage_location: data.storage_location,
            },
            color_info: {
              active_color: data.active_color,
              color_code: data.color_code,
              comment: data.color_comment,
            },
            delivery_type: data.delivery_type,
            comment: data.comment
          },
        });
      }
    })
    .catch(error => {
      window.confirm("Error Try again later");
      console.log(this.state);
    })
  }

  renderAddOrEditButton() {
    //Translate
    const { t } = this.props;

    if (this.props.editmode) {
      return <Button onClick={this.editClient} color="success"> {t("form_info.button.edit")}</Button>
    }
    else {
      return <Button onClick={this.addClient} color="success"> {t("form_info.button.add")}</Button>
    }
  }

  render() {

    //Translate
    const { t } = this.props;

    return (
      <div className="animated fadeIn">
        <Modal isOpen={this.state.modalDetail.visible} width={this.state.modalDetail.width} height={this.state.modalDetail.height} toggle={() => this.closeModal(false)}>
          <ModalHeader toggle={() => this.closeModal(false)}>
            {this.state.modalDetail.title}
          </ModalHeader>
          <ModalBody>
            {this.state.modalDetail.body}
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.modalDetailedit.visible} width={this.state.modalDetailedit.width} height={this.state.modalDetailedit.height} toggle={() => this.closeModal(true)}>
          <ModalHeader toggle={() => this.closeModal(true)}>
            {this.state.modalDetailedit.title}
          </ModalHeader>
          <ModalBody>
            {this.state.modalDetailedit.body}
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
                      <Input type="email" name="email" onChange={this.handleChange_new_client_data} value={this.state.new_client.data.email} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="input">{t("form_info.phone")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" maxLength={10} name="telephone" onChange={this.handleChange_new_client_data} value={this.state.new_client.data.telephone} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("form_info.password")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="password" name="password" onChange={this.handleChange_new_client_data} value={this.state.new_client.data.password} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="password-input">{t("form_info.password_confirm")}*</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="password" name="password_comfirm" onChange={this.handleChange_new_client_data} value={this.state.new_client.data.password_comfirm} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <FormGroup check className="checkbox">
                        <Input className="form-check-input" type="checkbox" name="use_primary_messaging" onChange={this.handleChange_new_client_data} checked={this.state.new_client.data.use_primary_messaging} />
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
                      <Input type="text" name="last_name" onChange={this.handleChange_new_client_contact_person} value={this.state.new_client.contact_person.last_name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">{t("form_info.first_name")}*</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="first_name" onChange={this.handleChange_new_client_contact_person} value={this.state.new_client.contact_person.first_name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">{t("form_info.second_name")}</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" name="second_last_name" onChange={this.handleChange_new_client_contact_person} value={this.state.new_client.contact_person.second_last_name} />
                    </Col>
                  </FormGroup>
                  <FormGroup row check className="checkbox">
                    <Col>
                      <Input className="form-check-input" type="checkbox" name="active_account" onChange={this.handleChange_new_client_contact_person} checked={this.state.new_client.contact_person.active_account} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.active")}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row check className="checkbox">
                    <Col>
                      <Input className="form-check-input" type="checkbox" name="refuse_profile_modif" onChange={this.handleChange_new_client_contact_person} checked={this.state.new_client.contact_person.refuse_profile_modif} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.refuse_profile_modif")}</Label>
                    </Col>
                  </FormGroup>
                  <FormGroup row check className="checkbox">
                    <Col>
                      <Input className="form-check-input" type="checkbox" name="display_oem" onChange={this.handleChange_new_client_contact_person} checked={this.state.new_client.contact_person.display_oem} />
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
              {t("form_info.additional")} <strong> {t("form_info.contact")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="text-input">{t("form_info.skype")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="skype" onChange={this.handleChange_new_client_additional_contact} value={this.state.new_client.additional_contact.skype} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.phone")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" maxLength={10} name="phone" onChange={this.handleChange_new_client_additional_contact} value={this.state.new_client.additional_contact.phone} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.icq")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="icq" onChange={this.handleChange_new_client_additional_contact} value={this.state.new_client.additional_contact.icq} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.website")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="text" name="website" onChange={this.handleChange_new_client_additional_contact} value={this.state.new_client.additional_contact.website} />
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
                      <Input type="text" name="index" onChange={this.handleChange_new_client_legal_adress} value={this.state.new_client.legal_adress.index} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.region")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="region" onChange={this.handleChange_new_client_legal_adress} value={this.state.new_client.legal_adress.region} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.city")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="city" onChange={this.handleChange_new_client_legal_adress} value={this.state.new_client.legal_adress.city} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.street")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="street" onChange={this.handleChange_new_client_legal_adress} value={this.state.new_client.legal_adress.street} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.house")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="house" onChange={this.handleChange_new_client_legal_adress} value={this.state.new_client.legal_adress.house} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.appartement")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="appartement" onChange={this.handleChange_new_client_legal_adress} value={this.state.new_client.legal_adress.appartement} />
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
                      <Input type="text" name="index" onChange={this.handleChange_new_client_real_adress} value={this.state.new_client.real_adress.index} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.region")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="region" onChange={this.handleChange_new_client_real_adress} value={this.state.new_client.real_adress.region} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.city")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="city" onChange={this.handleChange_new_client_real_adress} value={this.state.new_client.real_adress.city} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.street")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="street" onChange={this.handleChange_new_client_real_adress} value={this.state.new_client.real_adress.street} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.house")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="house" onChange={this.handleChange_new_client_real_adress} value={this.state.new_client.real_adress.house} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4">
                      <Label htmlFor="email-input">{t("form_info.appartement")}</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input type="email" name="appartement" onChange={this.handleChange_new_client_real_adress} value={this.state.new_client.real_adress.appartement} />
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

                      <Label>{t("form_info.type_client")}</Label>
                      <Input type="select" name="type_of_client" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.type_of_client} >
                        {this.state.client_cathegory.map((type, index)=> {
                          return <option value={type.idType} key={index}> {type.nom_type} </option>
                        })}
                      </Input>



                      <Label>{t("form_info.reply_format")} </Label>
                      <Input type="select" name="reply_format" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.reply_format}>
                        <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>

                      <Label>{t("form_info.reply")} </Label>
                      <Input type="select" name="reply" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.reply}>
                        <option value="Ne pas envoyer">{t("form_info.dont_send")}</option>
                        <option value="Envoyer après traitement">{t("form_info.send_after")}</option>
                        <option value="Envoyer après la réponse et paramétrer le statut «Refus»">{t("form_info.send_after_param_status")}</option>
                      </Input>

                      <Label>{t("form_info.discount_group")} </Label>
                      <Input type="select" name="discount_group" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.discount_group}>
                        <option value="None">None</option>
                        <option value="test">test</option>
                      </Input>

                      <FormGroup check>
                        <Input type="checkbox" name="allow_client_to_assign_discount_group" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.allow_client_to_assign_discount_group} />
                        <Label check htmlFor="checkbox1">{t("form_info.allow_customer_asign_discount_groupe")}</Label>
                      </FormGroup>


                      <Label>{t("form_info.credit_limit")} </Label>
                      <Input type="text" name="credit_limit" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.credit_limit} />

                      <Label>{t("form_info.day_deferred_paiement")}</Label>
                      <Input type="text" name="day_of_deffered_payment" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.day_of_deffered_payment} />






                      <Label>{t("form_info.discount_card_number")}</Label>
                      <Input type="text" name="discount_card_number" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.discount_card_number} />

                      <Label>{t("form_info.promotional_code")}</Label>
                      <Input type="text" name="promotional_code" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.promotional_code} />

                      <Label>{t("form_info.basis")} </Label>
                      <Input type="text" name="basis" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.basis} />

                      <Label>{t("form_info.1cid")}</Label>
                      <Input type="text" name="id_1c" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.id_1c} />


                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="invoice_auto" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.invoice_auto} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.invoice_auto")}</Label>
                      </FormGroup>                   

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="send_sms" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.send_sms} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.send_sms")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="send_email" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.send_email} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.send_email")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="lastest_news" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.lastest_news} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.receive_last_news")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="direct_mail" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.direct_mail} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.dont_send_direct_mail")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="second_name_price_list" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.second_name_price_list} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.second_name_in_price_list")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="warehouse_info" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.warehouse_info} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.view_warehouse_info")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="prohib_automatic_remittance" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.prohib_automatic_remittance} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.prohib_auto_remittance")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="allow_print_basket" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.allow_print_basket} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.allow_print_basket")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="disable_access_web_service" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.disable_access_web_service} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.disable_access_web")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="prohibit_creation_invoices" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.prohibit_creation_invoices} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.prohib_invoice")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="do_not_send_document_after_invoice" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.do_not_send_document_after_invoice} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.dont_send_invoice")}</Label>
                      </FormGroup>

                      <FormGroup check>
                        <Input className="form-check-input" type="checkbox" name="change_name_of_the_product" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.change_name_of_the_product} />
                        <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.allow_change_name_product")}</Label>
                      </FormGroup>

                      <Label>{t("form_info.max_nb_request_pday")}</Label>
                      <Input type="text" id="text-input" name="max_nb_laximo_per_dar" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.max_nb_laximo_per_dar} />

                      <Label>{t("form_info.percentage_package")}</Label>
                      <Input type="text" id="text-input" name="percentage_package" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.percentage_package} />


                      <Label>{t("form_info.max_nb_visit_24h")}</Label>
                      <Input type="text" name="max_nb_visit_24hours" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.max_nb_visit_24hours} />
                      <FormText className="help-block">{t("form_info.notif_sent_msg")}</FormText>

                      <Label>{t("form_info.max_nb_visit_hour")}</Label>
                      <Input type="text" name="max_nb_visit_hours" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.max_nb_visit_hours} />
                      <FormText className="help-block">{t("form_info.notif_sent_msg")}</FormText>

                      <Label>{t("form_info.exclude_mark")} </Label>
                      <Input type="textarea" name="exclude_mark_from_blocking" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.exclude_mark_from_blocking} />
                      <FormText className="help-block">{t("form_info.exclude_mark_notif")}</FormText>



                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <Label>{t("form_info.director")} </Label>
                    <Input type="select" name="director" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.director}>
                      <option value="None">None</option>
                      <option value="test">test</option>
                    </Input>

                    <Label>{t("form_info.region")} </Label>
                    <Input type="select" name="region" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.region}>
                      <option value="None">None</option>
                      <option value="test">test</option>
                    </Input>


                    <Label>{t("form_info.action_when_order.msg")} </Label>
                    <Input type="select" name="action_when_ordering" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.action_when_ordering}>
                      <option value="Awaiting Approval">{t("form_info.action_when_order.select1")}</option>
                      <option value="To work with a positive limit">{t("form_info.action_when_order.select2")}</option>
                      <option value="Switch to order with a positive limit">{t("form_info.action_when_order.select3")}</option>
                      <option value="If there is no credit limit, we transfer to Pending Payment">{t("form_info.action_when_order.select4")}</option>
                      <option value="If there is no credit limit, we transfer it to Awaiting payment, if available, we transfer it to In progress status">{t("form_info.action_when_order.select5")}</option>
                      <option value="If there is no credit limit, we do not place it in the order, if available, we transfer it to the status In progress">{t("form_info.action_when_order.select6")}</option>
                    </Input>

                    <Label>{t("form_info.approved_payement_method.msg")}</Label>
                    <Input type="select" name="approved_payment_method" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.approved_payment_method}>
                      <option value="None">None</option>
                      <option value="test">test</option>
                    </Input>

                    <Label>{t("form_info.snapping_visibility.msg")}</Label>
                    <Input type="select" name="snapping_visibility" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.snapping_visibility}>
                      <option value="None">None</option>
                      <option value="test">test</option>
                    </Input>

                    <Col xm="6">
                      <Input className="form-check-input" type="checkbox" name="disable_default_visibility" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.disable_default_visibility} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.disable_default_visibility")} </Label>
                    </Col>

                    <Label>{t("form_info.delivery_itinary.msg")} </Label>
                    <Input type="select" name="delivery_itinary" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.delivery_itinary}>
                      <option value="None">None</option>
                      <option value="test">test</option>
                    </Input>

                    <Col xm="6">
                      <Input className="form-check-input" type="checkbox" name="view_detail_warehouse_info" onChange={this.handleChange_new_client_provider_information} checked={this.state.new_client.provider_information.view_detail_warehouse_info} />
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.view_detail_warehouse_info")}</Label>
                    </Col>

                    <Label>{t("form_info.storage_location.msg")} </Label>
                    <Input type="select" name="storage_location" onChange={this.handleChange_new_client_provider_information} value={this.state.new_client.provider_information.storage_location}>
                      <option value="None">None</option>
                      <option value="test">test</option>
                    </Input>


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
                <strong>{t("form_info.color.color_representation")} </strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <FormGroup check >
                    <Input className="form-check-input" type="checkbox" name="active_color" onChange={this.handleChange_new_client_color_info} checked={this.state.new_client.color_info.active_color} />
                    <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.color.active")}</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="2" md="2">
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.color.code")}</Label>
                      <Input type="text" id="color_info" name="color_code" onChange={this.handleChange_new_client_color_info} value={this.state.new_client.color_info.color_code} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col xs="12" md="12">
                      <Label check className="form-check-label" htmlFor="checkbox1">{t("form_info.color.comment")}</Label>
                      <Input type="text" id="color_info" name="comment" onChange={this.handleChange_new_client_color_info} value={this.state.new_client.color_info.comment} />
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
                      <Input type="text" name="delivery_type" onChange={this.handleChange_new_client} value={this.state.new_client.delivery_type} />
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
                      <Input type="textarea" name="comment" onChange={this.handleChange_new_client} value={this.state.new_client.comment} />
                    </Col>
                  </FormGroup>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.renderAddOrEditButton()}
      </div>

    );
  }
}

const Nouveau_Client_Translated = withTranslation('common')(Nouveau_Client)


export default Nouveau_Client_Translated;
