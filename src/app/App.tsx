import "./App.css";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        fetch(
            "https://mathswe-cookie-consent-staging.tobiasbriones-dev.workers.dev/",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        "essential": true,
                        "functional": true,
                        "analytics": true,
                        "targeting": true,
                    },
                ),
            },
        )
            .then(r => console.log(r.json()))
            .catch(r => console.log(r));
    });
    return <>
        MathSwe
    </>;
}

export default App;
