import { Box, styled, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Page } from '../../components/Page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { coinGeckoService } from '../../services/coinGeckoService';
import {
  fetchCurrentCoin,
  selectCurrentCoin,
} from '../../store/slices/coinsSlice';

ChartJS.register(...registerables);

const ContainerStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Sidebar = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '30%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 3,
  borderRight: ' 2px solid white',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    border: 'none',
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '70%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 3,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const chartDays = [
  {
    label: '24 Hours',
    value: 1,
  },
  {
    label: '30 Days',
    value: 30,
  },
  {
    label: '3 Months',
    value: 90,
  },
  {
    label: '1 Year',
    value: 365,
  },
];

const CoinPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { value: coin, isLoading, error } = useAppSelector(selectCurrentCoin);

  const [dataChart, SetDataChart] = useState<[[number, number]] | null>(null);
  const [days, setDays] = useState(1);

  const fetchData = useCallback(async () => {
    if (!coin?.id) return;
    const { data } = await coinGeckoService.getChart(coin?.id, days);
    SetDataChart(data.prices);
  }, [coin?.id, days]);

  useEffect(() => {
    if (id) dispatch(fetchCurrentCoin(id));
  }, [dispatch, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, days]);

  return (
    <Page title={`${id} | CryptaInfo`} description={`${id}`}>
      <ContainerStyle>
        {isLoading && <div>...Loading</div>}
        {!isLoading && !error && (
          <Sidebar>
            <img
              src={coin?.image?.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 3 }}
            />
            <Typography variant="h3">{coin?.name}</Typography>
            <Box
              sx={[
                {
                  display: 'flex',
                  padding: '0px 8px ',
                  maxHeight: 'calc(100vh - 330px)',
                  maxWidth: 'calc(100%)',
                  overflowY: 'auto',
                  wordBreak: 'break-word',
                  flexDirection: 'column',
                },
                (theme) => ({
                  [theme.breakpoints.down('md')]: {
                    overflowY: 'unset',
                    maxHeight: 'unset',
                  },
                }),
              ]}
            >
              <Typography variant="body1">{coin?.description.en}</Typography>
              <Box>
                <Typography
                  sx={{ display: 'contents', fontWeight: 'bold' }}
                  variant="body2"
                >{`Current price: `}</Typography>
                &nbsp;
                <Typography sx={{ display: 'contents' }} variant="body2">
                  {`${coin?.market_data.current_price.rub} rub`}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{ display: 'contents', fontWeight: 'bold' }}
                  variant="body2"
                >{`Market Cap: `}</Typography>
                &nbsp;
                <Typography sx={{ display: 'contents' }} variant="body2">
                  {`${coin?.market_data.market_cap.rub} rub`}
                </Typography>
              </Box>
            </Box>
          </Sidebar>
        )}

        <ChartContainer>
          {!isLoading && !error && dataChart && (
            <>
              <Line
                data={{
                  labels: dataChart?.map((item: [number, number]) => {
                    const date = new Date(item[0]);
                    const time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),

                  datasets: [
                    {
                      data: dataChart?.map((item: [number, number]) => item[1]),
                      label: `Price ( Past ${days} Days )`,
                      borderColor: '#EEBC1D',
                    },
                  ],
                }}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
              <div>
                {chartDays.map((day) => (
                  <button
                    type="button"
                    key={day.value}
                    onClick={() => {
                      setDays(day.value);
                    }}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </ChartContainer>
      </ContainerStyle>
    </Page>
  );
};

export default CoinPage;
