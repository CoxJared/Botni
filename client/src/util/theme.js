export default {
  palette: {
    primary: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  styleSpreading: {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto 0 auto',
      width: '100px'
    },
    pageTitle: {
      margin: '20px auto'
    },
    textField: {
      margin: '10px '
    },
    button: {
      marginTop: 20,
      marginBottom: 20,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    paper: {
      padding: 30
    },
    profile: {
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  }
}