import "./App.css";
import Header from "@components/Article/Heading/Header.tsx";
import Main from "@components/Article/Main/Main.tsx";

function App() {
    return <>
        <Main>
            <section id="tsd">
                <Header
                    appName="MathSwe"
                    icon={ {
                        src: "/mathswe.svg",
                        name: "MathSwe",
                    } }
                ></Header>

                <p>Supporting Mathematical Software</p>
            </section>
        </Main>
    </>;
}

export default App;
