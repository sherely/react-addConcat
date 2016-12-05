import React from 'react'
import ReactDOM from 'react-dom'
import {
	Link
} from 'react-router'
import dataList from './data/data.json'

var Boxlist = React.createClass({
	getInitialState: function() {
		return {
			data: dataList
		}
	},
	//搜索用户
	handlerSerch: function(contactName) {
		var data = dataList.filter(function(contact) {
			if (contact.name.indexOf(contactName) >= 0) {
				return contact
			}
		})
		console.log(data)
		this.setState({
			data
		})
	},
	//打开添加用户
	handlerAdd: function() {
		ReactDOM.findDOMNode(this.refs.addcon).style.display = "block"
	},
	//关闭添加用户
	closeAdd: function() {
		ReactDOM.findDOMNode(this.refs.addcon).style.display = "none"
	},
	//新增加一项
	addContact: function(name, tel) {
		var data = this.state.data
		var id = data.length + 1
		var img = "user" + id + ".png"
		data = data.concat([{
			id: id,
			name: name,
			tel: tel,
			img: img
		}])
		this.setState({
			data
		})
	},
	//删除
	handleTaskDelete: function(Id) {
		var data = this.state.data;
		data = data.filter(function(concat) {
			return concat.id !== Id;
		});
		this.setState({
			data
		});
	},
	render: function() {
		var data = this.state.data
		var dataLists = []
		var that = this
		data.forEach(function(value, index) {
			dataLists.push(<Contactitem data={value} key={value.id} detelConcat={that.handleTaskDelete}/>)
		})
		return (
			<div>
				<h5 className="topBox">
 					<span className="add-btn" onClick={this.handlerAdd}>+</span>
 					我的联系人
 				</h5>
				<SerchCon serchContact={this.handlerSerch} />
				<div className="container">
					<div className="list-group">
						{dataLists}
					</div>
				</div>
				<div className="add-box" ref="addcon">
					<div className="close-btn" onClick={this.closeAdd}>X</div>
					<Addconcat submitHandler={this.addContact}/>
				</div>
			</div>
		)
	}
})
var Contactitem = React.createClass({
	//删除用户
	detelConcat: function() {
		this.props.detelConcat(this.props.data.id)
	},
	handlerShow: function() {
		ReactDOM.findDOMNode(this.refs.detelBtn).style.display = "block"
	},
	handlerHidden: function() {
		ReactDOM.findDOMNode(this.refs.detelBtn).style.display = "none"
	},
	//搜索按钮
	render: function() {
		var data = this.props.data
		let contactName = data.name
		let contactTel = data.tel
		let contactImg = require('./data/image/' + data.img)
		return (
			<li className="list-group-item"  onMouseOver={this.handlerShow}onMouseOut={this.handlerHidden} >
				<div className="flex">
					<div className="imgHeader"><img src={contactImg} /></div>
					<div className="info">	
						<div>
							<h5 >{contactName}</h5>
							<p className="text-muted">{contactTel}</p>
						</div>
						<div className="detel-btn" ref="detelBtn"><span onClick={this.detelConcat}>删除</span></div>
					</div>
				</div>
			</li>
		)
	}
})
var SerchCon = React.createClass({
	//搜索按钮
	serchContact: function(e) {
		e.preventDefault()
		let name = ReactDOM.findDOMNode(this.refs.contactName).value.trim()
		this.props.serchContact(name)
	},
	render: function() {
		return (
			<div className="add-contact">
				<form onSubmit={this.serchContact}>
					<div className="flex">
						<div className="flex-item serch">
							<input type="text" className="form-control" ref="contactName" placeholder="搜索联系人" />
		                </div>
		                <div className="serch-btn">
					        <input type="submit" value="搜索"/>
					    </div>
					</div>
				</form> 
			</div>
		)
	}
})
var Addconcat = React.createClass({
	handleTel: function(e) {
		let name = e.target.value
		this.setState({
			name: name
		})
		console.log(name)
	},
	handlerAdd: function(e) {
		e.preventDefault()
		var name = ReactDOM.findDOMNode(this.refs.nameInfo).value.trim();
		var tel = ReactDOM.findDOMNode(this.refs.telInfo).value.trim();
		if (name === "" || tel === "") {
			alert("请输入信息")
		} else {
			this.props.submitHandler(name, tel)
			ReactDOM.findDOMNode(this.refs.telInfo).value = ""
			ReactDOM.findDOMNode(this.refs.nameInfo).value = ""
		}
	},
	checkPhone: function() {
		let tel = ReactDOM.findDOMNode(this.refs.telInfo).value.trim();
		if (tel === "") {
			//alert("请输入电话号码")
		} else if (!(/^1(3|4|5|7|8)\d{9}$/.test(tel))) {
			alert("电话号码有误，请确认")
			return false
		}
		this.setState({
			tel: tel
		})
		console.log(tel)
	},
	render: function() {
		return (
			<div className="container po-r">
				<form className="form-horizontal"onSubmit={this.handlerAdd}>
					<div className="form-group-lg">
						<input className="form-control" type="text" ref="telInfo" onBlur={this.checkPhone} placeholder="请输入电话号码" />						
					</div>
					<div className="form-group-lg" style={{"marginTop":"20px"}}>
						<input className="form-control" type="text" ref="nameInfo" placeholder="请输入名字" onChange={this.handleTel} />						
					</div>
					<div style={{"marginTop":"20px"}}>
						<input type="submit" className="btn-block" value="添加联系人"/>
					</div>
				</form>
			</div>
		);
	}
})
module.exports = Boxlist