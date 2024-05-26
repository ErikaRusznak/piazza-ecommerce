import {useThemeToggle} from "../../../../contexts/ThemeContext";
import ThemeSwitch from "@/theme/ThemeSwitch";

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