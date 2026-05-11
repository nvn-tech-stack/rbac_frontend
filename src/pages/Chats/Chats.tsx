import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { HiDotsVertical } from "react-icons/hi";
import { useChats } from "../../hooks/chat";
import { useAuth } from "../../hooks/auth";

import { useEffect, useRef, useState } from "react";

import ChatWithMentionInput from "../../components/Chats/ChatWithMentionInput";
import ChatMenuButton from "../../components/Chats/ChatMenuButton";
import { twelveHourTimeFormat } from "../../utils/helper";
import { MdOutlineFileDownload } from "react-icons/md";

const getCleanFileName = (name = "") => {
  return name.replace(/^file\d+-/, "");
};

const BoxContainer = styled(Box)({
  width: "100%",
  marginTop: 20,
  padding: "10px",
});

const ChatsContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  padding: "10px",
});

const MidContainer = styled(Box)({
  height: "550px",
  width: "100%",
  overflowY: "auto",

  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: 1,
  padding: 3,
  paddingBottom: 20,
});

export default function Chats() {
  const [chatId, setChatId] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [editMessage, setEditMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const { chats } = useChats();

  const { user } = useAuth();
  const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenMenu = (event: any, chat: any) => {
    setChatId(chat._id);
    setEditMessage(chat);
    setMenuAnchorEl(event.currentTarget);
  };

  const bottomScroll = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const setMessageToInput = (messages: any[]) => {
    const el = inputRef.current;
    if (!el) return;

    el.innerHTML = "";

    messages.forEach((item) => {
      if (item.type === "text") {
        el.appendChild(document.createTextNode(item.message || ""));
      }

      if (item.type === "mention") {
        const span = document.createElement("span");

        span.className = "mention";
        span.dataset.type = "mention";
        span.dataset.tag_id = item.tag_id;
        if (item._id) span.dataset._id = item._id;

        span.contentEditable = "false";
        span.innerText = `@${item.tag_name}`;

        span.style.display = "inline-block";
        span.style.whiteSpace = "nowrap";

        el.appendChild(document.createTextNode(" "));
        el.appendChild(span);
        el.appendChild(document.createTextNode(" "));
      }
    });
  };

  const handleEditMessage = (chat: any) => {
    setMessageToInput(chat.messages);

    const filesFromMessage = chat.messages
      .filter((msg: any) => msg.type === "file")
      .map((msg: any) => ({
        type: "existing",
        file_name: msg.file,
        _id: msg._id,
      }));

    setFiles(filesFromMessage);
    setIsEditing(true);
    setMenuAnchorEl(null);
  };

  const handleClearInput = () => {
    setMessageToInput([]);
    setIsEditing(false);
  };

  const handleDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div>
      <BoxContainer>
        <ChatsContainer>
          <Box className="top-header"></Box>

          {chats.length > 0 ? (
            <MidContainer>
              {chats.length > 0 &&
                chats?.map((chat) => {
                  const isMe = chat.created_by._id === user?._id;

                  return (
                    <Box
                      key={chat._id}
                      sx={{
                        display: "flex",
                        justifyContent: isMe ? "flex-end" : "flex-start",
                      }}
                    >
                      {!isMe && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: 1,
                          }}
                        >
                          {!chat.is_deleted && isMe && (
                            <>
                              <HiDotsVertical
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                }}
                              />
                            </>
                          )}
                          <Avatar sx={{ width: 25, height: 25 }} />
                        </Box>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          maxWidth: "50%",
                          marginTop: !isMe ? 1 : 0.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 10,
                            display: "flex",
                            justifyContent: isMe ? "flex-end" : "flex-start",
                          }}
                        >
                          {isMe
                            ? "Me"
                            : `${chat.created_by?.first_name} ${chat.created_by?.last_name || ""}`}
                        </Typography>

                        <Box
                          sx={{
                            backgroundColor: chat.is_deleted
                              ? "#ef7474"
                              : isMe
                                ? "#c5faba"
                                : "#f5f5f5",
                            padding: "5px 10px",
                            borderRadius: "12px",
                          }}
                        >
                          <Box
                            sx={{
                              backgroundColor: chat.is_deleted
                                ? "#ef7474"
                                : isMe
                                  ? "#c5faba"
                                  : "#f5f5f5",
                              padding: "5px 10px",
                              borderRadius: "12px",
                            }}
                          >
                            {chat.is_deleted ? (
                              <Typography sx={{ color: "white" }}>
                                This message was deleted
                              </Typography>
                            ) : (
                              chat.messages.map((msg) => {
                                if (msg.type === "text") {
                                  return (
                                    <Typography
                                      key={msg._id}
                                      component="span"
                                      sx={{ color: "black", mr: 0.5 }}
                                    >
                                      {msg.message}
                                    </Typography>
                                  );
                                } else if (msg.type === "mention") {
                                  return (
                                    <Typography
                                      key={msg._id}
                                      component="span"
                                      sx={{
                                        color: "blue",
                                        fontWeight: 500,
                                        mr: 0.5,
                                        backgroundColor: "#e6f0ff",
                                      }}
                                    >
                                      @{msg.tag_name}
                                    </Typography>
                                  );
                                } else if (msg.type === "file") {
                                  return (
                                    <Box key={msg._id} sx={{ mt: 1 }}>
                                      <img
                                        src={msg.file?.url}
                                        alt="img"
                                        style={{
                                          maxWidth: "200px",
                                          borderRadius: "8px",
                                          display: "block",
                                        }}
                                      />
                                      <Box
                                        onClick={() =>
                                          handleDownload(msg.file?.url)
                                        }
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "6px",
                                          px: 1.2,
                                          py: 0.7,
                                          borderRadius: "8px",
                                          width: "fit-content",
                                          color: "#333",
                                          fontSize: "14px",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <MdOutlineFileDownload size={18} />
                                        {getCleanFileName(
                                          msg.file?.file_name ||
                                            "Download file",
                                        )}
                                      </Box>
                                    </Box>
                                  );
                                }
                                return null;
                              })
                            )}
                          </Box>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 10,
                            display: "flex",
                            justifyContent: isMe ? "flex-end" : "flex-start",
                          }}
                        >
                          {twelveHourTimeFormat(chat.createdAt)}
                        </Typography>
                      </Box>

                      {isMe && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            margin: 1,
                          }}
                        >
                          <Avatar sx={{ width: 25, height: 25 }} />
                          {!chat.is_deleted && isMe && (
                            <>
                              <HiDotsVertical
                                style={{
                                  fontSize: "25px",
                                  cursor: "pointer",
                                }}
                                onClick={(e: any) => {
                                  handleOpenMenu(e, chat);
                                }}
                              />
                              {chatId && (
                                <ChatMenuButton
                                  anchorEl={menuAnchorEl}
                                  handleCloseMenu={handleCloseMenu}
                                  chatId={chatId}
                                  editMessage={editMessage}
                                  handleEditMessage={handleEditMessage}
                                />
                              )}
                            </>
                          )}
                        </Box>
                      )}
                    </Box>
                  );
                })}
              <div ref={bottomScroll} />
            </MidContainer>
          ) : (
            <MidContainer>
               <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Typography sx={{ textAlign: "center", color: "#888", fontSize: 25,fontWeight: "bold" }}>
                  No messages yet. Start the conversation!
                </Typography>
               </Box>
            </MidContainer>
          )}

          <ChatWithMentionInput
            editMessage={editMessage}
            inputRef={inputRef}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleClearInput={handleClearInput}
            files={files}
            setFiles={setFiles}
          />
        </ChatsContainer>
      </BoxContainer>
    </div>
  );
}
