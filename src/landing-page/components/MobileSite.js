import React, {Component} from 'react'
import { Accordion, AccordionItem } from 'react-light-accordion';
import { NavLink } from 'react-router-dom'

class MobileSite extends Component{
    render(){
        return(
            <div className="mobilesitemap">
                <h4 className="sitemenuhead">Menu</h4>
                <Accordion atomic={true}>
                    <AccordionItem title="Masters">
                        <ul className="sitemapul">
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli" onClick={this.props.mobilesitemap}>Zone Master</li>
                        </NavLink>
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli">Region Master</li>
                        </NavLink>
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli">Item Category Master</li>
                        </NavLink>
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli">Primary Sales Master</li>
                        </NavLink>
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli">Doctor Grade Master</li>
                        </NavLink>
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli">Chemist Master</li>
                        </NavLink>
                        <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                            <li className="sitemapli">Doctor Master</li>
                        </NavLink>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title="Customer Lists">
                        <ul className="sitemapul">
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Zone Master</li>
                            </NavLink>
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Region Master</li>
                            </NavLink>
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Item Category Master</li>
                            </NavLink>
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Primary Sales Master</li>
                            </NavLink>
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Doctor Grade Master</li>
                            </NavLink>
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Chemist Master</li>
                            </NavLink>
                            <NavLink activeClassName='is-active' className="sitenav" exact={true} to='/dcr'>
                                <li className="sitemapli">Doctor Master</li>
                            </NavLink>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title="Visit Related Reports">
                        <ul>
                            <li>sumeet</li>
                            <li>kumar</li>
                        </ul>
                    </AccordionItem>
                </Accordion>
            </div>
        )
    }

}
export default MobileSite
