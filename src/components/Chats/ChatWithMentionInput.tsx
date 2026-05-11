import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { useRef, useState } from "react";

import { FaArrowUp } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useChats } from "../../hooks/chat";
import { useToast } from "../../hooks/Toast";
import { useUserManagementProvider } from "../../hooks/user-management";
import { privateUpload } from "../../services";

const MAX_SIZE_MB = 5;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;
const MAX_FILES = 6;

const getCleanFileName = (name = "") => {
  return name.replace(/^file\d+-/, "");
};

const ChatWithMentionInput = ({
  inputRef,
  isEditing,
  setIsEditing,
  handleClearInput,
  editMessage,
  files,
  setFiles,
}: {
  editMessage: any;
  inputRef: any;
  isEditing: boolean;
  setIsEditing: any;
  handleClearInput: any;
  files: any[];
  setFiles: any;
}) => {
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateCreateMessage, handleUpdateChat } = useChats();
  const { userTagsData } = useUserManagementProvider();

  const showToast = useToast();
  const handleInput = () => {
    const sel = window.getSelection();
    if (!sel?.rangeCount) return;

    const range = sel.getRangeAt(0);
    const text = range.startContainer.textContent || "";
    const before = text.slice(0, range.startOffset);

    const match = before.match(/@(\w*)$/);

    if (!match) return setShow(false);

    const query = match[1].toLowerCase();

    setFiltered(
      userTagsData.filter((u: any) => u.fullName.toLowerCase().includes(query)),
    );
    setShow(true);
  };

  const insertMention = (user: any) => {
    const sel = window.getSelection();
    if (!sel?.rangeCount) return;

    const range = sel.getRangeAt(0);
    const node = range.startContainer;

    const text = node.textContent || "";
    const before = text.slice(0, range.startOffset);
    const match = before.match(/@(\w*)$/);
    if (!match) return;

    const start = range.startOffset - match[0].length;

    node.textContent = text.slice(0, start) + text.slice(range.startOffset);

    const newRange = document.createRange();
    newRange.setStart(node, start);
    newRange.collapse(true);

    sel.removeAllRanges();
    sel.addRange(newRange);

    const span = document.createElement("span");
    span.className = "mention";
    span.contentEditable = "false";

    span.dataset.type = "mention";
    span.dataset.tag_id = user.tag_id;

    span.innerText = `@${user.fullName}`;

    span.style.display = "inline-block";
    span.style.whiteSpace = "nowrap";

    newRange.insertNode(document.createTextNode(" "));
    newRange.insertNode(span);
    newRange.insertNode(document.createTextNode(" "));

    newRange.setStartAfter(span.nextSibling!);
    newRange.collapse(true);

    sel.removeAllRanges();
    sel.addRange(newRange);

    setShow(false);
  };

  const parseMessage = () => {
    const el = inputRef.current;
    if (!el) return [];

    const result: any[] = [];

    const pushText = (text: string, id?: string) => {
      const clean = text.replace(/\u00A0/g, " ");
      if (!clean || clean.trim() === "") return;

      result.push({
        type: "text",
        message: clean,
        ...(id && { _id: id }),
      });
    };

    const traverse = (node: any, parentId?: string) => {
      if (node.nodeType === 3) {
        pushText(node.textContent, parentId);
        return;
      }

      if (node.nodeType !== 1) return;

      if (node.dataset?.type === "mention") {
        result.push({
          type: "mention",
          tag_id: node.dataset.tag_id,
          tag_name: node.innerText.replace("@", ""),
          ...(node.dataset._id && { _id: node.dataset._id }),
        });
        return;
      }

      let currentId = parentId;
      if (node.dataset?.type === "text") {
        currentId = node.dataset._id;
      }

      node.childNodes.forEach((child: any) => traverse(child, currentId));
    };

    el.childNodes.forEach((node: any) => traverse(node));

    return result;
  };

  const handleSendMessage = async () => {
    const data = parseMessage();

    if (!data.length && !files.length) return;

    const currentFiles = [...files];

    setFiles([]);
    if (inputRef.current) inputRef.current.innerHTML = "";
    setShow(false);

    let fileMessages: any[] = [];

    if (currentFiles.length > 0) {
      fileMessages = await Promise.all(
        currentFiles.map(async (file) => {
          if (file.type === "existing") {
            return {
              type: "file",
              file: file.file_name.file_name,
            };
          } else {
            const { file_name } = await privateUpload(file.file);
            return {
              type: "file",
              file: file_name,
            };
          }
        }),
      );
    }

    const finalMessages = [...data, ...fileMessages];

    if (isEditing) {
      console.log("finalMessages on edit", finalMessages);
      handleUpdateChat(
        editMessage._id,
        { messages: finalMessages },
        {
          onError: (error: any) => {
            showToast(error?.response?.data?.message, "error");
          },
        },
      );
    } else {
      console.log("finalMessages on send", finalMessages);
      mutateCreateMessage(
        { data: { messages: finalMessages } },
        {
          onError: (error: any) => {
            showToast(error?.response?.data?.message, "error");
          },
        },
      );
    }

    setIsEditing(false);
  };

  const handleClearEdit = () => {
    handleClearInput();
    setFiles([]);
    setIsEditing(false);
  };

  const handleKeyDown = (e: any) => {
    const sel = window.getSelection();
    if (!sel?.anchorNode) return;
    let node: any = sel.anchorNode;
    while (node && node.nodeType !== 1) {
      node = node.parentNode;
    }
    if (node?.dataset?.type === "mention") {
      e.preventDefault();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="file"
          multiple
          hidden
          ref={fileInputRef}
          onChange={(e) => {
            const selected = Array.from(e.target.files || []);

            const validFiles: any[] = [];

            selected.forEach((file) => {
              if (file.size > MAX_SIZE) {
                showToast(
                  `${file.name} is too large. Please upload files smaller than ${MAX_SIZE_MB} MB.`,
                  "error",
                );
              } else {
                validFiles.push({
                  type: "new",
                  file,
                });
              }
            });

            if (validFiles.length > MAX_FILES) {
              showToast(
                `You can upload a maximum of ${MAX_FILES} files`,
                "error",
              );
              e.target.value = "";
              return;
            }

            setFiles((prev: any) => [...prev, ...validFiles]);
            e.target.value = "";
          }}
        />
        {show && (
          <Paper
            sx={{
              mt: 1,
              position: "absolute",
              zIndex: 1,
              bottom: 180,
              width: 200,
              overflowY: "auto",
              maxHeight: 200,
            }}
          >
            <List sx={{ p: 0 }}>
              {filtered.map((u: any) => (
                <ListItem
                  key={u.tag_id}
                  sx={{
                    borderBottom:
                      u.tag_id !== filtered.length - 1
                        ? "1px solid #e0e0e0"
                        : "none",
                  }}
                  disablePadding
                >
                  <ListItemButton
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertMention(u);
                    }}
                  >
                    <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                      {u.fullName.charAt(0)}
                    </Avatar>
                    {u.fullName}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 2,
            px: 1,
            py: 0.5,
            width: {
              xs: "100%",
              sm: "80%",
              md: "50%",
            },
            gap: 1,
          }}
        >
          <IconButton
            sx={{
              width: 40,
              height: 40,
              background: "#eee",
              borderRadius: "50%",
              flexShrink: 0,
            }}
            onClick={() => fileInputRef.current?.click()}
            disabled={files.length >= MAX_FILES}
          >
            <FiUpload />
          </IconButton>

          <Box
            ref={inputRef}
            contentEditable
            onInput={handleInput}
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            data-placeholder="Type a message or use @ to mention someone…"
            sx={{
              outline: "none",
              minHeight: 30,
              maxHeight: 50,
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              flex: 1,
              paddingTop: 0.5,
              "&:empty:before": {
                content: "attr(data-placeholder)",
                color: "gray",
                pointerEvents: "none",
              },
            }}
          />

          {isEditing ? (
            <>
              <Button
                sx={{ background: "red" }}
                variant="contained"
                onClick={handleClearEdit}
              >
                Cancel
              </Button>
              <Button
                sx={{ background: "black" }}
                variant="contained"
                onClick={handleSendMessage}
              >
                Update
              </Button>
            </>
          ) : (
            <IconButton
              sx={{
                width: 40,
                height: 40,
                background: "black",
                borderRadius: "50%",
                flexShrink: 0,
                "&:hover": { background: "#3e4241" },
              }}
              onClick={handleSendMessage}
            >
              <FaArrowUp style={{ color: "white", fontSize: 16 }} />
            </IconButton>
          )}
        </Box>

        {files.length > 0 && (
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {files.map((f, i) => {
              const isExisting = f.type === "existing";
              const isNew = f.type === "new";

              const isImage =
                (isNew && f.file?.type.startsWith("image")) ||
                (isExisting &&
                  /\.(jpg|jpeg|png|gif|webp)$/i.test(f.file_name.file_name));

              return (
                <Box
                  key={i}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    p: 1,
                    fontSize: 12,
                    position: "relative",
                  }}
                >
                  {isImage ? (
                    <img
                      src={
                        isExisting
                          ? `${f.file_name.url}`
                          : URL.createObjectURL(f.file)
                      }
                      alt=""
                      width={40}
                      height={40}
                      style={{ objectFit: "cover", margin: 10 }}
                    />
                  ) : (
                    <span style={{ margin: 10 }}>
                      {isExisting
                        ? getCleanFileName(f.file_name.file_name)
                        : f.file.name}
                    </span>
                  )}

                  <span
                    onClick={() =>
                      setFiles((prev: any) =>
                        prev.filter((_: any, index: any) => index !== i),
                      )
                    }
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 4,
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    ✕
                  </span>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatWithMentionInput;
