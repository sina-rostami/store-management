import { border } from '@mui/system'
import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
    dropDownMenuContainer: {
        borderRadius: 7,
        border: '2px solid black',
        position: 'absolute',
        display: 'flex',
        left: 15,
        width: 150,
        padding: [0, 10, 10],
        overflow: 'hidden',
        backgroundColor: 'white',
        zIndex: 2,
    },
    menuItem: {
        height: 50,
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
        font: 20,
    },
    listItem: {
        cursor: 'pointer',
        paddingTop: 10,
    },
    items: {
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    name: {
        paddingTop: 10,
    }
})

export default styles
