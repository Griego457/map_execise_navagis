import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mapContainer: {
    height: '85vh', width: '100%', margin: '11px'
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  },
  pointer: {
    cursor: 'pointer',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  button: {
      marginLeft: '300px'
  },
  restoCount : {
    marginLeft: '-910px',
    marginTop: '-370px'
  },
  modal2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
}));