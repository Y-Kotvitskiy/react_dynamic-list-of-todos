import React from 'react';
import { FilterQuery } from '../../types/filterQuery';
import { FilterStatus } from '../../types/filterStatus';

const defaultValues: FilterQuery = {
  status: FilterStatus.All,
  search: '',
};

interface Props {
  onFilter: (v: FilterQuery) => null;
}

export const TodoFilter: React.FC<Props> = ({ onFilter }) => {
  const [formValues, setFormValues] = React.useState(defaultValues);
  const handleFieldChange = (field: Partial<FilterQuery>) => {
    const newValues: FilterQuery = { ...formValues, ...field };

    onFilter(newValues);
    setFormValues(newValues);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={formValues.status}
            onChange={event => {
              handleFieldChange({ status: event.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={formValues.search}
          onChange={event => {
            handleFieldChange({ search: event.target.value });
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleFieldChange({ search: '' })}
          />
        </span>
      </p>
    </form>
  );
};
