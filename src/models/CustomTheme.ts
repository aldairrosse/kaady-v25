import {
    Components,
    createTheme,
    Palette,
    PaletteOptions,
    Theme,
    ThemeOptions,
    TypographyVariantsOptions,
} from '@mui/material';
import { Scheme } from './Scheme';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        tonal: true;
        elevated: true;
    }
}

export class CustomTheme implements ThemeOptions {
    palette?: PaletteOptions;
    components?: Components<Omit<Theme, 'components'>>;
    typography?:
        | TypographyVariantsOptions
        | ((palette: Palette) => TypographyVariantsOptions);

    constructor(scheme: Scheme, isDark: boolean) {
        this.palette = {
            mode: isDark ? 'dark' : 'light',
            primary: {
                main: scheme.primary,
                contrastText: scheme.onPrimary,
            },
            secondary: {
                main: scheme.secondary,
                contrastText: scheme.onSecondary,
            },
            error: {
                main: scheme.error,
                contrastText: scheme.onError,
            },
            background: {
                default: scheme.background,
                paper: scheme.surfaceContainer,
            },
            text: {
                primary: scheme.onSurface,
                secondary: scheme.onSurfaceVariant,
            },
            divider: scheme.outline,
            tonalOffset: 0.05,
        };
        this.typography = {
            button: {
                textTransform: 'none',
                fontWeight: 'bold',
                lineHeight: 1.5,
            },
            h6: {
                fontWeight: 'normal',
            },
        };

        const theme = createTheme({ palette: this.palette });
        this.components = {
            MuiCssBaseline: {
                styleOverrides: `
					html {
						color-scheme: ${isDark ? 'dark' : 'light'};
					}
				`,
            },
            MuiAutocomplete: {
                styleOverrides: {
                    paper: {
                        borderRadius: '16px',
                    },
                },
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'tonal' },
                        style: {
                            ':hover': {
                                backgroundColor: theme.palette.augmentColor({
                                    color: {
                                        main: scheme.secondaryContainer,
                                    },
                                }).light,
                                boxShadow:
                                    '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                            },
                            color: scheme.onSecondaryContainer,
                            backgroundColor: scheme.secondaryContainer,
                        },
                    },
                    {
                        props: { variant: 'elevated' },
                        style: {
                            ':disabled': {
                                boxShadow: 'none',
                            },
                            ':hover': {
                                backgroundColor: theme.palette.augmentColor({
                                    color: {
                                        main: scheme.surfaceContainerLow,
                                    },
                                }).light,
                                boxShadow:
                                    '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
                            },
                            color: scheme.primary,
                            backgroundColor: scheme.surfaceContainerLow,
                            boxShadow:
                                '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
                        },
                    },
                ],
                styleOverrides: {
                    root: {
                        height: 'fit-content',
                        borderRadius: '100px',
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        background: scheme.surfaceContainer,
                        borderRadius: '16px',
                        backgroundImage: 'none',
                        minWidth: '200px',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '8px',
                        backgroundImage: 'none',
                        background: 'none',
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: '28px',
                        backgroundImage: 'none',
                    },
                },
            },
            MuiDialogActions: {
                styleOverrides: {
                    root: {
                        padding: '16px',
                        gap: '8px',
                    },
                },
            },
            MuiDialogTitle: {
                styleOverrides: {
                    root: {
                        fontWeight: 'bold',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundImage: 'none',
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        padding: 4,
                        '&.MuiSwitch-sizeSmall': {
                            padding: 6,
                            '& .MuiSwitch-switchBase': {
                                '&.Mui-checked': {
                                    '& + .MuiSwitch-track': {
                                        border: 'none',
                                        backgroundColor: scheme.secondaryContainer,
                                        opacity: 1,
                                    },
                                    '& .MuiSwitch-thumb': {
                                        backgroundColor: scheme.primary,
                                        width: 16,
                                        height: 16,
                                        margin: 0,
                                    },
                                },
                            },
                            '& .MuiSwitch-track': {
                                border: 'none',
                                backgroundColor: scheme.surfaceVariant,
                                opacity: 1,
                                borderRadius: 50,
                                '&::before, &::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    width: 16,
                                    height: 16,
                                },
                            },
                            '& .MuiSwitch-thumb': {
                                boxShadow: 'none',
                                backgroundColor: scheme.onSurfaceVariant,
                                width: 16,
                                height: 16,
                                margin: 0,
                            },
                        },
                        '& .MuiSwitch-switchBase': {
                            '&.Mui-checked': {
                                '& + .MuiSwitch-track': {
                                    border: 'none',
                                    backgroundColor: scheme.primary,
                                    opacity: 1,
                                },
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: scheme.onPrimary,
                                    width: 22,
                                    height: 22,
                                    margin: -1,
                                },
                                '&.Mui-disabled + .MuiSwitch-track': {
                                    opacity: 0.24,
                                },
                            },
                        },
                        '& .MuiSwitch-track': {
                            border: `2px solid ${scheme.outline}`,
                            backgroundColor: scheme.surfaceVariant,
                            opacity: 1,
                            borderRadius: 50,
                            '&::before, &::after': {
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 16,
                                height: 16,
                            },
                        },
                        '& .MuiSwitch-thumb': {
                            boxShadow: 'none',
                            backgroundColor: scheme.onSurfaceVariant,
                            width: 14,
                            height: 14,
                            margin: 3,
                        },
                        '& .Mui-disabled': {
                            opacity: 0.5,
                        },
                    },
                },
            },
        };
    }
}
