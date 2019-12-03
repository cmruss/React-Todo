import React, { Component } from 'react';

class TodoForm extends Component{
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <input 
                    type='text'
                    name='newTaskName'
                    value={this.props.input}
                    onChange={this.props.handleChange}
                />
                <button value='submit' >Add Task</button>
                <button onClick={this.props.removeCompleted}>Clear Completed</button>
            </form>
        );
    };
}

export default TodoForm;