import React, { Component } from 'react';
import axios from "axios";
import './App.css';

const FOLKTOY_API_ENDPOINT = 'http://localhost:4000/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "結果がここに表示されます"
    };
  }

  handleGetFolkToys(event) {
    event.preventDefault();
    axios
      .get(FOLKTOY_API_ENDPOINT + "/folk_toy/")
      .then(function(response) {
        console.log(response.data);
        this.setState({
          result: JSON.stringify(response.data)
        });
      }.bind(this))
      .catch(function() {
         this.setState({
           result: "エラーが発生しました。"
         });
      }.bind(this));
  }

  handleAddFolkToy(event) {
    event.preventDefault();
    const requestBody = { name: event.target.name.value, type: event.target.type.value };
    axios
      .post(FOLKTOY_API_ENDPOINT + "/folk_toy/", requestBody)
      .then(function(response) {
        console.log(response.data);
        this.setState({
          result: "新しい郷土玩具のデータを追加しました。"
        });
      }.bind(this))
      .catch(function() {
         this.setState({
           result: "エラーが発生しました。"
         });
      }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <p className="title">郷土玩具 API</p>
        <form className="form" onSubmit={this.handleGetFolkToys.bind(this)}>
          <input type="submit" value="全件取得検索" className="button" />
        </form>
        <form className="form" onSubmit={this.handleAddFolkToy.bind(this)}>
          <span>*</span><input type="text" placeholder="名前を入力" name="name" className="textbox" />
          <input type="text" placeholder="ブランドを入力" name="brand" className="textbox" />
          <input type="text" placeholder="生産地を入力" name="region" className="textbox" />
          <span>*</span><select className="dropdown" name="type">
            <option value=''>種類を選択</option>
            <option value="1">張り子(置物)</option>
            <option value="2">張り子(壁掛け)</option>
            <option value="3">張り子(お面) </option>
            <option value="4">凧</option>
            <option value="5">土鈴</option>
            <option value="6">土人形</option>
            <option value="7">木彫り</option>
            <option value="8">木車</option>
            <option value="9">藁人形</option>
            <option value="10">練り物</option>
            <option value="11">その他</option>
            <option value="12">不明</option>
          </select>
          <input type="submit" value="追加" className="button" />
        </form>
        <hr className="divider"></hr>
        <div className="result">
          <p>{this.state.result}</p>
        </div>
      </div>
    );
  }
}

export default App;
