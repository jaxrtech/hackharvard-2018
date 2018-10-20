import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import { SearchBarStore } from 'src/stores/app';

export type SearchBarProps = {
  onSearch?: (query: string) => void;
  router: RouterStore | null;
  search: SearchBarStore;
};

@inject('router')
@inject('search')
@observer
export class SearchBar extends React.Component<SearchBarProps> {

  public render() {
    return (
      <div className="bp3-input-group bp3-large">
        <span className="bp3-icon bp3-icon-search"></span>
        <input
          className="bp3-input"
          value={this.props.search.query}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          type="search"
          placeholder="Search input"
          dir="auto" />
      </div>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.search.query = e.target.value;
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const f = this.props.onSearch || this.handleSearchDefault;
    if (e.key === 'Enter') { f(this.props.search.query); }
  }

  private handleSearchDefault = (query: string) => {
    const { router } = this.props;
    
    if (!router) { return; }
    router.push('/search?q=' + query);
  }
}