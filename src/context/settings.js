import { useContext, createContext, useState, Children } from "react";
const settingsContext = createContext(null);

export const SettingsProvider = ({ Children }) => {
      const [settings, setSettings] = useState({
            mode: "test",
            timer: 15,
            theme: "green-theme",
            soundPath: "confetti.mp3",
      });

      return (
            <settingsContext.Provider value={{ settings, setSettings }}>
                  {Children}
            </settingsContext.Provider>
      );
};
