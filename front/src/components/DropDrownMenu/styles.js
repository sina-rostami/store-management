import { border } from '@mui/system'
import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
    dropDownMenuContainer: {
        position: 'absolute',
        display: 'flex',
        left: 15,
        width: 150,
        padding: 20,
        overflow: 'hidden',
        marginBottom: 30,
        backgroundColor: 'white',
    },
    menuItem: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        font: 20,

    },
    items: {
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})

export default styles
