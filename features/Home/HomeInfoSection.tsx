import Grid from "@mui/material/Grid2";
import HomeInfoBox from "./HomeInfoBox";
import { memo, useMemo } from "react";
import { Card, Stack, Typography, Box } from "@mui/material"; // Box ve useMemo eklendi
import { Isletme } from "@/lib/types/types"; // Odeme import'u gereksiz

interface HomeInfoSectionProps {
  isletme: Isletme;
}

const HomeInfoSection: React.FC<HomeInfoSectionProps> = ({ isletme }) => {
  const totalPayment = useMemo(() => {
    return (isletme.projeler || [])
      .flatMap((proje) => proje.odemeler || [])
      .reduce((n, { tutar }) => n + (tutar || 0), 0)
      .toFixed(2);
  }, [isletme]);

  return (
    <Card sx={{ mt: 1 }}>
      <Grid
        container
        sx={{ p: { xs: 1, md: 3 } }}
        spacing={{ xl: 3 }}
        justifyContent={{ md: "space-between" }}
      >
        <Stack direction={"column"} spacing={1} sx={{ mb: { xs: 2, md: 0 } }}>
          <HomeInfoBox data={isletme.unvan} title={"Firma :"} />

          <Stack direction={{ md: "row" }} spacing={3}>
            <HomeInfoBox data={isletme.vergiNo} title={"Vergi No :"} />
            <HomeInfoBox data={isletme.sistemId} title={"Sistem ID :"} />
            <HomeInfoBox data={isletme.notlar} title={"Bilgi :"} />
          </Stack>

          <HomeInfoBox data={isletme.naceKodu} title={"Sektör :"} />
        </Stack>
        <Stack direction={"column"} spacing={1}>
          <Stack direction={{ md: "row" }} spacing={3}>
            <HomeInfoBox data={isletme.yetkili} title="Yetkili :" />
            <HomeInfoBox data={isletme.mail} title="Mail :" />
            <Stack direction={"row"} spacing={1} alignItems="baseline">
              <Typography
                variant="subtitle1"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                Telefon :
              </Typography>
              <Box>
                <Typography component="span" variant="subtitle1">
                  {isletme.tel1}
                </Typography>
                {isletme.tel2 && (
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ ml: 1, mr: 1 }}
                  >
                    /
                  </Typography>
                )}
                {isletme.tel2 && (
                  <Typography component="span" variant="subtitle1">
                    {isletme.tel2}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Stack>

          <Stack direction={{ md: "row" }} spacing={3}>
            <HomeInfoBox data={isletme.adres} title="Adres :" />
            <HomeInfoBox data={isletme.uets} title="UETS :" />
          </Stack>

          <HomeInfoBox
            data={totalPayment}
            currencySymbol="TL"
            title="Toplam Ödeme :"
          />
        </Stack>
      </Grid>
    </Card>
  );
};

export default memo(HomeInfoSection);
