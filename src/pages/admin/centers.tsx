import {
    Add,
    Edit,
    Lock,
    MonetizationOn,
    MoreVert,
    Photo,
    Place,
    Public,
    Search,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    IconButton,
    InputAdornment,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Pagination,
    Stack,
    TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import centers from "@config/kaady-centers.json";
import Context from "@components/Context";
import { useNavigate } from "react-router";

export default function Centers() {
    const { scheme } = useContext(Context);
    const [search, setSearch] = useState("");
    const [filterd, setFiltered] = useState(centers);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    useEffect(() => {
        setFiltered(
            centers.filter((item) =>
                item.nombre.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);

    return (
        <Box
            width={"100%"}
            height={"100%"}
            sx={{
                p: 4,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1 className="title-large">Centros deportivos</h1>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Registra y administra los perfiles de cada centro
            </p>
            <Stack mt={4} gap={2} direction={"row"} alignItems={"center"}>
                <TextField
                    fullWidth
                    placeholder="Buscar centro"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    slotProps={{
                        input: {
                            sx: { borderRadius: 100 },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Button
                    startIcon={<Add />}
                    sx={{ px: 3, py: 1 }}
                    variant="outlined"
                    onClick={() => navigate("/admin/center/profile")}
                >
                    Registrar
                </Button>
            </Stack>
            <Stack gap={4} mt={4} flexGrow={1}>
                {filterd.map((item, i) => (
                    <Stack
                        direction={"row"}
                        gap={2}
                        key={i}
                        alignItems={"center"}
                    >
                        <Avatar
                            sx={{
                                bgcolor: scheme.primaryContainer,
                                color: scheme.primary,
                            }}
                        >
                            {item.nombre.charAt(0)}
                        </Avatar>
                        <div style={{ flexGrow: 1 }}>
                            <h2 className="title-medium">{item.nombre}</h2>
                            <p className="body-medium opacity-70">
                                {"Nezahualcoyotl, México"}
                            </p>
                        </div>
                        <Card
                            elevation={0}
                            sx={{
                                px: "8px",
                                py: "4px",
                                bgcolor: scheme.secondary,
                                color: scheme.onSecondary,
                            }}
                        >
                            <p className="body-medium">Basic</p>
                        </Card>
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <MoreVert />
                        </IconButton>
                    </Stack>
                ))}
                <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <MenuList>
                        <MenuItem
                            onClick={() => navigate("/admin/center/profile")}
                        >
                            <ListItemIcon>
                                <Edit fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Perfil</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Lock fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Bloquear</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("/admin/center/location")}
                        >
                            <ListItemIcon>
                                <Place fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Ubicación</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("/admin/center/payment")}
                        >
                            <ListItemIcon>
                                <MonetizationOn fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Pago</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("/admin/center/pictures")}
                        >
                            <ListItemIcon>
                                <Photo fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Imágenes</ListItemText>
                        </MenuItem>
                        <MenuItem
                            onClick={() => navigate("/admin/center/social")}
                        >
                            <ListItemIcon>
                                <Public fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Redes</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            <Stack alignItems={"center"}>
                <Pagination count={1} color="primary" sx={{ mt: 6 }} />
            </Stack>
        </Box>
    );
}
