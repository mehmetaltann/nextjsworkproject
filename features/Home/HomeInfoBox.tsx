import { Typography, Stack } from "@mui/material";
import { memo } from "react";

interface InfoBoxProps {
  data: string | number | null | undefined;
  title: string | null | undefined;
  currencySymbol?: string;
}

const HomeInfoBox: React.FC<InfoBoxProps> = ({
  data,
  title,
  currencySymbol,
}) => {
  let formattedData = data;

  if (typeof data === "number" && currencySymbol) {
    formattedData = new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
    }).format(data);
    formattedData = `${formattedData} ${currencySymbol}`;
  } else if (data === null || data === undefined) {
    formattedData = "";
  }

  return (
    <Stack direction="row" spacing={1} alignItems={"center"}>
      {title && (
        <Typography
          variant="subtitle1"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {title}
        </Typography>
      )}
      <Typography sx={{ color: "primary.main" }} variant="body1">
        {formattedData}
      </Typography>
    </Stack>
  );
};

export default memo(HomeInfoBox);
