import React, { Component } from 'react';
import './PageFooter.css';
import { connect } from 'react-redux'
import { Footer } from 'react-materialize'


class PageFooter extends Component {

  render() {
        return (
            <Footer id="footer"
                links={
                    <ul>
                        <li><a href="#!">Link 1</a></li>
                        <li><a href="#!">Link 2</a></li>
                        <li><a href="#!">Link 3</a></li>
                    </ul>
                }
                className='example'
                >
                    <h5 className="white-text">Footer Content</h5>
                    <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
            </Footer>
        )
    }
  }


export default connect(null, null)(PageFooter)