"use client";
import Container from "@/Component/Container";
import { signOut } from "next-auth/react";
import React from "react";

const User = () => {


  return (
    <Container>

        <button
          onClick={() => {
            signOut();
          }}
        >
          logout
        </button>
    
    </Container>
  );
};

export default User;
