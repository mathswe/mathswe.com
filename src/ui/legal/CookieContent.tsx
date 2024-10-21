// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookie } from "@fortawesome/free-solid-svg-icons/faCookie";

type CookieContentProps = {
    domainName: string;
    cookiePolicyLink: string;
    extended?: boolean;
}

function CookieContent(
    {
        domainName,
        cookiePolicyLink,
        extended,
    }: CookieContentProps,
) {
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

            { extended &&
                <p>
                    Opting out of some types of cookies may impact your
                    experience
                    of our sites.

                    You can always set your consent by clicking
                    the &quot;Cookie Preference&quot; button at the page
                    footer.
                </p>
            }
        </div>
    </>;
}

export default CookieContent;
