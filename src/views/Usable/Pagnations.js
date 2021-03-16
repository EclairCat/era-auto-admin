import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { number } from 'prop-types';

class  Paginations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pageNumbers: [],      
    };
    
    //this.paginate = this.paginate.bind(this);
    this.getPageNumbers = this.getPageNumbers.bind(this);
  }

  //Créer un array de page nesséssaire en fonction de la taille des données.
  getPageNumbers(){
    
    const numberPage = [];
    for (let i = 1; i <= Math.ceil(this.props.total_Data / this.props.number_Per_Page); i++) {
      numberPage.push(i);
    }

    this.setState({
      pageNumbers: numberPage,
    });    
    
  }

  
  componentDidUpdate(previousProps, prevState){
      if (previousProps !== this.props) {  
      this.getPageNumbers()
    }
  }

  render() 
  {   

    return ( 
      <Pagination>
        
        {this.state.pageNumbers.map((value, index) => {
          return <PaginationItem key={index}>
            <PaginationLink onClick={()=> this.props.paginate(value)} tag="button" >
              {value}
            </PaginationLink>
          </PaginationItem>
        })}
        
      </Pagination>
    )      
  }

}
export default Paginations;
