import { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';

const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default useTheme;
