import React from 'react';
import IconButton from '../IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import classNames from 'classnames';

const Todo = ({ text, completed, onToggleCompleted, onDelete }) => (
  <>
    <input
      type="checkbox"
      className="TodoList__checkbox"
      checked={completed}
      onChange={onToggleCompleted}
    />
    <p className="TodoList__text">{text}</p>

    {/* <button type="button" className="TodoList__btn" onClick={onDelete}>
      Удалить
    </button> */}

    <IconButton onClick={onDelete} aria-label="Удалить todo" className={classNames('IconButton','TodoList__iconBtn')}>
      <DeleteIcon width='32' height='32' fill='#fff'/>
    </IconButton>
  </>
);

export default Todo;