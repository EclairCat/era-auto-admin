import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';


import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';


import { useTranslation, withTranslation } from "react-i18next";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));



class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  

  render() {

    const { t } = this.props;

    //Route.JS
const Dashboard = React.lazy(() => import('../../views/Dashboard'));
const Commande_Client = React.lazy(() => import('../../views/Commande_Client'));
const Commande_Fournisseur = React.lazy(() => import('../../views/Commande_Fournisseur'));
const Liste_Clients = React.lazy(() => import('../../views/Liste_Clients'));
const Liste_Fournisseurs = React.lazy(() => import('../../views/Liste_Fournisseurs'));
const Nouveau_Client = React.lazy(() => import('../../views/Nouveau_Client'));
const Nouveau_Fournisseur = React.lazy(() => import('../../views/Nouveau_Fournisseur'));
const Facture = React.lazy(()=> import('../../views/Facture/Facture'));
const Livraison_Client = React.lazy(()=> import('../../views/Livraison_Client/Livraison_Client'));
const Livraison_Fournisseur = React.lazy(()=> import('../../views/Livraison_Fournisseur/Livraison_Fournisseur'));
const Nouveau_Bc_Fournisseur = React.lazy(()=> import('../../views/Nouveau_Bc_Fournisseur/Nouveau_Bc_Fournisseur'));
const Nouveau_Bl_Fournisseur = React.lazy(()=> import('../../views/Nouveau_Bl_Fournisseur/Nouveau_Bl_Fournisseur'));
const Nouveau_Bl_Client = React.lazy(()=> import('../../views/Nouveau_Bl_Client/Nouveau_bl_client'));
const Cathegory_Client = React.lazy(()=> import('../../views/Cathegory_Client/Cathegory_Client'));
const Nouveau_Produit = React.lazy(()=> import('../../views/Nouveau_Produit/Nouveau_Produit'));
const API = React.lazy(() => import('../../views/API'));
const Liste_Des_Avoirs = React.lazy(() => import('../../views/Liste_Des_Avoirs/Liste_des_avoirs'));
const Admin_user = React.lazy(() => import('../../views/Admin_User/admin_user'));


const routes = [
  { path: '/', exact: true, name: t('side_menu.home') },
  { path: '/dashboard', name: t('navbar.Dashboard'), component: Dashboard },  
  { path: '/Client_Order', name: t('side_menu.client.order'), component: Commande_Client },
  { path: '/Provider_Order', name: t('side_menu.provider.order'), component: Commande_Fournisseur },
  { path: '/Client_List', name: t('side_menu.client.list'), component: Liste_Clients },
  { path: '/Provider_List', name: t('side_menu.provider.list'), component: Liste_Fournisseurs },
  { path: '/New_Client', name: t('side_menu.client.new'), component: Nouveau_Client },
  { path: '/New_Provider', name: t('side_menu.provider.new'), component: Nouveau_Fournisseur },
  { path: '/Bills', name: t('side_menu.client.bill'), component: Facture },
  { path: '/Client_Delivery', name: t('side_menu.client.delivery'), component: Livraison_Client },
  { path: '/Provider_Delivery', name: t('side_menu.provider.delivery'), component: Livraison_Fournisseur },
  { path: '/New_Provider_Order', name: t('side_menu.provider.new_order'), component: Nouveau_Bc_Fournisseur },
  { path: '/New_Delivery_Provider', name: t('side_menu.provider.new_delivery'), component: Nouveau_Bl_Fournisseur },
  { path: '/New_Delivery_Client', name: t('side_menu.client.new_delivery'), component: Nouveau_Bl_Client },
  { path: '/Cathegory_Client', name: t('side_menu.client.cathegory'), component: Cathegory_Client },
  { path: '/New_Product', name: t('side_menu.product.new'), component: Nouveau_Produit },  
  { path: '/API', name: t('side_menu.admin.api'), component: API },
  { path: '/Return_Product', name: t('side_menu.product.return'), component: Liste_Des_Avoirs },
  { path: '/New_Admin', name: t('side_menu.admin.list'), component:  Admin_user },
  
];
    
    //Menu Side Bar Items NavConfig
    const nav_items = {
      items:[
        {
          name: t('side_menu.home'),
          url: '/dashboard',
          icon: 'icon-speedometer',
          // badge: {
          //   variant: 'info',
          //   text: 'NEW',
          // },
        },
        {
          name: t('side_menu.client.title'),
          url: '/Clients',
          icon: 'icon-folder',
          children: [
            {
              name: t('side_menu.client.list'),
              url: '/Client_List',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.client.cathegory'),
              url: '/Cathegory_Client',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.client.order'),
              url: '/Client_Order',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.client.delivery'),
              url: '/Client_Delivery',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.client.new'),
              url: '/New_Client',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.client.new_delivery'),
              url: '/New_Delivery_Client',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.client.bill'),
              url: '/Bills',
              icon: 'icon-cursor',
            },
          ],
        },
        {
          name: t('side_menu.provider.title'),
          url: '/buttons',
          icon: 'icon-folder',
          children: [
            {
              name: t('side_menu.provider.list'),
              url: '/Provider_List',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.provider.order'),
              url: '/Provider_Order',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.provider.delivery'),
              url: '/Provider_Delivery',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.provider.new'),
              url: '/New_Provider',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.provider.new_order'),
              url: '/New_Provider_Order',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.provider.new_delivery'),
              url: '/New_Delivery_Provider',
              icon: 'icon-cursor',
            },
          ],
        },
        {
          name: t('side_menu.product.title'),
          url: '/Products',
          icon: 'icon-folder',
          children: [
            {
              name: t('side_menu.product.new'),
              url: '/New_Product',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.product.return'),
              url: '/Return_Product',
              icon: 'icon-cursor',
            },
          ],
        },
        {
          name: t('side_menu.admin.title'),
          url: '/notifications',
          icon: 'icon-folder',
          children: [
            {
              name: t('side_menu.admin.api'),
              url: '/API',
              icon: 'icon-cursor',
            },
            {
              name: t('side_menu.admin.list'),
              url: '/New_Admin',
              icon: 'icon-cursor',
            },
          ],
        }
      ]
    } 

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={nav_items} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const DefaultLayout_Translated = withTranslation('common')(DefaultLayout)



export default DefaultLayout_Translated;
