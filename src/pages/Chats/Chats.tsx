import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaArrowUp } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

const BoxContainer = styled(Box)({
  width: "100%",
  marginTop: 20,
  padding: "10px",
  height: "100vh",
  background: "#e2e6e7",
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
  gap: 1,
  padding: 3,
  paddingBottom: 20,
});

export default function Chats() {
  return (
    <div>
      <BoxContainer>
        <ChatsContainer>
          <Box className="top-header"></Box>
          <MidContainer>
            {/* left chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#8bef74",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    <span
                      style={{
                        background: "black",
                        color: "white",
                        padding: "8px",
                        borderRadius: "100px",
                        margin: "1px",
                      }}
                    >
                      @Amit sharma
                    </span>
                    Hey bro, are you coming today?
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>

            {/* left chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
              </Box>
            </Box>

            {/* Right chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Amit sharma
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Yeah, I’ll be there by 7.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* Right chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Salman
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* left chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#8bef74",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    <span
                      style={{
                        background: "black",
                        color: "white",
                        padding: "8px",
                        borderRadius: "100px",
                        margin: "1px",
                      }}
                    >
                      @Amit sharma
                    </span>
                    Hey bro, are you coming today?
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>

            {/* left chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
              </Box>
            </Box>

            {/* Right chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Amit sharma
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Yeah, I’ll be there by 7.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* Right chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Salman
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* left chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#8bef74",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    <span
                      style={{
                        background: "black",
                        color: "white",
                        padding: "8px",
                        borderRadius: "100px",
                        margin: "1px",
                      }}
                    >
                      @Amit sharma
                    </span>
                    Hey bro, are you coming today?
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>

            {/* left chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
              </Box>
            </Box>

            {/* Right chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Amit sharma
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Yeah, I’ll be there by 7.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* Right chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Salman
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* left chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#8bef74",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    <span
                      style={{
                        background: "black",
                        color: "white",
                        padding: "8px",
                        borderRadius: "100px",
                        margin: "1px",
                      }}
                    >
                      @Amit sharma
                    </span>
                    Hey bro, are you coming today?
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>

            {/* left chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
              </Box>
            </Box>

            {/* Right chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Amit sharma
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Yeah, I’ll be there by 7.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* Right chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Salman
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* left chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#8bef74",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    <span
                      style={{
                        background: "black",
                        color: "white",
                        padding: "8px",
                        borderRadius: "100px",
                        margin: "1px",
                      }}
                    >
                      @Amit sharma
                    </span>
                    Hey bro, are you coming today?
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                  }}
                />
              </Box>
            </Box>

            {/* left chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  maxWidth: "60%",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  Manish Gupta
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <Avatar />
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
              </Box>
            </Box>

            {/* Right chats */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Amit sharma
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ffffff",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Yeah, I’ll be there by 7.
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
            {/* Right chats delete*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: 1,
                }}
              >
                <HiDotsVertical
                  style={{
                    fontSize: "25px",
                    cursor: "pointer",
                    display: "none",
                  }}
                />
                <Avatar />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontFamily: "system-ui",
                  }}
                  variant="body2"
                >
                  Salman
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "#ef7474",
                    padding: "15px 20px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "sans-serif",
                      color: "white",
                    }}
                  >
                    This message was deleted
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    fontFamily: "sans-serif",
                  }}
                  variant="body2"
                >
                  5 min ago
                </Typography>
              </Box>
            </Box>
          </MidContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <TextField
              placeholder="Chats..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  background: "#f5f5f5",
                  paddingRight: "6px",
                },
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                width: "50%",
                outline: "none",
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          width: 40,
                          height: 40,
                          background: "black",
                          borderRadius: "50%",
                          "&:hover": {
                            background: "#3e4241",
                          },
                        }}
                      >
                        <FaArrowUp style={{ color: "white", fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        sx={{
                          width: 40,
                          height: 40,
                          background: "#eee",
                          borderRadius: "50%",
                        }}
                      >
                        <FiUpload />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </ChatsContainer>
      </BoxContainer>
    </div>
  );
}
