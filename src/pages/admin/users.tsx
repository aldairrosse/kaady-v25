import { useApiUser } from "@api/user";
import Context from "@components/Context";
import ImagePlaceholder from "@components/ImagePlaceholder";
import { useDebounce } from "@hooks/useDebounce";
import { ApiError } from "@hooks/useRequest";
import { useUser } from "@hooks/useUser";
import { Paginator } from "@models/Settings";
import { User } from "@models/User";
import {
    Add,
    CardMembership,
    Edit,
    MoreVert,
    Search,
} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
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
import { getDocUrl } from "@utils/docs";
import { getUserFullName } from "@utils/user";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Users() {
    const { listarUsers } = useApiUser();
    const { scheme } = useContext(Context);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<User[]>([]);
    const [paginator, setPaginator] = useState<Paginator>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const debounced = useDebounce(search, 500);
    const navigate = useNavigate();
    const user = useUser();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await listarUsers({
                    search: debounced,
                    page: debounced.length ? 1 : paginator?.page ?? 1,
                });
                setFiltered(res.data);
                setPaginator(res.paginator);
            } catch (error) {
                console.error((error as ApiError).error);
            }
        };
        load();
    }, [debounced, paginator?.page]);

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
            <h1 className="title-large">Usuarios</h1>
            <p className="body-large opacity-80" style={{ marginTop: 8 }}>
                Registra y administra todos los usuarios de la plataforma
            </p>

            <Stack mt={4} gap={2} direction={"row"} alignItems={"center"}>
                <TextField
                    fullWidth
                    placeholder="Buscar usuario"
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
                    onClick={() => {
                        user.reset();
                        navigate("/admin/user/profile");
                    }}
                >
                    Registrar
                </Button>
            </Stack>
            <Stack gap={4} mt={4} flexGrow={1}>
                {filtered.length == 0 &&
                    (debounced?.length ? (
                        <p className="body-medium opacity-80">
                            No se encontraron resultados
                        </p>
                    ) : (
                        <p className="body-medium opacity-80">
                            No hay usuarios
                        </p>
                    ))}
                {filtered.map((item, i) => (
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
                            {item.image?.id ? (
                                <ImagePlaceholder
                                    width={"100%"}
                                    height={"100%"}
                                    fit="cover"
                                    src={getDocUrl(item.image, {
                                        width: 100,
                                        height: 100,
                                    })}
                                    disableBorder
                                />
                            ) : (
                                item.name.charAt(0)
                            )}
                        </Avatar>
                        <div style={{ flexGrow: 1 }}>
                            <h2 className="title-medium">
                                {getUserFullName(item)}
                            </h2>
                            <p className="body-medium opacity-70">
                                {item.email}
                            </p>
                        </div>
                        <IconButton
                            onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                user.setData(item);
                            }}
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
                            onClick={() => navigate("/admin/user/profile")}
                        >
                            <ListItemIcon>
                                <Edit fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Perfil</ListItemText>
                        </MenuItem>
                        {/* <MenuItem>
                            <ListItemIcon>
                                <Lock fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Bloquear</ListItemText>
                        </MenuItem> */}
                        <MenuItem
                            onClick={() => navigate("/admin/user/membership")}
                        >
                            <ListItemIcon>
                                <CardMembership fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Membresía</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Stack>

            <Stack alignItems={"center"} sx={{ mt: 4 }}>
                {paginator && (
                    <Pagination
                        color="primary"
                        count={paginator.pages}
                        page={paginator.page}
                        onChange={(_, page) => {
                            const p = { ...paginator, page };
                            setPaginator(p);
                        }}
                    />
                )}
            </Stack>
        </Box>
    );
}
