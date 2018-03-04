var ReactDOM = require('react-dom');

import React, {Component} from 'react'

import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import {format_date} from 'moment'

import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

import css from './main.css';


class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', details: '', is_done: '', set_date: ''
        };
        this.handleSubmitPatch = this.handleSubmitPatch.bind(this);
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

    async handleSubmitPatch(event) {
        event.preventDefault();
        await axios({
            method: 'patch',
            url: '/api/task/' + this.props.match.params['task_id'] + '/',
            data: {is_done: true},
            headers: {
                responseType: 'json',
                //"X-CSRFToken": csrfToken,
            }
        })
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });

        /*console.log(this.props.main.loadTasks);
        await this.props.main.loadTasks();
        console.log(this.props.main);
        this.props.main.forceUpdate();*/
        this.setState({is_done: true});

    }

    render() {
        const {name, details, is_done, set_date} = this.state;
        return (
            <div className="task">
                <h4 className="task__name">{name}</h4>
                <p className="task__details">{details}</p>
                <p className="task__set_date">Started on {set_date}</p>
                <p>{is_done ? ('Already done') : ('Not done yet')} </p>
                {is_done == false ? (
                    <form onSubmit={this.handleSubmitPatch}>
                        <input type="submit" value="Complete task"/>
                    </form>
                ) : (
                    ''
                )}
                <Link className="task__button" to="/">Back</Link>
            </div>
        );
    }
}

class TaskBrief extends React.Component {
    constructor(props) {
        super(props);
        this.state = {is_done: this.props.is_done};

        this.handleSubmitPatch = this.handleSubmitPatch.bind(this);
    }

    async handleSubmitPatch(event) {
        event.preventDefault();
        await axios({
            method: 'patch',
            url: '/api/task/' + this.props.task.id + '/',
            data: {is_done: true},
            headers: {
                responseType: 'json',
                //"X-CSRFToken": csrfToken,
            }
        })
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });

        this.setState({name: '', descr: '', formFields: []});
        console.log(this.props.main.loadTasks);
        await this.props.main.loadTasks();
        console.log(this.props.main);
        this.props.main.forceUpdate();

    }

    render() {
        let task = this.props.task;
        if (task.is_done != this.state.is_done) {
            return ''
        }
        return (
            <div>
                <li className="content-list__item">
                    <Link to={`/${task.id}`}>{task.name}</Link>
                    {task.is_done == false ? (
                        <form onSubmit={this.handleSubmitPatch}>
                            <input type="submit" value="Complete task"/>
                        </form>
                    ) : (
                        ''
                    )}
                </li>

            </div>
        );
    }
}


class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: props.tasks, is_done: props.is_done};
    }

    render() {
        return (
            <div>
                {this.props.tasks ? (
                    <ul className="content-list">
                        {this.props.tasks.map((task, i) => (
                            <TaskBrief main={this.props.main} task={task} is_done={this.state.is_done} key={i}/>
                        ))}
                    </ul>
                ) : (<p>No tasks.</p>)}

            </div>
        );
    }
}

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', descr: '', formFields: [], tasks: []};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let formFields = {name: this.state.name, details: this.state.descr};
        await axios({
            method: 'post',
            url: '/api/task/',
            data: formFields,
            headers: {
                responseType: 'json',
            }
        })
            .then(function (response) {
                //console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
        this.setState({name: '', descr: '', formFields: []});
        await this.loadTasks();
    }

    async loadTasks() {
        console.log('loading tasks');
        this.setState({
            tasks: await fetch("/api/task/").then(response => response.json())
        });
    }

    componentDidMount() {
        this.loadTasks();
    }

    handleChange(event) {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    render() {
        return (
            <div ref="myRef">
                <h1>Best TODO list ever</h1>

                <div className="row">
                    <div className="column">
                        <p>Add new task</p>

                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                            </label><br/>
                            <label>
                                Description:
                                <input type="text" name="descr" value={this.state.descr} onChange={this.handleChange}/>
                            </label><br/>
                            <input type="submit" value="Create task"/>
                        </form>
                    </div>

                    <div className="column">
                        <p>Active tasks:</p>
                        <List main={this} is_done={false} tasks={this.state.tasks}/>
                    </div>

                    <div className="column">
                        <p>Completed tasks:</p>
                        <List main={this} is_done={true} tasks={this.state.tasks}/>
                    </div>

                </div>
            </div>
        );
    }
}


const Main = () => (
    <BrowserRouter>
        <main>
            <Switch>
                <Route exact path='/' component={MainPage}/>
                <Route path='/:task_id' component={Task}/>
            </Switch>
        </main>
    </BrowserRouter>
);


ReactDOM.render(<Main/>, document.getElementById('app'));
