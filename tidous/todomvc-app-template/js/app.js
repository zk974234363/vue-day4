(function (window) {
	'use strict';

	//获取本地数据
	// let list=JSON.parse(localStorage.getItem('list'))||[]

const vm=new Vue({
	el:'#app',
	data:{
		list:[],
		//任务名称
		todoName:'',
		//
		editId:-1
	},
	watch:{
		//监听list的数据变化
		list:{
		 deep:true,
		 handler(newval){
			 console.log(newval);
			 localStorage.setItem('list',JSON.stringify(newval))
		 }
		}
	},
	methods:{
		// 删除任务
		//根据id进行删除
		del(id){
			//利用axios点击删除按钮删除数据和网页的重新显示
			axios.delete('http://localhost:3000/list/'+id).then(res=>{
				console.log(res);
				this.list=this.list.filter(item=>item.id !==id )
				
			})

		},

		//添加任务
		//获取name值
		addsearch(e){
			//先判断是是否为空
			if (this.todoName.trim()=='') {
				return;
			}
			// 拿到数组里最后一个元素的id+1
			//如果数组长度为0 则id为1 如果长度不为1 则计算赋值给id
			const id=  this.list.length==0  ?    1: this.list[this.list.length-1].id+1
			this.list.push({id,name:this.todoName,done:false})
			//添加之后就应该清空
			this.todoName=''
		},

		//双击展示编辑状态
		showEdit(id){
			this.editId=id;
		},
		//回车收起编辑状态
        hideEdit(id){
			
		this.editId=-1;
		},

		//清除已经完成的
		delcomplete(){
        this. list= this.list.filter(item=>!item.done)
		}
	},
	computed:{
		//底部状态的显示
		isShow(){
			return this.list.length>0
		},
		//底部状态中的剩余显示
		iscomplete(){
			return this.list.filter(item=>!item.done).length
		},
		//是否显示clearcomplete
		isshowcomplete(){
			return this.list.find(item=>item.done)
		}
	},
	created(){
		//获取数据 http://localhost:3000/list
		axios.get('http://localhost:3000/list').then(res=>{
			this.list=res.data
		})
        //  this.list=JSON.parse(localStorage.getItem('list')) || []
	},

})

})(window);
