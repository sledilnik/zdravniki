import Pagination from '@mui/material/Pagination';

export const DoctorsSmall = function DoctorsSmall({ count, page, onChange, ...others }) {
  return (
    <Pagination
      sx={{ alignSelf: 'start', justifySelf: 'center' }}
      size="small"
      count={count}
      page={page}
      onChange={onChange}
      {...others}
    />
  );
};
