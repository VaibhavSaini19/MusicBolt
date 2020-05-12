import React from 'react'

export const Footer = () => {
    return (
        <footer className="footer mt-5 pt-3" style={{background: '#0C2461'}}>
            <div className="row w-100">
                <h2 id="contactus" className="mx-auto text-white font-weight-bold">
                    <span>Contact Us</span>
                </h2>
            </div>
            <div className="container py-3">
                <div className="row text-white">
                    <div className="col row">
                        <div className="col d-flex flex-column">
                            <h3>Tech Stack</h3>
                            <ul>
                                <li>MongoDB</li>
                                <li>Express.js</li>
                                <li>React.js</li>
                                <li>Node.js</li>
                                <li>Bootstrap</li>
                            </ul>
                        </div>
                        <div className="col">
                            <h3>Contribute</h3>
                            <ul>
                                <li><a className="text-white" href="https://github.com/VaibhavSaini19/MusicBolt">MusicBolt @ GitHub</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <form action="" className="">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input className="form-control" type="text" name="name" id="name" placeholder="John Doe"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="query">Query</label>
                                <textarea className="form-control" name="query" id="query" cols="30" rows="10" placeholder="Describe your query here"></textarea>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}
