import { useApiMail } from "@api/mail";
import Context from "@components/Context";
import Loading from "@components/Loading";
import SimpleDialog from "@components/SimpleDialog";
import { ApiError } from "@hooks/request";
import { useSession } from "@hooks/session";
import {
    AttachFile,
    Delete,
    FormatBold,
    FormatItalic,
    FormatSize,
    SendOutlined,
} from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    IconButton,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import { readFileAsBase64 } from "@utils/docs";
import { getEmailFrom, getSizeLabel } from "@utils/format";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export default function Send() {
    const [emails, setEmails] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [types, setType] = useState<string[]>([]);
    const content = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);
    const { scheme } = useContext(Context);
    const [files, setFiles] = useState<File[]>([]);
    const { enviarMail } = useApiMail();
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);

    const session = useSession();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        show: false,
        message: "",
        title: "",
    });

    const checkForMail = () => {
        const value = inputValue.trim().replace(",", "");
        if (isValidEmail(value) && !emails.includes(value)) {
            setEmails([...emails, value]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            checkForMail();
        }
    };

    function handleFormatCommand(types: string[]) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        if (!content.current?.contains(range.commonAncestorContainer)) return;

        if (range.collapsed) return;

        const activeFormats = getActiveFormatsFromSelection(range);

        for (const t of types) {
            if (!activeFormats.includes(t)) {
                wrapSelection(range, t);
            }
        }

        for (const t of activeFormats) {
            if (!types.includes(t)) {
                unwrapTagFromSelection(range, t);
            }
        }
    }

    function normalizeTag(root: ParentNode, tagToNormalize: string) {
        const t = tagToNormalize.toLowerCase();

        // 1) Remover tags vacíos
        const emptyNodes = Array.from(
            root.querySelectorAll(t)
        ) as HTMLElement[];
        for (const n of emptyNodes) {
            if ((n.textContent ?? "").trim() === "") {
                const children = Array.from(n.childNodes);
                if (children.length) {
                    n.replaceWith(...children);
                } else {
                    n.remove();
                }
            }
        }

        // 2) Desenrollar duplicados anidados <t><t>... -> dejar uno
        let nested = root.querySelector(`${t} ${t}`) as HTMLElement | null;
        while (nested) {
            nested.replaceWith(...Array.from(nested.childNodes));
            nested = root.querySelector(`${t} ${t}`) as HTMLElement | null;
        }

        // 3) Fusionar hermanos adyacentes <t>..</t><t>..</t>
        const all = Array.from(root.querySelectorAll(t)) as HTMLElement[];
        for (const el of all) {
            const next = el.nextElementSibling;
            if (next && next.tagName.toLowerCase() === t) {
                while (next.firstChild) {
                    el.appendChild(next.firstChild);
                }
                next.remove();
            }
        }
    }

    function getActiveFormatsFromSelection(range: Range): string[] {
        const tags: string[] = [];

        const node =
            range.startContainer.nodeType === Node.TEXT_NODE
                ? range.startContainer.parentElement
                : (range.startContainer as HTMLElement);

        if (!node) return tags;

        let el: HTMLElement | null = node;
        while (el && el !== document.body) {
            const tag = el.tagName.toLowerCase();
            if (["b", "i", "h2"].includes(tag)) {
                tags.push(tag);
            }
            el = el.parentElement;
        }

        return tags;
    }

    function wrapSelection(range: Range, tag: string) {
        if (!content.current) return;
        const tagName = tag.toLowerCase();

        // Verificar si ya estamos completamente dentro del tag
        const startEl =
            range.startContainer.nodeType === Node.TEXT_NODE
                ? range.startContainer.parentElement
                : (range.startContainer as HTMLElement);

        const endEl =
            range.endContainer.nodeType === Node.TEXT_NODE
                ? range.endContainer.parentElement
                : (range.endContainer as HTMLElement);

        const findTagAncestor = (el: HTMLElement | null) => {
            while (el && el !== content.current) {
                if (el.tagName.toLowerCase() === tagName) return el;
                el = el.parentElement;
            }
            return null;
        };

        const startTag = findTagAncestor(startEl);
        const endTag = findTagAncestor(endEl);

        if (startTag && endTag && startTag === endTag) {
            // Ya está completamente dentro → no hacer nada
            return;
        }

        // Creamos el tag y movemos la selección dentro
        const wrapper = document.createElement(tagName);
        wrapper.appendChild(range.extractContents());
        range.insertNode(wrapper);

        // Normalizar para evitar duplicados o vacíos
        normalizeTag(content.current, tagName);

        // Restaurar cursor al final de la selección
        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            const newRange = document.createRange();
            newRange.selectNodeContents(wrapper);
            newRange.collapse(false); // Cursor al final
            sel.addRange(newRange);
        }
    }

    function unwrapTagFromSelection(range: Range, tag: string) {
        if (!content.current) return;
        const container = content.current;
        const tagName = tag.toLowerCase();

        // Tomamos snapshot de elementos <tag>
        const tagElements = Array.from(
            container.querySelectorAll(tagName)
        ) as HTMLElement[];

        for (const el of tagElements) {
            try {
                if (!range.intersectsNode(el)) continue;
            } catch {
                continue;
            }

            // Calculamos el rango de intersección entre la selección y el contenido del elemento
            const elementRange = document.createRange();
            elementRange.selectNodeContents(el);
            const intersection = range.cloneRange();
            if (
                intersection.compareBoundaryPoints(
                    Range.START_TO_START,
                    elementRange
                ) < 0
            ) {
                intersection.setStart(
                    elementRange.startContainer,
                    elementRange.startOffset
                );
            }
            if (
                intersection.compareBoundaryPoints(
                    Range.END_TO_END,
                    elementRange
                ) > 0
            ) {
                intersection.setEnd(
                    elementRange.endContainer,
                    elementRange.endOffset
                );
            }

            // Si la intersección está vacía -> nada que hacer (p. ej. caret fuera)
            if (intersection.collapsed) continue;

            // Creamos marcadores únicos (span con atributo data), los insertamos (end primero)
            const uid = "m_" + Math.random().toString(36).slice(2, 9);

            const endMarker = document.createElement("span");
            endMarker.setAttribute("data-unwrap-end", uid);
            // visualmente invisibles para evitar efectos; igual se serializan en innerHTML
            endMarker.style.display = "none";

            const startMarker = document.createElement("span");
            startMarker.setAttribute("data-unwrap-start", uid);
            startMarker.style.display = "none";

            // Insertar MARKERS: end primero (para no desajustar offsets)
            const rEnd = intersection.cloneRange();
            rEnd.collapse(false);
            rEnd.insertNode(endMarker);

            const rStart = intersection.cloneRange();
            rStart.collapse(true);
            rStart.insertNode(startMarker);

            // A partir de ahora el elemento 'el' contiene los marcadores en su innerHTML
            const startHTML = startMarker.outerHTML;
            const endHTML = endMarker.outerHTML;
            const elHTML = el.innerHTML;

            // Buscar los marcadores dentro del innerHTML del elemento
            const sIdx = elHTML.indexOf(startHTML);
            const eIdx = elHTML.indexOf(endHTML, sIdx + startHTML.length);

            // Si no encontramos (por cualquier motivo), limpiamos marcadores y seguimos
            if (sIdx === -1 || eIdx === -1) {
                startMarker.remove();
                endMarker.remove();
                continue;
            }

            // Particionamos innerHTML en before / middle / after (sin los marcadores)
            const beforeHTML = elHTML.slice(0, sIdx);
            const middleHTML = elHTML.slice(sIdx + startHTML.length, eIdx);
            const afterHTML = elHTML.slice(eIdx + endHTML.length);

            // Reconstruimos: solo envolvemos before/after si no están vacíos
            const wrapIf = (htmlFragment: string) =>
                htmlFragment.trim() === ""
                    ? ""
                    : `<${tagName}>${htmlFragment}</${tagName}>`;

            const newHTML = wrapIf(beforeHTML) + middleHTML + wrapIf(afterHTML);
            // Esto quita el tag alrededor de middleHTML (la porción seleccionada) y preserva otras etiquetas
            el.outerHTML = newHTML;
        }

        normalizeTag(container, tagName);

        const sel = window.getSelection();
        if (sel) {
            sel.removeAllRanges();
            const newRange = document.createRange();

            if (!range.collapsed) {
                newRange.setStart(range.endContainer, range.endOffset);
            } else {
                newRange.setStart(range.startContainer, range.startOffset);
            }
            newRange.collapse(true);
            sel.addRange(newRange);
        }
    }

    const selectFile = () => {
        if (!input.current) return;
        input.current.click();
    };

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;
        setFiles((v) => [...v, file]);
        e.target.value = "";
    };

    const handleSend = async () => {
        if (!content.current) return;
        if (!session.user) {
            showAlert("No se encuentra tu usuario");
            return;
        }

        if (!content.current.innerText.trim()) {
            showAlert("Debe ingresar un mensaje");
            return;
        }
        if (!emails.length) {
            showAlert("Debe indicar al menos un destinatario");
            return;
        }
        if (!subject.trim()) {
            showAlert("Debe indicar un asunto del mensaje");
            return;
        }
        setLoading(true);
        try {
            const attachments = await Promise.all(
                files.map((f) => readFileAsBase64(f))
            );
            const res = await enviarMail({
                subject,
                to: emails,
                attachments,
                content: content.current.innerHTML,
                from: getEmailFrom(session.user.email, session.identity?.name),
            });
            console.log(res);
            navigate("/mail/outbox");
        } catch (error) {
            const alert = {
                title: "Ocurrió un error",
                message: (error as Error).message,
                show: true,
            };

            if (error instanceof ApiError) {
                alert.title = error.message;
                alert.message = error.error as string;
            }
            setAlert(alert);
        }
        setLoading(false);
    };

    function showAlert(message: string) {
        setAlert({
            title: "Campos vacíos",
            message,
            show: true,
        });
    }

    function updateToolbarStateFromSelection() {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        if (!content.current?.contains(range.commonAncestorContainer)) return;
        const activeFormats = getActiveFormatsFromSelection(range);
        setType(activeFormats);
    }

    useEffect(() => {
        const handler = () => {
            updateToolbarStateFromSelection();
        };

        document.addEventListener("selectionchange", handler);
        return () => {
            document.removeEventListener("selectionchange", handler);
        };
    }, []);

    useEffect(() => {
        if (!content.current) return;
        content.current.innerHTML = `<p>Hola!</p><br/>${
            session.identity?.sign || ""
        }`;
    }, [session.identity?.sign]);

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
            <h1 className="title-large">Enviar correo nuevo</h1>

            <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={emails}
                inputValue={inputValue}
                onInputChange={(_, newValue) => setInputValue(newValue)}
                onChange={(_, newEmails) =>
                    setEmails(newEmails.filter(isValidEmail))
                }
                renderValue={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option}
                            {...getTagProps({ index })}
                            key={option}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Para"
                        onKeyDown={handleKeyDown}
                        onBlur={checkForMail}
                        sx={{ mt: 2 }}
                    />
                )}
            />

            <TextField
                label="Asunto"
                sx={{ mt: 2 }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <Stack
                direction={"row"}
                mt={4}
                justifyContent={"end"}
                alignItems={"end"}
                gap={2}
            >
                <ToggleButtonGroup
                    value={types}
                    onChange={(_e, value) => {
                        setType(value);
                        handleFormatCommand(value);
                    }}
                    aria-label="format mail"
                    size="small"
                    sx={{
                        "& .Mui-selected": {
                            backgroundColor: scheme.primaryContainer,
                            color: scheme.primary,
                            borderLeft: `1px solid ${scheme.outline}`,
                        },
                    }}
                >
                    <ToggleButton value="b">
                        <FormatBold />
                    </ToggleButton>
                    <ToggleButton value="i">
                        <FormatItalic />
                    </ToggleButton>
                    <ToggleButton value="h2">
                        <FormatSize />
                    </ToggleButton>
                </ToggleButtonGroup>
                <IconButton onClick={selectFile}>
                    <AttachFile />
                </IconButton>
                <input
                    ref={input}
                    style={{ display: "none" }}
                    type="file"
                    accept=".pdf,.png,.jpeg"
                    onChange={onSelectFile}
                />
                <Stack
                    direction={"row"}
                    gap={2}
                    flexGrow={1}
                    justifyContent={"end"}
                >
                    <Button
                        startIcon={<SendOutlined />}
                        sx={{ px: 2 }}
                        variant="contained"
                        onClick={handleSend}
                    >
                        Enviar
                    </Button>
                </Stack>
            </Stack>

            <Box
                ref={content}
                contentEditable
                suppressContentEditableWarning
                sx={{
                    mt: 2,
                    border: `1px solid ${scheme.outlineVariant}`,
                    borderRadius: 1,
                    minHeight: 200,
                    padding: 2,
                    overflow: "auto",
                }}
            ></Box>
            {files.length > 0 && (
                <Stack direction={"row"} mt={2} gap={2} flexWrap={"wrap"}>
                    {files.map((file, i) => (
                        <Card
                            sx={{
                                bgcolor: scheme.surfaceContainerHighest,
                                pl: 2,
                                pr: 1,
                                py: 1,
                            }}
                            key={i}
                        >
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                gap={1}
                            >
                                <div>
                                    <h2 className="title-medium">
                                        {file.name}
                                    </h2>
                                    <p className="body-medium opacity-80">
                                        {getSizeLabel(file.size)}
                                    </p>
                                </div>
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        setFiles(
                                            files.filter((_, j) => j !== i)
                                        )
                                    }
                                >
                                    <Delete />
                                </IconButton>
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            )}

            <SimpleDialog
                {...alert}
                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
            />
            <Loading show={loading} message="Enviando correo..." />
        </Box>
    );
}
