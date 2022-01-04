import './App.css';
import { Container, Typography } from '@mui/material';
import DataTable from './Component/DataTable/DataTable';
import Home from './Component/Home/Home';

function App() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 5 }}>Employee Management</Typography>
      <Home></Home>
    </Container>
  );
}

export default App;
