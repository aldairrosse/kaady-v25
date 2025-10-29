import { useCenter } from "@hooks/useCenter";
import { PlaceOutlined } from "@mui/icons-material";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

export default function Location() {
    const { data: center } = useCenter();
    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box sx={{ pt: 4, pb: 6, px: 2, overflowX: "hidden" }}>
            <Stack
                sx={{
                    flexDirection: isPhone ? "column" : "row",
                    gap: 4,
                }}
            >
                <Stack width={"100%"}>
                    <Stack direction={"row"} gap={2} mb={2}>
                        <PlaceOutlined />
                        <h2 className="title-large">Dirección</h2>
                    </Stack>
                    <p className="body-medium opacity-80">
                        {center.location_data?.address ||
                            "Sin dirección registrada"}
                    </p>
                </Stack>
                <Box
                    width={450}
                    minWidth={450}
                    height={250}
                    borderRadius={4}
                    sx={{
                        backgroundImage:
                            center.location_data?.latitude &&
                            center.location_data?.longitude
                                ? `url(https://maps.googleapis.com/maps/api/staticmap?center=${
                                      center.location_data.latitude
                                  },${
                                      center.location_data.longitude
                                  }&zoom=15.5&size=450x250&maptype=roadmap&markers=color:red%7C${
                                      center.location_data.latitude
                                  },${
                                      center.location_data.longitude
                                  }&style=feature:poi|visibility:off&style=feature:poi.business|visibility:off&style=feature:transit|visibility:off&key=${
                                      import.meta.env.VITE_GOOGLE_API_KEY
                                  })`
                                : "none",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            </Stack>
        </Box>
    );
}
