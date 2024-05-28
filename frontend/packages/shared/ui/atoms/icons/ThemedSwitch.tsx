import {useThemeToggle} from "ui";
import ThemeSwitch from "../../themes/ThemeSwitch";

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