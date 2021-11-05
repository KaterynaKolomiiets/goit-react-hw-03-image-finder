import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import s from "./Searchbar.module.css";

class Searchbar extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  state = {
    userQuery: "",
  };
  handleInputChange = ({ target }) => {
    this.setState({ userQuery: target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ userQuery: "" });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.userQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
