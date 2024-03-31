"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";

function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  function handleScrollButtonVisibility() {
    window.scrollY > 900 ? setShowButton(true) : setShowButton(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  if (showButton) {
    return (
      <Button
        className="fixed p-3 rounded-full bottom-4 left-4 lg:left-24 lg:bottom-8 shadow-lg"
        onClick={scrollToTop}
        variant="secondary"
      >
        Top
      </Button>
    );
  }
}

export default ScrollTopButton;
