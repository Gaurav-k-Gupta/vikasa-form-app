import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useIsMobileView = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
};

export default useIsMobileView;
