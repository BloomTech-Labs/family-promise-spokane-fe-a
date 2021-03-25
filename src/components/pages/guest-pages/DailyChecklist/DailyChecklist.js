import React, { useState } from 'react';
import { Checkbox, Divider } from 'antd';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const DailyChecklist = () => {
  const [input, setInput] = useState('');
  const [dailyTasks, setDailyTasks] = useState([]);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dailyTasks.push(input);
    setInput('');
  };

  const deleteItem = () => {
    const newList = [...dailyTasks].filter(item => item !== item);

    setDailyTasks(newList);
  };

  const editItem = () => {
    console.log('edit');
  };

  return (
    <div className="guest-container">
      <h1>Daily Checklist</h1>
      <h2>This is a space to track your SMART goals.</h2>
      <h3>SMART goals are:</h3>
      <ul>
        <li>Specific</li>
        <li>Measurable</li>
        <li>Achievable</li>
        <li>Relevant</li>
        <li>Time Bound</li>
      </ul>

      <div className="semiwidth">
        <Divider />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add SMART goal"
          value={input}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>

      <div className="taskListContainer">
        {dailyTasks.map(task => {
          return (
            <>
              <FormControlLabel
                control={<Checkbox value={task} color="primary" size="large" />}
                label={task}
              />
              <button onClick={editItem}>Edit</button>
              <button onClick={deleteItem}>Delete</button>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DailyChecklist;
