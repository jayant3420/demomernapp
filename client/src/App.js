import React from "react";
import axios from "axios";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPosts();
  };

  getBlogPosts = () => {
    axios
      .get("/api")
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload
    })
      .then((response) => {
        this.resetInputFields();
        this.getBlogPosts();
      })
      .catch((err) => {
        console.log("Internal Server Error");
      });
  };

  resetInputFields = () => {
    this.setState({ title: "", body: "" });
  };

  displayPost = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    //JSX
    return (
      <div>
        <h2>Welcome to My Best App</h2>
        <form onSubmit={this.submitHandler}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <input type="submit" name="submit" />
        </form>
        <div className="blog-display">{this.displayPost(this.state.posts)}</div>
      </div>
    );
  }
}

export default App;
