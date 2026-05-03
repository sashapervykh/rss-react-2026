import { Component, type ChangeEvent, type SubmitEvent } from 'react';
import Button from '../../../shared/ui/Button/Button';
import { STORAGE_KEY } from '../constants/storageKey';

interface SearchFormProps {
  handleSearch: (query: string) => void;
}

interface SearchFormState {
  query: string;
}

export class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    const savedQuery = localStorage.getItem(STORAGE_KEY) ?? '';
    this.state = {
      query: savedQuery,
    };
  }

  componentDidMount(): void {
    const { query } = this.state;
    this.props.handleSearch(query);
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e: SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = this.state.query.trim();
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';
    if (trimmed === saved) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    this.setState({ query: trimmed });
    this.props.handleSearch(trimmed);
  };

  render() {
    const { query } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className='flex gap-[1rem]'>
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          placeholder="Enter movie..."
          className='h-[100%] rounded-xl border-sky-950 border-1 bg-zinc-50 p-[0.5rem]'
        />
        <Button type="submit" text="Search" />
      </form>
    );
  }
}
