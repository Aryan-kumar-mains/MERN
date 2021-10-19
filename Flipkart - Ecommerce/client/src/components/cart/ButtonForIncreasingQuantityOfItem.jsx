// this component is for increasing the number or quantity of items that you want to buy
// this is also called GroupButton

import { Button, ButtonGroup, makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyle = makeStyles({
    component: {
        marginTop: 30,
    },
    button: {
        borderRadius: "50%",
    }
})

const ButtonForIncreasingQuantityOfItem = ({ counter, setCounter }) => {
    const classes = useStyle();
    const [name, setName] = useState("");
    // const [counter, setCounter] = useState(1);

    const handleIncrement = () => {
        setCounter(counter => counter + 1);
    }
    const handleDecrement = () => {
        setCounter(counter => counter - 1);
    }

    return (
        <>
        <p>{name}</p>
            <ButtonGroup className={classes.component}>
                <Button disabled={counter === 1} className={classes.button} onClick={() => handleDecrement()} >-</Button>
                <Button>{counter}</Button>
                <Button className={classes.button} onClick={() => handleIncrement()}>+</Button>
            </ButtonGroup>
        </>
    )
}


export default ButtonForIncreasingQuantityOfItem;