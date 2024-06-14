
import ThemeSwitch from "../../themes/ThemeSwitch";
import {useThemeToggle} from "../../themes/ThemeContext";

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