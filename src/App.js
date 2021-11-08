import React, { Component } from "react";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import { sendServerRequest } from "./components/services/pixabay-api";
import Modal from "./components/Modal/Modal";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./App.module.css";

class App extends Component {
  state = {
    articles: [],
    page: 1,
    userQuery: "",
    isLoading: false,
    showModal: false,
    error: null,
    src: "",
  };

  toggleModal = (e) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
    if (e) {
      this.setState({ src: e.target.src });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userQuery !== prevState.userQuery) {
      this.setState({ page: 1 });
    }
    if (
      this.state.page !== prevState.page ||
      this.state.userQuery !== prevState.userQuery
    ) {
      this.setState({isLoading:true})
      sendServerRequest(this.state.page, this.state.userQuery)
        .then((result) => result.json())
        .then((res) => {
          if (!res.articles) {
            alert("No articles left!")
            return
          }
          else {
            
          if (this.state.page === 1) {
            this.setState({ articles: res.articles });
          } else {
            this.setState((prevState) => ({
              articles: [...prevState.articles, ...res.articles],
            }));
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
          }
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleFormSubmit = ({ userQuery }) => {
    this.setState({ userQuery: userQuery });
  };

  changePage = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.isLoading && <Loader type="Bars" color="orangered" className={s.loader} />}
        <ImageGallery props={this.state.articles} onClick={this.toggleModal} />

        {this.state.articles.length > 0 && <Button onClick={this.changePage} />}
        {this.state.showModal && (
          <Modal src={this.state.src} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
