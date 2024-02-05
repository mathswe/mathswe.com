// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { APP_VERSION_LABEL } from "@/info.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

function Footer() {
    return <>
        <footer>
            <div className="nav row">
                <section className="col-6">
                    <h5>
                        Math Software
                    </h5>
                    <ul>
                        <li>
                            <a href="https://math.software">Math</a>
                        </li>
                        <li>
                            <a href="https://rsm.math.software">Repsymo</a>
                        </li>
                    </ul>
                </section>

                <section className="col-6">
                    <h5>
                        MSW Engineer
                    </h5>

                    <ul>
                        <li>
                            <a href="https://mathsoftware.engineer">Engineer</a>
                        </li>
                    </ul>

                    <div>
                        Founder Edition Engineering Works
                    </div>
                </section>

                <section className="col-6">
                    <h5>
                        Social
                    </h5>

                    <div className="social my-2">
                        <div>MSW Open Source:</div>

                        <a
                            className="btn btn-github"
                            href="https://github.com/mathsoftware"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={ faGithub }></FontAwesomeIcon>
                        </a>

                        <br />
                        <br />
                        <div>Follow <b>MathSwe</b> to stay updated:</div>

                        <a
                            className="btn btn-linkedin"
                            href="https://www.linkedin.com/company/mathswe"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon icon={ faLinkedin }></FontAwesomeIcon>
                        </a>
                    </div>
                </section>

                <section className="col-12 legal">
                    <h5>
                        Legal
                    </h5>

                    <ul>
                        <li>
                            <a href="/legal/cookies">Cookies Policy</a>
                        </li>
                    </ul>

                    <h6>MathSwe</h6>

                    <p>
                        Copyright © 2024 Tobias Briones. All rights reserved.
                    </p>
                </section>

                <section className="col-12 legal">
                    <h5 className="text-center">About</h5>

                    <p className="text-center">
                        MathSwe: Supporting modern mathematics.
                    </p>

                    <p className="text-center">
                        { APP_VERSION_LABEL }.
                    </p>
                </section>
            </div>
        </footer>
    </>;
}

export default Footer;
