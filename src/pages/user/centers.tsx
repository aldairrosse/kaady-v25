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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Center } from "@models/Center";
import { useApiCenter } from "@api/center";
import { useDebounce } from "@hooks/useDebounce";
import { ApiError } from "@hooks/useRequest";
import ImagePlaceholder from "@components/ImagePlaceholder";
import { getDocUrl } from "@utils/docs";
import { useCenter } from "@hooks/useCenter";

export default function Centers() {
    const setCenter = useCenter((s) => s.setData);
    const { listarCentros } = useApiCenter();
    const [search, setSearch] = useState("");
    const debounced = useDebounce(search, 500);
    const [filtered, setFiltered] = useState<Center[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await listarCentros({
                    search: debounced,
                    page: 1,
                });
                setFiltered(res.data);
            } catch (error) {
                console.error((error as ApiError).error);
            }
        };
        load();
    }, [debounced]);
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
                {filtered.map((item, i) => (
                    <Card
                        key={item._id || i}
                        elevation={0}
                        onClick={() => {
                            setCenter(item);
                            navigate(`/user/center/${item._id}`);
                        }}
                    >
                        <ListItemButton sx={{ py: 2, borderRadius: 2 }}>
                            <Stack direction={"row"} gap={2} width={"100%"}>
                                <Stack flexGrow={1}>
                                    <Stack
                                        flexWrap={"wrap"}
                                        gap={1}
                                        direction={"row"}
                                        alignItems={"center"}
                                    >
                                        <h1 className="title-large">
                                            {item.name}
                                        </h1>
                                        {item.activities?.map((a) => (
                                            <Chip
                                                label={a}
                                                key={a}
                                                size="small"
                                            />
                                        ))}
                                    </Stack>
                                    <p
                                        className="body-medium opacity-80"
                                        style={{ marginTop: 8 }}
                                    >
                                        {item.location_data?.address ??
                                            "Sin ubicación"}
                                    </p>
                                </Stack>
                                <Avatar
                                    sx={{
                                        bgcolor: (t) =>
                                            item.image?.id
                                                ? "unset"
                                                : t.palette.primary.main,
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
                            </Stack>
                        </ListItemButton>
                    </Card>
                ))}
                {filtered.length == 0 && (
                    <p
                        className="body-large opacity-80"
                        style={{ padding: 16 }}
                    >
                        No se encontraron resultados
                    </p>
                )}
            </Stack>
        </Box>
    );
}
