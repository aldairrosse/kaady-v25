import Container, { ContainerProps } from "@mui/material/Container";

function Root(props: ContainerProps) {
    return (
        <Container
            maxWidth="lg"
            style={{ height: "auto", minHeight: "100vh" }}
            {...props}
        >
            {props.children}
        </Container>
    );
}

export default Root;
