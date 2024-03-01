// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons/faCookie";

interface CookieContentProps {
    domainName: string;
    cookiePolicyLink: string;
}

function CookieContent({ domainName, cookiePolicyLink }: CookieContentProps) {
    return <>
        <div className="content">
            <h5>
                <FontAwesomeIcon
                    icon={ faCookie }
                    style={ {
                        width: "1.125rem",
                        height: "1.125rem",
                        color: "#aa7733",
                        marginRight: "0.5rem",
                    } }
                />
                Cookies
            </h5>

            <p>
                We use cookies to improve user experience. Choose what
                cookies you allow <b>{ domainName }</b> to use. Your consent
                will be valid across all our subdomains. Learn
                more in our <a href={ cookiePolicyLink }>Cookie Policy</a>.
            </p>
        </div>
    </>;
}

export default CookieContent;
