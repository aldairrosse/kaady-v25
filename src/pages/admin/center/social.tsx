import {
    InstagramIcon,
    TiktokIcon,
    TwitterIcon,
    YoutubeIcon,
} from "@components/Icons";
import {
    ArrowBack,
    FacebookRounded,
    Public,
    SaveAlt,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    Divider,
    IconButton,
    Stack,
    TextField,
    Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router";

export default function Nuevo() {
    const navigate = useNavigate();
    return (
        <Stack
            sx={{
                height: "100dvh",
                maxHeight: "100dvh",
                width: "100%",
                overflow: "hidden",
                position: "relative",
            }}
        >
            <AppBar position="sticky" component={"nav"} elevation={0}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBack />
                    </IconButton>
                    <h1 className="title-large">Redes sociales</h1>
                </Toolbar>
            </AppBar>
            <Stack
                flexGrow={1}
                sx={{ overflowY: "auto", pt: 4, pb: 6, px: 4 }}
                alignItems={"center"}
            >
                <Stack maxWidth={"sm"} width={"100%"}>
                    <Stack alignItems={"center"} direction={"row"} gap={2}>
                        <Public />
                        <h2 className="title-medium">Enlaces</h2>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField label="Facebook" fullWidth />
                        <IconButton color="primary">
                            <FacebookRounded />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField label="Twitter (X)" fullWidth />
                        <IconButton color="primary">
                            <TwitterIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField label="Instagram" fullWidth />
                        <IconButton color="primary">
                            <InstagramIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField label="Tiktok" fullWidth />
                        <IconButton color="primary">
                            <TiktokIcon />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction={"row"}
                        gap={2}
                        alignItems={"center"}
                        mt={2}
                    >
                        <TextField label="Youtube" fullWidth />
                        <IconButton color="primary">
                            <YoutubeIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack direction={"row"} px={4} py={2} justifyContent={"center"}>
                <Button
                    startIcon={<SaveAlt />}
                    variant="contained"
                    size="large"
                    disableElevation
                >
                    Actualizar
                </Button>
            </Stack>
        </Stack>
    );
}
