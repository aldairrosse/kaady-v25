import { PlaceOutlined } from "@mui/icons-material";
import { Box, Icon, Stack } from "@mui/material";

export default function Location() {
    return (
        <Box sx={{ pt: 4, pb: 6, px: 2 }}>
            <Stack direction={"row"} gap={2} mb={1}>
                <Icon>
                    <PlaceOutlined />
                </Icon>
                <h2 className="title-large">Ubicación del centro</h2>
            </Stack>
            <p className="body-medium">
                Nezahualcoyotl, Estado de México
            </p>
        </Box>
    )
}