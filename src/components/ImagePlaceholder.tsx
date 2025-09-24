import { Box, Stack, IconButton, CircularProgress } from "@mui/material";
import { Delete, ZoomOutMap } from "@mui/icons-material";
import Logo from "./Logo";
import { useContext, useState } from "react";
import Context from "./Context";

interface ImagePlaceholderProps {
    width?: number | string;
    height?: number | string;
    src?: string;
    onZoom?: () => void;
    onDelete?: () => void;
    enableZoom?: boolean;
    enableDelete?: boolean;
    showProgress?: boolean;
    disableBorder?: boolean;
    fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function ImagePlaceholder({
    width = 200,
    height = 200,
    fit,
    src,
    onZoom,
    onDelete,
    enableZoom = false,
    enableDelete = false,
    showProgress = false,
    disableBorder = false,
}: ImagePlaceholderProps) {
    const { scheme } = useContext(Context);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const handleImageLoad = () => {
        setTimeout(() => setShowPlaceholder(false), 100);
    };

    return (
        <Box
            sx={{
                position: "relative",
                height,
                width,
                borderRadius: 4,
                overflow: "hidden",
                border: !disableBorder
                    ? `1px solid ${scheme.outlineVariant}`
                    : "",
            }}
        >
            {/* Toolbar */}
            {(enableZoom || enableDelete || showProgress) && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        display: "flex",
                        gap: 1,
                        bgcolor: "rgba(0,0,0,0.5)",
                        alignItems: "center",
                        borderRadius: 2,
                        p: 1,
                    }}
                >
                    {showProgress && (
                        <CircularProgress
                            size={20}
                            sx={{ color: "white" }}
                            thickness={4}
                        />
                    )}
                    {enableZoom && (
                        <IconButton
                            size="small"
                            onClick={onZoom}
                            sx={{ color: "white" }}
                        >
                            <ZoomOutMap fontSize="small" />
                        </IconButton>
                    )}
                    {enableDelete && (
                        <IconButton
                            size="small"
                            onClick={onDelete}
                            sx={{ color: "white" }}
                        >
                            <Delete fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            )}

            {/* Image */}
            {src && (
                <img
                    src={src}
                    onLoad={handleImageLoad}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: fit || "contain",
                        backgroundPosition: "center",
                        filter: showProgress ? "blur(2px)" : "none",
                        opacity: showPlaceholder ? 0 : 1,
                        transition: "opacity 0.3s ease",
                    }}
                    alt="image"
                />
            )}

            {/* Placeholder */}
            {(!src || showPlaceholder) && (
                <Stack
                    position={src ? "absolute" : "static"}
                    top={0}
                    left={0}
                    width={"100%"}
                    height={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bgcolor={scheme.primaryContainer}
                >
                    <Logo
                        type="icon"
                        height="70%"
                        color={scheme.primary}
                        sx={{ opacity: 0.6 }}
                    />
                </Stack>
            )}
        </Box>
    );
}
