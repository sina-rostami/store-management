import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    pageHeader: {
        position: 'relative',
    
        '& img': {
          position: 'absolute',
          height: 20,
          width: 20,
          verticalAlign: 'middle',
          cursor: 'pointer',
        },
    
        '@media (min-width: 768px)': {
          '& img': {
            height: 25,
            width: 25,
          },
        },
    
        '@media (min-width: 1360px)': {
          '& img': {
            height: 30,
            width: 30,
          },
        },
      },

      form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },

      submitBtn: {
        width: 150,
        height: 30,
      },
      
      pageTitle: {
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 14,
    
        '@media (min-width: 768px)': {
          marginBottom: 40,
          fontSize: 20,
        },
        '@media (min-width: 1360px)': {
          marginBottom: 50,
          fontSize: 28,
        },
      },
    
      topSection: {
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 20,
    
        '& li': {
          marginBottom: 10,
        },
      },

    customerName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        font: 20,
        '& img': {
          width: 75,
          height: 75,
    
          '@media (min-width: 768px)': {
            width: 150,
            height: 150,
          },
    
          '@media (min-width: 1360px)': {
            width: 200,
            height: 200,
          },
        },
      },
      creditInput: {
        width: 300,
        height: 50,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
      },
})
export default styles