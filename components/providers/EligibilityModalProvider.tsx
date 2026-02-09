"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import EligibilityModal from "@/components/modals/EligibilityModal";

interface EligibilityModalContextType {
  openModal: () => void;
  closeModal: () => void;
}

const EligibilityModalContext = createContext<EligibilityModalContextType>({
  openModal: () => {},
  closeModal: () => {},
});

export const useEligibilityModal = () => useContext(EligibilityModalContext);

export default function EligibilityModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(0);

  const openModal = useCallback(() => {
    setKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <EligibilityModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <EligibilityModal key={key} isOpen={isOpen} onClose={closeModal} />
    </EligibilityModalContext.Provider>
  );
}
