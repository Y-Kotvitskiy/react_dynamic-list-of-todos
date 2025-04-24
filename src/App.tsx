/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterQuery } from './types/filterQuery';
import { FilterStatus } from './types/filterStatus';

const defaultQuery: FilterQuery = {
  status: 'all',
  search: '',
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(serverTodos => {
      setTodos(serverTodos);
      setFilteredTodos(serverTodos);
    });
    setIsLoading(false);
  }, []);

  const onFilter = (query: FilterQuery) => {
    if (query.status === FilterStatus.All && query.search.trim() === '') {
      setFilteredTodos(todos);
    }

    setFilteredTodos(
      todos.filter(
        todo =>
          (query.status === FilterStatus.All ||
            todo.completed === (query.status === FilterStatus.Completed)) &&
          (query.search.trim() === '' ||
            todo.title
              .toLocaleLowerCase()
              .includes(query.search.trim().toLocaleLowerCase())),
      ),
    );
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={onFilter} query={defaultQuery} />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={filteredTodos} />}
            </div>
          </div>
        </div>
      </div>

      {false ? <TodoModal /> : null}
    </>
  );
};
