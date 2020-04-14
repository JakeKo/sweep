import React from 'react';
import './App.css';
import Board from '../Board/Board';

const BOARD_PARAMETERS = {
    easy: { height: 15, width: 15, mineCount: 30 },
    medium: { height: 25, width: 25, mineCount: 50 },
    hard: { height: 30, width: 60, mineCount: 200 }
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            difficulty: 'medium',
            board: BOARD_PARAMETERS['medium']
        };
    }

    onChangeHandler = event => {
        this.setState({
            difficulty: event.target.value,
            board: { ...BOARD_PARAMETERS[event.target.value] }
        });
    }

    render = () => {
        const { difficulty } = this.state;
        const { height, width, mineCount } = BOARD_PARAMETERS[difficulty];

        return (
            <div className='app'>
                <form>
                    <select value={difficulty} onChange={this.onChangeHandler}>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </form>
                <Board height={height} width={width} mineCount={mineCount} />
            </div>
        );
    }
};
