import { Box } from '@mui/material';
import { forwardRef, PropsWithChildren, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface IPageProps {
  children: ReactNode;
  title: string;
  description: string;
}

const Page = forwardRef<ReactNode, PropsWithChildren<IPageProps>>(
  ({ children, title = '', description = '', ...other }, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </Box>
  ),
);

export default Page;
