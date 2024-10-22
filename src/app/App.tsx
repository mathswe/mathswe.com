import "./App.css";
import { Msw } from "@app/msw/Msw.tsx";
import Header from "@components/Article/Heading/Header.tsx";
import Main from "@components/Article/Main/Main.tsx";
import { Section } from "@components/Article/Section/Section.tsx";

function App() {
    return <>
        <Main>
            <Section className="tsd">
                <Header
                    appName="MathSwe"
                    icon={ {
                        src: "/mathswe.svg",
                        name: "MathSwe",
                    } }
                ></Header>

                <p>Supporting Modern Mathematics</p>
            </Section>

            <Msw />
        </Main>
    </>;
}

export default App;
