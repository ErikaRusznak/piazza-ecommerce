import ThemeSwitch from "@/theme/ThemeSwitch";
import {useThemeToggle} from "../../../../context/ThemeContext";

const ThemedSwitch = () => {
    const { isDark, toggleTheme } = useThemeToggle();

    return (
        <ThemeSwitch
            checked={isDark}
            onChange={toggleTheme}
            inputProps={{ 'aria-label': 'theme switch' }}
        />
    );
};

export default ThemedSwitch;