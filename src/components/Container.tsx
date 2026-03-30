import { type ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        flexGrow: 1,
        margin: 20,
        padding: 20,
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
