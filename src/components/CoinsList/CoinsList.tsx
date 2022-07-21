import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCoins, selectCoins } from '../../store/slices/coinsSlice';

const CoinsList = () => {
  const dispatch = useAppDispatch();
  const { values: coins, isLoading, error } = useAppSelector(selectCoins);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer
          component={Paper}
          sx={[
            {
              borderRadius: '0px',
              backgroundColor: 'inherit',
            },
            { '& td, & th': { color: 'white' } },
          ]}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Coin</TableCell>
                <TableCell>Current Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!coins && (
                <tr>
                  <td>
                    <div>Not Coins</div>
                  </td>
                </tr>
              )}
              {!!coins &&
                coins.length > 0 &&
                coins
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const { id, name, image, current_price, symbol } = coin;
                    return (
                      <TableRow
                        key={id}
                        sx={[
                          { '&:last-child td, &:last-child th': { border: 0 } },
                          {
                            '&:hover': {
                              cursor: 'pointer',
                              backgroundColor: '#212B30',
                            },
                          },
                        ]}
                        onClick={() => navigate(`crypta/${id}`)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              height={50}
                              src={image}
                              alt={name}
                              style={{ marginRight: '8px' }}
                            />
                            {`${name}, ${symbol}`}
                          </Box>
                        </TableCell>
                        <TableCell>{current_price}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <Pagination
            count={10}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            sx={[
              { padding: 1, display: 'flex', justifyContent: 'center' },
              {
                '& li > *': { color: 'white' },
              },
            ]}
          />
        </TableContainer>
      )}
      {error && <div>{error?.message}</div>}
    </>
  );
};

export default CoinsList;
