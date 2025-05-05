import Container from "@mui/material/Container";
import { ReactNode } from "react";

const Root = ({ children }: { children: ReactNode }) => {
    return (
        <Container maxWidth="lg" style={{ height: "100vh" }}>
            {children}
        </Container>
    );
};

export default Root;
