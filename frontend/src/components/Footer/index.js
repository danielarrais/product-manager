import React, {Component} from 'react';
import './styles.scss'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="clearfix">
                        <div className="float-left">
                            Daniel Arrais
                        </div>
                        <div className="float-right">
                            <span className="text-muted">
                                © {new Date().getFullYear()}, Proudly Coded by
                                <a href="https://www.danielarrais.dev" className="copyright-link ml-1">
                                    Daniel Arrais.
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}