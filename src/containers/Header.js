import React, { Component } from "react";

import Textbox from "./Textbox";
import Dropdown from "./Dropdown";
import Button from "./Button";
import Table from "./Table";

import { sourceOptions } from "../utils/constants";

import { getSearchResult as hnSearch, getCount } from "../services/hnApi";
import { getSearchResult as wikiSearch } from "../services/wikiApi";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      source: "Hacker News",
      content: [],
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleTextChange(e) {
    this.setState({ search: e.target.value });
  }

  handleOptionClick(e) {
    this.setState({ source: e.target.value });
  }

  handleSearchClick(e) {
    if (this.state.source === "Wiki") {
      wikiSearch(this.state.search).then((data) => {
        data && data.length && data.length > 1 && this.setState({ content: data[1] });
      });
    } else {
      hnSearch(this.state.search).then((data) => {
        if (data && data.hits && data.hits.length) {
          data.hits.reduce((previousPromise, item, idx) => {
            return previousPromise.then(() => {
              return getCount(item.author)
                .then((res) => {
                  data.hits[idx] = { ...data.hits[idx], count: res.submission_count };
                  if (idx === data.hits.length - 1) {
                    this.setState({ content: data.hits });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          }, Promise.resolve());
          this.setState({ content: data.hits });
        }
      });
    }
  }

  render() {
    const { search, content } = this.state;
    return (
      <div>
        <Textbox value={search} placeholder={`search query`} onChange={this.handleTextChange} />
        <Dropdown label={"source"} options={sourceOptions} onClick={this.handleOptionClick} />
        <Button label={"Search"} onClick={this.handleSearchClick} />

        <div>
          <Table data={content} />
        </div>
      </div>
    );
  }
}

export default Header;
