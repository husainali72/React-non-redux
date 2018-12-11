import React from 'react';
// import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui-slider-label/Slider';
// import { cyan500 } from 'material-ui/styles/colors';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const styles = {
    labelStyleInner: {
        color: '#00a0ff',
        textAlign: 'center',
        position: 'relative',
        top: '-24px',
        fontSize: '13px',
    },
}

const theme1 = getMuiTheme({
    slider: {
        selectionColor: "#00a0ff",
        trackSize: 1,
        rippleColor: "#c4c4c4",
        handleSize: 16,
        handleSizeActive: 20,
        handleColorZero: "#fff",
        handleFillColor: "#fff",
        marginBottom: 0
    }
})

const SliderLabel = ({ min, max, defaultValue, radius, step, onChange, classes }) => (
    <div>
        <MuiThemeProvider muiTheme={theme1}>
            <Slider
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
                value={radius}
                onChange={onChange}
                label={
                    <div className={classes.labelStyleInner}>
                        {radius}
                    </div>
                }
            />
        </MuiThemeProvider>
    </div>
);

export default withStyles(styles)(SliderLabel)

