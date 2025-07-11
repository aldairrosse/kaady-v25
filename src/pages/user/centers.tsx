import { Search } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    Chip,
    InputAdornment,
    ListItemButton,
    Stack,
    TextField,
} from "@mui/material";

import centers from "@config/kaady-centers.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Centers() {
    const [search, setSearch] = useState("");
    const [filterd, setFiltered] = useState(centers);
    const navigate = useNavigate();

    useEffect(() => {
        setFiltered(
            centers.filter((item) =>
                item.nombre.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search]);
    return (
        <Box width={"100%"} sx={{ height: "100%", overflowY: "auto", pb: 4 }}>
            <Stack sx={{ px: 2, py: 2 }}>
                <TextField
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
            </Stack>

            <Stack gap={2} sx={{ px: 1 }}>
                {filterd.map((item, i) => (
                    <Card
                        key={i}
                        elevation={0}
                        onClick={() => navigate(`/center/${i}`)}
                    >
                        <ListItemButton sx={{ py: 2, borderRadius: 2 }}>
                            <Stack direction={"row"} gap={2} width={"100%"}>
                                <Stack flexGrow={1}>
                                    <h1 className="title-large">
                                        {item.nombre}
                                    </h1>
                                    <Stack
                                        flexWrap={"wrap"}
                                        gap={1}
                                        direction={"row"}
                                        marginTop={1}
                                    >
                                        {item.actividades.map((a) => (
                                            <Chip
                                                label={a}
                                                key={a}
                                                size="small"
                                            />
                                        ))}
                                    </Stack>
                                </Stack>
                                <Avatar
                                    sx={{
                                        bgcolor: (t) => t.palette.primary.main,
                                    }}
                                >
                                    {item.nombre.charAt(0)}
                                </Avatar>
                            </Stack>
                        </ListItemButton>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
