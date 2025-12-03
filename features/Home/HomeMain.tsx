"use client";
import Grid from "@mui/material/Grid2";
import HomeInfoSection from "./HomeInfoSection";
import HomeSearchBar from "./HomeSearchBar";
import HomeTransections from "./HomeTransections";
import HomeTableSection from "./HomeTableSection";
import { useState, useEffect } from "react";
import { fetchIsletme } from "@/app/actions/fetchData";
import { PageWrapper } from "../../components/Layouts/Wrappers";
import { handleResponseMsg } from "@/utils/toast-helper";
import { Loader } from "@/components/Ui/Loader";
import { Stack } from "@mui/material";
import { Isletme } from "@/lib/types/types";

interface SearchData {
  unvan: string;
  vergiNo: string;
  firmaId: string;
}

const initialSearchData: SearchData = {
  unvan: "",
  vergiNo: "",
  firmaId: "",
};

interface FetchIsletmeResponse {
  status: boolean;
  data?: Isletme;
  message?: string;
}

const HomeMain = () => {
  const [searchData, setSearchData] = useState<SearchData>(initialSearchData);
  const [isletme, setIsletme] = useState<Isletme | undefined | any>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResponse = (res: FetchIsletmeResponse) => {
      if (res.status && res.data) {
        setIsletme(res.data);
      } else {
        handleResponseMsg(res);
        setIsletme(undefined);
        setSearchData(initialSearchData);
      }
      setIsLoading(false);
    };

    const fetchData = async () => {
      const { unvan, vergiNo, firmaId } = searchData;
      let key: string | undefined;
      let type: "unvan" | "vergiNo" | "id" | undefined;

      if (unvan) {
        key = unvan;
        type = "unvan";
      } else if (vergiNo) {
        key = vergiNo;
        type = "vergiNo";
      } else if (firmaId) {
        key = firmaId;
        type = "id";
      }

      if (key && type) {
        setIsLoading(true);
        setIsletme(undefined);
        const res = await fetchIsletme(key, type);
        handleResponse(res as FetchIsletmeResponse);
      } else if (isletme) {
        setIsletme(undefined);
      }
    };
    const timeoutId = setTimeout(fetchData, 600);
    return () => clearTimeout(timeoutId);
  }, [searchData]);

  return (
    <PageWrapper>
      <Grid container alignItems={"center"} justifyContent={"center"}>
        <Grid size={{ xs: 12 }}>
          <HomeSearchBar
            searchData={searchData}
            setSearchData={setSearchData}
            isletme={isletme}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          {isLoading ? (
            <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
              <Loader />
            </Stack>
          ) : (
            isletme && (
              <>
                <HomeInfoSection isletme={isletme} />
                <HomeTransections
                  setSearchData={setSearchData}
                  isletme={isletme}
                />
                {isletme.projeler?.length > 0 && (
                  <HomeTableSection
                    setSearchData={setSearchData}
                    isletme={isletme}
                  />
                )}
              </>
            )
          )}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default HomeMain;
