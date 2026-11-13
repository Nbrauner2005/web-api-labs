import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Task = (props) => {
    
    return (
           <Grid 
           key={props.id}
           size={{ xs: 12, sm: 6, md: 4 }}
        >

           <Card
           sx={{
            backgroundColor: props.done ? 'grey.200' : 'primary.light',
            padding: '20px',
            borderRadius: 3,
            boxShadow: 4,
            marginBottom: 2
           }}
        >

            <CardHeader
              title={props.title}
              sx={{
                backgroundColor: 'white',
                borderRadius: '2',
                padding: '20px',
                textAlign: 'center',
                fontWeight: 'bold'
            }}
        />

        <Chip
            label={props.done ? 'Completed' : 'Pending'}
            color={props.done ? 'success' : 'warning'}
            sx={{
                display: 'block',
                width: 'fit-content',
                margin: '15px auto'
            }}
        />    

            <CardContent>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                    padding: '20px'
                }}
                >
                 <Typography
                    component="p"
                    variant="subtitle2"
                    color="text.primary"
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                        Due: {props.deadline}
                    </Typography>
                </Box>

                <Typography
                component="p"
                variant="subtitle1"
                align="center"
                sx={{ 
                    fontStyle: 'italic',
                    fontSize: '1rem',
                    padding: '10px'
                }}
                >
                    {props.description}
                </Typography>
            </CardContent>

            <CardActions
            sx={{
                justifyContent: 'space-between',
                padding: '20px'
            }}
            >
                <Button
                variant="contained"
                size="small"
                color="success"
                onClick={props.markDone}
                startIcon={<CheckCircleIcon />}
                sx={{
                    borderRadius: 2,
                    fontWeight: 'bold'
                }}
            >
                    Done
                </Button>

                <Button
                variant="contained"
                size="small"
                color="error"
                onClick={props.deleteTask}
                startIcon={<DeleteIcon />}
                sx={{
                    borderRadius: 2,
                    fontWeight: 'bold'
                }}
            >
                    Delete
                </Button>
            </CardActions>
           </Card>
        </Grid>
        
    )
}

export default Task;