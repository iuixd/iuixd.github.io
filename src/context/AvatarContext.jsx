import { createContext, useContext, useState } from "react";

// Coordinates the single profile-photo element between its hero position (Home page,
// above the fold) and its header position (sticky nav, all other states). Only one of
// HeroSection/Navbar ever renders the shared-layoutId avatar at a time, so this just
// tracks which one currently owns it.
const AvatarContext = createContext({
  avatarMode: "hero",
  setAvatarMode: () => {},
});

export function AvatarProvider({ children }) {
  const [avatarMode, setAvatarMode] = useState("hero");
  return (
    <AvatarContext.Provider value={{ avatarMode, setAvatarMode }}>
      {children}
    </AvatarContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- context + its hook belong together
export function useAvatarMode() {
  return useContext(AvatarContext);
}
