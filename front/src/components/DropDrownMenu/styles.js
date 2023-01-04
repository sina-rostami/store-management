import { border } from '@mui/system'
import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
    dropDownMenuContainer: {
        position: 'absolute',
        display: 'flex',
        top: 100,
        width: 150,
        height: 150,
        padding: '1rem',
        overflow: 'hidden',
        marginBottom: 30,
        marginTop: 10,
        backgroundColor: 'white',
    },

    menuItem: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem',
    }
})

export default styles
