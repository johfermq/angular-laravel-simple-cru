export interface MessageI {
  body: string;
  type: string;
}

export const MessageType = {
  success: "success",
  error: "error",
}
