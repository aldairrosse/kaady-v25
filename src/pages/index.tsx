import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Root from "@components/Root";
import Logo from "@components/Logo"
import { useContext } from "react";
import Context from "@components/Context";

function Welcome() {
    const { scheme, theme } = useContext(Context)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Root>
            <Stack paddingX={6} paddingY={4} alignItems={isMobile ? 'center' : ''}>
                <Logo height={isMobile ? '32px' : '48px'} color={scheme.onSurface} />
            </Stack>
            <Stack paddingX={6}
                direction={isMobile ? 'column-reverse' : 'row'}
                gap={4} alignItems={'center'}
                paddingBottom={isMobile ? 10 : 0} height={'auto'} minHeight={'calc(100% - 112px)'}>
                <Stack flexGrow={1} justifyContent={'end'} alignItems={isMobile ? 'center' : ''} textAlign={isMobile ? 'center' : 'start'}>
                    <Typography variant={isMobile ? 'h4' : 'h2'} component="h1">
                        Entrena ahora
                    </Typography>
                    <Typography variant="h6" component="h2" marginTop={2} style={{ opacity: 0.7 }}>
                        Con una sola membresía accede a todos tus entrenamientos
                    </Typography>
                    <Stack direction='row' marginTop={8} gap={2} flexWrap={'wrap'} justifyContent={isMobile ? 'center' : ''}>
                        <Button size="large" variant="contained">Registrarme</Button>
                        <Button size="large">Conocer más</Button>
                    </Stack>
                </Stack>
                <Box width={'100%'} maxWidth={400} height={300} bgcolor={'GrayText'}>
                </Box>
            </Stack>
        </Root>
    );
};

export default Welcome;
