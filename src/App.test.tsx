import App from "@app/App.tsx";
import { render, screen } from "@testing-library/react";

describe("App tests", () => {
    it("should render the title", () => {
        render(<App />);

        expect(
            screen.getByRole("heading", {
                level: 1,
            }),
        ).toHaveTextContent("MathSwe");
    });
});
