import { Button, Stack, SxProps } from "@mui/material";
import { useRef } from "react";

export default function ({
    sx,
    chips,
    onClick,
    bgcolor,
    color = "primary",
    variant = "contained",
}: {
    chips: string[];
    onClick?: (chip: string) => void;
    color?:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning";
    bgcolor?: string;
    variant?: "contained" | "elevated" | "text" | "tonal" | "outlined";
    sx?: SxProps;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: React.TouchEvent | React.MouseEvent) => {
        isDragging = true;
        startX =
            "touches" in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        scrollLeft = scrollRef.current?.scrollLeft ?? 0;
    };

    const onMouseMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        const x =
            "touches" in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;
        const walk = x - startX;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
        isDragging = false;
    };
    return (
        <Stack
            direction="row"
            spacing={1}
            flexWrap="nowrap"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onMouseDown}
            onTouchMove={onMouseMove}
            onTouchEnd={onMouseUp}
            ref={scrollRef}
            sx={{
                ...sx,
                overflowX: "auto",
                overflowY: "hidden",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            {chips.map((chip, index) => (
                <Button
                    key={index}
                    variant={variant}
                    color={color}
                    onClick={() => onClick?.(chip)}
                    sx={{
                        whiteSpace: "nowrap",
                        minWidth: "auto",
                        width: "max-content",
                        bgcolor,
                    }}
                >
                    {chip}
                </Button>
            ))}
        </Stack>
    );
}
