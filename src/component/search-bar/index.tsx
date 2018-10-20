import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

export type SearchBarProps = { onSearch?: (query: string) => void; router: RouterStore | null };

@inject('router')
@observer
export class SearchBar extends React.Component<SearchBarProps> {

  @observable private search: string = "";

  public render() {
    return (
      <div className="bp3-input-group bp3-large">
        <span className="bp3-icon bp3-icon-search"></span>
        <input
          className="bp3-input"
          value={this.search}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          type="search"
          placeholder="Search input"
          dir="auto" />
      </div>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.search = e.target.value;
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const f = this.props.onSearch || this.handleSearchDefault;
    if (e.key === 'Enter') { f(this.search); }
  }

  private handleSearchDefault = (query: string) => {
    const { router } = this.props;
    
    if (!router) { return; }
    router.push('/search?q=' + query);
  }
}