import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ perPage, setPerPage, max }) {
  const handleChange = event => {
    setPerPage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel id="per-page-label">Na stran</InputLabel>
        <Select
          labelId="per-page-label"
          id="per-page-select"
          value={perPage}
          label="Na stran"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={max}>Vsi</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
