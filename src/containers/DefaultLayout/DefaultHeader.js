import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Button, Dropdown } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/logo1.png'
import Cookies from 'js-cookie';

import i18next from '../../i18next';
import { useTranslation, withTranslation } from "react-i18next";

import language_icon from '../../assets/flag_langage/language.png';
import en_flag from '../../assets/flag_langage/en.png';
import fr_flag from '../../assets/flag_langage/fr.png';
import ru_flag from '../../assets/flag_langage/ru.png';


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirection: false,
      dropdownOpen: false,
      lg: i18next.languages[0]
    }

    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getlangage = this.getlangage.bind(this);
    this.get_render_langage = this.get_render_langage.bind(this);
  }


  logout() {
    Cookies.remove("auth_Era_Auto_Admin");
    this.setState({
      redirection: true
    })
  }

  toggle(){
    let open;

    if(this.state.dropdownOpen){
      open = false
    }
    else{
      open = true;
    }

    this.setState({
      dropdownOpen: open
    })
  }

  getlangage(lg){    
    i18next.changeLanguage(lg)
    this.setState({
      lg: lg
    })
  }

  get_render_langage(lg){
    const {t} = this.props

    switch (lg) {
      case 'en':
        return <DropdownToggle caret>{t("translate.en")}  <img width="25" src={en_flag}/></DropdownToggle>
      break;
      
      case 'fr':
        return <DropdownToggle caret>{t("translate.fr")}  <img width="25" src={fr_flag}/></DropdownToggle>
        break;

      case 'ru':
        return <DropdownToggle caret>{t("translate.ru")}  <img width="25" src={ru_flag}/></DropdownToggle>
      break;

      default:
        return <DropdownToggle caret> {t("translate.title")} <img width="20" src={language_icon}/></DropdownToggle>
      break;
    }
  }


  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    console.log(this.props)
    if (this.state.redirection) {
      return <Redirect to='/login' />
    }

    const { t } = this.props;

    return (

      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 160, height: 50, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 50, height: 50, alt: 'CoreUI Logo' }}
        // style={{backgroundColor: 'black'}}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >{t('navbar.Dashboard')}</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>

          <Button color="danger" onClick={() => this.logout()}>{t('navbar.Logout')}</Button>

          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>            
              {this.get_render_langage(this.state.lg)}          
            <DropdownMenu>
              <DropdownItem header>{t("translate.msg")}</DropdownItem>
              <DropdownItem onClick={() => this.getlangage('en')}>{t("translate.en")} <img width="25" src={en_flag}/> </DropdownItem>
              <DropdownItem onClick={() => this.getlangage('fr')}>{t("translate.fr")} <img width="25" src={fr_flag}/></DropdownItem>
              <DropdownItem onClick={() => this.getlangage('ru')}>{t("translate.ru")} <img width="25" src={ru_flag}/></DropdownItem>              
            </DropdownMenu>
          </Dropdown>          
        </Nav>        
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const DefaultHeader_Translated = withTranslation('common')(DefaultHeader)

export default DefaultHeader_Translated;
