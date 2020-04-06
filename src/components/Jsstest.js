import React from 'react';

import { createUseStyles, useTheme} from "react-jss";

const useStyles = createUseStyles({
    wrapper: {
        padding: 40,
        background: ({ theme }) => theme.background,
        textAlign: "left"
    },
    title: {
        font: {
            size: 40,
            weight: 900
        },
        color: ({ theme }) => theme.color
    },
    link: {
        color: ({ theme }) => theme.color,
        "&:hover": {
            opacity: 0.5
        }
    }
});

export const Comp = () => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.wrapper}>
            <h1 className={classes.title}>Hello React-JSS!</h1>
            <a
                className={classes.link}
                href="http://cssinjs.org/react-jss"
                target="_blank"
            >
                See docs
            </a>
        </div>
    );
};