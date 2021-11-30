import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

class GroupedButtons extends React.Component {
  state = { counter: 1 };

  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 1 }));
  };
  render() {
    const displayCounter = this.state.counter > 0;

    return (
        <ButtonGroup size="large" aria-label="large button group">
        
        
        {displayCounter && <Button onClick={this.handleDecrement} >-</Button>}
        {displayCounter && <Button disabled style={{color: '#000000'}}>{this.state.counter}</Button>}
        <Button onClick={this.handleIncrement}>+</Button>
      </ButtonGroup>
    );
  }
}

export default GroupedButtons;
