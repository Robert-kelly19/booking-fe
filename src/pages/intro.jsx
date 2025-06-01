import React from "react";
import { useNavigate } from "react-router";

export default function Intro() {
  const navigate = useNavigate();
  return (
    <>
      <div className="intro">
        <div className="intro-grid">
          <h1>The <span>#1</span> Job Site to Find Remote Jobs. No Ads, Scams, or Junk</h1>
          <p>
            Find legitimate work-from-home jobs with options for flexible hours
            and hybrid work.
          </p>
          <div className="button">
            <button onClick={() => navigate("/register")}>
              Join
            </button>
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
