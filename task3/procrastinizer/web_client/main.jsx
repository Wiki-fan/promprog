/*var React = require('react');*/
var ReactDOM = require('react-dom');

import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import {format_date} from 'moment'
import css from './main.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', details: '', is_done: '', set_date: ''
        };
    }

    loadTask(task_id) {
        fetch(`/api/task/${task_id}/`)
            .then(response => response.json())
            .then(data => {
                this.setState(data)
            });
    }

    componentDidMount() {
        this.loadTask(this.props.match.params['task_id']);
    }

    render() {
        const {name, details, is_done, set_date} = this.state;
        return (
            <div className="task">
                <h4 className="task__name">{name}</h4>
                <p className="task__details">{details}</p>
                <p className="task__set_date">Started on {set_date}</p>
                <p>{is_done ? ('Already done') : ('Not done yet')} </p>
                <Link className="task__button" to="/">Back</Link>
            </div>
        );
    }
}


class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], is_done:props.is_done};
    }

    async loadTasks() {
        this.setState({
            tasks: await fetch("/api/task/?is_done="+this.state.is_done).then(response => response.json())
        })
    }

    componentDidMount() {
        this.loadTasks();
        console.log(this.state);
    }

    render() {
        return (
            <div>
                {this.state.tasks ? (
                    <ul className="content-list">
                        {this.state.tasks.map((task, i) => (
                            <li className="content-list__item" key={i}>
                                <Link to={`/${task.id}`}>{task.name}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No tasks.</p>)}

            </div>
            //<Route path={`${match.url}/:topicId`} component={Task}/>
            //<Route exact path={match.url} render={() => <h3>Please select a topic.</h3>}/>
        );
    }
}

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({name: event.target.name, descr: event.target.descr});
    }

    render() {
        return (
            <div>
                <h1>Best TODO list ever</h1>

                <div className="row">
                    <div className="column">
                        <p>Add new task</p>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={this.state.name} onChange={this.handleChange}/>
                            </label><br/>
                            <label>
                                Description:
                                <input type="text" value={this.state.descr} onChange={this.handleChange}/>
                            </label><br/>
                            <input type="submit" value="Create task"/>
                        </form>
                    </div>

                    <div className="column">
                        <p>Active tasks:</p>
                        <List is_done={false}/>
                    </div>

                    <div className="column">
                        <p>Completed tasks:</p>
                        <List is_done={true}/>
                    </div>

                </div>
            </div>
        );
    }
}


/*<div>
    <input type="text" value={this.state.data}
           onChange={this.updateState}/>
    <h4>{this.state.data}</h4>
</div>*/

const Main = () => (
    <BrowserRouter>
        <main>
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route path='/:task_id' component={Task}/>
            </Switch>
        </main>
    </BrowserRouter>
)


ReactDOM.render(<Main/>, document.getElementById('app'));
